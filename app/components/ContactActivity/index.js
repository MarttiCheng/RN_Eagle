//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView, Modal} from 'react-native';
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
import HTML from 'react-native-render-html'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// create a component
class ContactActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            activityList: [],
            modalVisible: false,
            selected_note: []
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

    onClickedNote(item) {
        this.setState({
            modalVisible: true,
            selected_note: item.attributes,
        })
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.onClickedNote(item)}>
                <View style = {styles.activityItem} >
                    <View style = {styles.view1}>
                        { this.showNoteIcon(item.attributes.note_type) }
                        <Label style = {styles.dateTxt}>
                            {moment(item.attributes.created_at).format('DD MMM YYYY, h:mma')}
                        </Label>
                    </View>
                    <View style = {styles.view2}>
                        <Label style = {styles.text}>{item.attributes.text}</Label>
                        <HTML html = {item.attributes.description}/>
                    </View>
                </View>
            </TouchableOpacity>
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
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showContactActivity()
                }
                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.modalVisible}
                    onRequestClose = {() => [
                        alert('Modal has been closed')
                    ]}>
                    <Container style = {styles.detailNoteView}>
                        <View style = {styles.menuView}>
                            <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => this.setState({ modalVisible:false } )} />
                            <Label style = {styles.title}>{this.state.selected_note.note_type}</Label>
                            <View style = {styles.blankView}></View>
                        </View>
                        <Content style = {styles.contentView}>
                            <View style = {{padding: 15}}>
                                <Label>{this.state.selected_note.text}</Label>
                                <HTML html = {this.state.selected_note.description}/>
                            </View>
                            
                        </Content>
                    </Container>
                </Modal>
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

export default connect(mapStateToProps)(ContactActivity)

