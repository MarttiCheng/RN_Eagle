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
import moment from 'moment'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import HomeMine from '../../components/HomeMine/index'
import NewAttendee from '../../components/NewAttendee/index'
import Attendees from '../../components/Attendees/index'
import ContactProperties from '../../components/ContactProperties'
import Owner from '../../components/Owner'

class homeShow extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
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

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack() }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <View style = {styles.titleView}>
                        <Label style = {styles.title}>{this.props.relationship_inspection.attributes.full_address}</Label>
                        <Label style = {styles.timetitle}>{moment(this.props.inspectionInfo.attributes.start_datetime).format('MMMM Do h:mma')} - {moment(this.props.inspectionInfo.attributes.end_datetime).format('h:mma')}</Label>
                    </View>
                    <TouchableOpacity style = {{width: 45, height: 45}}/>
                </View>
                <Tabs initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#35AA47', height: 3}} locked = {true}>
                    <Tab heading="NEW ATTENDEE" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <NewAttendee/>
                    </Tab>
                    <Tab heading="ATTENDEES" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <Attendees/>
                    </Tab>
                    <Tab heading="OWNER/S" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <Owner/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        relationship_inspection: state.home.selected_inspection,
        inspectionId: state.home.inspectionID,
        inspectionInfo: state.home.inspectionInfo
    }
}

//make this component available to the app
export default connect(mapStateToProps)(homeShow);