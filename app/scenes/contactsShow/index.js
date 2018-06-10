import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab, 
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Modal
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images'
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import ContactAbout from '../../components/ContactAbout'
import ContactProperties from '../../components/ContactProperties'
import ContactActivity from '../../components/ContactActivity'
import ContactTask from '../../components/ContactTask'
import ContactRelated from '../../components/ContactRelated'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { updateContact, updateContactGroup, getContactGroup, getUser } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import SelectAddModal from '../../components/SelectAddModal'
import addNewNote from '../addNewNote/index';



const PARALLAX_HEADER_HEIGHT = 150;
const STICKY_HEADER_HEIGHT = 50; 

var isEdit = false

class contactsShow extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            isAbout: true,
            isRelated: false,
            isProperties: false,
            isActivity: false,
            isTasks: false,
            scrollEnabled: true,
            currentPosition: 0,
            isHeader: false,
            isEdit: false,
            isSaving: false,
            isLoading: false,
            addModal: false,
            belongsToName: '',
            contactInfo: [],
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        var isEdit = this.state.isEdit
        this.setState({
            isEdit: false,
            isSaving: true
        })   
        getContactGroup(this.props.token, this.props.contact_id).then(data1 => {
            getUser(this.props.token, data1.data.attributes.user_id).then(data => {
                this.setState({
                    isSaving: false,
                    belongsToName: data.data.attributes.first_name + ' ' +  data.data.attributes.last_name,
                    contactInfo: data1
                })
            })
        })
    }

    _onAbout = () => {
        this.setState({
            isAbout: true,
            isProperties: false,
            isActivity: false,
            isTasks: false,
            isRelated: false,
        })
    }

    _onProperties = () => {
        this.setState({
            isAbout: false,
            isProperties: true,
            isActivity: false,
            isTasks: false,
            isRelated: false,
        })
    }

    _onActivity = () => {
        this.setState({
            isAbout: false,
            isProperties: false,
            isActivity: true,
            isTasks: false,
            isRelated: false,
        })
    }

    _onTasks = () => {
        this.setState({
            isAbout: false,
            isProperties: false,
            isActivity: false,
            isTasks: true,
            isRelated: false,
        })
    }

    _onRelated = () => {
        this.setState({
            isAbout: false,
            isProperties: false,
            isActivity: false,
            isTasks: false,
            isRelated: true,
        })
    }

    showTabView(){
        if(this.state.isAbout){
            return(
                <ContactAbout  isEdit = {this.state.isEdit} belongsName = {this.state.belongsToName} contactInfo = {this.state.contactInfo}/>
            )
        }
        if(this.state.isRelated){
            return(
                <ContactRelated  contactInfo = {this.state.contactInfo}/>
            )
        }
        if(this.state.isProperties){
            return(
                <ContactProperties  contactInfo = {this.state.contactInfo}/>
            )
        }
        if(this.state.isActivity){
            return(
                <ContactActivity  contactInfo = {this.state.contactInfo}/>
            )
        }
        if(this.state.isTasks){
            return(
                <ContactTask  contactInfo = {this.state.contactInfo}/>
            )
        }
    }

    showCompany(){
        var params = this.state.contactInfo
        if(params){
            if(params.data.attributes.title && params.data.attributes.company) {
                return(
                    <Label style = {styles.jobTxt}>{params.data.attributes.title} at {params.data.attributes.company}</Label>
                )
            }
            else if((params.data.attributes.title && params.data.attributes.company == "" )|| (params.data.attributes.title && !params.data.attributes.company)){
                return(
                    <Label style = {styles.jobTxt}>{params.data.attributes.title}</Label>
                )
            }
            else if((params.data.attributes.title == '' && params.data.attributes.company ) || (!params.data.attributes.title && params.data.attributes.company )){
                return(
                    <Label style = {styles.jobTxt}>{params.data.attributes.company}</Label>
                )
            }
        }
    }

    handleScroll(event){
        if(event.nativeEvent.contentOffset.y > 150){
            this.setState({
                isHeader: true
            })
            
        }
        else{
            this.setState({
                isHeader: false
            })
        }
    }

    _onEdit() {
        var arr = []
        if(this.state.isEdit){
            arr = this.props.edit_contact_item
            this.setState({ isSaving: true})
            updateContact(this.props.token, this.props.contact_id, arr).then(data => {
                updateContactGroup(this.props.token, data.data.id, this.props.edit_contact_groups_item)
                getContactGroup(this.props.token, this.props.contact_id).then(data1 => {
                    getUser(this.props.token, data1.data.attributes.user_id).then(data2 => {
                        this.setState({
                            isSaving: false,
                            belongsToName: data2.data.attributes.first_name + ' ' +  data2.data.attributes.last_name,
                            contactInfo: data1,
                            isEdit: false
                        })
                        this.state.contactInfo.data = data.data
                    })
                })                
            })
        }
        else {
            this.setState({
                isEdit: true
            })
        }
    }

    onAdd() {
        this.setState({ addModal: true })
    }

    onClickedNewNote(){
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewNote'}))
    }

    onClickedNewTask() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewTask'}))
    }

    onClickedNewEnquiry() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewEnquiry'}))
    }

    onClickedNewInspection() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewInspection'}))
    }

    onClickedNewOffer() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewOffer'}))
    }

    showMainView() {
        var params = this.state.contactInfo
        if(params){
        return(
            <View style = {styles.parallaxView}>
                <ParallaxScrollView
                    onScroll={this.handleScroll}
                    stickyHeaderHeight={ this.state.isEdit? 0: STICKY_HEADER_HEIGHT }
                    parallaxHeaderHeight={ this.state.isEdit? 0 : PARALLAX_HEADER_HEIGHT }
                    backgroundSpeed={30}
                    backgroundColor = '#364150'
                    contentBackgroundColor = '#ddd'
                    showsVerticalScrollIndicator = {false}
                    fadeOutForeground = {false}
                    renderBackground={() => (
                        this.state.isEdit? null:
                        <View style = {styles.headerView} key="background">
                            {
                                params.data.attributes.photo_url? <Thumbnail square source = {params.data.attributes.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                                <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                            }
                            <Label style = {styles.nameTxt}>{params.data.attributes.first_name} {params.data.attributes.last_name}</Label>
                            {this.showCompany()}
                        </View>
                    )}

                    renderFixedHeader={() => (
                        (this.state.isHeader && !this.state.isEdit)?
                            <ScrollView style = {styles.tabTitleView} horizontal = {true}  key="sticky-header" showsHorizontalScrollIndicator = {false}>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onAbout}>
                                    <Text style = {styles.tabTxt}>ABOUT</Text>
                                    <View style = {this.state.isAbout? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onRelated}>
                                    <Text style = {styles.tabTxt}>RELATED</Text>
                                    <View style = {this.state.isRelated? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onProperties}>
                                    <Text style = {styles.tabTxt}>PROPERTIES</Text>
                                    <View style = {this.state.isProperties? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onActivity}>
                                    <Text style = {styles.tabTxt}>ACTIVITY</Text>
                                    <View style = {this.state.isActivity? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onTasks}>
                                    <Text style = {styles.tabTxt}>TASKS</Text>
                                    <View style = {this.state.isTasks? styles.tabline : null}/>
                                </TouchableOpacity>
                            </ScrollView>
                            :
                            null
                    )}
                >
                    {
                        this.state.isEdit? null:
                            <ScrollView style = {styles.tabTitleView} horizontal = {true}  key="sticky-header" showsHorizontalScrollIndicator = {false}>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onAbout}>
                                    <Text style = {styles.tabTxt}>ABOUT</Text>
                                    <View style = {this.state.isAbout? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onRelated}>
                                    <Text style = {styles.tabTxt}>RELATED</Text>
                                    <View style = {this.state.isRelated? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onProperties}>
                                    <Text style = {styles.tabTxt}>PROPERTIES</Text>
                                    <View style = {this.state.isProperties? styles.tabline : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onActivity}>
                                    <Text style = {styles.tabTxt}>ACTIVITY</Text>
                                    <View style = {this.state.isActivity? styles.tabline : null}/>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style = {styles.tabItem} onPress = {this._onTasks}>
                                    <Text style = {styles.tabTxt}>TASKS</Text>
                                    <View style = {this.state.isTasks? styles.tabline : null}/>
                                </TouchableOpacity>
                                
                            </ScrollView>
                    }

                    {this.showTabView()}

                </ParallaxScrollView>
            </View>
        )
        }
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                { 
                    this.state.isSaving? <BallIndicator color = {'#2B3643'}  style = {styles.indicator}/> : 
                    this.showMainView() 
                }

                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack(); this.setState({ isEdit: false }) }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{this.props.navigation.state.params.name}</Label>
                    <TouchableOpacity onPress = {() => this._onEdit()}>
                        {
                            this.state.isAbout? 
                            <Label style = {styles.editTxt}>{this.state.isEdit? "Save" : "Edit" }</Label> : <Label style = {styles.editTxt}></Label>
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style = {styles.addBtn} onPress = {() => this.onAdd()}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>

                {
                     this.state.isSaving? <BallIndicator color = {'#2B3643'}  style = {styles.indicator}/> : null
                }
                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.addModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        this.setState({ addModal: false })
                    }}>
                    <SelectAddModal 
                        onClickedBack = {() => this.setState({ addModal: false })} 
                        onClickedNewNote = {() => this.onClickedNewNote()}
                        onClickedNewTask = {() => this.onClickedNewTask()}
                        onClickedNewEnquiry = {() => this.onClickedNewEnquiry()}
                        onClickedNewInspection = {() => this.onClickedNewInspection()}
                        onClickedNewOffer = {() => this.onClickedNewOffer()}
                    />
                </Modal>
                
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        // contact_group: state.contacts.contact_groups,
        edit_contact_item: state.contacts.edit_contact_item,
        edit_contact_groups_item: state.contacts.edit_contact_groups_item,
        contact_id: state.contacts.contact_id,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(contactsShow);

