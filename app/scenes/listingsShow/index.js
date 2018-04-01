import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import ListingAbout from '../../components/ListingAbout/index';
import ContactProperties from '../../components/ContactProperties';
import ContactActivity from '../../components/ContactActivity';
import ContactTask from '../../components/ContactTask';
import ListingInspections from '../../components/ListingInspections';
import ListingDocuments from '../../components/ListingDocuments';
import ListingActivity from '../../components/ListingActivity';
import ListingTasks from '../../components/ListingTasks';

class listingsShow extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isAbout: true,
            isProperties: false,
            isActivity: false,
            isTasks: false
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
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => { this.props.navigation.goBack() }} />
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{this.props.navigation.state.params.info.attributes.full_address}</Label>
                    <TouchableOpacity onPress = {this._onSearch}>
                        <Label style = {styles.editTxt}>Edit</Label>
                    </TouchableOpacity>
                </View>
                
                <Tabs renderTabBar={()=> <ScrollableTab />} initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#35AA47',height: 3}} >
                    <Tab heading="ABOUT" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingAbout info = {this.props.navigation.state.params.info} navigation = {this.props.navigation}/>
                    </Tab>
                    
                    <Tab heading="ACTIVITY" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingActivity/>
                    </Tab>
                    <Tab heading="INSPECTIONS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}>
                        <ListingInspections />
                    </Tab>
                    <Tab heading="DOCUMENTS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingDocuments/>
                    </Tab>
                    <Tab heading="TASKS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingTasks/>
                    </Tab>
                </Tabs>
                
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(listingsShow);