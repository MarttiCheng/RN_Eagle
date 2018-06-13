//import liraries
import React, { Component } from 'react';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images'
import TaskShow from '../../components/TaskShow'
import { getCompletedTasks, getUnCompletedTasks } from '../../actions'
import {connect} from 'react-redux';

// create a component
class tasks extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            completedTaskList: [],
            uncompletedTaskList: []
        }   
    }

    componentWillMount() {
        getCompletedTasks(this.props.token).then(data => {
            getUnCompletedTasks(this.props.token).then(data1 => {
                this.setState({
                    isLoading: false,
                    completedTaskList: data.data,
                    uncompletedTaskList: data1.data
                })
            })
        })
    }

    onAddTask() {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACT_ID', data: null})
        dispatch ({ type: 'GET_CONTACT_NAME', data: ''})
        dispatch(NavigationActions.navigate({routeName: 'addNewTask'}))
    }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'menu' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { this.props.navigation.navigate('DrawerOpen') }} />
                    <Label style = {styles.title}>Tasks</Label>
                    <TouchableOpacity onPress = {this._onSearch}>
                        <Thumbnail square source = {null} style = {{width: 25, height: 25, marginRight: 10}} />
                    </TouchableOpacity>
                </View>
                <Tabs initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#35AA47', height: 3}} locked = {true}>
                    <Tab heading="DUE TASKS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <TaskShow tasksList = {this.state.completedTaskList} isLoading = {this.state.isLoading}/>
                    </Tab>
                    <Tab heading="FUTURE TASKS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <TaskShow tasksList = {this.state.uncompletedTaskList} isLoading = {this.state.isLoading}/>
                    </Tab>
                </Tabs>
                <TouchableOpacity style = {styles.addBtn} onPress = {() => this.onAddTask()}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
    }
}

//make this component available to the app
export default connect(mapStateToProps)(tasks);
