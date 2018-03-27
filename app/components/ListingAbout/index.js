//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'

var categoryList = [
    {job: 'Residential sale'},
    {job: 'House'},
    {job: 'Active'},
]

// create a component
class ListingAbout extends Component {
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
        console.log('-->', this.props.listings_about)
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View>
                    <Thumbnail square source = {images.listing_home} style = {styles.homeImg}/>
                    <View style = {styles.detailView}>
                        <Label style = {styles.streetTxt}>{this.props.listings_about.attributes.street}</Label>
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

                {/*<View style = {styles.categoryView}>
                    {
                        categoryList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                </View>*/}

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
                        <Label style = {styles.label2}>$600,000 - $660,000</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Internal Price</Label>
                        <Label style = {styles.label2}>$600,000</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <Label style = {styles.label2}>03 5254 6565</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View >
                    <Label style = {styles.propertyItemTitle}>Vendor/s</Label>
                    <View style = {styles.view2}>
                        <Thumbnail square source = {images.avatar_female} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {{color:'black', fontSize: 16, fontFamily: 'open-sans-regular'}}>Sally Sample</Label>
                            <View style = {styles.venderCategoryView}>
                                <Label style = {styles.venderSubtitle}>Vendor</Label>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view2}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {{color:'black', fontSize: 16, fontFamily: 'open-sans-regular'}}>John Sample</Label>
                            <View style = {styles.venderCategoryView}>
                                <Label style = {styles.venderSubtitle}>Vendor</Label>
                            </View>
                        </View>
                    </View>
                </View>

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <Label style = {styles.label2}>lukevdp@gmail.com</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <Label style = {styles.label2}>123 Fake St{'\n'}Shepparton, VIC 3630</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <Label style = {styles.label2}>Is an active investor looking for investment properties that yield over 5%</Label>
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

