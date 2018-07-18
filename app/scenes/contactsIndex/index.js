import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Drawer
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Animated, Platform, RefreshControl
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import Search from 'react-native-search-box';
import { NavigationActions, Header } from 'react-navigation'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Font } from 'expo'
import { getAllContacts, getMyContacts,getMyContacts1, getContactGroups, getContactRelationships, searchContacts } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

class contactsIndex extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            isLoading: true,
            searchText: '',
            contactsList: [],
            page: 0,
            dataSource: ds,
            data: [],
            fetching: false,
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getAllContacts(this.state.page)
    }

    getAllContacts(page){
        var { dispatch } = this.props;
        var idList = []
        
        if (this.state.fetching) {
            return;
        }

        this.setState({
            fetching: true
        });
        getAllContacts(this.props.token, page).then(data => {
            for(var i = 0; i < data.data.length; i++){
                idList.push(data.data[i].id)
            }
            getContactGroups(this.props.token, idList).then(data1 => {
                var real_data;
                if (this.state.refreshing) {
                    real_data = data1;
                } else {
                    real_data = [...this.state.data, ...data1];
                }
                this.setState({
                    contactsList: real_data,
                    isLoading: false,
                    page: page + 1,
                    dataSource: this.state.dataSource.cloneWithRows(real_data),
                    data: real_data,
                    fetching: false,
                    searchText: ''
                })
            })
        })
    }


    filterStates = (text) => {
        var idList = []
        this.setState({ searchText: text })
        if(text){
            searchContacts(this.props.token, text).then(data => {
                
                for(var i = 0; i < data.data.length; i++){
                    idList.push(data.data[i].id)
                }
                getContactGroups(this.props.token, idList).then(data1 => {
                    this.setState({ 
                        contactsList: data1,
                        dataSource: this.state.dataSource.cloneWithRows(data1),
                    })
                })
            })
        }
        else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.contactsList),
            })
        }
    }

    clickItemContact(item, index) {
        var { dispatch } = this.props;
        dispatch ({ type: 'SELECTED_CONTACT_FOR_TASK', data: item.data})
        
        Keyboard.dismiss(); 
        this.props.navigation.goBack(); 
    }
    
    showContactGroups(index){
        if(this.state.contactsList[index].included){
            return(
                this.state.contactsList[index].included.map((item1, index1) => {
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
            <TouchableOpacity key = {index} onPress = {() => this.clickItemContact( this.state.contactsList[index], index)}>
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
            searchText: '',
            dataSource: this.state.dataSource.cloneWithRows(this.state.contactsList)
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
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack();  }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <Label style = {styles.title}>Contacts</Label>
                    <View style = {styles.blankView} />
                </View>
                <View style = {styles.searchBoxView}>
                    <Search
                        ref = 'search'
                        titleCancelColor = 'black'
                        backgroundColor = 'lightgray'
                        
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
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 0, marginBottom: 200}}/> :
                    this.state.searchText ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow = {(rowData,sectionID, rowID) => this.renderRow(rowData, rowID)}
                            enableEmptySections
                        /> :
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow = {(rowData,sectionID, rowID) => this.renderRow(rowData, rowID)}
                            onEndReached={() => this.getAllContacts(this.state.page)}
                            enableEmptySections
                        />
                }

            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        contacts: state.contacts.contacts,
        userID: state.user.user_id,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(contactsIndex);