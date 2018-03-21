//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import Moment from 'react-moment';

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class ContactAbout extends Component {
    constructor(props){
        super(props)
        this.state = {
            
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
            // relationList.data.map((item, index) => {
                console.log('**')
                console.log(relationList.data[0].attributes.relationship_type)
                return(
                    <View style = {styles.view2} >
                        <Thumbnail square source = {images.avatar_female} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>Sally Sample</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.data[0].attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            // })
        }
    }
    
    render() {
        var params = this.props.contact_groups
        console.log('1-->')
        console.log(this.props.contact_groups)
        console.log(this.props.contact_relationships)
        return (
            <Content style = {styles.container}>
                <View style = {styles.categoryView}>
                    {
                        this.showContactGroups(this.props.contact_groups.included) 
                    }
                </View>
                <View style = {this.props.contact_relationships.data.length > 0 ? styles.groupView1 : [styles.groupView1, {marginBottom: 0}]}>
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
                    this.showContactRelationships(this.props.contact_relationships)
                }

                

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Assigned to</Label>
                        <Label style = {styles.label2}>Luke Paverd</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <Label style = {styles.label2}>RealEstate.com.au</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Created at</Label>
                        <Label style = {styles.label2}>
                            {/*<Moment parse="MMM DDD YYYY HH:mm">    */}
                                {params.data.attributes.showed_at}
                            {/*</Moment>*/}
                        </Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <Label style = {styles.label2}>{params.data.attributes.showed_at}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView1}>
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
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
        contact_relationships: state.contacts.contact_relationships,
    }
}

export default connect(mapStateToProps)(ContactAbout)

