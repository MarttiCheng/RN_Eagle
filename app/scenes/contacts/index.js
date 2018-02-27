import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Icon
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'

class contacts extends Component<{}>{
    // static navigationOptions = {
    //     title: 'Contacts',
    //     headerTitleStyle: {
    //         color: 'white'
    //     },
    //     headerStyle: {
    //         backgroundColor: '#2B3643'
    //     },
    //     // headerTintColor: {
    //     //     /*  */
    //     // },
    // }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title:  'Contacts',
        headerStyle: {
            backgroundColor: '#2B3643'
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        headerLeft: <Thumbnail square source = {images.ic_menu} style = {{width: 20, height: 20, marginLeft: 15}}
                                onPress={ () => { navigation.goBack() }} />,
        headerRight: <Thumbnail square source = {images.ic_filter} style = {{width: 20, height: 20, marginRight: 15}}
                                onPress={ () => { navigation.navigate('Settings') }} />,
    });

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Content>
                    <View style = {styles.searchView}>
                        <Label>234</Label>
                    </View>
                </Content>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(contacts);