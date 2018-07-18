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
import { NavigationActions } from 'react-navigation'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Font } from 'expo'
import { getAllContacts, getMyContacts, getMyContacts1, getContactGroups, listContactGroups, getUser, searchContacts, getContactGroup } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import {Select, Option} from "react-native-chooser";

var subAllGroupList = [{
            "attributes": {
                "created_at": "2017-11-22T14:58:46.961+11:00",
                "name": "All Groups",
            },
            "id": "-1",
            "links": {
                "self": "https://lnstaging.herokuapp.com/api/v2/contact-groups/12",
            },
            "relationships": {
                "account": {
                    "links": {
                        "related": "https://lnstaging.herokuapp.com/api/v2/contact-groups/12/account",
                        "self": "https://lnstaging.herokuapp.com/api/v2/contact-groups/12/relationships/account",
                    },
                },
                "contacts": {
                    "links": {
                        "related": "https://lnstaging.herokuapp.com/api/v2/contact-groups/12/contacts",
                        "self": "https://lnstaging.herokuapp.com/api/v2/contact-groups/12/relationships/contacts",
                    },
                },
            },
            "type": "contact_groups",
            }
        ]
        
class contacts extends Component<{}>{
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
            email: '',
            password: '',
            isLoading: true,
            searchText: '',
            contactsList: [],
            y1: new Animated.Value((Platform.OS == 'ios')? -40: -28),
            scale1: new Animated.Value(0.001),
            display: 'All contacts',
            group: 'All Groups',
            groupList: [],
            groupID: '',
            userID: '',
            userName: '',
            userEmail: '',
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

