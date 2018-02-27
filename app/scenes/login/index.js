//import liraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base'
import {
    Keyboard, AsyncStorage, Image
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import contacts from '../contacts/index';
import { NavigationActions } from 'react-navigation'

// create a component
class login extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    onLogin() {
        Keyboard.dismiss();
        // if(!this.state.email.length) {
        //     alert('Please enter email address');
        //     return
        // }
        // if(!this.state.password.length) {
        //     alert('Please enter password');
        //     return
        // }
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'contacts'}))
    }

    render() {
        return (
            <Container style = {styles.container}>
                <Image source = {images.login_background} style = {styles.backgroundImg}/>
                {/*<Content>*/}
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
                        <Button style = {styles.loginBtn} transparent onPress = {() => this.onLogin()}>
                            <Label style = {styles.loginBtnTxt}>Login</Label>
                        </Button>
                        <Button style = {styles.forgotBtn} transparent>
                            <Label style = {styles.forgortTxt}>Forgot password?</Label>
                        </Button>
                    </View>
                {/*</Content>*/}
            </Container>
        );
    }
}

//make this component available to the app
export default connect()(login);
