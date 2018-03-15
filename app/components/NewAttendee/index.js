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
import { Sae, Hoshi } from 'react-native-textinput-effects'

var registerList = [
    {avatar: images.avatar_female, name: 'Sally Smith', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
    {avatar: images.avatar_male, name: 'John Sample', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
]

var enquiredList = [
    {avatar: images.avatar_female, name: 'Sally Smith', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
    {avatar: images.avatar_male, name: 'John Sample', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
    {avatar: images.avatar_male, name: 'Sally Smith', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
    {avatar: images.avatar_male, name: 'Sally Smith', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
    {avatar: images.avatar_male, name: 'John Sample', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
    {avatar: images.avatar_male, name: 'John Sample', phone: '0400 484 784', email: 'sally@smith.com', job: 'Director at Eagle Software'},
]

// create a component
class NewAttendee extends Component {
    constructor(props){
        super(props)
        this.state = {
            isNotInterested: false,
            isMaybeInterested: true,
            isInterestd: false,
        }
    }

    onNotInterested() {
        this.setState({
            isNotInterested: true,
            isMaybeInterested: false,
            isInterestd: false,
        })
    }

    onMaybeInterested(){
        this.setState({
            isNotInterested: false,
            isMaybeInterested: true,
            isInterestd: false,
        })
    }

    onInterested(){
        this.setState({
            isNotInterested: false,
            isMaybeInterested: false,
            isInterestd: true,
        })
    }

    clickAttendee(item, index) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {info: item}}))
    }

    renderRow(item, index) {
        return(
           <TouchableOpacity key = {index} onPress = {() => this.clickAttendee(item, index)}>
                <View style = {styles.rowRenderView}>
                    <Thumbnail square source = {item.avatar} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.name}</Label>
                        <Label style = {styles.label2}>{item.phone}</Label>
                        <Label style = {styles.label2}>{item.email}</Label>                        
                    </View>
                    <View style = {styles.checkView}>
                        <Label style = {styles.checkTxt}>CHECK IN</Label>
                    </View>
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View style = {styles.rowView}>
                    <Hoshi
                        label = {'First Name'}
                        borderColor = {'#0099CC'}
                        style = {styles.txtinput1}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                    <Hoshi
                        label = {'Last Name'}
                        borderColor = {'#0099CC'}
                        style = {styles.txtinput1}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                </View>
                <View style = {styles.rowView}>
                    <Hoshi
                        label = {'Mobile'}
                        borderColor = {'#0099CC'}
                        style = {styles.txtinput1}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                    <Hoshi
                        label = {'Phone'}
                        borderColor = {'#0099CC'}
                        style = {styles.txtinput1}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                </View>
                <View style = {styles.rowView}>
                    <Hoshi
                        label = {'Email'}
                        borderColor = {'#0099CC'}
                        style = {styles.txtinput2}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                </View>
                <View style = {styles.rowView}>
                    <Hoshi
                        label = {'Notes'}
                        borderColor = {'#0099CC'}
                        style = {styles.txtinput2}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                </View>
                <View style = {styles.editPropertyView}>
                    <Label style = {styles.editTxt}>Edit Property Preferences</Label>
                </View>
                <View style = {styles.editSegementView}>
                    <TouchableOpacity onPress = {() => this.onNotInterested()}>
                        <View style = {[styles.nonInterestedView, this.state.isNotInterested?{backgroundColor: '#364150'} : {backgroundColor: 'white'}]}>
                            <Label style = {[styles.interestedTxt, this.state.isNotInterested?{color: 'white'} : {color: '#364150'}]}>Not Interested</Label>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onMaybeInterested()}>
                        <View style = {[styles.maybeInterestedView, this.state.isMaybeInterested?{backgroundColor: '#364150'} : {backgroundColor: 'white'}]}>
                            <Label style = {[styles.interestedTxt, this.state.isMaybeInterested?{color: 'white'} : {color: '#364150'}]}>Maybe</Label>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onInterested()}>
                        <View style = {[styles.InterestedView, this.state.isInterestd?{backgroundColor: '#364150'} : {backgroundColor: 'white'}]}>
                            <Label style = {[styles.interestedTxt, this.state.isInterestd?{color: 'white'} : {color: '#364150'}]}>Interested</Label>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttonView}>
                    <TouchableOpacity>
                        <View style = {styles.clearBtnView}>
                            <Label style = {styles.clearTxt}>Clear</Label>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {styles.saveBtnView}>
                            <Label style = {styles.clearTxt}>SAVE</Label>
                        </View>
                    </TouchableOpacity>
                </View>
                    
                <View >
                    <Label style = {styles.preregisteredTitle}>Pre-registered</Label>
                    {
                        registerList.map((item, index) => {
                            return(this.renderRow(item, index));
                        })
                    }
                </View>
                <View >
                    <Label style = {styles.preregisteredTitle}>Enquired</Label>
                    {
                        enquiredList.map((item, index) => {
                            return(this.renderRow(item, index));
                        })
                    }
                </View>

            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(NewAttendee)

