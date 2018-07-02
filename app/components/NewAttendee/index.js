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
import { Sae, Hoshi } from 'react-native-textinput-effects'
import { getInspectionPreregistered, getInspectionEnquired, getContactGroups, getContactRelationships } from '../../actions'
import { BallIndicator } from 'react-native-indicators'


// create a component
class NewAttendee extends Component {
    constructor(props){
        super(props)
        this.state = {
            isNotInterested: false,
            isMaybeInterested: true,
            isInterestd: false,
            isLoading: true,
            registerList: [],
            enquiredList: [],
            contactGroups: [],
            contactRelationships: [],
        }
    }

    componentWillMount() {
        var idList1 = []
        var idList2 = []
        var allList = []
        getInspectionPreregistered(this.props.token, this.props.inspectionInfo.id).then(data => {
            getInspectionEnquired(this.props.token, this.props.inspectionInfo.attributes.property_id).then(data1 => {
                if(data.data.length > 0) {
                    for(var i = 0; i < data.included.length; i++){
                        idList1.push(data.included[i].id)
                    }
                }
                if(data1.data.length > 0){
                    for(var i = 0; i < data1.included.length; i++){
                        idList2.push(data1.included[i].id)
                    }
                }
                allList = idList1.concat(idList2)
                getContactGroups(this.props.token, allList).then(groupData => {
                    getContactRelationships(this.props.token, allList).then(relationshipData => {
                        this.setState({
                            contactGroups: groupData,
                            contactRelationships: relationshipData,
                            isLoading: false,
                            registerList: data.data.length > 0? data.included : [],
                            enquiredList: data1.data.length > 0? data1.included : [],
                        })
                    })
                })
            })
        })
    }

    onNotInterested() {
        this.setState({
            isNotInterested: true,
            isMaybeInterested: false,
            isInterestd: false,
        })
    }

    onMaybeInterested(){
        this.setState({
            isNotInterested: false,
            isMaybeInterested: true,
            isInterestd: false,
        })
    }

    onInterested(){
        this.setState({
            isNotInterested: false,
            isMaybeInterested: false,
            isInterestd: true,
        })
    }

    clickAttendee(item, index) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACTS_GROUP', data: item})
        dispatch ({ type: 'GET_CONTACT_ID', data: item.data.id})
        dispatch ({ type: 'GET_CONTACTS_RELATIONSHIP', data: this.state.contactRelationships[index]})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {name: item.data.attributes.first_name + ' ' + item.data.attributes.last_name}}))
    }

    renderRow(item, index) {
        return(
           <TouchableOpacity key = {index} onPress = {() => this.clickAttendee( this.state.contactGroups[index], index)}>
                <View style = {styles.rowRenderView}>
                    {
                        item.attributes.photo_url? <Thumbnail square source = {item.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg} />
                    }
                    
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.first_name} {item.attributes.last_name}</Label>
                        <Label style = {styles.label2}>{item.attributes.mobile_phone}</Label>
                        <Label style = {styles.label2}>{item.attributes.email}</Label>                         
                    </View>
                    <View style = {styles.checkView}>
                        <Label style = {styles.checkTxt}>CHECK IN</Label>
                    </View>
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }

    renderRow1(item, index) {
        return(
           <TouchableOpacity key = {index} onPress = {() => this.clickAttendee( this.state.contactGroups[index+this.state.registerList.length], index+this.state.registerList.length)}>
                <View style = {styles.rowRenderView}>
                    {
                        item.attributes.photo_url? <Thumbnail square source = {item.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                    }
                    
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.first_name} {item.attributes.last_name}</Label>
                        <Label style = {styles.label2}>{item.attributes.mobile_phone}</Label>
                        <Label style = {styles.label2}>{item.attributes.email}</Label>
                    </View>
                    <View style = {styles.checkView}>
                        <Label style = {styles.checkTxt}>CHECK IN</Label>
                    </View>
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }

    showRegisteredList(){
        return(
            <View>
                 <View >
                     {
                         this.state.registerList.length == 0 ? null :  <Label style = {styles.preregisteredTitle}>Pre-registered</Label>
                     }
                    {
                        this.state.registerList.map((item, index) => {
                            return(this.renderRow(item, index));
                        })
                    }
                </View>
                <View >
                    {
                        this.state.enquiredList.length == 0 ? null :  <Label style = {styles.preregisteredTitle}>Enquired</Label>
                    }
                    {
                        this.state.enquiredList.map((item, index) => {
                            return(this.renderRow1(item, index));
                        })
                    }
                </View>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View>
                    <View style = {{paddingLeft: 15, paddingRight: 15, paddingTop: 5}}>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'First Name'}
                                borderColor = {'transparent'}
                                style = {styles.txtinput1}
                                
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                            <Hoshi
                                label = {'Last Name'}
                                borderColor = {'transparent'}
                                style = {styles.txtinput1}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Mobile'}
                                borderColor = {'transparent'}
                                style = {styles.txtinput1}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                            <Hoshi
                                label = {'Phone'}
                                borderColor = {'transparent'}
                                style = {styles.txtinput1}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Email'}
                                borderColor = {'transparent'}
                                style = {styles.txtinput2}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Notes'}
                                borderColor = {'transparent'}
                                style = {styles.txtinput2}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        {/*<View style = {styles.editPropertyView}>
                            <Label style = {styles.editTxt}>Edit Property Preferences</Label>
                        </View>*/}
                        <View style = {styles.editSegementView}>
                            <TouchableOpacity onPress = {() => this.onNotInterested()}>
                                <View style = {[styles.nonInterestedView, this.state.isNotInterested?{backgroundColor: '#364150'} : {backgroundColor: 'white'}]}>
                                    <Label style = {[styles.interestedTxt, this.state.isNotInterested?{color: 'white'} : {color: '#364150'}]}>Not Interested</Label>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => this.onMaybeInterested()}>
                                <View style = {[styles.maybeInterestedView, this.state.isMaybeInterested?{backgroundColor: '#364150'} : {backgroundColor: 'white'}]}>
                                    <Label style = {[styles.interestedTxt, this.state.isMaybeInterested?{color: 'white'} : {color: '#364150'}]}>Maybe</Label>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => this.onInterested()}>
                                <View style = {[styles.InterestedView, this.state.isInterestd?{backgroundColor: '#364150'} : {backgroundColor: 'white'}]}>
                                    <Label style = {[styles.interestedTxt, this.state.isInterestd?{color: 'white'} : {color: '#364150'}]}>Interested</Label>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.buttonView}>
                            <TouchableOpacity>
                                <View style = {styles.clearBtnView}>
                                    <Label style = {styles.clearTxt}>Clear</Label>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {styles.saveBtnView}>
                                    <Label style = {styles.clearTxt}>SAVE</Label>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    
                    <View >
                        {
                        this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 20, marginBottom: 10}}/> : this.showRegisteredList()
                    } 
                    </View>

                    
                </View>
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        relationship_inspection: state.home.selected_inspection,
        inspectionId: state.home.inspectionID,
        inspectionInfo: state.home.inspectionInfo
    }
}

export default connect(mapStateToProps)(NewAttendee)

