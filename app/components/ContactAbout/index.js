//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView, TextInput, Dimensions} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item, Input
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import Moment from 'react-moment';
import moment from 'moment'
import { getContact } from '../../actions'
import DatePicker from 'react-native-datepicker'

const { width, height } = Dimensions.get('window')

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class ContactAbout extends Component {
    constructor(props){
        super(props)
        this.state = {
            mobile: '',
            businessHours: '',
            afterHours: '',
            email: '',
            address1: '',
            address2: '',
            backgroundInfo: '',
            assignedTo: '',
            source: '',
            createdAt: '',
            updatedAt: '',
            communications: '',
            sms: '',
        }
    }

    componentWillMount() {
        var fullAddress = ''
        var address1 = ''
        var address2 = ''
        var params = this.props.contact_groups
        
        if(!params.data.attributes.address_line_1 || params.data.attributes.address_line_1 == '' || params.data.attributes.address_line_1 == 'null'){
            address1 = '';
        }
        else{
            address1 = params.data.attributes.address_line_1;
            if(!params.data.attributes.address_line_2 || params.data.attributes.address_line_2 == '' || params.data.attributes.address_line_2 == 'null'){
                address2 = '';
            }
            else{
                address2 =  params.data.attributes.address_line_2;
            }
        }
        
        this.setState({
            mobile: params.data.attributes.mobile_phone,
            businessHours: params.data.attributes.business_hours_phone,
            afterHours: params.data.attributes.after_hours_phone,
            email: params.data.attributes.email,
            address1: address1,
            address2: address2,
            backgroundInfo: params.data.attributes.background_info,
            assignedTo: params.data.attributes.first_name + ' ' + params.data.attributes.last_name,
            source: params.data.attributes.referred_by,
            createdAt: moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma'),
            updatedAt: moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma'),
            communications: params.data.attributes.subscribed? "Yes" : "No",
            sms: params.data.attributes.sms_subscribed?"Yes" : "No",
        })
    }

    renderRow(item, index) {
        return(
            <View style = {styles.categoryItem} key = {index}>
                <Label style = {styles.categoryItemTxt}>{item.job}</Label>
            </View>
        )
    }

    showContactGroups(groupList){
        if(groupList){
            return(
                groupList.map((item, index) => {
                    return(
                        <View style = { styles.categoryItem } key = {index}>
                            <Label style = {styles.categoryItemTxt}>{item.attributes.name}</Label>
                        </View>
                    )
                })
            )
        }
    }
    
    showContactRelationships(relationList){
        if(relationList.data.length > 0){
            var user_name = this.props.contact_groups.data.attributes.first_name + ' ' + this.props.contact_groups.data.attributes.last_name
            var contact1_name = relationList.data[0].attributes.contact1_first_name + ' ' + relationList.data[0].attributes.contact1_last_name
            var contact2_name = relationList.data[0].attributes.contact2_first_name + ' ' + relationList.data[0].attributes.contact2_last_name
            
            if(user_name == contact1_name){
                return(
                    <View style = {styles.view2} >
                        {
                            relationList.data[0].attributes.contact2_photo_url? <Thumbnail square source = {relationList.data[0].attributes.contact2_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>{contact2_name}</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.data[0].attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
            else {
                return(
                    <View style = {styles.view2} >
                        {
                            relationList.data[0].attributes.contact1_photo_url? <Thumbnail square source = {relationList.data[0].attributes.contact1_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>{contact1_name}</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.data[0].attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        }
    }

    showContactAbout(){
        var params = this.props.contact_groups
        return(
            <View>
                <View style = {styles.categoryView}>
                    {
                        this.showContactGroups(this.props.contact_groups.included) 
                    }
                </View>
                <View style = {this.props.contact_groups.Relationships.data.length > 0 ? styles.groupView1 : [styles.groupView1, {marginBottom: 0}]}>
                    <View style = {(!this.state.mobile || this.state.mobile == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <Label style = {styles.label2}>{this.state.mobile}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.businessHours || this.state.businessHours == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Business Hours</Label>
                        <Label style = {styles.label2}>{this.state.businessHours}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.afterHours || this.state.afterHours == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <Label style = {styles.label2}>{this.state.afterHours}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.email || this.state.email == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <Label style = {styles.label2}>{this.state.email}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.address1 || this.state.address1 == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <Label style = {styles.label2}>{this.state.address1}</Label>
                        <Label style = {styles.label2}>{this.state.address2}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.backgroundInfo || this.state.backgroundInfo == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <Label style = {styles.label2}>{this.state.backgroundInfo}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
                {
                    this.showContactRelationships(this.props.contact_groups.Relationships)
                }

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Assigned to</Label>
                        <Label style = {styles.label2}>{this.state.assignedTo}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.referred_by || this.state.referred_by == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <Label style = {styles.label2}>{this.state.referred_by}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Created at</Label>
                        <Label style = {styles.label2}>{this.state.createdAt}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <Label style = {styles.label2}>{this.state.updatedAt}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView2}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to bulk communications</Label>
                        <Label style = {styles.label2}>{this.state.communications}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to SMS</Label>
                        <Label style = {styles.label2}>{this.state.sms}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
            </View>
        )
    }

    showEidtContactAbout(){
        var params = this.props.contact_groups
        return(
            <View>
                <View style = {styles.categoryView}>
                    {
                        this.showContactGroups(this.props.contact_groups.included) 
                    }
                </View>
                <View style = { styles.groupView1 }>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ mobile: text })}
                            value = {this.state.mobile}
                            placeholder = "Mobile"
                            placeholderTextColor = "#999"
                            keyboardType = 'numeric'
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Business Hours</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ businessHours: text })}
                            value = {this.state.businessHours}
                            placeholder = "Business Hours"
                            placeholderTextColor = "#999"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ afterHours: text })}
                            value = {this.state.afterHours}
                            placeholder = "After Hours"
                            placeholderTextColor = "#999"
                            keyboardType = 'numeric'
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ email: text })}
                            value = {this.state.email}
                            placeholder = "Email"
                            placeholderTextColor = "#999"
                            keyboardType = 'email-address'
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ address1: text })}
                            value = {this.state.address1}
                            placeholder = "Address1"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ address2: text })}
                            value = {this.state.address2}
                            placeholder = "Address2"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ backgroundInfo: text })}
                            value = {this.state.backgroundInfo}
                            placeholder = "Background info"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
                {
                    this.showContactRelationships(this.props.contact_groups.Relationships)
                }

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Assigned to</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ assignedTo: text })}
                            value = {this.state.assignedTo}
                            placeholder = "Assigned to"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ source: text })}
                            value = {this.state.source}
                            placeholder = "Source"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Created at</Label>
                        <DatePicker
                            style={{width: width - 30}}
                            date={this.state.createdAt}
                            mode="datetime"
                            placeholder="Created Date"
                            format="MMM Do YYYY h:mma"
                            minDate="1970-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                },
                                dateText: {
                                    backgroundColor:'transparent',
                                    color:'black',
                                    fontSize: 22,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    textAlign: 'left',
                                    borderWidth: 0,
                                    width: width - 30
                                }
                            }}
                            onDateChange={(date) => {this.setState({createdAt: date});}}
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <DatePicker
                            style={{width: width - 30}}
                            date={this.state.updatedAt}
                            mode="datetime"
                            placeholder="Updated Date"
                            format="MMM Do YYYY h:mma"
                            minDate="1970-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                },
                                dateText: {
                                    backgroundColor:'transparent',
                                    color:'black',
                                    fontSize: 22,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    textAlign: 'left',
                                    borderWidth: 0,
                                    width: width - 30
                                }
                            }}
                            onDateChange={(date) => {this.setState({updatedAt: date});}}
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView2}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to bulk communications</Label>
                        <Label style = {styles.label2}>{params.data.attributes.subscribed? "Yes" : "No"}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to SMS</Label>
                        <Label style = {styles.label2}>{params.data.attributes.sms_subscribed?"Yes" : "No"}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container}>
                {
                    this.props.isEdit?
                        this.showEidtContactAbout() :
                        this.showContactAbout()
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
    }
}

export default connect(mapStateToProps)(ContactAbout)

