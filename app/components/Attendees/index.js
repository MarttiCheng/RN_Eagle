//import libraries
import React, { Component } from 'react';
import { 
    StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView, TouchableHighlight, Dimensions
} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail, Item, Tab, Tabs, ScrollableTab, Header
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import homeEdit from '../../scenes/homeEdit/index'
import { getInspectionAttendees, getContactGroups } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import Swipeout from 'react-native-swipeout'
import Swipeable from 'react-native-swipeable';

const { width, height } = Dimensions.get('window')
const leftContent = <Text>Pull to activate</Text>;
 
const rightButtons = [
  <TouchableHighlight><Text></Text></TouchableHighlight>
];

const leftButtons = [
  <TouchableHighlight><Text></Text></TouchableHighlight>
];



// create a component
class Attendees extends Component {
    constructor(props){
        super(props)
        this.state = {
            mayInterestedList: [],
            interestedList: [],
            notInterestedList: [],
            mayInterestedNoteList: [],
            interestedNoteList: [],
            notInterestedNoteList: [],
            isLoading: true,
            
            maycontactGroups: [],
            intcontactGroups: [],
            notcontactGroups: [],

        }
    }

    componentWillMount() {
        this.fetchAttee()
    }

    fetchAttee() {
        var mayinterested = []
        var interested = []
        var notinterested = []
        var mayinterestedNote = []
        var interestedNote = []
        var notinterestedNote = []
        var maygroups = []
        var intgroups = []
        var notgroups = []
        var idList = []
        this.setState({ isLoading: true })
        getInspectionAttendees(this.props.token, this.props.inspectionId).then(data => {
            for(var i = 0; i < data.data.length; i++){
                idList.push(data.data[i].attributes.contact_id)
            }
            getContactGroups(this.props.token, idList).then(data1 => {
                for(var i = 0 ; i < data.data.length ; i++){
                    if(data.data[i].attributes.interested == 'No'){
                        notinterested.push(data.included[i])
                        notinterestedNote.push(data.data[i])
                        notgroups.push(data1[i])
                    }
                    else if(data.data[i].attributes.interested == 'Yes') {
                        interested.push(data.included[i])
                        interestedNote.push(data.data[i])
                        intgroups.push(data1[i])
                    }
                    else {
                        mayinterested.push(data.included[i])
                        mayinterestedNote.push(data.data[i])
                        maygroups.push(data1[i])
                    }
                }
                this.setState({
                    mayInterestedList: mayinterested,
                    interestedList: interested,
                    notInterestedList: notinterested,
                    mayInterestedNoteList: mayinterestedNote,
                    interestedNoteList: interestedNote,
                    notInterestedNoteList: notinterestedNote,
                    maycontactGroups: maygroups,
                    intcontactGroups: intgroups,
                    notcontactGroups: notgroups,
                    isLoading: false,
                })
            })
        })
    }

    handleOnNavigateBack(){
        this.fetchAttee()
    }

    clickAttend(item, index, category, noteInfo) {
        var { dispatch } = this.props;
        dispatch ({ type: 'SELECTED_CONTACT_INFO', data: item})
        dispatch ({ type: 'SELECTED_HOME_NOTE', data: noteInfo})
        
        this.props.navigation.navigate('homeEdit', {
            onNavigateBack: this.handleOnNavigateBack.bind(this),
            category: category
        })
    }

    showContactGroups(index, category){
        if(category == 0){
            if(this.state.maycontactGroups[index].included){
                return(
                    this.state.maycontactGroups[index].included.map((item1, index1) => {
                        return(
                            <View style = { styles.eachtag } key = {index1}>
                                <Label style = {styles.tagTxt}>{item1.attributes.name}</Label>
                            </View>
                        )
                    })
                )
            }
        }
        if(category == 1){
            if(this.state.intcontactGroups[index].included){
                return(
                    this.state.intcontactGroups[index].included.map((item1, index1) => {
                        return(
                            <View style = { styles.eachtag } key = {index1}>
                                <Label style = {styles.tagTxt}>{item1.attributes.name}</Label>
                            </View>
                        )
                    })
                )
            }
        }
        if(category == 2){
            if(this.state.notcontactGroups[index].included){
                return(
                    this.state.notcontactGroups[index].included.map((item1, index1) => {
                        return(
                            <View style = { styles.eachtag } key = {index1}>
                                <Label style = {styles.tagTxt}>{item1.attributes.name}</Label>
                            </View>
                        )
                    })
                )
            }
        }
    }

    swipeLeftRelease(item, noteInfo, index) {
        var interested = []
        var interestedNote = []
        var intgroups = []
        interested.push(item)
        interestedNote.push(noteInfo)
        intgroups.push(this.state.maycontactGroups[index])

        this.setState({
            interestedList: interested,
            interestedNoteList: interestedNote,
            intcontactGroups: intgroups,
        })
    }

    swipeRightRelease(item, noteInfo, index) {
        var notinterested = []
        var notinterestedNote = []
        var notgroups = []
        notinterested.push(item)
        notinterestedNote.push(noteInfo)
        notgroups.push(this.state.maycontactGroups[index])

        this.setState({
            notInterestedList: notinterested,
            notInterestedNoteList: notinterestedNote,
            notcontactGroups: notgroups,
        })
    }

    renderRow(item, index, category, noteInfo) {
        return(
            <Swipeable 
                leftButtons={leftButtons} 
                rightButtons={rightButtons} 
                key = {index} leftButtonWidth = {width} 
                rightButtonWidth = {width}
                onLeftActionRelease = {() => this.swipeLeftRelease(item, noteInfo, index)}
                onRightActionRelease = {() => this.swipeRightRelease(item, noteInfo, index)}
            >
                <TouchableOpacity onPress = {() => this.clickAttend(item, index, category, noteInfo)}>
                    <View style = {styles.rowRenderView}>
                        {
                            item.attributes.photo_url?  <Thumbnail square source = {{uri: item.attributes.photo_url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}  />
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>{item.attributes.first_name} {item.attributes.last_name}</Label>
                            <View style = {styles.tagView}>
                                {
                                    this.showContactGroups(index, category) 
                                }
                            </View>
                            
                        </View>
                        <View style = {styles.line}/>   
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }

    showAttendeesList() {
        return(
            <View>
                <View>
                    <Label style = {styles.preregisteredTitle}>Swipe to rate interest</Label>
                    {
                        this.state.mayInterestedList.map((item, index) => {
                            return (this.renderRow(item, index, 0, this.state.mayInterestedNoteList[index]))
                        })
                    }
                </View>
                <View>
                    <Label style = {styles.preregisteredTitle}>Interested</Label>
                    {
                        this.state.interestedList.map((item, index) => {
                            return (this.renderRow(item, index, 1, this.state.interestedNoteList[index]))
                            
                        })
                    }
                </View>
                <View>
                    <Label style = {styles.preregisteredTitle}>Not Interested</Label>
                    {
                        this.state.notInterestedList.map((item, index) => {
                            return (this.renderRow(item, index, 2, this.state.notInterestedNoteList[index]))
                        })
                    }
                </View>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showAttendeesList()
                } 
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        relationship_inspection: state.home.selected_inspection,
        inspectionId: state.home.inspectionID,
    }
}

export default connect(mapStateToProps)(Attendees)

