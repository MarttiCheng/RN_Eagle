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
            search_contactsList: [],
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
                    for(var i = 0; i < idList.length; i++){
                        data1[i]['Relationships'] = data2[i]
                    }
                    this.setState({
                        contactsList: data1,
                        search_contactsList: data1,
                        isLoading: false,
                    })
                })
            })
        })
    }

    filterStates = (value) => {
        if(value){
            this.setState({
                search_contactsList: this.state.contactsList.filter(item => (item.data.attributes.first_name + item.data.attributes.last_name).toLowerCase().includes(value.toLowerCase())),
            })
        }
        else {
            this.setState({
                search_contactsList: this.state.contactsList,
            })
        }
    }

    clickItemContact(item, index) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_CONTACTS_GROUP', data: item})
        dispatch ({ type: 'GET_CONTACTS_RELATIONSHIP', data: this.state.contactsList[index].Relationships})
        dispatch(NavigationActions.navigate({routeName: 'contactsShow'}))
    }
    
    showContactGroups(index){
        if(this.state.search_contactsList[index].included){
            return(
                this.state.search_contactsList[index].included.map((item1, index1) => {
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
            <TouchableOpacity key = {index} onPress = {() => this.clickItemContact( this.state.search_contactsList[index], index)}>
                <View style = {styles.rowView}>
                    {
                        item.data.attributes.photo_url?<Thumbnail square source = {item.data.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                    }
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.data.attributes.first_name} {item.data.attributes.last_name}</Label>
                        <View style = {styles.tagView}>
                            {
                                this.showContactGroups(index) 
                            }
                        </View>
                    </View>
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }

    onCancel = () => {
        this.setState({
            search_contactsList: this.state.contactsList
        })
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
                            onChangeText={this.filterStates}
                            onCancel = {this.onCancel}
                        />
                    </View>
                    
                    {
                        this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> :
                        this.state.search_contactsList.map((item, index) => {
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