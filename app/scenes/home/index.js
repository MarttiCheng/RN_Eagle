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


class home extends Component<{}>{
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
                    <MaterialCommunityIcons name = 'menu' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { this.props.navigation.navigate('DrawerOpen') }} />
                    <Label style = {[styles.title, {fontFamily: 'open-sans-bold'}]}>Open Homes</Label>
                    <TouchableOpacity style = {{width: 18, height: 18, marginRight: 15}}/>
                </View>
                 <Tabs initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#35AA47',height: 3}} >
                    <Tab heading="MINE" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <HomeMine navigation = {this.props.navigation}/>
                    </Tab>
                    <Tab heading="FOR SALE" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <HomeMine navigation = {this.props.navigation}/>
                    </Tab>
                    <Tab heading="FOR RENT" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <HomeMine navigation = {this.props.navigation}/>
                    </Tab>
                </Tabs>
                <TouchableOpacity style = {styles.addBtn}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(home);