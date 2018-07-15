import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Modal, Animated, Platform, TextInput
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { updateContactGroup, createNewContact } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";
import Icon1 from 'react-native-vector-icons/Ionicons';
import reactNativeTextinputEffects from 'react-native-textinput-effects';
import DatePicker from 'react-native-datepicker'

class addInspection extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            propertyName: '',
            startDate: '',
        }
    }

    
    onCancel(){
        Keyboard.dismiss(); 
        this.props.navigation.goBack()
    }

    onSelectProperty() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'propertyIndex'}))
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => this.onCancel()}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <View style = {styles.titleView}>
                        <Label style = {styles.title}>Add new inspection</Label>
                    </View>
                    <TouchableOpacity onPress = {() => this.onSaveContact()}>
                        <Label style = {styles.saveTxt}>Save</Label>
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView 
                    style = {styles.container}
                    enableOnAndroid
                    extraHeight={Platform.OS === "android" ? -500 : undefined}
                    scrollEnabled = {true}
                >
                    <TouchableOpacity style = {styles.view1}  onPress = {() => this.onSelectProperty()}>
                        <Label style = {this.state.propertyName? styles.label1 : styles.label2}>Select property</Label>
                        {
                            this.state.propertyName? <Label style = {styles.contactTxt}>{this.state.propertyName}</Label> : null
                        }
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>
                    <DatePicker
                        style={{width: width - 30}}
                        date={this.state.startDate}
                        mode="datetime"
                        format="MMM Do YYYY h:mm a"
                        minDate="1970-05-01"
                        maxDate="2030-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            },
                            dateText: styles.dateTxt
                        }}
                        onDateChange={(date) => {this.setState({startDate: date});}}
                    />



                </KeyboardAwareScrollView>
                
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_group: state.contacts.contact_groups,
        edit_contact_item: state.contacts.edit_contact_item,
        userID: state.user.user_id,
        addGroupsList: state.contacts.default_contactGroup_list,
        usersList: state.user.usersList
    }
}

//make this component available to the app
export default connect(mapStateToProps)(addInspection);

