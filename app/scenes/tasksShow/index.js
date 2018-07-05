import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { getTaskContacts, deleteContactRelationship, getEachContactRelationships, getContactGroup, getContactProperty_Vendor } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import Swipeout from 'react-native-swipeout'

class tasksShow extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            task_contactList: [],
            task_listingsList: [],
            selected_task_info: [],
            body: this.props.tasks.attributes.body,
            due_date: this.props.tasks.attributes.due_date,
            relationShipList: [],
            contactInfo: []
        }  
    }

    componentWillMount() {
        this.fetchTaskInfo()
    }

    fetchTaskInfo() {

        var conList = []
        var listList = []
        getTaskContacts(this.props.token, this.props.tasks.id).then(data => {
            getContactGroup(this.props.token, data.data.attributes.contact_id).then(groupdata => {
                // getContactProperty_Vendor(this.props.token, data.data.attributes.contact_id).then(propertyData => {
                    for(var i = 0 ; i < data.included.length ; i++) {
                        if(data.included[i].type == 'contacts'){
                            conList.push(data.included[i])
                        }
                        else {
                            listList.push(data.included[i])
                        }
                    }
                    this.setState({
                        contactInfo: groupdata,
                        task_contactList: conList,
                        task_listingsList: listList,
                        body: data.data.attributes.body,
                        due_date: data.data.attributes.due_date,
                        isLoading: false,
                    })
                // })
            })
        })
    }
    
    onClickedRelated(id, name) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACT_ID', data: id})
        dispatch ({ type: 'GET_CONTACT_NAME', data: name})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {name: name}}))
    }

    onClickProperty(item) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_LISTINGS', data: item})
        dispatch(NavigationActions.navigate({routeName: 'listingsShow', params: {info: item}}))
    }

    renderRow(item, index) {
        var { dispatch } = this.props;
        if(item.type == 'contacts'){
            var contactName = item.attributes.first_name + ' ' + item.attributes.last_name
            return(
                <TouchableOpacity style = {styles.view2} onPress = {() => this.onClickedRelated(item.id, contactName)}>   
                    {
                        item.attributes.photo_url?  <Thumbnail square source = {item.attributes.photo_url} style = {styles.avatarImg}/>:
                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                    }
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{contactName}</Label>
                        {
                            this.state.contactInfo.included?
                            <View style = {styles.tagView}>
                                {
                                    this.showContactGroups() 
                                }
                            </View> : null
                        }
                        
                    </View>
                </TouchableOpacity>
            )
        }
        else if(item.type == 'properties'){
            return(
                <TouchableOpacity style = {styles.sublistingView} onPress = {() => this.onClickProperty(item)}>
                    <Thumbnail square source = {{uri: item.attributes.thumbnail}} style = {styles.listingIcon} defaultSource = {images.ic_placeholder_image}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.full_address}</Label>
                        <View style = {styles.tagView}>
                            <View style = { styles.eachtag } >
                                <Label style = {styles.tagTxt}>{this.capitalizeListingTypeTag(item.attributes.listing_type)}</Label>
                            </View>
                            <View style = { styles.eachtag } >
                                <Label style = {styles.tagTxt}>{this.capitalizeListingTypeTag(item.attributes.property_type)}</Label>
                            </View>
                        </View>
                        <View style = {styles.line1}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    capitalizeListingTypeTag(text){
        var res = text.split('_')
        var newRes = []
        for(var i = 0 ; i < res.length ; i++){
            newRes.push(res[i].charAt(0).toUpperCase() + res[i].slice(1))
        }
        return newRes.join(' ')
    }

    showContactGroups() {
        return(
            this.state.contactInfo.included.map((item1, index1) => {
                return(
                    <View style = { styles.eachtag } key = {index1}>
                        <Label style = {styles.tagTxt}>{item1.attributes.name}</Label>
                    </View>
                )
            })
        )
    }

    showTasksDetail(){
        return(
            <View style = {{flex: 1}}>
                <View style = {styles.titleView}>
                    <Label style = {styles.assignNameTxt}>{this.state.body}</Label>
                </View>
                <View style = {styles.assignView}>
                    <Label style = {styles.assignTxt}>Assigned to</Label>
                    <Label style = {styles.assignNameTxt}>{this.props.user_info.first_name} {this.props.user_info.last_name}</Label>
                </View>
                <View style = {styles.assignView}>
                    <Label style = {styles.assignTxt}>Due Date</Label>
                    <Label style = {styles.assignNameTxt}>{this.state.due_date}</Label>
                </View>

                {
                    this.state.task_contactList.length > 0 ? 
                    <View>
                        <Label style = {styles.contactTxt}>Contact</Label>
                        {
                            this.state.task_contactList.map((item, index) => {
                               return(this.renderRow(item, index))
                            })
                        }
                    </View> : null
                }

                {
                    this.state.task_listingsList.length > 0 ? 
                    <View>
                        <Label style = {styles.listingtxt}>Listing</Label>
                        {
                            this.state.task_listingsList.map((item, index) => {
                                return(this.renderRow(item, index))
                            })
                        }
                    </View> : null
                }

                <View style = {styles.buttonView}>
                    <TouchableOpacity>
                        <View style = {styles.deleteView}>
                            <FontAwesome name = 'trash' size = {20} color = 'white' />
                            <Label style = {styles.deleteTxt}>DELETE</Label>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {styles.completeView}>
                            <MaterialIcons name = 'check' size = {20} color = 'white' />
                            <Label style = {styles.deleteTxt}>MARK AS COMPLETE</Label>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>  
        )
    }

    handleOnNavigateBack(){
        this.fetchTaskInfo()
    }

    onTaskEdit() {
        var { dispatch } = this.props;
        this.props.navigation.navigate('editTask', {
            onNavigateBack: this.handleOnNavigateBack.bind(this)
        })
    }

    back() {
        Keyboard.dismiss(); 

        if (this.props.navigation.state.params && typeof this.props.navigation.state.params.onNavigateBack !== "undefined") {
            this.props.navigation.state.params.onNavigateBack(); 
        }
        this.props.navigation.goBack()

        this.setState({ isEdit: false })
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={() => this.back() }>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>Tasks</Label>
                    <TouchableOpacity onPress = {() => this.onTaskEdit()}>
                        <Label style = {styles.editTxt}>Edit</Label>
                    </TouchableOpacity>
                </View>
                <Content>
                    {
                        this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showTasksDetail()
                    }
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
        user_info: state.user.user_info,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(tasksShow);