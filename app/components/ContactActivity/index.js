//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { getContactActivity } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import { FontAwesome} from '@expo/vector-icons'
import moment from 'moment'

// create a component
class ContactActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            activityList: [],
        }
    }
    
    componentWillMount() {
       getContactActivity(this.props.token, this.props.contact_groups.data.id).then(data => {  
           this.setState({
               isLoading: false,
               activityList: data.data
           })                
        })
    }

    showNoteIcon(note_type) {
        if(note_type == "Email" || note_type == "Property Alert Email"){
            return(
                <FontAwesome name = 'envelope' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "Enquiry"){
            return(
                <FontAwesome name = 'question-circle' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "Inspection"){
            return(
                <FontAwesome name = 'eye' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "Offer"){
            return(
                <FontAwesome name = 'dollar' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "sms"){
            return(
                <FontAwesome name = 'mobile-phone' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "WebsiteLog"){
            return(
                <FontAwesome name = 'link' size = {25} color = '#717171'/>
            )
        }
        else{
            return(
                <FontAwesome name = 'sticky-note' size = {25} color = '#717171'/>
            )
        }
    }

    renderRow(item, index) {
        return(
            <View style = {styles.activityItem} key = {index}>
                <View style = {styles.view1}>
                    { this.showNoteIcon(item.attributes.note_type) }
                    <Label style = {styles.dateTxt}>
                        {moment(item.attributes.created_at).format('DD MMM YYYY, h:mma')}
                    </Label>
                </View>
                <View style = {styles.view2}>
                    <Label style = {styles.titleTxt}>{item.attributes.text}</Label>
                    <Label style = {styles.contactTxt}>{item.attributes.description}</Label>
                </View>
            </View>
        )
    }

    showContactActivity() {
        return(
            this.state.activityList.map((item, index) => {
                return( this.renderRow(item, index ));
            })
        )
    }
    
    render() {
        return (
            <View style = {styles.container}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showContactActivity()
                }
            </View>
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

export default connect(mapStateToProps)(ContactActivity)

