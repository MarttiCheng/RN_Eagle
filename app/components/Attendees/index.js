//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import homeEdit from '../../scenes/homeEdit/index'
import { getInspectionAttendees } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

var rateInterestList = [
    {avatar: images.avatar_female, name: 'Sally Smith', tag: 'Docs sent'},
    {avatar: images.avatar_male, name: 'John Sample'},
]
var interestedList = [
    {avatar: images.avatar_female, name: 'Sally Smith'},
    {avatar: images.avatar_male, name: 'John Sample'},
]

var notInterestedList = [
    {avatar: images.avatar_female, name: 'Sally Smith'},
    {avatar: images.avatar_male, name: 'John Sample'},
]

// create a component
class Attendees extends Component {
    constructor(props){
        super(props)
        this.state = {
            mayInterestedList: [],
            interestedList: [],
            notInterestedList: [],
            isLoading: true
        }
    }

    componentWillMount() {
        var mayinterested = []
        var interested = []
        var notinterested = []
        getInspectionAttendees(this.props.token, this.props.inspectionId).then(data => {
            for(var i = 0 ; i < data.data.length ; i++){
                if(data.data[i].attributes.interested == 'No'){
                    notinterested.push(data.data[i])
                }
                else if(data.data[i].attributes.interested == 'Yes') {
                    interested.push(data.data[i])
                }
                else {
                    mayinterested.push(data.data[i])
                }
            }
            this.setState({
                isLoading: false,
                mayInterestedList: mayinterested,
                interestedList: interested,
                notInterestedList: notinterested
            })
        })
    }

    clickAttend(item, index) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'homeEdit'}))
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickAttend(item, index)}>
                <View style = {styles.rowRenderView}>
                    <Thumbnail square source = {item.avatar} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.name}</Label>
                        <View style = {styles.tagView}>
                            <View style = {item.tag? styles.eachtag : null}>
                                <Label style = {styles.tagTxt}>{item.tag}</Label>
                            </View>
                        </View>                      
                    </View>
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }

    

    showAttendeesList(){
        if((this.state.mayInterestedList.length + this.state.interestedList.length + this.state.notInterestedList.length) > 0){
            return(
                <View>
                    <View >
                        {
                            this.state.mayInterestedList.length == 0 ? null : <Label style = {styles.preregisteredTitle}>Swipe to rate interest</Label>
                        }
                        {
                            this.state.mayInterestedList.map((item, index) => {
                                return(this.renderRow(item, index));
                            })
                        }
                    </View>
                    <View >
                        {
                            this.state.interestedList.length == 0 ? null : <Label style = {styles.preregisteredTitle}>Interested</Label>
                        }
                        {
                            this.state.interestedList.map((item, index) => {
                                return(this.renderRow(item, index));
                            })
                        }
                    </View> 
                    <View >
                        {
                            this.state.notInterestedList.length == 0 ? null : <Label style = {styles.preregisteredTitle}>Not Interested</Label>
                        }
                        {
                            this.state.notInterestedList.map((item, index) => {
                                return(this.renderRow(item, index));
                            })
                        }
                    </View>
                </View>
            )
        }
        else {
            return(
                <Label style = {styles.nomoretxt}>No more data</Label>
            )
        }
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showAttendeesList()
                } 
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        relationship_inspection: state.home.selected_inspection,
        inspectionId: state.home.inspectionID,
    }
}

export default connect(mapStateToProps)(Attendees)

