//import liraries
import React, { Component } from 'react';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, 
  ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import TaskShow from '../../components/TaskShow'
import { getCompletedTasks, getUnCompletedTasks } from '../../actions'
import {connect} from 'react-redux';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'

// create a component
class sendEmail extends Component {
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

    onSendMail(){
        alert('send')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <View style = {styles.titleView}>
                        <MaterialCommunityIcons name = 'menu' size = {25} color = 'white'
                                onPress={ () => { this.props.navigation.navigate('DrawerOpen') }} />
                        <Label style = {styles.title}>Send Email</Label>
                    </View>
                    <View style = {styles.titleView}>
                        <Label style = {styles.sendTxt}>send</Label>
                        <MaterialIcons name = 'send' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => this.onSendMail() } />
                    </View>
                    
                </View>

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
export default connect(mapStateToProps)(sendEmail);
