//import liraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base'
import {
    Keyboard, AsyncStorage, Image, 
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import contacts from '../contacts/index';
import { NavigationActions } from 'react-navigation'
import { getToken } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
var validator = require("email-validator");

// create a component
class login extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            email: 'testing@crmmobileapp.com',
            password: 'example123',
            isLoading: false
        }
    }

    onLogin() {
        Keyboard.dismiss();
        if(!this.state.email.length) {
            alert('Please enter email address');
            return
        }
        if(!this.state.password.length) {
            alert('Please enter password');
            return
        }
        if(validator.validate(this.state.email)){
            this.setState({ isLoading: true });
            getToken(this.state.email, this.state.password).then(data => {
                if(data.data){
                    this.setState({ isLoading: false });
                    var { dispatch } = this.props;
                    dispatch ({ type: 'GET_TOKEN', data: data.data.id})
                    dispatch(NavigationActions.navigate({routeName: 'contacts'}))
                }
                else {
                    alert("Invalid username and/or password");
                    this.setState({ isLoading: false });
                }
            })
        }
        else{
            alert('Email is not correct')
        }
    }

    render() {
        return (
            <Container style = {styles.container}>
                <Image source = {images.login_background} style = {styles.backgroundImg}/>
                
                <View style = {styles.mainContainer}>
                    <Image source = {images.logo} style = {styles.logoImg}/>
                    <Label style = {styles.logintitle}>Login to your account</Label>
                    <Item style = {styles.inputItem1}>
                        <Input
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ email: text })}
                            value = {this.state.email}
                            placeholder = "Your email"
                            placeholderTextColor = "#999"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                            keyboardType = 'email-address'
                            returnKeyType = "next"
                        />
                    </Item>
                    <Item style = {styles.inputItem2}>
                        <Input
                            ref = 'password'
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ password: text })}
                            secureTextEntry
                            value = {this.state.password}
                            placeholder = "password"
                            placeholderTextColor = "#999"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                        />
                    </Item>
                    <Button style = {styles.loginBtn} disabled = {this.state.isLoading? true : false} transparent onPress = {() => this.onLogin()}>
                        <Label style = {styles.loginBtnTxt}>Login</Label>
                    </Button>
                    <Button style = {styles.forgotBtn} transparent>
                        <Label style = {styles.forgortTxt}>Forgot password?</Label>
                    </Button>
                    {
                        this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 50}}/> : null
                    }
                </View>
            </Container>
        );
    }
}

//make this component available to the app
export default connect()(login);
