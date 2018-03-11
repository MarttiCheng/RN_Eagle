//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'

var activityList = [
    {type: 'email', date: '27 Feb 2018, 8:40am', title: 'Luke Paverd sent an email to John Sample', message:'I am pleased to announced that your property 6 / 23 Watt Avenue,  OAK PARK is now online.'
    + 'You can view your property on our website at http://www.samplerealestate.com.au//property?property_id=20' + 'Click this link to share your property on Facebook'},
    {type: 'phone', date: '27 Feb 2018, 8:40am', title: 'Luke Paverd sent an sms to John Sample', message:'Thank you for attending our recent open home.'},
]

// create a component
class ContactActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    renderRow(item, index) {
        return(
            <View style = {styles.activityItem} key = {index}>
                <View style = {styles.view1}>
                    <Thumbnail square source = {item.type == 'email'? images.ic_email: images.ic_phone} style = {styles.icon}/>
                    <Label style = {styles.dateTxt}>{item.date}</Label>
                </View>
                <View style = {styles.view2}>
                    <Label style = {styles.titleTxt}>{item.title}</Label>
                    <Label style = {styles.contactTxt}>{item.message}</Label>
                </View>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    activityList.map((item, index) => {
                        return(this.renderRow(item, index))
                    })
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(ContactActivity)

