import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Drawer
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Animated
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import Search from 'react-native-search-box';
import { NavigationActions, Header } from 'react-navigation'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Font } from 'expo'
import { getAllContacts, getMyContacts,getMyContacts1, getContactGroups, getContactRelationships, listContactGroups } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

var isAllContacts = false;
var isMyContacts = false;

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
            isLoading: false,
            searchText: '',
            contactsList: [],
            search_contactsList: [],
            y1: new Animated.Value((Platform.OS == 'ios')? -40: -28),
            scale1: new Animated.Value(0.001),
            isAllContacts: false,
            isMyContacts: false,
            display: 'All contacts',
            group: 'All groups',
            groupList: [],
            groupID: ''
        }
    }

    componentWillMount() {
        this.getAllContacts()
    }

    componentWillUnmount() {
        
    }

    getAllContacts(){
        var idList = []
        var subAllGroupList = [{
            "attributes": {
                "created_at": "2017-11-22T14:58:46.961+11:00",
                "name": "All group",
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
        this.setState({ isLoading: true })
        getAllContacts(this.props.token).then(data => {
            for(var i = 0; i < data.data.length; i++){
                idList.push(data.data[i].id)
            }
            getContactGroups(this.props.token, idList).then(data1 => {
                listContactGroups(this.props.token).then(groupList => {
                    subAllGroupList.concat(groupList.data)
                    for(var i = 0 ; i < groupList.data.length ; i++){
                        subAllGroupList.push(groupList.data[i])
                    }
                    this.setState({
                        contactsList: data1,
                        search_contactsList: data1,
                        isLoading: false,
                        groupList: subAllGroupList,
                    })
                })
            })
        })
    }

    getMyContacts(){
        var idList = []
        var subAllGroupList = [{
            "attributes": {
                "created_at": "2017-11-22T14:58:46.961+11:00",
                "name": "All group",
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
        this.setState({ isLoading: true })
        {
            this.state.groupID == -1 ?
                getMyContacts1(this.props.token, this.props.userID).then(data => {
                    for(var i = 0; i < data.data.length; i++){
                        idList.push(data.data[i].id)
                    }
                    getContactGroups(this.props.token, idList).then(data1 => {
                        listContactGroups(this.props.token).then(groupList => {
                            subAllGroupList.concat(groupList.data)
                            for(var i = 0 ; i < groupList.data.length ; i++){
                                subAllGroupList.push(groupList.data[i])
                            }
                            this.setState({
                                contactsList: data1,
                                search_contactsList: data1,
                                isLoading: false,
                                groupList: subAllGroupList,
                            })
                        })
                    })
                }) :
                getMyContacts(this.props.token, this.props.userID, this.state.groupID).then(data => {
                    for(var i = 0; i < data.data.length; i++){
                        idList.push(data.data[i].id)
                    }
                    getContactGroups(this.props.token, idList).then(data1 => {
                        listContactGroups(this.props.token).then(groupList => {
                            subAllGroupList.concat(groupList.data)
                            for(var i = 0 ; i < groupList.data.length ; i++){
                                subAllGroupList.push(groupList.data[i])
                            }
                            this.setState({
                                contactsList: data1,
                                search_contactsList: data1,
                                isLoading: false,
                                groupList: subAllGroupList,
                            })
                        })
                    })
                })
        }
        
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
        dispatch ({ type: 'GET_CONTACTS_ALL', data: this.state.contactsList})
        dispatch ({ type: 'GET_CONTACTS_GROUP', data: item})
        
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
            group: 'All groups'
        })
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

    onFilter() {
        Animated.parallel([
            Animated.timing(                  
                this.state.y1,            
                {
                    toValue: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT + 20,                    
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
            group: 'All groups'
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

        this.setState({ 
            isAllContacts: false,
            isMyContacts: false,
        })

        this.getMyContacts();
    }

    onAllContacts() {
        this.setState({ 
            isAllContacts: true,
            isMyContacts: false
        })
    }
    
    onMyContacts() {
        this.setState({
            isAllContacts: false,
            isMyContacts: true
        })
    }

    onallcontactsItem() {
        this.setState({ 
            isAllContacts: false,
            isMyContacts: false,
            display: 'All contacts'
        })
    }

    onmycontactsItem() {
        this.setState({ 
            isAllContacts: false,
            isMyContacts: false,
            display: 'My contacts'
        })
    }

    onallgroupsItem(item) {
        this.setState({ 
            isAllContacts: false,
            isMyContacts: false,
            group: item.attributes.name,
            groupID: item.id
        })
    }

    addNewContrat(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'addContact'}))
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
                    <TouchableOpacity style = {styles.searchButton} onPress = {() => this.onFilter()}>
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

                <TouchableOpacity style = {styles.addBtn} onPress = {() => this.addNewContrat()}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>

                <Animated.View style={[styles.filterView, {transform: [ {translateY: this.state.y1},{scaleY: this.state.scale1}]}]}>
                    <Text style = {styles.displayTxt}>Display</Text>
                    <TouchableOpacity onPress = {() => this.onAllContacts()}>
                        <View transparent style = {styles.dropView1}>
                            <Text style = {styles.contactTxt}>{this.state.display}</Text>
                            <Thumbnail square source = {images.ic_arrowdown} style = {styles.arrowImg}/>
                        </View>
                    </TouchableOpacity>
                    
                    <Text style = {styles.groupTxt}>Group</Text>
                    <TouchableOpacity onPress = {() => this.onMyContacts()}>
                        <View style = {styles.dropView1}>
                            <Text style = {styles.contactTxt}>{this.state.group}</Text>
                            <Thumbnail square source = {images.ic_arrowdown} style = {styles.arrowImg}/>
                        </View>
                    </TouchableOpacity>

                    <View style = {styles.filterButtonsView}>
                        <Button transparent style = {styles.clearBtn} onPress = {() => this.onClearFilter()}>
                            <Text style = {styles.clearTxt}>CLEAR FILTER</Text>
                        </Button>
                        <Button transparent style = {styles.saveBtn} onPress = {() => this.onSaveFilter()}>
                            <Text style = {styles.clearTxt}>SAVE FILTER</Text>
                        </Button>
                    </View>

                    {
                        this.state.isAllContacts ?
                            <View style = {styles.allContactsView}>
                                <TouchableOpacity onPress = {() => this.onallcontactsItem()}>
                                    <Text style = {styles.contactoptionTxt}>All contacts</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => this.onmycontactsItem()}>
                                    <Text style = {styles.contactoptionTxt}>My contacts</Text>
                                </TouchableOpacity>
                            </View> : null
                    }
                    {
                        this.state.isMyContacts ?
                            <ScrollView style = {styles.myContactsView}>
                                {
                                    this.state.groupList.map((item, indexe) => {
                                        return(
                                            <TouchableOpacity onPress = {() => this.onallgroupsItem(item)}>
                                                <Text style = {styles.contactoptionTxt}>{item.attributes.name}</Text>
                                            </TouchableOpacity>
                                        )
                                        
                                    })
                                }
                            </ScrollView> : null
                    }
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