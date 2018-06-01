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
import { getTaskContacts } from '../../actions'
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
            contactName: 'select contact',
            property: 'select property',
            appraisal: 'select appraisal',
            permision: 'Who can see this?',
        }  
    }

    onSelectPermision(value, label) {
        this.setState({permision : value});
    }

    onSelectContact() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'contacts'}))
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack(); this.setState({ isEdit: false }) }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>Add new task</Label>
                    <TouchableOpacity onPress = {this._onSearch}>
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
                        <Label style = {styles.label2}>Select contact</Label>
                        {/*<TouchableOpacity>*/}
                            {/*<Label style = {styles.contactTxt}>{this.state.contactName}</Label>*/}
                        {/*</TouchableOpacity>*/}
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.view1}>
                        <Label style = {styles.label2}>Select property</Label>
                        {/*<TouchableOpacity>*/}
                            {/*<Label style = {styles.contactTxt}>{this.state.property}</Label>*/}
                        {/*</TouchableOpacity>*/}
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.view1}>
                        <Label style = {styles.label2}>Select appraisal</Label>
                        {/*<TouchableOpacity>*/}
                            {/*<Label style = {styles.contactTxt}>{this.state.appraisal}</Label>*/}
                        {/*</TouchableOpacity>*/}
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
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        tasks: state.task.tasks,
        completed_task: state.task.tasks_completed,
        uncompleted_task: state.task.tasks_uncompleted,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(addNewTask);