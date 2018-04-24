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
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { getOwnerVendors, getContactRelationships, getContactGroups, getInspectionAttendees } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'
import sendEmail from '../../scenes/sendEmail/index';

ownersList = [
    {name: 'Sally Sample'},
    {name: 'John Sample'}
]

// create a component
class Owner extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            ownersList: [],
            contactGroups: [],
            contactRelationships:[],

            mayInterestedList: [],
            interestedList: [],
            notInterestedList: [],
            allInterestedList: []
        }
    }

    componentWillMount() {
        var idList = [];
        var mayinterested = []
        var interested = []
        var notinterested = []

        getInspectionAttendees(this.props.token, this.props.inspectionInfo.id).then(attendee => {
            for(var i = 0; i < attendee.data.length; i++){
                if(attendee.data[i].attributes.interested == 'Yes'){
                    interested.push(attendee.data[i])
                }
            }
            getOwnerVendors(this.props.token, this.props.inspectionInfo.attributes.property_id).then(data => {
                for(var i = 0; i < data.data.length; i++){
                    idList.push(data.data[i].id)
                }
                getContactGroups(this.props.token, idList).then(data1 => {
                    getContactRelationships(this.props.token, idList).then(data2 => {
                        this.setState({
                            ownersList: data.data,
                            contactGroups: data1,
                            contactRelationships: data2,
                            isLoading: false,
                            allInterestedList: attendee.data,
                            interestedList: interested,
                        })
                    })
                })
            })
        })
    }

    onClickedMail(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'sendEmail'}))
    }

    // clickEachVendor(item, index){
    //     var { dispatch } = this.props;
    //     dispatch(NavigationActions.navigate({routeName: 'contactsShow'})) 
    // }

    clickEachVendor(item, index) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACTS_GROUP', data: item})
        dispatch ({ type: 'GET_CONTACTS_RELATIONSHIP', data: this.state.contactRelationships[index]})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow'}))
    }

    renderRow(item, index){
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickEachVendor(this.state.contactGroups[index], index)}>
                <View style = {styles.rowRenderView}>
                    {
                        item.attributes.photo_url ? 
                        <Thumbnail square source = {{uri: item.attributes.photo_url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                        <Thumbnail square style = {styles.avatarImg} source = {images.ic_placeholder_image}/>
                    }
                    <Label style = {styles.nametxt}>{item.attributes.first_name} {item.attributes.last_name}</Label>

                    <View style = {styles.subcontactView}>
                        <TouchableOpacity onPress = {() => this.onClickedMail()}>
                            <View style = {styles.contactItemView}>
                                <FontAwesome name = 'envelope' size = {18} color = 'white' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {styles.contactItemView}>
                                <MaterialIcons name = 'sms' size = {18} color = 'white' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {styles.contactItemView}>
                                <FontAwesome name = 'phone' size = {18} color = 'white' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.line}/>
                </View>
                
            </TouchableOpacity>
        )
    }

    showOwners(){
        return(
            <View>
                 <View style = {styles.mainView}>
                    <Label style = {styles.inspectionTxt}>Inspection Details</Label>
                    <View style = {styles.assignView}>
                        <Label style = {styles.assignTxt}>Attendees</Label>
                        <Label style = {styles.assignNameTxt}>{this.state.allInterestedList.length}</Label>
                    </View>
                    <View style = {styles.assignView}>
                        <Label style = {styles.assignTxt}>Interested</Label>
                        <Label style = {styles.assignNameTxt}>{this.state.interestedList.length}</Label>
                    </View>
                    <View style = {styles.assignView}>
                        <Label style = {styles.assignTxt}>Documents Sent</Label>
                        <Label style = {styles.assignNameTxt}>1</Label>
                    </View>
                    <View style = {styles.sendPropertyView}>
                        <Label style = {styles.sendTxt}>Send Vendor Report</Label>
                    </View>
                </View>
                <Label style = {styles.vendorTxt}>Vendor/s</Label>
                {
                    this.state.ownersList.map((item, index) => {
                        return(this.renderRow(item, index));
                    })
                }
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showOwners()
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        inspectionInfo: state.home.inspectionInfo,
        // mayinterestedList: state.home.attendee_mayinterested_List,
        // interestedList: state.home.attendee_interested_List,
        // notinterestedList: state.home.attendee_notinterested_List
    }
}

export default connect(mapStateToProps)(Owner)

