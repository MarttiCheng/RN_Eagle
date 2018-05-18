//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, Header } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { getContactTasks } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'

// create a component
class ContactRelated extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            tasksList: []
        }
    }

    showContactRelationships(relationList){
        if(relationList.data.length > 0){
            var user_name = ''
            var contact1_name = ''
            var contact2_name = ''
            
            if(this.props.contact_groups.data.attributes.last_name){
                user_name = this.props.contact_groups.data.attributes.first_name + ' ' + this.props.contact_groups.data.attributes.last_name
            }else {
                user_name = this.props.contact_groups.data.attributes.first_name
            }
            if(relationList.data[0].attributes.contact1_last_name){
                contact1_name = relationList.data[0].attributes.contact1_first_name + ' ' + relationList.data[0].attributes.contact1_last_name
            }else {
                contact1_name = relationList.data[0].attributes.contact1_first_name
            }
            if(relationList.data[0].attributes.contact2_last_name){
                contact2_name = relationList.data[0].attributes.contact2_first_name + ' ' + relationList.data[0].attributes.contact2_last_name
            }else {
                contact2_name = relationList.data[0].attributes.contact2_first_name 
            }

            if(user_name == contact1_name){
                return(
                    <View style = {styles.view2} >
                        {
                            relationList.data[0].attributes.contact2_photo_url? <Thumbnail square source = {relationList.data[0].attributes.contact2_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>{contact2_name}</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.data[0].attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
            else {
                return(
                    <View style = {styles.view2} >
                        {
                            relationList.data[0].attributes.contact1_photo_url? <Thumbnail square source = {relationList.data[0].attributes.contact1_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>{contact1_name}</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.data[0].attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        }
    }

    
    
    render() {
        console.log(this.props.contact_groups.Relationships)
        return (
            <View style = {styles.container}>
                {   
                    this.props.contact_groups.Relationships.data.length > 0 ?
                        this.showContactRelationships(this.props.contact_groups.Relationships):
                        <Label style = {styles.nomoretxt}>There's nothing here.</Label>
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
    }
}

export default connect(mapStateToProps)(ContactRelated)

