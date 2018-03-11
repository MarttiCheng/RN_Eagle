//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import {FontAwesome} from '@expo/vector-icons'

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class ListingDocuments extends Component {
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
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View style = {styles.taskItemView}>
                    <View style = {styles.view1}>
                        <FontAwesome name = 'file-pdf-o' size = {20} color = '#757575' style = {{marginLeft: 10}} />
                        <Label style = {styles.label1}>Contract of sale.pdf</Label>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <FontAwesome name = 'file-pdf-o' size = {20} color = '#757575' style = {{marginLeft: 10}} />
                        <Label style = {styles.label1}>Statement of Information.pdf</Label>
                    </View>
                </View>
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(ListingDocuments)

