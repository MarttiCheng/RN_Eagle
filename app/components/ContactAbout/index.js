//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView, TextInput} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item, Input
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import Moment from 'react-moment';
import moment from 'moment'
import { getContact } from '../../actions'

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
            address: '',
            backgroundInfo: '',
            assignedTo: '',
            source: '',
            createdAt: '',
            updatedAt: '',
            communications: '',
            sms: '',
        }
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
                    <View style = {(!params.data.attributes.mobile_phone || params.data.attributes.mobile_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <Label style = {styles.label2}>{params.data.attributes.mobile_phone}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.business_hours_phone || params.data.attributes.business_hours_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Business Hours</Label>
                        <Label style = {styles.label2}>{params.data.attributes.business_hours_phone}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.after_hours_phone || params.data.attributes.after_hours_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <Label style = {styles.label2}>{params.data.attributes.after_hours_phone}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.email || params.data.attributes.email == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <Label style = {styles.label2}>{params.data.attributes.email}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.address_line_1 || params.data.attributes.address_line_1 == '') ?styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <Label style = {styles.label2}>{params.data.attributes.address_line_1}{'\n'}{params.data.address_line_2}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.background_info || params.data.attributes.background_info == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <Label style = {styles.label2}>{params.data.attributes.background_info}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
                {
                    this.showContactRelationships(this.props.contact_groups.Relationships)
                }

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Assigned to</Label>
                        <Label style = {styles.label2}>{params.data.attributes.first_name + ' ' + params.data.attributes.last_name}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.referred_by || params.data.attributes.referred_by == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <Label style = {styles.label2}>{params.data.attributes.referred_by}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Created at</Label>
                        <Label style = {styles.label2}>
                            {moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma')}
                        </Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <Label style = {styles.label2}>
                            {moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma')}
                        </Label>
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

    showEidtContactAbout(){
        var params = this.props.contact_groups
        return(
            <View>
                <View style = {styles.categoryView}>
                    {
                        this.showContactGroups(this.props.contact_groups.included) 
                    }
                </View>
                <View style = {this.props.contact_groups.Relationships.data.length > 0 ? styles.groupView1 : [styles.groupView1, {marginBottom: 0}]}>
                    <View style = {(!params.data.attributes.mobile_phone || params.data.attributes.mobile_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ mobile: text })}
                            value = {this.state.mobile}
                            placeholder = "Mobile"
                            placeholderTextColor = "#999"
                            keyboardType = 'numeric'
                            returnKeyType = "next"
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.business_hours_phone || params.data.attributes.business_hours_phone == '')? styles.blankView : styles.view1}>
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
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.after_hours_phone || params.data.attributes.after_hours_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ afterHours: text })}
                            value = {this.state.afterHours}
                            placeholder = "After Hours"
                            placeholderTextColor = "#999"
                            keyboardType = 'numeric'
                            returnKeyType = "next"
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.email || params.data.attributes.email == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ email: text })}
                            value = {this.state.email}
                            placeholder = "Email"
                            placeholderTextColor = "#999"
                            keyboardType = 'email-address'
                            returnKeyType = "next"
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.address_line_1 || params.data.attributes.address_line_1 == '') ?styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ address: text })}
                            value = {this.state.address}
                            placeholder = "Address"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.background_info || params.data.attributes.background_info == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ backgroundInfo: text })}
                            value = {this.state.backgroundInfo}
                            placeholder = "Background info"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
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
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.data.attributes.referred_by || params.data.attributes.referred_by == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ source: text })}
                            value = {this.state.source}
                            placeholder = "Source"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Created at</Label>
                        <TouchableOpacity>
                            <Label style = {styles.label2}>
                                {moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma')}
                            </Label>
                        </TouchableOpacity>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <TouchableOpacity>
                            <Label style = {styles.label2}>
                                {moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma')}
                            </Label>
                        </TouchableOpacity>
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

