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
import Moment from 'react-moment';
import moment from 'moment'
import numeral from 'numeral'

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
    }

    renderRow(item, index) {
        return(
            <View style = {styles.categoryItem} key = {index}>
                <Label style = {styles.categoryItemTxt}>{item.job}</Label>
            </View>
        )
    }

    capitalizeListingTypeTag(text){
        var res = text.split('_')
        var newRes = []
        for(var i = 0 ; i < res.length ; i++){
            newRes.push(res[i].charAt(0).toUpperCase() + res[i].slice(1))
        }
        return newRes.join(' ')
    }

    showListing1() {
        return(
            <View style = {{flex:1}}>
                {
                    (this.props.listings_about.attributes.bedrooms == 0 || !this.props.listings_about.attributes.bedrooms) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Bedrooms</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.bedrooms}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                }
                {
                    (this.props.listings_about.attributes.bathrooms == 0 || !this.props.listings_about.attributes.bathrooms) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Bathrooms</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.bathrooms}</Label>
                        <View style = {styles.seperateLine}/>
                    </View> 
                }
                {
                    (this.props.listings_about.attributes.garage_spaces == 0 || !this.props.listings_about.attributes.garage_spaces) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Garage spaces</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.garage_spaces}</Label>
                        <View style = {styles.seperateLine}/>
                    </View> 
                }
                {
                    (this.props.listings_about.attributes.car_spaces == 0 || !this.props.listings_about.attributes.car_spaces) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Carport spaces</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.car_spaces}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                }
                {
                    (this.props.listings_about.attributes.open_car_spaces == 0 || !this.props.listings_about.attributes.open_car_spaces) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Open car spaces</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.open_car_spaces}</Label>
                        <View style = {styles.seperateLine}/>
                    </View> 
                }
                {
                    (this.props.listings_about.attributes.land_size == 0 || !this.props.listings_about.attributes.land_size) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Land size</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.land_size} {this.props.listings_about.attributes.land_size_units}</Label>
                        <View style = {styles.seperateLine}/>
                    </View> 
                }
            </View>
        )
    }

    showListing2() {
        return(
            <View>
                {
                    (this.props.listings_about.attributes.commercial_floor_area == 0 || !this.props.listings_about.attributes.commercial_floor_area) ? null :
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Floor area</Label>
                        <Label style = {styles.label2}>{this.props.listings_about.attributes.commercial_floor_area} {this.props.listings_about.attributes.commercial_floor_area_units}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                }
            </View>
        )
    }
    
    DecimalValue(value) {
        var units = null
        units = numeral(value).format('0,0')
        return units
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
                    </View>
                </View>

                <View style = {styles.categoryView}>
                    <View style = {styles.categoryItem}>
                        <Label style = {styles.categoryItemTxt}>{this.capitalizeListingTypeTag(this.props.listings_about.attributes.listing_type)}</Label>
                    </View>
                    <View style = {styles.categoryItem}>
                        <Label style = {styles.categoryItemTxt}>{this.capitalizeListingTypeTag(this.props.listings_about.attributes.property_type)}</Label>
                    </View>
                </View>
                
                <View style = {{backgroundColor: 'white'}}>
                    {
                        (this.props.listings_about.attributes.listing_type == 'residential_sale' || this.props.listings_about.attributes.listing_type == 'residential_rental' || this.props.listings_about.attributes.listing_type == 'rural') ?
                        this.showListing1() : this.showListing2()
                    }
                    {
                        this.props.listings_about.attributes.listing_type == 'commercial' ? 
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Floor area</Label>
                            <Label style = {styles.label2}>{this.props.listings_about.attributes.commercial_floor_area} {this.props.listings_about.attributes.commercial_floor_area_units}</Label>
                            <View style = {styles.seperateLine}/>
                        </View> : null
                    }
                    {
                        (this.props.listings_about.attributes.advertised_price == 0 || !this.props.listings_about.attributes.advertised_price) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Advertised Price</Label>
                            <Label style = {styles.label2}>{this.props.listings_about.attributes.advertised_price}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                    {
                        (this.props.listings_about.attributes.price == 0 || !this.props.listings_about.attributes.price) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Internal Price</Label>
                            <Label style = {styles.label2}>${this.DecimalValue(this.props.listings_about.attributes.price)}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                   
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

                <View style = {{backgroundColor: 'white', marginTop: 15, marginBottom: 5}}>
                    {
                        (this.props.listings_about.attributes.auction_datetime == 0 || !this.props.listings_about.attributes.auction_datetime) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Auction</Label>
                            <Label style = {styles.label2}>{moment(this.props.listings_about.attributes.auction_datetime).format('h:mma Do MMM')}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                    {
                        (this.props.listings_about.attributes.listing_expiry_date == 0 || !this.props.listings_about.attributes.listing_expiry_date) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Listing expiry date</Label>
                            <Label style = {styles.label2}>{moment(this.props.listings_about.attributes.listing_expiry_date).format('Do MMMM YYYY')}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                    {
                        (this.props.listings_about.attributes.key_number == 0 || !this.props.listings_about.attributes.key_number) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Key number</Label>
                            <Label style = {styles.label2}>{this.props.listings_about.attributes.key_number}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                    {
                        (this.props.listings_about.attributes.key_location == 0 || !this.props.listings_about.attributes.key_location) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Key location</Label>
                            <Label style = {styles.label2}>{this.props.listings_about.attributes.key_location}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                    {
                        (this.props.listings_about.attributes.alarm_code == 0 || !this.props.listings_about.attributes.alarm_code) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Alarm code</Label>
                            <Label style = {styles.label2}>{this.props.listings_about.attributes.alarm_code}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
                    {
                        (this.props.listings_about.attributes.internal_notes == 0 || !this.props.listings_about.attributes.internal_notes) ? null :
                        <View style = {styles.view1}>
                            <Label style = {styles.label1}>Internal notes</Label>
                            <Label style = {styles.label2}>{this.props.listings_about.attributes.internal_notes}</Label>
                            <View style = {styles.seperateLine}/>
                        </View>
                    }
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

