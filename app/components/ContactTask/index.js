//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { getContactTasks } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

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
       getContactTasks(this.props.token, this.props.contact_groups.data.id).then(data => {  
           this.setState({
               isLoading: false,
               tasksList: data.data
           })                
        })
    }

    renderRow(item, index) {
        return(
            <View style = {styles.taskItemView} key = {index}>
                <View style = {styles.view1}>
                    <Thumbnail square source = {images.ic_uncheckbox} style = {styles.checkImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.body}</Label>
                    </View>
                    <Label style = {styles.favoriteDate}>
                        {moment(item.attributes.due_date).format('DD MMM')}
                    </Label>
                </View>
                <View style = {styles.line1}/>
            </View>
        )
    }

    showContactTasks(){
        return(
            this.state.tasksList.map((item, index) => {
                return( this.renderRow(item, index ));
            })
            
        )
    }
    
    render() {
        return (
            <View style = {styles.container}>
                {/*<View style = {styles.taskItemView}>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.ic_uncheckbox} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>Follow up from inspection</Label>
                        </View>
                        <Label style = {styles.favoriteDate}>26 Feb</Label>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.ic_uncheckbox} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>Follow up from appraisal to see if he's still interested</Label>
                        </View>
                        <Label style = {styles.favoriteDate}>26 Feb</Label>
                    </View>
                </View>*/}
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showContactTasks()
                }
            </View>
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

export default connect(mapStateToProps)(ContactTask)

