//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import { Sae, Hoshi } from 'react-native-textinput-effects'
import listingsShow from '../listingsShow/index';


// create a component
class homeEdit extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    
    constructor(props){
        super(props)
        this.state = {
            isNotInterested: false,
            isMaybeInterested: true,
            isInterestd: false,
            firstName: this.props.selected_contact_info.attributes.first_name,
            lastName: this.props.selected_contact_info.attributes.last_name,
            mobile: this.props.selected_contact_info.attributes.mobile_phone,
            phone: this.props.selected_contact_info.attributes.business_hours_phone,
            email: this.props.selected_contact_info.attributes.email,
            notes: this.props.selected_contact_info.attributes.background_info,
        }
    }

    componentWillMount() {
        if(this.props.navigation.state.params.category == 0) {
            this.setState({
                isNotInterested: false,
                isMaybeInterested: true,
                isInterestd: false,
            })
        }
        else if(this.props.navigation.state.params.category == 1) {
            this.setState({
                isNotInterested: false,
                isMaybeInterested: false,
                isInterestd: true,
            })
        }
        else {
            this.setState({
                isNotInterested: true,
                isMaybeInterested: false,
                isInterestd: false,
            })
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
    
    OnViewProfile() {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACT_ID', data: this.props.selected_contact_info.id})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {name: this.props.selected_contact_info.attributes.first_name + ' ' + this.props.selected_contact_info.attributes.last_name}}))
    }

    OnSendEmail() {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_LISTINGS', data: this.props.selected_contact_info})
        dispatch(NavigationActions.navigate({routeName: 'sendEmail'}))
    }

    render() {
        return (
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => { this.props.navigation.goBack() }} />
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{this.props.selected_contact_info.attributes.first_name} {this.props.selected_contact_info.attributes.last_name}</Label>
                    <TouchableOpacity onPress = {this._onSearch}>
                        <Label style = {styles.editTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                <Content style = {styles.mainView} showsVerticalScrollIndicator = {false}>
                    <Label style = {styles.editInspectionTxt}>Edit Inspection</Label>
                    <View style = {{padding: 15, paddingTop: 5}}>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'First Name'}
                                value = {this.state.firstName}
                                onChangeText = { text => this.setState({ firstName: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.firstName? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                            <Hoshi
                                label = {'Last Name'}
                                value = {this.state.lastName}
                                onChangeText = { text => this.setState({ lastName: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.lastName? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Mobile'}
                                value = {this.state.mobile}
                                onChangeText = { text => this.setState({ mobile: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.mobile? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                            <Hoshi
                                label = {'Phone'}
                                value = {this.state.phone}
                                onChangeText = { text => this.setState({ phone: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.phone? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput1}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Email'}
                                value = {this.state.email}
                                onChangeText = { text => this.setState({ email: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.email? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput2}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        <View style = {styles.rowView}>
                            <Hoshi
                                label = {'Notes'}
                                value = {this.state.notes}
                                onChangeText = { text => this.setState({ notes: text })}
                                borderColor = {'transparent'}
                                labelStyle = {this.state.notes? styles.labelStyle1 : styles.labelStyle2}
                                style = {styles.txtinput2}
                                inputStyle = {styles.textInput}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                height = {43}
                            />
                        </View>
                        {/*<View style = {styles.editPropertyView}>
                            <Label style = {styles.editTxt1}>Edit Property Preferences</Label>
                        </View>*/}
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
                        
                        {/*<View style = {styles.buttonView}>
                            <TouchableOpacity>
                                <View style = {styles.saveBtnView}>
                                    <Label style = {styles.saveTxt}>SAVE</Label>
                                </View>
                            </TouchableOpacity>
                        </View>*/}
                    </View>
                    
                    <View>
                        <Label style = {styles.editInspectionTxt}>Follow up</Label>
                        <TouchableOpacity onPress = {() => this.OnSendEmail()}>
                            <View style = {styles.followRowView}>
                                <MaterialIcons name = 'attach-file' size = {25} color = '#757575' />
                                <Label style = {styles.follwRowTxt}>Send Document</Label>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.OnViewProfile()}>
                            <View style = {styles.followRowView}>
                                <MaterialIcons name = 'perm-contact-calendar' size = {25} color = '#757575' />
                                <Label style = {styles.follwRowTxt}>View Profile</Label>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        selected_contact_info: state.contacts.selected_contact_info,
    }
}

export default connect(mapStateToProps)(homeEdit)

