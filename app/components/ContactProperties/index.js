//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { BallIndicator } from 'react-native-indicators'
import { getContactProperty_Vendor, getContractProperty_Enquired } from '../../actions'

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
        }
    }

    componentWillMount() {
        console.log('propety id ->',this.props.contact_groups.data.id)
        getContactProperty_Vendor(this.props.token, this.props.contact_groups.data.id).then(data => {
            getContractProperty_Enquired(this.props.token, this.props.contact_groups.data.id).then(data1 => {
                console.log('*')
                console.log(data)
                this.setState({
                    vendorList: data.included,
                    enquiredList: data1.included,
                    inspectedList: data1.included,
                    offerList: data1.included,
                    isLoading: false
                })
            })
        })
        
    }

    showProperty(){
        return(
            <View style = {styles.propertyItemView}>
                <Label style = {styles.propertyItemTitle}>Vendor</Label>
                {
                    this.state.vendorList.map((item, index) => {
                        return(
                            <View style = {styles.view1} key = {index}>
                                <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
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
                        )
                    })
                }
 
                <Label style = {styles.propertyItemTitle}>Enquired on</Label>
                {
                    this.state.enquiredList.map((item, index) => {
                        return(
                            <View style = {styles.view1} key = {index}>
                                <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
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
                        )
                    })
                }

                <Label style = {styles.propertyItemTitle}>Inspected</Label>
                {
                    this.state.inspectedList.map((item, index) => {
                        return(
                            <View style = {styles.view1} key = {index}>
                                <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
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
                        )
                    })
                }

                <Label style = {styles.propertyItemTitle}>Made Offer</Label>
                {
                    this.state.offerList.map((item, index) => {
                        return(
                            <View style = {styles.view1} key = {index}>
                                <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
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
                        )
                    })
                }
            </View>
        )
    }

    render() {
        var params = this.props.navigation.state.params
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

