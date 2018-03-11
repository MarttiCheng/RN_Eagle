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
        return (
            <Content style = {styles.container}>
                <View style = {styles.categoryView}>
                    {
                        categoryList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                </View>
                <View style = {{backgroundColor: 'white'}}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <Label style = {styles.label2}>0412 345 678</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Business Hours</Label>
                        <Label style = {styles.label2}>03 9025 5825</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <Label style = {styles.label2}>03 5254 6565</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
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
                <View style = {styles.view2}>
                    <Thumbnail square source = {images.avatar_female} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label3}>Sally Sample</Label>
                        <Label style = {styles.label1}>spouse</Label>
                        <View style = {styles.line}/>
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
                        <Label style = {styles.label2}>Jan 25th 2017 9:17am</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <Label style = {styles.label2}>Jan 25th 2017 9:17am</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to bulk communications</Label>
                        <Label style = {styles.label2}>Yes</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed to SMS</Label>
                        <Label style = {styles.label2}>Yes</Label>
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

