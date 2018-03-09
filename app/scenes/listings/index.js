import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Drawer
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import Search from 'react-native-search-box';
import { NavigationActions, Header } from 'react-navigation'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Font } from 'expo'

var listingsList = [
    {address_street:'50 Bay St', address_name: 'Double Bay',  avatar: images.france_small, job: 'Residential sale, House'},
    {address_street:'137 - 139 Sllverwater Road', address_name: 'Silverwater',avatar: images.barbados_small, job: 'Residential rental, Unit'},
]
class listings extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            searchText: '',
        }   
    }

    clickListing(item, index) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'listingsShow', params: {info: item}}))
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickListing(item, index)}>
                <View style = {styles.rowView}>
                    <Thumbnail square source = {item.avatar} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.address_street}, {item.address_name}</Label>
                        <Label style = {styles.label2}>{item.job}</Label>
                        
                    </View>
                    <Label style = {styles.saleTxt}>For Sale</Label>
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'menu' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { this.props.navigation.navigate('DrawerOpen') }} />
                    <Label style = {[styles.title, {fontFamily: 'open-sans-bold'}]}>Listings</Label>
                    <TouchableOpacity>
                        <Thumbnail square source = {images.ic_filter} style = {{width: 18, height: 18, marginRight: 15}} />
                    </TouchableOpacity>
                </View>
                <Content showsVerticalScrollIndicator = {false}>
                    <View style = {styles.searchBoxView}>
                        <Search
                            ref = 'search'
                            titleCancelColor = 'black'
                            backgroundColor = 'lightgray'
                            cancelTitle = 'Cancel'
                            contentWidth = {100}
                            searchIconCollapsedMargin = {30}
                            searchIconExpandedMargin = {10}
                            placeholderCollapsedMargin = {15}
                            placeholderExpandedMargin = {25}
                            onChangeText = {(text) => this.setState({searchText : text})}
                            onSearch = {() => this._onPressSearch()}
                        />
                    </View>
                    
                    {
                        listingsList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                    
                </Content>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(listings);