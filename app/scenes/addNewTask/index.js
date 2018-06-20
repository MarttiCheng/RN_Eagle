import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, TextInput, Dimensions
} from 'react-native'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { createTask } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import DatePicker from 'react-native-datepicker'
import Moment from 'react-moment';
import moment from 'moment'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";

const { width, height } = Dimensions.get('window')

class addNewTask extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            bodyTxt: '',
            dueDate: '',
            task_contactList: [],
            contactName: this.props.contact_name,
            contactId: this.props.contact_id,
            propertyName: '',
            propertyId: '',
            property: 'select property',
            appraisal: 'select appraisal',
            permision: 'Who can see this?',
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

        this.props.navigation.goBack()
    }

    onSave() {
        var permision_type = '';
        if(this.state.permision == 'Everyone'){
            permision_type = 'everyone'
        }
        else {
            permision_type = 'exclusive'
        }
        var arr = {
            "due_date": this.state.dueDate,
            "body": this.state.bodyTxt,
            "permission_type": permision_type,
            "property_id": this.state.propertyId,
            "contact_id": this.state.contactId,
        }
        this.setState({ isSaving: true })
        createTask(this.props.token, this.props.userID, arr).then(data => {
            this.setState({ isSaving: false })
            var arr = []
            Keyboard.dismiss(); 
            var { dispatch } = this.props;
            dispatch ({ type: 'SELECTED_PROPERTY_FOR_TASK', data: arr})
            dispatch ({ type: 'SELECTED_CONTACT_FOR_TASK', data: arr})
            dispatch ({ type: 'SET_TASK_FLAG', data: '1'})
            if (this.props.navigation.state.params && typeof this.props.navigation.state.params.onNavigateBack !== "undefined") {
                this.props.navigation.state.params.onNavigateBack(); 
            }
            this.props.navigation.goBack()
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
                    
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>Add new task</Label>
                    <TouchableOpacity onPress = {() => this.onSave()}>
                        <Label style = {styles.editTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                <Content style = {{flex: 1}}>
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
                        <Label style = {styles.label1}>Due Date</Label>
                        <DatePicker
                            style={{width: width - 30}}
                            date={this.state.dueDate}
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
                            onDateChange={(date) => {this.setState({dueDate: date});}}
                        />
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
                        {
                            this.state.permision == 'Who can see this?'?
                            null: <Label style = {styles.label1}>Who can see this?</Label>
                        }
                        <Select
                            onSelect = {this.onSelectPermision.bind(this)}
                            defaultText  = {this.state.permision}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList_permision}
                        >
                            <Option value = "Everyone" styleText = {styles.optiontxt}>Everyone</Option>
                            <Option value = "Just me" styleText = {styles.optiontxt}>Just me</Option>
                        </Select>
                    </View>

                </Content>   
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
export default connect(mapStateToProps)(addNewTask);