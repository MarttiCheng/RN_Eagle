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
import { getTaskContacts } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

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
        }  
    }

    componentWillMount() {
        this.fetchTaskInfo()
    }

    componentWillReceiveProps(nextProps) {
        this.fetchTaskInfo()
    }

    fetchTaskInfo() {
        var conList = []
        var listList = []
        getTaskContacts(this.props.token, this.props.tasks.id).then(data => {
            for(var i = 0 ; i < data.included.length ; i++) {
                if(data.included[i].type == 'contacts'){
                    conList.push(data.included[i])
                }
                else {
                    listList.push(data.included[i])
                }
            }
            this.setState({
                task_contactList: conList,
                task_listingsList: listList,
                isLoading: false
            })
        })
    }

    onClickedMail(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'sendEmail'}))
    }

    renderRow(item, index) {
        var { dispatch } = this.props;
        if(item.type == 'contacts'){
            return(
                <View style = {styles.contacvView}>
                    <Label style = {styles.label1}>{item.attributes.first_name} {item.attributes.last_name}</Label>
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
                        <TouchableOpacity style = {{marginLeft: 10}}>
                            <MaterialCommunityIcons name = 'close' size = {18} color = '#717171' />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else if(item.type == 'properties'){
            return(
                <View style = {styles.sublistingView}>
                    <Thumbnail square source = {{uri: item.attributes.thumbnail}} style = {styles.listingIcon} defaultSource = {images.ic_placeholder_image}/>
                    <Label style = {styles.listingLable}>{item.attributes.full_address}</Label>
                    <TouchableOpacity style = {{marginLeft: 10}}>
                        <MaterialCommunityIcons name = 'close' size = {18} color = '#717171' />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showTasksDetail(){
        return(
            <View style = {{flex: 1}}>
                <View style = {styles.titleView}>
                    <Label style = {styles.assignNameTxt}>{this.props.tasks.attributes.body}</Label>
                </View>
                <View style = {styles.assignView}>
                    <Label style = {styles.assignTxt}>Assigned to</Label>
                    <Label style = {styles.assignNameTxt}>Luke Paverd</Label>
                </View>
                <View style = {styles.assignView}>
                    <Label style = {styles.assignTxt}>Due Date</Label>
                    <Label style = {styles.assignNameTxt}>{this.props.tasks.attributes.due_date}</Label>
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
                        <Button transparent style = {styles.attachBtn}>
                            <Label style = {styles.attachTxt}>+ ATTACH CONTACT</Label>
                        </Button>
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
                        <Button transparent style = {styles.attachBtn}>
                            <Label style = {styles.attachTxt}>+ ATTACH CONTACT</Label>
                        </Button>
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

    onTaskEdit() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'editTask'}))
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
    }
}

//make this component available to the app
export default connect(mapStateToProps)(tasksShow);