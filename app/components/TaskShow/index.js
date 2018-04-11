//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'


// create a component
class TaskShow extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            tasksList: []
        }
    }

    onClickedTask(item) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_TASK_ITEM', data: item})
        dispatch(NavigationActions.navigate({routeName: 'tasksShow'}))
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.onClickedTask(item)}>
                <View style = {styles.taskItemView} >
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.ic_uncheckbox} style = {styles.checkImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>{item.attributes.body}</Label>
                        </View>
                        <Label style = {styles.dueDate}>
                            {moment(item.attributes.due_date).format('DD MMM')}
                        </Label>
                    </View>
                    <View style = {styles.line1}/>
                </View>
            </TouchableOpacity>
        )
    }

    showTasks(){
        if(this.props.tasksList.length > 0){
            return(
                this.props.tasksList.map((item, index) => {
                    return( this.renderRow(item, index ));
                })
            )
        }
        else{
            return(
                <Label style = {styles.nomoretxt}>No more data</Label>
            )
        } 
    }
    
    render() {
        return (
            <Content style = {styles.container}>
                {
                    this.props.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showTasks()
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
    }
}

export default connect(mapStateToProps)(TaskShow)

