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
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'

var contactsList = [
    {name:'John Sample', avatar: images.avatar_john, job: 'Director at Eagle Software'},
    {name:'Sally Smith', avatar: images.avatar_female, job: 'Buyer, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Freelancer, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
    {name:'John Sample', avatar: images.avatar_male, job: 'Looking to rent, Vendor'},
]
class contacts extends Component<{}>{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title:  'Contacts',
        headerStyle: {
            backgroundColor: '#2B3643'
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        headerLeft: <MaterialCommunityIcons name = 'menu' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { navigation.navigate('DrawerOpen') }} />,
        headerRight: <Thumbnail square source = {images.ic_filter} style = {{width: 18, height: 18, marginRight: 15}}
                                onPress={ () => { navigation.navigate('Settings') }} />,
    });

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
                        <Label style = {styles.label2}>{item.job}</Label>
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
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(contacts);