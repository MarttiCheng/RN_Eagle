//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { NavigationActions, Header } from 'react-navigation'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import moment from 'moment'
import {FontAwesome} from '@expo/vector-icons'
import { getListingsTasks } from '../../actions'
import { BallIndicator } from 'react-native-indicators'


// create a component
class ListingTasks extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            tasksList:[]
        }
    }

    componentWillMount() {
        getListingsTasks(this.props.token, this.props.listings_about.id).then(data => { 
           this.setState({
               isLoading: false,
               tasksList: data.data
           })
        })
    }

    onClickedTask(item) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_TASK_ITEM', data: item})
        dispatch(NavigationActions.navigate({routeName: 'tasksShow'}))
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.onClickedTask(item)}>
                <View style = {styles.taskItemView}>
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
            </TouchableOpacity>
        )
    }
    
    showContactTasks(){
        if(this.state.tasksList.length > 0){
            return(
                this.state.tasksList.map((item, index) => {
                    return(this.renderRow(item, index))
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
            <Content style = {styles.container}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showContactTasks()
                }                
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        listings_about: state.listings.listings
    }
}

export default connect(mapStateToProps)(ListingTasks)

