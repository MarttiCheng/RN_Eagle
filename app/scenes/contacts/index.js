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

var contactsList = [
    {name:'Luke PaverdLuke', avatar: images.avatar_john, job: 'Director at Eagle Software'},
    {name:'Sally Smith', avatar: images.avatar_female, job: 'Buyer, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Freelancer, Vendor'},
    {name:'Alex Saburo', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'James Max', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'Viktoriya Moroz', avatar: images.avatar_female, job: 'Looking to rent, Vendor'},
    {name:'Bozhena Zvarych', avatar: images.avatar_female, job: 'Looking to rent, Vendor'},
    {name:'Zhenshu Ding', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'Olga Kryvolap', avatar: images.avatar_female, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'Tom Chedd', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'Anna Potekhina', avatar: images.avatar_female, job: 'Looking to rent, Vendor'},
]
class contacts extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            dataSource: ds.cloneWithRowsAndSections(contactsList),
            searchText: '',
        }   
    }

    clickContact(item, index) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {info: item}}))
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickContact(item, index)}>
                <View style = {styles.rowView}>
                    <Thumbnail square source = {item.avatar} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.name}</Label>
                        <View style = {styles.tagView}>
                            <View style = {styles.eachtag}>
                                <Label style = {styles.tagTxt}>Buyer</Label>
                            </View>
                            <View style = {styles.eachtag}>
                                <Label style = {styles.tagTxt}>Property Alerts</Label>
                            </View>
                        </View>
                        
                        <View style = {styles.line}/>
                    </View>
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
                    <Label style = {[styles.title, {fontFamily: 'open-sans-bold'}]}>Contacts</Label>
                    <TouchableOpacity style = {styles.searchButton} onPress = {this._onSearch}>
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
                        contactsList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                </Content>
                <TouchableOpacity style = {styles.addBtn}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(contacts);