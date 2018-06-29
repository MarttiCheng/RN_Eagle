//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, Header } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { getContactTasks } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'

// create a component
class ContactTask extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            tasksList: []
        }
    }

    componentWillMount() {
       this.fetchContactTask()
    }

    componentWillReceiveProps(nextProps) {
        this.fetchContactTask()
    }

    fetchContactTask() {
        getContactTasks(this.props.token, this.props.contactInfo.data.id).then(data => {  
           this.setState({
               isLoading: false,
               tasksList: data.data
           })
        })
    }

    handleOnNavigateBack(){
        this.fetchContactTask()
    }

    onClickedTask(item) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_TASK_ITEM', data: item})

        this.props.navigation.navigate('tasksShow', {
            onNavigateBack: this.handleOnNavigateBack.bind(this)
        })
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.onClickedTask(item)}>
                <View style = {styles.taskItemView}>
                    <View style = {styles.view1}> 
                        {
                            item.attributes.completed_at? <Thumbnail square source = {images.ic_checkbox} style = {styles.checkImg}/> : 
                            <Thumbnail square source = {images.ic_uncheckbox} style = {styles.checkImg}/>
                        }
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>{item.attributes.body}</Label>
                        </View>
                        {
                            moment(item.attributes.due_date).format('DD MMM') == 'Invalid date'? null :
                                <Label style = {styles.favoriteDate}>
                                    {moment(item.attributes.due_date).format('DD MMM')}
                                </Label> 
                        }
                        
                    </View>
                    <View style = {styles.line1}/>
                </View>
            </TouchableOpacity>
        )
    }

    showContactTasks(){
        if(this.state.tasksList.length > 0){
            return(
                this.state.tasksList.map((item, index) => {
                    return( this.renderRow(item, index ));
                })
            )
        }
        else{
            return(
                <Label style = {styles.nomoretxt}>There's nothing here.</Label>
            )
        }
    }
    
    render() {
        return (
            <View style = {styles.container}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showContactTasks()
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_id: state.contacts.contact_id,
        task_flag: state.task.task_flag
        
    }
}

export default connect(mapStateToProps)(ContactTask)

