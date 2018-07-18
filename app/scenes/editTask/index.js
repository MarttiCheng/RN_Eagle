import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, TextInput, Dimensions, Alert
} from 'react-native'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { updateTask, getContact, getTaskContacts } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import DatePicker from 'react-native-datepicker'
import Moment from 'react-moment';
import moment from 'moment'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";
import Swipeout from 'react-native-swipeout'

const { width, height } = Dimensions.get('window')

class editTask extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            bodyTxt: this.props.tasks.attributes.body,
            dueDate: '',
            contactName: '',
            contactId: '',
            propertyName: '',
            propertyId: '',
            property: 'select property',
            appraisal: 'select appraisal',
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

    componentWillMount() {
        this.setState({ isSaving: true })

        this.fetchTaskInfo()
    }

    fetchTaskInfo() {
        getTaskContacts(this.props.token, this.props.tasks.id).then(data => {
            var contact_name = ''
            var contact_id = ''
            var property_name = ''
            var property_id = ''
            for(var i = 0 ; i < data.included.length ; i++) {
                if(data.included[i].type == 'contacts'){
                    contact_name = data.included[i].attributes.first_name + ' ' + data.included[i].attributes.last_name
                    contact_id = data.included[i].id
                }
                else {
                    property_name = data.included[i].attributes.full_address
                    property_id = data.included[i].id
                }
            }
            this.setState({
                isSaving: false,
                contactName: contact_name,
                contactId: contact_id,
                propertyName: property_name,
                propertyId: property_id,
                bodyTxt: data.data.attributes.body,
                dueDate: data.data.attributes.due_date,
            })
        })
    }

    onSelectPermision(value, label) {
        this.setState({permision : value});
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

        if (this.props.navigation.state.params && typeof this.props.navigation.state.params.onNavigateBack !== "undefined") {
            this.props.navigation.state.params.onNavigateBack(); 
        }
        this.props.navigation.goBack()
    }

    onSave() {
        var arr = {
            "due_date": this.state.dueDate,
            "body": this.state.bodyTxt,
            "property_id": this.state.propertyId,
            "contact_id": this.state.contactId,
        }
        this.setState({ isSaving: true })
        updateTask(this.props.token, this.props.tasks.id, arr).then(data => {
            this.fetchTaskInfo()
            var arr = []
            Keyboard.dismiss(); 
            var { dispatch } = this.props;
            dispatch ({ type: 'SELECTED_PROPERTY_FOR_TASK', data: arr})
            dispatch ({ type: 'SELECTED_CONTACT_FOR_TASK', data: arr})
        })
    }

    handlePress1(){
        this.setState({ 
            contactName: '',
            contactId: '',
         })
    }

    handlePress2(){
        this.setState({ 
            propertyName: '',
            propertyId: '',
         })
    }

    removeContactItem() {
        Alert.alert(
            '',
            'Are you sure you want to remove?',
            [
                {text: 'OK', onPress: () => this.handlePress1(), style: 'destructive'},
                {text: 'CANCEL', onPress: () => { console.log('Pressed cancel button') }},
            ],
            { cancelable: false }
        )
    }

    removePropertyItem() {
        Alert.alert(
            '',
            'Are you sure you want to remove?',
            [
                {text: 'OK', onPress: () => this.handlePress2(), style: 'destructive'},
                {text: 'CANCEL', onPress: () => { console.log('Pressed cancel button') }},
            ],
            { cancelable: false }
        )
    }

    showEdit() {
        var swipeoutContact = [
            {
                backgroundColor: '#f8373d',                
                buttonWidth: 60,
                onPress: () => { this.removeContactItem() },
                component:
                    (
                        <View style = {styles.swipeView}>
                            <Thumbnail square source={images.ic_delete} style={styles.swipeIcon}/>
                            <Text style = {styles.swipeTxt}>Remove</Text>
                        </View>
                    )
            },
        ]
        var swipeoutProperty = [
            {
                backgroundColor: '#f8373d',                
                buttonWidth: 60,
                onPress: () => { this.removePropertyItem() },
                component:
                    (
                        <View style = {styles.swipeView}>
                            <Thumbnail square source={images.ic_delete} style={styles.swipeIcon}/>
                            <Text style = {styles.swipeTxt}>Remove</Text>
                        </View>
                    )
            },
        ]
        return (
            <Content style = {{flex: 1}}>
                <View style = {styles.bodyView}>
                    <TextInput
                        style = {styles.inputTxt}
                        onChangeText = { text => this.setState({ bodyTxt: text })}
                        value = {this.state.bodyTxt}
                        placeholder = "Enter your task..."
                        placeholderTextColor = "#999"
                        returnKeyType = "next"
                        multiline={true}
                        numberOfLines={2}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <View style = {styles.seperateLine}/>
                </View>
                <View style = {styles.view1}>
                    <Label style = {styles.label1}>Due Date</Label>
                    <DatePicker
                        style={{width: width - 30}}
                        date={this.state.dueDate}
                        mode="date"
                        format="YYYY-MM-DD"
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
                        onDateChange={(date) => {this.setState({dueDate: date});}}
                    />
                    <View style = {styles.seperateLine}/>
                </View>
                
                <Swipeout right={swipeoutContact}>
                    <TouchableOpacity style = {styles.view1} onPress = {() => this.onSelectContact()}>
                        <Label style = {this.state.contactName? styles.label1 : styles.label2}>Select contact</Label>
                            {
                                this.state.contactName? <Label style = {styles.contactTxt}>{this.state.contactName}</Label> : null
                            }
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>
                </Swipeout>
                <Swipeout right={swipeoutProperty} >
                    <TouchableOpacity style = {styles.view1}  onPress = {() => this.onSelectProperty()}>
                        <Label style = {this.state.propertyName? styles.label1 : styles.label2}>Select property</Label>
                        {
                            this.state.propertyName? <Label style = {styles.contactTxt}>{this.state.propertyName}</Label> : null
                        }
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>
                </Swipeout>
            </Content>   
        )
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
                    
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>Edit task</Label>
                    <TouchableOpacity onPress = {() => this.onSave()}>
                        <Label style = {styles.editTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                
                {
                    this.state.isSaving? <BallIndicator color = {'#2B3643'}  style = {styles.indicator}/> : this.showEdit()
                }          
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        tasks: state.task.tasks,
        selected_contactForTask: state.contacts.selected_contactForTask,
        selected_propertyForTask: state.listings.selected_propertyForTask,
        contact_name: state.contacts.contact_name,
        contact_id: state.contacts.contact_id,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(editTask);