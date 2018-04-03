//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'


// create a component
class Owner extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            tasksList: []
        }
    }

    showOwners(){
        return(
            <View style = {styles.mainView}>
                <Label style = {styles.inspectionTxt}>Inspection Details</Label>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container}>
                {
                    this.props.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showOwners()
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
        contact_relationships: state.contacts.contact_relationships,
    }
}

export default connect(mapStateToProps)(Owner)

