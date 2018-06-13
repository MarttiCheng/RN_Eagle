import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, TextInput, Platform
} from 'react-native'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { createNote } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import DatePicker from 'react-native-datepicker'
import Moment from 'react-moment';
import moment from 'moment'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";

var isVisiableVendor = true;

class addNewOffer extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            bodyTxt: '',
            price: '',
            contactName: this.props.contact_name,
            contactId: this.props.contact_id,
            propertyName: '',
            propertyId: '',
            property: 'select property',
            isVisiableVendor: true,
            isSaving: false,
        }  
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected_contactForTask.length != 0){
            this.setState({
                contactName: nextProps.selected_contactForTask.attributes.first_name + ' ' + nextProps.selected_contactForTask.attributes.last_name,
                contactId: nextProps.selected_contactForTask.id,
            })
        }
        if(nextProps.selected_propertyForTask.length != 0){
            this.setState({
                propertyName: nextProps.selected_propertyForTask.attributes.full_address,
                propertyId: nextProps.selected_propertyForTask.id,
            })
        }
    }

    onSelectContact() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'contactsIndex'}))
    }
    onSelectProperty() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'propertyIndex'}))
    }

    onBack(){
        var arr = []
        Keyboard.dismiss(); 
        var { dispatch } = this.props;
        dispatch ({ type: 'SELECTED_PROPERTY_FOR_TASK', data: arr})
        dispatch ({ type: 'SELECTED_CONTACT_FOR_TASK', data: arr})
        this.props.navigation.goBack();
    }

    onClickedVisibleVendor(){
        isVisiableVendor =! isVisiableVendor
        this.setState({ isVisiableVendor: isVisiableVendor })
    }

    onSave() {
        var arr = {
            "contact_id" : this.state.contactId,
            "property_id" : this.state.propertyId,
            "text": this.state.bodyTxt,
            "visible_to_vendor": this.state.isVisiableVendor,
            "note_type": "Offer",
            "offer_price": this.state.price,
            "permission_type": ""
        }
        this.setState({ isSaving: true })
        createNote(this.props.token, this.props.userID, arr).then(data => {
            this.setState({ isSaving: false })
            var arr = []
            Keyboard.dismiss(); 
            var { dispatch } = this.props;
            dispatch ({ type: 'SELECTED_PROPERTY_FOR_TASK', data: arr})
            dispatch ({ type: 'SELECTED_CONTACT_FOR_TASK', data: arr})
            this.props.navigation.goBack();
        })
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => this.onBack()}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>Add new offer</Label>
                    <TouchableOpacity onPress = {() => this.onSave()}>
                        <Label style = {styles.editTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView 
                    style = {styles.container}
                    enableOnAndroid
                    extraHeight={Platform.OS === "android" ? -500 : undefined}
                    scrollEnabled = {true}
                >
                    <View style = {styles.view1} >
                        <Label style = {styles.label1}>Note Type</Label>
                            <Label style = {styles.contactTxt}>Offer</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    
                    <TouchableOpacity style = {styles.view1} onPress = {() => this.onSelectContact()}>
                        <Label style = {this.state.contactName? styles.label1 : styles.label2}>Select contact</Label>
                            {
                                this.state.contactName? <Label style = {styles.contactTxt}>{this.state.contactName}</Label> : null
                            }
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.view1}  onPress = {() => this.onSelectProperty()}>
                        <Label style = {this.state.propertyName? styles.label1 : styles.label2}>Select property</Label>
                        {
                            this.state.propertyName? <Label style = {styles.contactTxt}>{this.state.propertyName}</Label> : null
                        }
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>

                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Price</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ price: text })}
                            value = {this.state.price}
                            placeholder = "Price"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>

                    <View style = {styles.bodyView}>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ bodyTxt: text })}
                            value = {this.state.bodyTxt}
                            placeholder = "Body"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            multiline={true}
                            numberOfLines={2}
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>

                    <View style = {styles.view1}>
                        <TouchableOpacity style = {styles.visibleVendorView} onPress = {() => this.onClickedVisibleVendor()}>
                            <Thumbnail square source = {this.state.isVisiableVendor? images.ic_checkbox1: images.ic_uncheckbox1} style = {styles.checkimg} />
                            <Text style = {styles.visibletxt}>  Visible on vendor report</Text>
                        </TouchableOpacity>
                        <View style = {styles.seperateLine}/>
                    </View>
                </KeyboardAwareScrollView>  
                {
                    this.state.isSaving? <BallIndicator color = {'#2B3643'}  style = {styles.indicator}/> : null
                }             
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        selected_contactForTask: state.contacts.selected_contactForTask,
        selected_propertyForTask: state.listings.selected_propertyForTask,
        contact_name: state.contacts.contact_name,
        contact_id: state.contacts.contact_id,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(addNewOffer);