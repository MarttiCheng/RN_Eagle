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
import { getAllContacts, getContactGroups, getContactRelationships } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

class contacts extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            isLoading: true,
            searchText: '',
            contactsList: [],
            contactGroups: [],
            contactRelationships: [],
        }   
    }

    componentWillMount() {
        this.getAllContacts()
    }

    getAllContacts(){
        var idList = []

        getAllContacts(this.props.token).then(data => {
            for(var i = 0; i < data.data.length; i++){
                idList.push(data.data[i].id)
            }
            getContactGroups(this.props.token, idList).then(data1 => {
                getContactRelationships(this.props.token, idList).then(data2 => {
                    this.setState({
                        contactsList: data.data,
                        contactGroups: data1,
                        contactRelationships: data2,
                        isLoading: false,
                    })
                })
            })
        })
    }

    clickItemContact(item, index) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACTS_GROUP', data: item})
        dispatch ({ type: 'GET_CONTACTS_RELATIONSHIP', data: this.state.contactRelationships[index]})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow'}))
    }
    
    showContactGroups(index){
        if(this.state.contactGroups[index].included){
            return(
                this.state.contactGroups[index].included.map((item1, index1) => {
                    return(
                        <View style = { styles.eachtag } key = {index1}>
                            <Label style = {styles.tagTxt}>{item1.attributes.name}</Label>
                        </View>
                    )
                })
            )
        }
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickItemContact( this.state.contactGroups[index], index)}>
                <View style = {styles.rowView}>
                    <Thumbnail square source = {item.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.first_name} {item.attributes.last_name}</Label>
                        <View style = {styles.tagView}>
                            {
                                this.showContactGroups(index) 
                            }
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
                    <Label style = {styles.title}>Contacts</Label>
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
                        this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> :
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