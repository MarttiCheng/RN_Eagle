//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'
import styles from './styles'
import images from '../../themes/images'
import {FontAwesome} from '@expo/vector-icons'
import { getListingsInspections } from '../../actions'
import { BallIndicator } from 'react-native-indicators'


// create a component
class ListingInspections extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            inspectionsList:[]
        }
    }

    componentWillMount() {
        getListingsInspections(this.props.token, this.props.listings_about.id).then(data => {
            this.setState({
                isLoading: false,
                inspectionsList: data.data
            })
        })
    }

    renderRow(item, index) {
        return(
            <View style = {styles.activityItem} key = {index} >
                <View style = {styles.view1}>
                    <Label style = {styles.dateTxt}>{moment(item.attributes.start_datetime).format('Do MMMM')}</Label>
                </View>
                <View style = {styles.view2}>
                    <FontAwesome name = 'calendar' size = {20} color = '#757575' style = {{marginLeft: 5}} />
                    <Label style = {styles.duractionTxt}>
                        {moment(item.attributes.start_datetime).format('h:mma')} - {moment(item.attributes.end_datetime).format('h:mma')}
                    </Label> 
                </View>
            </View>
        )
    }
    
    showContactInspections(){
        if(this.state.inspectionsList.length > 0){
            return(
                this.state.inspectionsList.map((item, index) => {
                    return(this.renderRow(item, index))
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
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showContactInspections()
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

export default connect(mapStateToProps)(ListingInspections)

