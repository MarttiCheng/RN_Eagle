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
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class ContactProperties extends Component {
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
        return (
            <View style = {styles.container}>
                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>Vendor</Label>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>50 Bay St, Double Bay</Label>
                            <Label style = {styles.label2}>Residential sale, House</Label>
                        </View>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>137 - 139 Silverwater Road, Silverwater</Label>
                            <Label style = {styles.label2}>Residential rental, Unit</Label>
                        </View>
                    </View>
                </View>

                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>Vendor</Label>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>50 Bay St, Double Bay</Label>
                            <Label style = {styles.label2}>Residential sale, House</Label>
                        </View>
                        <View style = {styles.favoriteView}>
                            <Label style = {styles.favoriteDate}>21 Feb</Label>
                            <Thumbnail square source = {images.favorite_up} style = {styles.favoriteImg}/>
                        </View>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>137 - 139 Silverwater Road, Silverwater</Label>
                            <Label style = {styles.label2}>Residential rental, Unit</Label>
                        </View>
                        <View style = {styles.favoriteView}>
                            <Label style = {styles.favoriteDate}>20 Feb</Label>
                            <Thumbnail square source = {images.favorite_down} style = {styles.favoriteImg}/>
                        </View>
                    </View>
                </View>

                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>Inspected</Label>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>50 Bay St, Double Bay</Label>
                            <Label style = {styles.label2}>Residential sale, House</Label>
                        </View>
                        <View style = {styles.favoriteView}>
                            <Label style = {styles.favoriteDate}>26 Feb</Label>
                            <Thumbnail square source = {images.favorite_up} style = {styles.favoriteImg}/>
                        </View>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>137 - 139 Silverwater Road, Silverwater</Label>
                            <Label style = {styles.label2}>Residential rental, Unit</Label>
                        </View>
                        <View style = {styles.favoriteView}>
                            <Label style = {styles.favoriteDate}>26 Feb</Label>
                            <Thumbnail square source = {images.favorite_medium} style = {styles.favoriteImg}/>
                        </View>
                    </View>
                </View>

                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>Made Offer</Label>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>50 Bay St, Double Bay</Label>
                            <Label style = {styles.label2}>$650,000</Label>
                        </View>
                    </View>
                    <View style = {styles.line1}/>
                    <View style = {styles.view1}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>137 - 139 Silverwater Road, Silverwater</Label>
                            <Label style = {styles.label2}>$630,000</Label>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(ContactProperties)

