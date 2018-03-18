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
import { getAllContacts } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

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
            isLoading: true,
            searchText: '',
            contactsList: [],
        }   
    }

    componentWillMount() {
        
        this.getAllContacts()
    }

    getAllContacts(){
         getAllContacts(this.props.token).then(data => {
            this.setState({
                contactsList: data.data,
                isLoading: false,
            })
            
        })
    }

    clickContact(item, index) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {info: item}}))
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickContact(item.attributes, index)}>
                <View style = {styles.rowView}>
                    <Thumbnail square source = {item.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.first_name} {item.attributes.last_name}</Label>
                        <View style = {styles.tagView}>
                            <View style = {item.attributes.suburb? styles.eachtag : null}>
                                <Label style = {styles.tagTxt}>{item.attributes.suburb}</Label>
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
                        this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> :
                        this.state.contactsList.map((item, index) => {
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

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token
    }
}

//make this component available to the app
export default connect(mapStateToProps)(contacts);