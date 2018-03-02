//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class ContactTask extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    renderRow(item, index) {
        return(
            <View style = {styles.categoryItem} key = {index}>
                <Label style = {styles.categoryItemTxt}>{item.job}</Label>
            </View>
        )
    }
    
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.taskItemView}>
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
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(ContactTask)

