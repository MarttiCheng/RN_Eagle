//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, Alert, TouchableOpacity, TextInput, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item, Input
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, Header } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { createContactRelationship, getContactRelationships, getEachContactRelationships, deleteContactRelationship } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'
import Swipeout from 'react-native-swipeout'
import {Select, Option} from "react-native-chooser";
import reactNativeFloatingLabelTextInput from 'react-native-floating-label-text-input';

var selected_contact_id = ''

// create a component
class ContactRelated extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isSaveLoading: false,
            relationShipList: [],
            contactsName: '',
            note: '',
            relationship: 'Select relationship',
            contactNameList: this.props.contact_all,
            search_contactNameList: [],
            isNameListView: false,
            contact1_id: this.props.contactInfo.data.id,
            contact2_id: '',
            selected_contact_id: '',
            selected_contact_name: '',
        }
    }

    componentWillMount() {
        getEachContactRelationships(this.props.token, this.state.contact1_id).then(relationShipData => {
            this.setState({ 
                isSaveLoading: false,
                isLoading: false,
                contactsName: '',
                relationship: 'Select relationship',
                relationShipList: relationShipData,
            })
        })
    }

    handlePress(id){
        this.setState({ isLoading: true })
        deleteContactRelationship(this.props.token, id)
        getEachContactRelationships(this.props.token, this.state.contact1_id).then(relationShipData => {
            this.setState({ 
                isSaveLoading: false,
                isLoading: false,
                contactsName: '',
                relationship: 'Select relationship',
                relationShipList: relationShipData,
            })
        })
        
    }

    removeWatchListItem(id) {
        Alert.alert(
            '',
            'Are you sure you want to remove?',
            [
                {text: 'OK', onPress: () => this.handlePress(id), style: 'destructive'},
                {text: 'CANCEL', onPress: () => { console.log('Pressed cancel button') }},
            ],
            { cancelable: false }
        )
    }

    showContactRelationships(relationList){
        var swipeoutBtns = [
            {
                backgroundColor: '#f8373d',                
                buttonWidth: 60,
                onPress: () => { this.removeWatchListItem(relationList.id) },
                component:
                    (
                        <View style = {styles.swipeView}>
                            <Thumbnail square source={images.ic_delete} style={styles.swipeIcon}/>
                            <Text style = {styles.swipeTxt}>Remove</Text>
                        </View>
                    )
            },
        ]
        var user_name = ''
        var contact1_name = ''
        var contact2_name = ''
        var contact1_id = ''
        var contact2_id = ''
        
        if(this.props.contactInfo) {
            if(this.props.contactInfo.data.attributes.last_name){
                user_name = this.props.contactInfo.data.attributes.first_name + ' ' + this.props.contactInfo.data.attributes.last_name
            }else {
                user_name = this.props.contactInfo.data.attributes.first_name
            }
            if(relationList.attributes.contact1_last_name){
                contact1_name = relationList.attributes.contact1_first_name + ' ' + relationList.attributes.contact1_last_name
            }else {
                contact1_name = relationList.attributes.contact1_first_name
            }
            if(relationList.attributes.contact2_last_name){
                contact2_name = relationList.attributes.contact2_first_name + ' ' + relationList.attributes.contact2_last_name
            }else {
                contact2_name = relationList.attributes.contact2_first_name 
            }

            if(user_name == contact1_name){
                return(
                    <Swipeout right={swipeoutBtns}>
                        <TouchableOpacity style = {styles.view2} onPress = {() => this.onClickedRelated(relationList.attributes.contact2_id, contact2_name)}>
                            {
                                relationList.attributes.contact2_photo_url? <Thumbnail square source = {relationList.attributes.contact2_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                            }
                            
                            <View style = {styles.rowSubView}>
                                <Label style = {styles.label3}>{contact2_name}</Label>
                                <View style = {styles.tagView}>
                                    <View style = {styles.eachtag}>
                                        <Label style = {styles.tagTxt}>{relationList.attributes.relationship_type}</Label>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Swipeout>
                )
            }
            else {
                return(
                    <Swipeout right={swipeoutBtns}>
                        <TouchableOpacity style = {styles.view2} onPress = {() => this.onClickedRelated(relationList.attributes.contact1_id, contact1_name)}>
                            {
                                relationList.attributes.contact1_photo_url? <Thumbnail square source = {relationList.attributes.contact1_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                            }
                            
                            <View style = {styles.rowSubView}>
                                <Label style = {styles.label3}>{contact1_name}</Label>
                                <View style = {styles.tagView}>
                                    <View style = {styles.eachtag}>
                                        <Label style = {styles.tagTxt}>{relationList.attributes.relationship_type}</Label>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Swipeout>
                )
            }
        }
    }

    onClickedRelated(id, name) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACT_ID', data: id})
        dispatch ({ type: 'GET_CONTACT_NAME', data: name})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {name: name}}))
    }

    onSelectRelationShip(value, label) {
        this.setState({relationship : value});
    }

    filterStates(text){
        if(text.length>2){
            this.setState({
                search_contactNameList: this.state.contactNameList.filter(item => (item.data.attributes.first_name + item.data.attributes.last_name).toLowerCase().includes(text.toLowerCase())),
                contactsName: text,
                isNameListView: true
            })
        }
        else {
            this.setState({
                search_contactNameList: [],
                contactsName: text,
                isNameListView: false
            })
        }
    }

    onClickContactName(item){
        this.setState({
            contactsName: item.data.attributes.first_name + " " + item.data.attributes.last_name,
            isNameListView: false,
            contact2_id: item.data.id
        })
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity onPress = {() => this.onClickContactName(item)}>
                <Text style = {styles.nametxt}>{item.data.attributes.first_name} {item.data.attributes.last_name}</Text>
            </TouchableOpacity>
        )
    }

    onSave(){
        if(this.state.contact2_id == ''){
            alert('Contact and relationship cannot be blank')
        }
        else {
            if(this.state.relationship == 'Select relationship'){
                alert('Contact and relationship cannot be blank')
            }
            else {
                var idList = []
                this.setState({ isSaveLoading: true })
                createContactRelationship(this.props.token, this.state.contact1_id, this.state.contact2_id, this.state.relationship).then(data => {
                    getEachContactRelationships(this.props.token, this.state.contact1_id).then(relationShipData => {
                        this.setState({ 
                            isSaveLoading: false,
                            contactsName: '',
                            relationship: 'Select relationship',
                            relationShipList: relationShipData,
                        })
                    })
                })
            }
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                { this.state.isSaveLoading? <BallIndicator color = {'#2B3643'}  style = {styles.loadingView}/> : null }
                { 
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 30, marginBottom: 10}}/> : 
                    this.state.relationShipList.data ?
                        this.state.relationShipList.data.map((item, index) => {
                            return this.showContactRelationships(item)
                        }) :
                       null
                }
                <View style = {styles.saveView}>
                    <Label style = {styles.addTxt}>Add a related contact</Label>
                    <Input
                        ref = 'contactsname'
                        style = {styles.inputTxt}
                        onChangeText = { text => this.filterStates(text)}
                        value = {this.state.contactsName}
                        placeholder = "Start typing the contacts name..."
                        placeholderTextColor = "#999"
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />
                    <Select
                        onSelect = {this.onSelectRelationShip.bind(this)}
                        defaultText  = {this.state.relationship}
                        style = {styles.selectoptionView}
                        textStyle = {styles.selectedTxt}
                        backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                        transparent = {true}
                        optionListStyle = {styles.optionList}
                    >
                        <Option value = "Spouse" styleText = {styles.optiontxt}>Spouse</Option>
                        <Option value = "Solicitor" styleText = {styles.optiontxt}>Solicitor</Option>
                        <Option value = "Client" styleText = {styles.optiontxt}>Client</Option>
                        <Option value = "Sibling" styleText = {styles.optiontxt}>Sibling</Option>
                        <Option value = "Child" styleText = {styles.optiontxt}>Child</Option>
                        <Option value = "Parent" styleText = {styles.optiontxt}>Parent</Option>
                        <Option value = "Business Parnter" styleText = {styles.optiontxt}>Business Parnter</Option>
                        <Option value = "Associate" styleText = {styles.optiontxt}>Associate</Option>
                        <Option value = "House Mate" styleText = {styles.optiontxt}>House Mate</Option>
                        <Option value = "Ex-Spouse" styleText = {styles.optiontxt}>Ex-Spouse</Option>
                    </Select>
                    <TextInput
                        ref = 'note'
                        style = {styles.inputTxt1}
                        onChangeText = { text => this.setState({ note: text })}
                        value = {this.state.note}
                        multiline={true}
                        numberOfLines={3}
                        placeholder = "Enter notes..."
                        placeholderTextColor = "#999"
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />

                    <Button transparent style = {styles.saveBtn} onPress = {() => this.onSave()}>
                        <Label style = {styles.saveTxt}>SAVE</Label>
                    </Button>
                    {
                        (this.state.isNameListView && this.state.search_contactNameList.length > 0)?
                        <ScrollView style = {styles.nameListView}>
                            {
                                this.state.search_contactNameList.map((item, index) => {
                                    return this.renderRow(item, index)
                                })
                            }
                        </ScrollView> : null
                    }
                    
                </View>
                
               
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userID: state.user.user_id,
        token: state.user.token, 
        // contact_groups: state.contacts.contact_groups,
        contact_all: state.contacts.contacts_all,
        contact_id: state.contacts.contact_id,
    }
}

export default connect(mapStateToProps)(ContactRelated)

