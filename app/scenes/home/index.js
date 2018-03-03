//import liraries
import React, { Component } from 'react';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'

// create a component
class home extends Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { this.props.navigation.goBack() }} />
                    <Label style = {[styles.title, {fontFamily: 'open-sans-bold'}]}>Home</Label>
                    <TouchableOpacity style = {styles.searchButton} onPress = {this._onSearch}>
                        <Label style = {{color: 'white', marginRight: 10, fontSize: 17, fontFamily: 'open-sans-bold'}}>Edit</Label>
                    </TouchableOpacity>
                </View>
                <Text>home</Text>
            </View>
        );
    }
}

//make this component available to the app
export default home;
