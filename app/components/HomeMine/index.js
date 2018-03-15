//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'

var categoryList = [
    {job: 'Buyer'},
    {job: 'Property alerts'},
]

// create a component
class HomeMine extends Component {
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

    onClickHome() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'homeShow'}))
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>10th March</Label>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>10am - 10:30am</Label>
                            <Label style = {styles.label2}>50 Bay St, Double Bay</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                    <View style = {styles.line1}/>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>11am - 11:30am</Label>
                            <Label style = {styles.label2}>123 Silverdale St, Silverydale</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                </View>

                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>12th March</Label>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>10am - 10:30am</Label>
                            <Label style = {styles.label2}>50 Bay St, Double Bay</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                    <View style = {styles.line1}/>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>11am - 11:30am</Label>
                            <Label style = {styles.label2}>123 Silverdale St, Silverydale</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                </View>

            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

export default connect()(HomeMine)

