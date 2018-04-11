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
import { getAllInspections, getInspectionsRelationship } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'

// create a component
class HomeRent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            inspections_forRentList: [],
            inspectionsRelationShips: [],
        }
    }

    componentWillMount() {
        var idList = []
        var forRentList = []

        getAllInspections(this.props.token).then(data => {
            for(var i = 0 ; i < data.data.length ; i ++){
                if(data.data[i].attributes.for_rent){
                    forRentList.push(data.data[i])
                    idList.push(data.data[i].attributes.property_id);
                }
            }
            getInspectionsRelationship(this.props.token, idList).then(data1 => {
                this.setState({
                    isLoading: false,
                    inspections_forRentList: forRentList,
                    inspectionsRelationShips: data1
                })
            })
        })
    }

    onClickHome(item, data) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_INSPECTIONS_RELATIONSHIP', data: item})
        dispatch ({ type: 'ISPECTION_ID', data: data.id })
        dispatch ({ type: 'ISPECTION_INFO', data: data })
        dispatch(NavigationActions.navigate({routeName: 'homeShow'}))
    }

    renderRow(item, index) {
        return(
            <View key = {index}>
                <View style = {styles.dateView}>
                    <Label style = {styles.dateTxt}>{moment(item.attributes.start_datetime).format('Do MMMM')}</Label>
                </View>
                <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome(this.state.inspectionsRelationShips[index], item)} key = {index}>
                <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{moment(item.attributes.start_datetime).format('h:mma')} - {moment(item.attributes.end_datetime).format('h:mma')}</Label>
                        <Label style = {styles.label2}>50 Bay St, Double Bay</Label>
                    </View>
                    <Label style = {styles.saleTxt}>For Rent</Label>
                </TouchableOpacity>
            </View>
            
        )
    }

    showHomeInspections(){
        if(this.state.inspections_forRentList.length > 0){
            return(
                this.state.inspections_forRentList.map((item, index) => {
                    return(this.renderRow(item, index))
                })
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
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showHomeInspections()
                } 

            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(HomeRent)

