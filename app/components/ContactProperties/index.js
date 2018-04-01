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
        getContactProperty_Vendor(this.props.token, this.props.contact_groups.data.id).then(data => {
            // getContractProperty_Enquired(this.props.token, this.props.contact_groups.data.id).then(data1 => {
                console.log('*')
                console.log(data)
                // this.setState({
                //     vendorList: data.included,
                //     enquiredList: data.included,
                //     inspectedList: data.included,
                //     offerList: data.included,
                //     isLoading: false
                // })
                for(var i = 0 ; i < data.included.length ; i++) {
                    console.log(data.included[i].relationships.thumbnails.links.related)
                    getThumbnailUrl(this.props.token, data.included[i].relationships.thumbnails.links.related).then((photoData) => {
                        this.setState({
                            vendorList: data.included,
                            enquiredList: data.included,
                            inspectedList: data.included,
                            offerList: data.included,
                            isLoading: false,
                            vendor_photoList: photoData.data
                        })
                    })
                }
            // })
        })
        
    }

    onClickVendor(item) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_LISTINGS', data: item})
        dispatch(NavigationActions.navigate({routeName: 'listingsShow', params: {info: item}}))
    }
    
    showProperty(){
        return(
            <View style = {styles.propertyItemView}>
                <Label style = {styles.propertyItemTitle}>Vendor</Label>
                {
                    this.state.vendorList.map((item, index) => {
                        var thumbniail_url = item.relationships.thumbnails.links.related
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                <View style = {styles.view1} >
                                    <Thumbnail square source = {{uri:this.state.vendor_photoList[index].attributes.url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
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
 
                <Label style = {styles.propertyItemTitle}>Enquired on</Label>
                {
                    this.state.enquiredList.map((item, index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                <View style = {styles.view1} >
                                    <Thumbnail square source = {{uri:this.state.vendor_photoList[index].attributes.url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
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

                <Label style = {styles.propertyItemTitle}>Inspected</Label>
                {
                    this.state.inspectedList.map((item, index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                <View style = {styles.view1}>
                                    <Thumbnail square source = {{uri:this.state.vendor_photoList[index].attributes.url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
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

                <Label style = {styles.propertyItemTitle}>Made Offer</Label>
                {
                    this.state.offerList.map((item, index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onClickVendor(item)}>
                                <View style = {styles.view1}>
                                    <Thumbnail square source = {{uri:this.state.vendor_photoList[index].attributes.url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
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

    render() {
        return (
            <View style = {styles.container}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showProperty()
                }
            </View>
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

export default connect(mapStateToProps)(ContactProperties)

