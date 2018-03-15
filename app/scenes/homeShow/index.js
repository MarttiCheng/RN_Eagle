import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Drawer, Tab, Tabs,
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import HomeMine from '../../components/HomeMine/index'
import NewAttendee from '../../components/NewAttendee/index'
import Attendees from '../../components/Attendees/index'
import ContactProperties from '../../components/ContactProperties'

class homeShow extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            searchText: '',
        }   
    }

    clickListing(item, index) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'listingsShow', params: {info: item}}))
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { this.props.navigation.goBack() }} />
                    <View style = {styles.titleView}>
                        <Label style = {styles.title}>50 Bay St, Double Bay</Label>
                        <Label style = {styles.timetitle}>March 10th 10am - 10:30am</Label>
                    </View>
                    <TouchableOpacity style = {{width: 18, height: 18, marginRight: 15}}/>
                </View>
                <Tabs initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#35AA47',height: 3}} >
                    <Tab heading="NEW ATTENDEE" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <NewAttendee/>
                    </Tab>
                    <Tab heading="ATTENDEES(5)" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <Attendees/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(homeShow);