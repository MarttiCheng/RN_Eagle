//import libraries
import React, { Component } from 'react';
import { 
    StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView, Keyboard, TextInput, Platform
} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import { Sae, Hoshi } from 'react-native-textinput-effects'
import listingsShow from '../listingsShow/index';
import { updateContact, updateNote } from '../../actions'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import { BallIndicator } from 'react-native-indicators'

// create a component
class homeEdit extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    
    constructor(props){
        super(props)
        this.state = {
            isNotInterested: false,
            isMaybeInterested: true,
            isInterestd: false,
            firstName: '',
            lastName: '',
            mobile: '',
            phone: '',
            email: '',
            notes: '',
            isLoading: false
        }
    }

    componentWillMount() {
        this.setState({
            isNotInterested: this.props.navigation.state.params.category == 2 ? true : false,
            isMaybeInterested: this.props.navigation.state.params.category == 0 ? true : false,
            isInterestd: this.props.navigation.state.params.category == 1 ? true : false,
            firstName: this.props.selected_contact_info.attributes.first_name,
            lastName: this.props.selected_contact_info.attributes.last_name,
            mobile: this.props.selected_contact_info.attributes.mobile_phone,
            phone: this.props.selected_contact_info.attributes.business_hours_phone,
            email: this.props.selected_contact_info.attributes.email,
            notes: this.props.selected_home_note.attributes.text,
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
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {info: item}}))
    }
    
    OnViewProfile() {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACT_ID', data: this.props.selected_contact_info.id})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {name: this.props.selected_contact_info.attributes.first_name + ' ' + this.props.selected_contact_info.attributes.last_name}}))
    }

    OnSendEmail() {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_LISTINGS', data: this.props.selected_contact_info})
        dispatch(NavigationActions.navigate({routeName: 'sendEmail'}))
    }

    onBack() {
        Keyboard.dismiss(); 
        if (this.props.navigation.state.params && typeof this.props.navigation.state.params.onNavigateBack !== "undefined") {
            this.props.navigation.state.params.onNavigateBack(); 
        }
        this.props.navigation.goBack(); 
    }

    _onSave = () => {
        Keyboard.dismiss(); 
        var arr1 = {
            "first_name" : this.state.firstName,
            "last_name" : this.state.lastName,
            "business_hours_phone": this.state.phone,
            "mobile_phone": this.state.mobile,
            "email": this.state.email,
        }
        var arr2 = {
            "contact_id": this.props.selected_contact_info.id,
            "property_id": this.props.relationship_inspection.id,
            "text": this.state.notes,
            "account_id": this.props.userID,
            "interested": this.state.isNotInterested? 'No': this.state.isInterestd? 'Yes' : 'Maybe'
        }
        
        this.setState({ isLoading: true })
        updateContact('PATCH', this.props.token, this.props.selected_contact_info.id, arr1).then(data => {
            updateNote(this.props.token, this.props.selected_home_note.id, this.props.userID, arr2).then(data1 => {
                this.setState({ isLoading: false })
            })
        })
    }

    render() {
        return (
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => this.onBack()} />
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{this.props.selected_contact_info.attributes.first_name} {this.props.selected_contact_info.attributes.last_name}</Label>
                    <TouchableOpacity onPress = {this._onSave}>
                        <Label style = {styles.editTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView
                    ref={ref => this.view = ref}
                    style={styles.mainView}
                    enableOnAndroid
                    extraHeight={Platform.OS === "android" ? -1500 : undefined}
                    scrollEnabled = {true}
                >
                    <Label style = {styles.editInspectionTxt}>Edit Inspection</Label>
                    <View style = {{padding: 15, paddingTop: 5}}>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'First Name'}
                                value = {this.state.firstName}
                                onChangeText = { text => this.setState({ firstName: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.firstName? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                            <Hoshi
                                label = {'Last Name'}
                                value = {this.state.lastName}
                                onChangeText = { text => this.setState({ lastName: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.lastName? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Mobile'}
                                value = {this.state.mobile}
                                onChangeText = { text => this.setState({ mobile: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.mobile? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                            <Hoshi
                                label = {'Phone'}
                                value = {this.state.phone}
                                onChangeText = { text => this.setState({ phone: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.phone? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Email'}
                                value = {this.state.email}
                                onChangeText = { text => this.setState({ email: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.email? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput2}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                keyboardType = 'email-address'
                                height = {43}
                            />
                        </View>
                        <View style = {styles.noteView}>
                            <Text style = {styles.noteTxt}>Note</Text>
                            <TextInput
                                style = {styles.noteTextInput}
                                multiline={true}
                                onChangeText = { text => this.setState({ notes: text })}
                                value = {this.state.notes}
                                placeholder = "Note"
                                placeholderTextColor = "#999"
                                autoCapitalize = 'none'
                                autoCorrect = {false}
                            />
                        </View>
                        
                        {/*<View style = {styles.editPropertyView}>
                            <Label style = {styles.editTxt1}>Edit Property Preferences</Label>
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
                        
                        {/*<View style = {styles.buttonView}>
                            <TouchableOpacity>
                                <View style = {styles.saveBtnView}>
                                    <Label style = {styles.saveTxt}>SAVE</Label>
                                </View>
                            </TouchableOpacity>
                        </View>*/}
                    </View>
                    
                    <View>
                        <Label style = {styles.editInspectionTxt}>Follow up</Label>
                        <TouchableOpacity onPress = {() => this.OnSendEmail()}>
                            <View style = {styles.followRowView}>
                                <MaterialIcons name = 'attach-file' size = {25} color = '#757575' />
                                <Label style = {styles.follwRowTxt}>Send Document</Label>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.OnViewProfile()}>
                            <View style = {styles.followRowView}>
                                <MaterialIcons name = 'perm-contact-calendar' size = {25} color = '#757575' />
                                <Label style = {styles.follwRowTxt}>View Profile</Label>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </KeyboardAwareScrollView>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {styles.indicator}/> : null
                }
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        selected_contact_info: state.contacts.selected_contact_info,
        relationship_inspection: state.home.selected_inspection,
        userID: state.user.user_id,
        selected_home_note: state.home.selected_home_note
    }
}

export default connect(mapStateToProps)(homeEdit)

