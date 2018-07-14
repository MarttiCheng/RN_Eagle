import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab, Header
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Modal
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
import SelectAddPropertyModal from '../../components/SelectAddPropertyModal';

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
            isTasks: false,
            addModal: false,
            listingInfo: []
        }  
    }

    componentWillMount() {
        this.setState({
            listingInfo: this.props.navigation.state.params.info
        })
    }

    addNewProperty() {
        this.setState({ addModal: true })
    }

    onClickedNewNote() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewNote', params: {noteType: 'General'}}))
    }

    onClickedNewTask() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewTask'}))
    }

    onClickedNewEnquiry() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewEnquiry'}))
    }
    
    onClickedNewInspectionAttendee() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewInspection'}))
    }

    onClickedNewInspectionTime() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewInspection'}))
    }

    onClickedNewOffer() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewOffer'}))
    }

    onEditProperty() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'editProperty', params: {info: this.state.listingInfo}}))
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack(); }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{this.state.listingInfo.attributes.full_address}</Label>
                    <TouchableOpacity onPress = {() => this.onEditProperty()}>
                        <Label style = {styles.editTxt}>Edit</Label>
                    </TouchableOpacity>
                </View>

                <Tabs renderTabBar={()=> <ScrollableTab />} initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#35AA47',height: 3}} locked = {true} style = {{backgroundColor: '#364150'}}>
                    <Tab heading="ABOUT" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingAbout info = {this.state.listingInfo} navigation = {this.props.navigation}/>
                    </Tab>
                    <Tab heading="ACTIVITY" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingActivity/>
                    </Tab>
                    <Tab heading="INSPECTIONS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}>
                        <ListingInspections info = {this.state.listingInfo}/>
                    </Tab>
                    <Tab heading="DOCUMENTS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingDocuments/>
                    </Tab>
                    <Tab heading="TASKS" textStyle = {styles.inactiveTxt} activeTextStyle = {styles.activeTxt} tabStyle = {{backgroundColor: '#364150'}} activeTabStyle = {{backgroundColor: '#364150'}}> 
                        <ListingTasks navigation = {this.props.navigation}/>
                    </Tab>
                </Tabs>

                <TouchableOpacity style = {styles.addBtn} onPress = {() => this.addNewProperty()}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.addModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        this.setState({ addModal: false })
                    }}>
                    <SelectAddPropertyModal 
                        onClickedBack = {() => this.setState({ addModal: false })} 
                        onClickedNewNote = {() => this.onClickedNewNote()}
                        onClickedNewTask = {() => this.onClickedNewTask()}
                        onClickedNewEnquiry = {() => this.onClickedNewEnquiry()}
                        onClickedNewInspectionAttendee = {() => this.onClickedNewInspectionAttendee()}
                        onClickedNewInspectionTime = {() => this.onClickedNewInspectionTime()}
                        onClickedNewOffer = {() => this.onClickedNewOffer()}
                    />
                </Modal>
                
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(listingsShow);