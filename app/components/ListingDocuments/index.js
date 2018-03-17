//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images'

var documentList = [
    {title: 'Contract of sale.pdf'},
    {title: 'Statement of Information.pdf'},
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
            <View style = {styles.view1} key = {index}>
                <MaterialCommunityIcons name = 'file-pdf' size = {20} color = '#757575' style = {{marginLeft: 10}} />
                <Label style = {styles.label1}>{item.title}</Label>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View style = {styles.taskItemView}>
                    {
                        documentList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                    <View style = {styles.view1}>
                        <MaterialCommunityIcons name = 'file-pdf' size = {20} color = '#757575' style = {{marginLeft: 10}} />
                        <Label style = {styles.label1}>Contract of sale.pdf</Label>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <MaterialCommunityIcons name = 'file-pdf' size = {20} color = '#757575' style = {{marginLeft: 10}} />
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