    _onRefresh() {
        var { dispatch } = this.props;
        var idList = []

        if (this.state.refreshing) {
            return;
        }

        this.setState({refreshing: true, page: 0});
        getAllContacts(this.props.token, 0).then(data => {
            if(!data) {
                return;
            }
            for(var i = 0; i < data.data.length; i++){
                idList.push(data.data[i].id)
            }
            getContactGroups(this.props.token, idList).then(data1 => {
                listContactGroups(this.props.token).then(groupList => {
                    getUser(this.props.token, this.props.userID).then(userData => {
                        dispatch ({ type: 'GET_DEFAULT_CONTACTGROUP_LIST', data: groupList.data})
                        dispatch ({ type: 'USER_INFO', data: userData.data.attributes})
                        subAllGroupList.concat(groupList.data)
                        for(var i = 0 ; i < groupList.data.length ; i++){
                            subAllGroupList.push(groupList.data[i])
                        }

                        var real_data;
                        if (this.state.refreshing) {
                            real_data = data1;
                        } else {
                            real_data = [...this.state.data, ...data1];
                        }
                        this.setState({
                            contactsList: real_data,
                            isLoading: false,
                            groupList: subAllGroupList,
                            userID: userData.data.id,
                            page: this.state.page + 1,
                            dataSource: this.state.dataSource.cloneWithRows(real_data),
                            data: real_data,
                            fetching: false,
                            refreshing: false,
                            searchText: ''
                        })
                    })
                })
            })
        })
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
                listContactGroups(this.props.token).then(groupList => {
                    getUser(this.props.token, this.props.userID).then(userData => {
                        dispatch ({ type: 'GET_DEFAULT_CONTACTGROUP_LIST', data: groupList.data})
                        dispatch ({ type: 'USER_INFO', data: userData.data.attributes})
                        subAllGroupList.concat(groupList.data)
                        for(var i = 0 ; i < groupList.data.length ; i++){
                            subAllGroupList.push(groupList.data[i])
                        }
                        var real_data;
                        if (this.state.refreshing) {
                            real_data = data1;
                        } else {
                            real_data = [...this.state.data, ...data1];
                        }
                        this.setState({
                            contactsList: real_data,
                            isLoading: false,
                            groupList: subAllGroupList,
                            userID: userData.data.id,
                            page: page + 1,
                            dataSource: this.state.dataSource.cloneWithRows(real_data),
                            data: real_data,
                            fetching: false,
                            searchText: ''
                        })
                    })
                })
            })
        })
    }

    getMyContacts(){
        var { dispatch } = this.props;
        var idList = []
        
        this.setState({ isLoading: true })

        if(this.state.group == 'All Groups' && this.state.display == 'All contacts') {
            getAllContacts(this.props.token, 0).then(data => {
                for(var i = 0; i < data.data.length; i++){
                    idList.push(data.data[i].id)
                }
                getContactGroups(this.props.token, idList).then(data1 => {
                    listContactGroups(this.props.token).then(groupList => {
                        dispatch ({ type: 'GET_DEFAULT_CONTACTGROUP_LIST', data: groupList.data})
                        subAllGroupList.concat(groupList.data)
                        for(var i = 0 ; i < groupList.data.length ; i++){
                            subAllGroupList.push(groupList.data[i])
                        }
                        this.setState({
                            contactsList: data1,
                            isLoading: false,
                            groupList: subAllGroupList,
                            dataSource: this.state.dataSource.cloneWithRows(data1),
                            searchText: ''
                        })
                    })
                })
            })
        }
        else if(this.state.group == 'All Groups' && this.state.display == 'My contacts') {
            getMyContacts1(this.props.token, this.props.userID).then(data => {
                for(var i = 0; i < data.data.length; i++){
                    idList.push(data.data[i].id)
                }
                getContactGroups(this.props.token, idList).then(data1 => {
                    listContactGroups(this.props.token).then(groupList => {
                        dispatch ({ type: 'GET_DEFAULT_CONTACTGROUP_LIST', data: groupList.data})
                        subAllGroupList.concat(groupList.data)
                        for(var i = 0 ; i < groupList.data.length ; i++){
                            subAllGroupList.push(groupList.data[i])
                        }
                        this.setState({
                            contactsList: data1,
                            isLoading: false,
                            groupList: subAllGroupList,
                            dataSource: this.state.dataSource.cloneWithRows(data1),
                            searchText: ' '
                        })
                    })
                })
            }) 
        }
        else if(this.state.group != 'All Groups' && this.state.display == 'All contacts') {
            getMyContacts(this.props.token, this.props.userID, this.state.groupID).then(data => {
                for(var i = 0; i < data.data.length; i++){
                    idList.push(data.data[i].id)
                }
                getContactGroups(this.props.token, idList).then(data1 => {
                    dispatch ({ type: 'GET_CONTACTS_ALL', data: this.state.contactsList})
                    listContactGroups(this.props.token).then(groupList => {
                        dispatch ({ type: 'GET_DEFAULT_CONTACTGROUP_LIST', data: groupList.data})
                        subAllGroupList.concat(groupList.data)
                        for(var i = 0 ; i < groupList.data.length ; i++){
                            subAllGroupList.push(groupList.data[i])
                        }
                        this.setState({
                            contactsList: data1,
                            isLoading: false,
                            groupList: subAllGroupList,
                            dataSource: this.state.dataSource.cloneWithRows(data1),
                            searchText: ' '
                        })
                    })
                })
            })
        }
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
        dispatch ({ type: 'GET_CONTACTS_ALL', data: this.state.contactsList})
        dispatch ({ type: 'GET_CONTACT_ID', data: item.data.id})
        dispatch ({ type: 'GET_CONTACT_NAME', data: item.data.attributes.first_name + ' ' + item.data.attributes.last_name})
        
        Animated.parallel([
            Animated.timing(                  
                this.state.y1,            
                {
                    toValue: (Platform.OS == 'ios')? -40: -28,       
                    duration: 500,
                },
            ),
            Animated.timing( 
                this.state.scale1,
                {
                    toValue: 0.001,
                    duration: 500
                }
            )
        ]).start();

        this.setState({ 
            display: 'All contacts',
            group: 'All Groups'
        })
        dispatch(NavigationActions.navigate({routeName: 'contactsShow', params: {name: item.data.attributes.first_name + ' ' + item.data.attributes.last_name}}))
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
                        {
                            item.data.attributes.mobile_phone? <Label style = {styles.label2}>{item.data.attributes.mobile_phone}</Label> : null
                        }
                        {
                            item.data.attributes.email? <Label style = {styles.label2}>{item.data.attributes.email}</Label> : null
                        }
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

    onFilter() {
        Animated.parallel([
            Animated.timing(                  
                this.state.y1,            
                {
                    toValue: (Platform.OS == 'ios')? 64: 76,                    
                    duration: 500,              
                },
            ),
            Animated.timing( 
                this.state.scale1,
                {
                    toValue: 1,
                    duration: 500
                }
            )
        ]).start()
    }

    onClearFilter() {
        Animated.parallel([
            Animated.timing(                  
                this.state.y1,            
                {
                    toValue: (Platform.OS == 'ios')? -40: -28,       
                    duration: 500,              
                },
            ),
            Animated.timing( 
                this.state.scale1,
                {
                    toValue: 0.001,
                    duration: 500
                }
            )
        ]).start();

        this.setState({ 
            isAllContacts: false,
            isMyContacts: false,
            display: 'All contacts',
            group: 'All Groups'
        })
    }

    onSaveFilter() {
        Animated.parallel([
            Animated.timing(                  
                this.state.y1,            
                {
                    toValue: (Platform.OS == 'ios')? -40: -28,       
                    duration: 500,              
                },
            ),
            Animated.timing( 
                this.state.scale1,
                {
                    toValue: 0.001,
                    duration: 500
                }
            )
        ]).start();

        this.getMyContacts();
    }

    addNewContrat(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'addContact'})) 
    }

    onSelectDisplay(value, label) {
        this.setState({ 
            display : value 
        });
    }

    onSelectGroup(value, label) {
        this.setState({ 
            group: value.name,
            groupID: value.id
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
                    <TouchableOpacity onPress = {() => this.onFilter()}>
                        <Thumbnail square source = {images.ic_filter} style = {{width: 18, height: 18, marginRight: 15}} />
                    </TouchableOpacity>
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
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        />
                }

                <TouchableOpacity style = {styles.addBtn} onPress = {() => this.addNewContrat()}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>

                <Animated.View style={[styles.filterView, {transform: [ {translateY: this.state.y1},{scaleY: this.state.scale1}]}]}>
                    <Text style = {styles.displayTxt}>Display</Text>
                    <View style = {styles.dropView1}>
                        <Thumbnail square source = {images.ic_arrowdown} style = {styles.arrowImg}/>
                        <Select
                            onSelect = {this.onSelectDisplay.bind(this)}
                            defaultText  = {this.state.display}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList}
                        >
                            <Option value = "All contacts" styleText = {styles.optiontxt}>All contacts</Option>
                            <Option value = "My contacts" styleText = {styles.optiontxt}>My contacts</Option>
                        </Select>
                    </View>
                    
                    <Text style = {styles.groupTxt}>Group</Text>
                    <View style = {styles.dropView1}>
                        <Thumbnail square source = {images.ic_arrowdown} style = {styles.arrowImg}/>
                        <Select
                            onSelect = {this.onSelectGroup.bind(this)}
                            defaultText  = {this.state.group}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList1}
                        >   
                            {
                                this.state.groupList.map((item, index) => {
                                    return(
                                        <Option key = {index} value = {{name:item.attributes.name, id: item.id}} styleText = {styles.optiontxt} key = {index}>{item.attributes.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </View>

                    <View style = {styles.filterButtonsView}>
                        <Button transparent style = {styles.clearBtn} onPress = {() => this.onClearFilter()}>
                            <Text style = {styles.clearTxt}>CANCEL</Text>
                        </Button>
                        <Button transparent style = {styles.saveBtn} onPress = {() => this.onSaveFilter()}>
                            <Text style = {styles.clearTxt}>SAVE FILTER</Text>
                        </Button>
                    </View>
                </Animated.View>
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
export default connect(mapStateToProps)(contacts);