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
import homeEdit from '../../scenes/homeEdit/index';

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
            
        }
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
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View >
                    <Label style = {styles.preregisteredTitle}>Swipe to rate interest</Label>
                    {
                        rateInterestList.map((item, index) => {
                            return(this.renderRow(item, index));
                        })
                    }
                </View>
                <View >
                    <Label style = {styles.preregisteredTitle}>Interested</Label>
                    {
                        interestedList.map((item, index) => {
                            return(this.renderRow(item, index));
                        })
                    }
                </View> 
                <View >
                    <Label style = {styles.preregisteredTitle}>Not Interested</Label>
                    {
                        notInterestedList.map((item, index) => {
                            return(this.renderRow(item, index));
                        })
                    }
                </View>           
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(Attendees)

