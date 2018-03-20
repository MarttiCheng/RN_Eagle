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
    
    render() {
        var params = this.props.navigation.state.params
        return (
            <Content style = {styles.container}>
                <View style = {styles.categoryView}>
                    {/*{
                        categoryList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }*/}
                    <View style = {params.info.attributes.suburb? styles.categoryItem : null}>
                        <Label style = {styles.categoryItemTxt}>{params.info.attributes.suburb}</Label>
                    </View>
                </View>
                <View style = {{backgroundColor: 'white'}}>
                    <View style = {(!params.info.attributes.mobile_phone || params.info.attributes.mobile_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <Label style = {styles.label2}>{params.info.attributes.mobile_phone}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.info.attributes.business_hours_phone || params.info.attributes.business_hours_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Business Hours</Label>
                        <Label style = {styles.label2}>{params.info.attributes.business_hours_phone}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.info.attributes.after_hours_phone || params.info.attributes.after_hours_phone == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <Label style = {styles.label2}>{params.info.attributes.after_hours_phone}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.info.attributes.email || params.info.attributes.email == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <Label style = {styles.label2}>{params.info.attributes.email}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.info.attributes.address_line_1 || params.info.attributes.address_line_1 == '') ?styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <Label style = {styles.label2}>{params.info.attributes.address_line_1}{'\n'}{params.info.address_line_2}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!params.info.attributes.background_info || params.info.attributes.background_info == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <Label style = {styles.label2}>{params.info.attributes.background_info}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
                <View style = {styles.view2}>
                    <Thumbnail square source = {images.avatar_female} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label3}>Sally Sample</Label>
                        <View style = {styles.tagView}>
                            <View style = {styles.eachtag}>
                                <Label style = {styles.tagTxt}>spouse</Label>
                            </View>
                        </View>
                    </View>
                </View>

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
                                {params.info.attributes.showed_at}
                            {/*</Moment>*/}
                        </Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <Label style = {styles.label2}>{params.info.attributes.showed_at}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to bulk communications</Label>
                        <Label style = {styles.label2}>{params.info.attributes.subscribed? "Yes" : "No"}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to SMS</Label>
                        <Label style = {styles.label2}>{params.info.attributes.sms_subscribed?"Yes" : "No"}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(ContactAbout)

