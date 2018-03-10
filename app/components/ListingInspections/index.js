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

var inspectionsList = [
    {date: '10th March', duration: '10am - 10:30am'},
    {date: '12th March', duration: '1pm - 1:30pm'},
    {date: '14th March', duration: '11am - 11:30am'},
]

// create a component
class ListingInspections extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    renderRow(item, index) {
        return(
            <View style = {styles.activityItem} key = {index}>
                <View style = {styles.view1}>
                    <Label style = {styles.dateTxt}>{item.date}</Label>
                </View>
                <View style = {styles.view2}>
                    <FontAwesome name = 'calendar' size = {20} color = '#757575' style = {{marginLeft: 5}} />
                    <Label style = {styles.duractionTxt}>{item.duration}</Label> 
                </View>
            </View>
        )
    }
    
    render() {
        return (
            <View style = {styles.container}>
                {
                    inspectionsList.map((item, index) => {
                        return(this.renderRow(item, index))
                    })
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(ListingInspections)

