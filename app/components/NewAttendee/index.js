//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class HomeMine extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(HomeMine)

