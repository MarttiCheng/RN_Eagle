//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, Header } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { BallIndicator } from 'react-native-indicators'
import { getContactProperty_Vendor, getContractProperty_Enquired, getThumbnailUrl } from '../../actions'
import listingsShow from '../../scenes/listingsShow/index';

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class ContactProperties extends Component {
    constructor(props){
        super(props)
        this.state = {
            propertyList: [],
            isLoading: true,
            vendorList: [],
            enquiredList: [],
            inspectedList: [],
            offerList: [],
            photoURL: '',
            vendor_photoList:[],
            enquired_photoList:[],
            inspected_photoList:[],
            offer_photoList:[],
        }
    }

    componentWillMount() {
        getContactProperty_Vendor(this.props.token, this.props.contactInfo.data.id).then(data => {
            if(data.included){
                this.setState({
                    vendorList: data.included,
                    enquiredList: data.included,
                    inspectedList: data.included,
                    offerList: data.included,
                    isLoading: false
                })
            }
            else{
                this.setState({
                    vendorList: [],
                    enquiredList: [],
                    inspectedList: [],
                    offerList: [],
                    isLoading: false
                })
            }  
        })
    }

    onClickVendor(item) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_LISTINGS', data: item})
        dispatch(NavigationActions.navigate({routeName: 'listingsShow', params: {info: item}}))
    }

    capitalizeListingTypeTag(text){
        var res = text.split('_')
        var newRes = []
        for(var i = 0 ; i < res.length ; i++){
            newRes.push(res[i].charAt(0).toUpperCase() + res[i].slice(1))
        }
        return newRes.join(' ')
    }
    
    showProperty(){
        if((this.state.vendorList.length + this.state.enquiredList.length + this.state.inspectedList.length + this.state.offerList.length) > 0){
            return(
                <View style = {styles.propertyItemView}>
                    {
                        this.state.vendorList.length == 0 ? null :  <Label style = {styles.propertyItemTitle}>Vendor</Label>
                    }
                    {
                        this.state.vendorList.map((item, index) => {
                            var thumbniail_url = item.relationships.thumbnails.links.related
                            return(
                                <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                    <View style = {styles.view1} >
                                        {
                                            item.attributes.thumbnail? <Thumbnail square source = {{uri:item.attributes.thumbnail}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                        }
                                        
                                        <View style = {styles.rowSubView}>
                                            <Label style = {styles.label1}>{item.attributes.full_address}</Label>
                                            <View style = {styles.tagView}>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{this.capitalizeListingTypeTag(item.attributes.listing_type)}</Label>
                                                </View>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{this.capitalizeListingTypeTag(item.attributes.property_type)}</Label>
                                                </View>
                                            </View>
                                            <View style = {styles.line1}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
    
                    {
                        this.state.enquiredList.length == 0? null : <Label style = {styles.propertyItemTitle}>Enquired on</Label>
                    }                
                    {
                        this.state.enquiredList.map((item, index) => {
                            return(
                                <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                    <View style = {styles.view1} >
                                        {
                                            item.attributes.thumbnail? <Thumbnail square source = {{uri:item.attributes.thumbnail}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                        }
                                        <View style = {styles.rowSubView}>
                                            <Label style = {styles.label1}>{item.attributes.full_address}</Label>
                                            <View style = {styles.tagView}>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{item.attributes.listing_type}</Label>
                                                </View>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{item.attributes.property_type}</Label>
                                                </View>
                                            </View>
                                            <View style = {styles.line1}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                    {
                        this.state.inspectedList.length == 0? null : <Label style = {styles.propertyItemTitle}>Inspected</Label>
                    }
                    {
                        this.state.inspectedList.map((item, index) => {
                            return(
                                <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                    <View style = {styles.view1}>
                                        {
                                            item.attributes.thumbnail? <Thumbnail square source = {{uri:item.attributes.thumbnail}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                        }
                                        <View style = {styles.rowSubView}>
                                            <Label style = {styles.label1}>{item.attributes.full_address}</Label>
                                            <View style = {styles.tagView}>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{item.attributes.listing_type}</Label>
                                                </View>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{item.attributes.property_type}</Label>
                                                </View>
                                            </View>
                                            <View style = {styles.line1}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                    {
                        this.state.offerList.length == 0?  null : <Label style = {styles.propertyItemTitle}>Made Offer</Label>
                    }                
                    {
                        this.state.offerList.map((item, index) => {
                            return(
                                <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                    <View style = {styles.view1}>
                                        {
                                            item.attributes.thumbnail? <Thumbnail square source = {{uri:item.attributes.thumbnail}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                        }
                                        <View style = {styles.rowSubView}>
                                            <Label style = {styles.label1}>{item.attributes.full_address}</Label>
                                            <View style = {styles.tagView}>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{item.attributes.listing_type}</Label>
                                                </View>
                                                <View style = { styles.eachtag } >
                                                    <Label style = {styles.tagTxt}>{item.attributes.property_type}</Label>
                                                </View>
                                            </View>
                                            <View style = {styles.line1}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            )
        }
        else {
            return(
                <Label style = {styles.nomoretxt}>There's nothing here.</Label>
            )
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showProperty()
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        // contact_groups: state.contacts.contact_groups,
        contact_id: state.contacts.contact_id,
    }
}

export default connect(mapStateToProps)(ContactProperties)

