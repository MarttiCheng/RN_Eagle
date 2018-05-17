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
import { getAllContacts, getMyContacts, getContactGroups, getContactRelationships } from '../../actions'
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
            contactsList: this.props.contacts,
            search_contactsList: this.props.contacts,
            y1: new Animated.Value((Platform.OS == 'ios')? -40: -28),
            scale1: new Animated.Value(0.001),
            isAllContacts: false,
            isMyContacts: false,
            display: 'All contacts',
            group: 'All groups',
        }
    }

    componentWillMount() {
        this.getAllContacts()
    }

    getAllContacts(){
        var idList = []
        this.setState({ isLoading: true })
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

    getMyContacts(){
        var idList = []
        this.setState({ isLoading: true })
        getMyContacts(this.props.token, current_user_id).then(data => {
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

        this.getAllContacts();
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

    onallgroupsItem() {
        this.setState({ 
            isAllContacts: false,
            isMyContacts: false,
            group: 'All groups'
        })
    }

    render() {
        console.log(this.state.isAllContacts)
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

                <TouchableOpacity style = {styles.addBtn}>
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
                            <View style = {styles.myContactsView}>
                                <TouchableOpacity onPress = {() => this.onallgroupsItem()}>
                                    <Text style = {styles.contactoptionTxt}>All Groups</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style = {styles.contactoptionTxt}>(Select group)</Text>
                                </TouchableOpacity>
                            </View> : null
                    }
                    
                    
                </Animated.View> 
                
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        contacts: state.contacts.contacts
    }
}

//make this component available to the app
export default connect(mapStateToProps)(contacts);