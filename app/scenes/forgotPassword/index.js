import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Input, Header, Textarea
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, TouchableOpacity, WebView
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { API } from '../../constants';

class ForgotPasswordScreen  extends Component<{}>{
    static navigationOptions = {
        header: 'Signup'
    };

    constructor(props){
        super(props);
        this.state = {
            canGoBack: true
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }

    onBack() {
        this.props.navigation.goBack()
    }   

    render(){
        return (
            <Container style={styles.container}>
                <WebView
                    ref='webview'
                    style={styles.webView}
                    onNavigationStateChange=
                      {this.onNavigationStateChange.bind(this)}
                    source={{uri: API.FORGOTPASSWORD_URL}}
                />    

                <TouchableOpacity onPress={() =>this.onBack()} style={styles.topbar}>
                    <Icon name="md-close" size={26} color="white" />
                </TouchableOpacity>
            </Container>
        );
    }
}

export default connect()(ForgotPasswordScreen);