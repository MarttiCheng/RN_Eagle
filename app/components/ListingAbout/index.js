//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { getListingsVendors } from '../../actions'

// create a component
class ListingAbout extends Component {
    constructor(props){
        super(props)
        this.state = {
            vendors: [],
            postCode: 0,
            region: '',
        }
    }

    componentWillMount() {
        getListingsVendors(this.props.token, this.props.listings_about.id).then(data => {
            this.setState({ vendors: data.data })
        })
        this.fetchPostCode()
    }

    async fetchPostCode(){
        let response = await fetch('https://api.postcodes.io/random/postcodes');
        let responseJson = await response.json();
        // console.log(responseJson['result']['postcode'])
    }

    renderRow(item, index) {
        return(
            <View style = {styles.categoryItem} key = {index}>
                <Label style = {styles.categoryItemTxt}>{item.job}</Label>
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View>
                    {
                        this.props.listings_about.attributes.thumbnail?<Thumbnail square source = {{uri:this.props.listings_about.attributes.thumbnail }} style = {styles.homeImg} defaultSource = {images.placeholderImage}/> :
                        <Thumbnail square style = {styles.homeImg} source = {images.placeholderImage}/>
                    }
                    <View style = {styles.detailView}>
                        <Label style = {styles.streetTxt}>{this.props.listings_about.attributes.formatted_address_line_1}</Label>
                        <Label style = {styles.streetNameTxt}>{this.props.listings_about.attributes.street}</Label>
                        <View style = {styles.roomdetailView}>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Thumbnail square source = {images.ic_bed} style = {styles.iconImg}/>
                                {
                                    (this.props.listings_about.attributes.bedrooms == 0 || !this.props.listings_about.attributes.bedrooms) ?
                                    <Label style = {styles.streetTxt}>0</Label> : 
                                    <Label style = {styles.streetTxt}>{this.props.listings_about.attributes.bedrooms}</Label>
                                }
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Thumbnail square source = {images.ic_bath} style = {styles.iconImg}/>
                                {
                                    (this.props.listings_about.attributes.bathrooms == 0 || !this.props.listings_about.attributes.bathrooms) ?
                                    <Label style = {styles.streetTxt}>0</Label> :
                                    <Label style = {styles.streetTxt}>{this.props.listings_about.attributes.bathrooms}</Label>
                                }
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Thumbnail square source = {images.ic_car} style = {styles.iconImg}/>
                                {
                                    (this.props.listings_about.attributes.carport_spaces == 0 || !this.props.listings_about.attributes.carport_spaces) ?
                                    <Label style = {styles.streetTxt}>0</Label> : 
                                    <Label style = {styles.streetTxt}>{this.props.listings_about.attributes.carport_spaces}</Label>

                                }
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Thumbnail square source = {images.ic_expand} style = {styles.iconImg}/>
                                {
                                    (this.props.listings_about.attributes.land_size == 0 || !this.props.listings_about.attributes.land_size) ?
                                    <Label style = {styles.streetTxt}>0m2</Label> :
                                    <Label style = {styles.streetTxt}>{this.props.listings_about.attributes.land_size}m2</Label>
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View style = {styles.categoryView}>
                    <View style = {styles.categoryItem}>
                        <Label style = {styles.categoryItemTxt}>{this.props.listings_about.attributes.listing_type}</Label>
                    </View>
                    <View style = {styles.categoryItem}>
                        <Label style = {styles.categoryItemTxt}>{this.props.listings_about.attributes.property_type}</Label>
                    </View>
                </View>
                
                <View style = {{backgroundColor: 'white'}}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Advertised Price</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.advertised_price}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Internal Price</Label>
                        <Label style = {styles.label2}>${this.props.listings_about.attributes.price}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>
                
                {
                    this.state.vendors.length == 0? null :
                    <View >
                        <Label style = {styles.propertyItemTitle}>Vendor/s</Label>
                        {
                            this.state.vendors.map((item, index) => [
                                <View style = {styles.view2}>
                                    {
                                        item.attributes.photo_url? <Thumbnail square source = {item.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg} />
                                    }
                                    
                                    <View style = {styles.rowSubView}>
                                        <Label style = {{color:'black', fontSize: 16, fontFamily: 'open-sans-regular'}}>{item.attributes.first_name} {item.attributes.last_name}</Label>
                                        <View style = {styles.venderCategoryView}>
                                            <Label style = {styles.venderSubtitle}>Vendor</Label>
                                        </View>
                                    </View>
                                </View>
                            ])
                        }
                    </View>
                }

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.full_address}</Label>
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
        listings_about: state.listings.listings
    }
}

export default connect(mapStateToProps)(ListingAbout)

