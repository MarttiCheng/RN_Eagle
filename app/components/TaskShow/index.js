//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
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

    renderRow(item, index) {
        return(
            <View style = {styles.taskItemView} key = {index}>
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
        )
    }

    showTasks(){
        return(
            this.props.tasksList.map((item, index) => {
                return( this.renderRow(item, index ));
            })
        )
    }
    
    render() {
        return (
            <Content style = {styles.container}>
                {
                    this.props.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showTasks()
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
        contact_relationships: state.contacts.contact_relationships,
    }
}

export default connect(mapStateToProps)(TaskShow)

