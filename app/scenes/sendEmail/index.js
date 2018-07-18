//import liraries
import React, { Component } from 'react';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import ReactNative, {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, TextInput, Animated, Dimensions, KeyboardAvoidingView, Platform
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import TaskShow from '../../components/TaskShow'
import { getCompletedTasks, getUnCompletedTasks, searchContacts, getListingsDocuments } from '../../actions'
import {connect} from 'react-redux';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Accordion from 'react-native-collapsible/Accordion';
import Expand  from 'react-native-simple-expand';
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";

const { width, height } = Dimensions.get('window')

var attachmentList = [
    'contact-of-sale.pdf', 'section 32.pdf','statement of information.pdf'
]

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...'
  }
];

// create a component
class sendEmail extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            keyboardHeight: new Animated.Value(0),
            isLoading: true,
            completedTaskList: [],
            uncompletedTaskList: [],
            subject: '',
            composeemail: 'Hi ' + this.props.selected_contact_info.attributes.first_name,
            toEmail: '',
            toEmailName: '',
            toEmailContactPhoto: '',
            ccEmail: '',
            ccEmailName: '',
            ccEmailContactPhoto: '',
            bccEmail: '',
            bccEmailName: '',
            bccEmailContactPhoto: '',
            open: false,
            open1: false,
            animatedValue: new Animated.Value(0),
            animatedValue1: new Animated.Value(0),
            filterContactList:[],
            filterContactList1: [],
            filterContactList2: [],
            documentList: [],

            isToEmailNameTextFieldHidden: false,
            isToEmailFieldHidden: false,
            isCcEmailNameTextFieldHidden: false,
            isCcEmailFieldHidden: false,
            isBccEmailNameTextFieldHidden: false,
            isBccEmailFieldHidden: false,

            templateTxt: 'Template',
            contactName: this.props.selected_contact_info.attributes.first_name + ' ' + this.props.selected_contact_info.attributes.last_name,
            contactId: this.props.selected_contact_info.id,
            contactPhoto: this.props.selected_contact_info.attributes.photo_url,
            propertyName: this.props.relationship_inspection.attributes.full_address,
            propertyId: this.props.relationship_inspection.id,
            propertyPhoto: this.props.relationship_inspection.attributes.thumbnail,
            isClickedAttach: false,

            toText: '',
            toEmailList: [] 
        }   
    }

    animateKeyboardHeight = (toValue, duration) => {
        Animated.timing(
            this.state.keyboardHeight,
            {toValue, duration},
        ).start();
    };

    componentWillMount() {
        getListingsDocuments(this.props.token, this.state.propertyId).then(data => {
            this.setState({
                isLoading: false,
                documentList: data.data,
                toEmailList: []
            })

            if (Platform.OS === "android") {
                this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", ({endCoordinates}) => {
                    this.animateKeyboardHeight(endCoordinates.height, 0)
                });
                this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
                    this.animateKeyboardHeight(0, 300)
                })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected_contactForTask.length != 0){
            this.setState({
                contactName: nextProps.selected_contactForTask.attributes.first_name + ' ' + nextProps.selected_contactForTask.attributes.last_name,
                contactId: nextProps.selected_contactForTask.id,
                contactPhoto: nextProps.selected_contactForTask.attributes.photo_url,
            })
        }
        if(nextProps.selected_propertyForTask.length != 0){
            this.setState({
                propertyName: nextProps.selected_propertyForTask.attributes.full_address,
                propertyId: nextProps.selected_propertyForTask.id,
                propertyPhoto: nextProps.selected_propertyForTask.attributes.thumbnail,
                open1: !this.state.open1
            })
        }
    }

    onSendMail(){
        // alert('send')
    }

    getMaxHeight = () => {
        if (!this.refs || !this.refs.expand)
            return 9999;

        return this.refs.expand.state.maxHeight;
    };

    getMaxHeight1 = () => {
        if (!this.refs || !this.refs.expand1)
            return 9999;

        return this.refs.expand1.state.maxHeight;
    };

    filterContact(text) {
       this.setState({ toText: text })
        if(text){
            searchContacts(this.props.token, text).then((data => {
                this.setState({ 
                    filterContactList: data.data
                })
            }))
        }
        else {
            this.setState({
                filterContactList: []
            })
        }
    }

    filterContact1(text) {
        this.setState({ ccEmailName: text })
        if(text){
            searchContacts(this.props.token, text).then((data => {
                this.setState({ 
                    filterContactList1: data.data
                })
            }))
        }
        else {
            this.setState({
                filterContactList1: []
            })
        }
    }

    filterContact2(text) {
        this.setState({ bccEmailName: text })
        if(text){
            searchContacts(this.props.token, text).then((data => {
                this.setState({ 
                    filterContactList2: data.data
                })
            }))
        }
        else {
            this.setState({
                filterContactList2: []
            })
        }
    }

    onEachToContact(item) {
        this.setState({ toText: '' })
        Keyboard.dismiss(); 

        toEmailName = item.attributes.first_name + ' ' + item.attributes.last_name
        toEmail = item.attributes.email?item.attributes.email : item.attributes.first_name + ' ' + item.attributes.last_name
        toEmailContactPhoto = item.attributes.photo_url
        istoEmail = false

        data = {
            'toEmailName' : item.attributes.first_name + ' ' + item.attributes.last_name,
            'toEmail' : item.attributes.email?item.attributes.email : item.attributes.first_name + ' ' + item.attributes.last_name,
            'toEmailContactPhoto' : item.attributes.photo_url,
            'istoEmail' : false,
            'isToEmailFieldHidden' : false,
            'isToEmailNameTextFieldHidden': true,
        }

        a = this.state.toEmailList
        a.push(data)
        console.log(data)

        this.setState({
            // toEmailName: item.attributes.first_name + ' ' + item.attributes.last_name,
            // toEmail: item.attributes.email?item.attributes.email : item.attributes.first_name + ' ' + item.attributes.last_name,
            filterContactList: [],
            // isToEmailNameTextFieldHidden: true,
            // toEmailContactPhoto: item.attributes.photo_url,
            toEmailList: a
        })
    }

    onEachToContact1(item) {
        Keyboard.dismiss(); 
        this.setState({
            ccEmailName: item.attributes.first_name + ' ' + item.attributes.last_name,
            ccEmail: item.attributes.email?item.attributes.email : item.attributes.first_name + ' ' + item.attributes.last_name,
            filterContactList1: [],
            isCcEmailNameTextFieldHidden: true,
            ccEmailContactPhoto: item.attributes.photo_url,
        })
    }

    onEachToContact2(item) {
        Keyboard.dismiss(); 
        this.setState({
            bccEmailName: item.attributes.first_name + ' ' + item.attributes.last_name,
            bccEmail: item.attributes.email?item.attributes.email : item.attributes.first_name + ' ' + item.attributes.last_name,
            filterContactList2: [],
            isBccEmailNameTextFieldHidden: true,
            bccEmailContactPhoto: item.attributes.photo_url,
        })
    }

    showContactList() {
        return(
            <View style = {styles.popView}>
                {
                    this.state.filterContactList.map((item, index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onEachToContact(item)}>
                                <Text style = {styles.itemTxt}>{item.attributes.first_name} {item.attributes.last_name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    showContactList1() {
        return(
            <View style = {styles.popView1}>
                {
                    this.state.filterContactList1.map((item, index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onEachToContact1(item)}>
                                <Text style = {styles.itemTxt}>{item.attributes.first_name} {item.attributes.last_name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    showContactList2() {
        return(
            <View style = {styles.popView2}>
                {
                    this.state.filterContactList2.map((item, index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => this.onEachToContact2(item)}>
                                <Text style = {styles.itemTxt}>{item.attributes.first_name} {item.attributes.last_name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    
    doubleClickToContact(item, index) {
        let { toEmailList } = this.state;
        let targetPost = toEmailList[index];

        targetPost.isToEmailFieldHidden = !targetPost.isToEmailFieldHidden;
        toEmailList[index] = targetPost;
        this.setState({ toEmailList });
    }

    doubleClickToContact1() {
        this.setState({
            isCcEmailFieldHidden: !this.state.isCcEmailFieldHidden
        })
    }

    doubleClickToContact2() {
        this.setState({
            isBccEmailFieldHidden: !this.state.isBccEmailFieldHidden
        })
    }

    removeToEmail(item, index) {
        let { toEmailList } = this.state;
        toEmailList.splice(index, 1)
        this.setState({ toEmailList });
    }

    removeCcEmail() {
        this.setState({
            isCcEmailNameTextFieldHidden: false,
            isCcEmailFieldHidden: false,
            ccEmail: '',
            ccEmailName: '',
        })
    }

    removeBccEmail() {
        this.setState({
            isBccEmailNameTextFieldHidden: false,
            isBccEmailFieldHidden: false,
            bccEmail: '',
            bccEmailName: '',
        })
    }

    onSelectContact() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'contactsIndex'}))
    }

    onClickListing() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'propertyIndex'}))
    }

    removeListing() {
        this.setState({
            propertyName: '',
            propertyId: '',
            propertyPhoto: '',
            open1: !this.state.open1
        })
    }

    removeContact() {
        this.setState({
            contactName: '',
            contactId: '',
            contactPhoto: '',
        })
    }

    onSelectTemplat(value, label) {
        this.setState({templateTxt : value});
    }

    render() {
        const { animatedValue } = this.state;
        const maxHeight = this.getMaxHeight();
        const height = this.state.animatedValue.interpolate({
            inputRange: [0, maxHeight * .3, maxHeight],
            outputRange: [0, 0, 100],
        });

        const { animatedValue1 } = this.state;
        const maxHeight1 = this.getMaxHeight1();
        const height1 = this.state.animatedValue1.interpolate({
            inputRange: [0, maxHeight1 * .3, maxHeight1],
            outputRange: [0, 0, 200],
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <View style = {styles.titleView}>
                        <MaterialCommunityIcons name = 'menu' size = {25} color = 'white'
                                onPress={ () => { this.props.navigation.navigate('DrawerOpen') }} />
                        <Label style = {styles.title}>Send Email</Label>
                    </View>
                    <View style = {styles.titleView}>
                        <Label style = {styles.sendTxt}>send</Label>
                        <MaterialIcons name = 'send' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => this.onSendMail() } />
                    </View>
                </View>
                <KeyboardAwareScrollView
                    ref={ref => this.view = ref}
                    style={styles.mainView}
                    enableOnAndroid
                    extraHeight={Platform.OS === "android" ? 500 : undefined}
                >
                    <View style = {{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                        <View style = {styles.toView}>
                            <Text style = {styles.label1}>To</Text>

                        
                            <View style = {styles.emailContentSubView}>
                                {/*{
                                    this.state.isToEmailNameTextFieldHidden?
                                    <View style = {styles.subView}>
                                        <TouchableOpacity onPress = {() => this.doubleClickToContact()}>
                                            {
                                                this.state.isToEmailFieldHidden?
                                                <View style = {styles.contactSubView}>
                                                    <Text style = {styles.nameTxt}>{this.state.toEmail}</Text>
                                                    <TouchableOpacity onPress = {() => this.removeToEmail()}>
                                                        <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 10}}/>
                                                    </TouchableOpacity>
                                                </View> : 
                                                <View style = {styles.contactSubView}>
                                                    {
                                                        this.state.toEmailContactPhoto? <Thumbnail square source = {this.state.toEmailContactPhoto} style = {styles.avatarImg}/> :
                                                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                    }
                                                    <Text style = {styles.nameTxt}>{this.state.toEmailName}</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View> : 
                                    null
                                }*/}
                                {
                                    this.state.toEmailList.length == 0? null :
                                    this.state.toEmailList.map((item, index) => {
                                        return(
                                            <View style = {styles.eachEmailSubView} key = {index}>
                                                <TouchableOpacity onPress = {() => {this.doubleClickToContact(item, index)}}>
                                                    {
                                                        item.isToEmailFieldHidden?
                                                        <View style = {styles.contactSubView}>
                                                            <Text style = {styles.nameTxt}>{item.toEmail}</Text>
                                                            <TouchableOpacity onPress = {() => this.removeToEmail(item, index)}>
                                                                <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 10}}/>
                                                            </TouchableOpacity>
                                                        </View> : 
                                                        <View style = {styles.contactSubView}>
                                                            {
                                                                item.toEmailContactPhoto? <Thumbnail square source = {item.toEmailContactPhoto} style = {styles.avatarImg}/> :
                                                                <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                            }
                                                            <Text style = {styles.nameTxt}>{item.toEmailName}</Text>
                                                        </View>
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                                <TextInput
                                    style = {styles.inputTxt1}
                                    onChangeText = { text => this.filterContact(text)}
                                    value = {this.state.toText}
                                    placeholder = ""
                                    placeholderTextColor = "#999"
                                    returnKeyType = "next"
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    autoCapitalize = {'none'}
                                    autoCorrect = {false}
                                />
                            </View>



                            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
                                {
                                    this.state.open? <Ionicons name = 'ios-arrow-up' size = {18} color = 'gray'/> : <Ionicons name = 'ios-arrow-down' size = {18} color = 'gray'/>
                                }
                            </TouchableOpacity>
                        </View>






                        <Expand
                            minHeight={0}
                            containerStyle={{ flexGrow: 1 }}
                            ref="expand"
                            value={this.state.open}
                            animatedValue={animatedValue}>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 75 }}>
                                    <Animated.View style={{ height, justifyContent: 'center', backgroundColor: 'transparent' }}>
                                        <View style = {styles.ccView}>
                                            <Text style = {styles.label1}>Cc</Text>
                                            <View style = {styles.emailContentSubView}>
                                            {
                                                this.state.isCcEmailNameTextFieldHidden?
                                                <View style = {styles.subView}>
                                                    <TouchableOpacity onPress = {() => this.doubleClickToContact1()}>
                                                        {
                                                            this.state.isCcEmailFieldHidden?
                                                            <View style = {styles.contactSubView}>
                                                                <Text style = {styles.nameTxt}>{this.state.ccEmail}</Text>
                                                                <TouchableOpacity onPress = {() => this.removeCcEmail()}>
                                                                    <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 10}}/>
                                                                </TouchableOpacity>
                                                            </View> : 
                                                            <View style = {styles.contactSubView}>
                                                                {
                                                                    this.state.ccEmailContactPhoto? <Thumbnail square source = {this.state.ccEmailContactPhoto} style = {styles.avatarImg}/> :
                                                                    <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                                }
                                                                <Text style = {styles.nameTxt}>{this.state.ccEmailName}</Text>
                                                            </View>
                                                        }
                                                        
                                                    </TouchableOpacity>
                                                </View> :
                                                <TextInput
                                                    style = {styles.inputTxt1}
                                                    onChangeText = { text => this.filterContact1(text)}
                                                    value = {this.state.ccEmailName}
                                                    placeholder = ""
                                                    placeholderTextColor = "#999"
                                                    returnKeyType = "next"
                                                    underlineColorAndroid='rgba(0,0,0,0)'
                                                    autoCapitalize = {'none'}
                                                    autoCorrect = {false}
                                                />
                                            }
                                            </View>
                                        </View>
                                        <View style = {styles.bccView}>
                                            <Text style = {styles.label1}>Bcc</Text>
                                            <View style = {styles.emailContentSubView}>
                                            {
                                                this.state.isBccEmailNameTextFieldHidden?
                                                <View style = {styles.subView}>
                                                    <TouchableOpacity onPress = {() => this.doubleClickToContact2()}>
                                                        {
                                                            this.state.isBccEmailFieldHidden?
                                                            <View style = {styles.contactSubView}>
                                                                <Text style = {styles.nameTxt}>{this.state.bccEmail}</Text>
                                                                <TouchableOpacity onPress = {() => this.removeBccEmail()}>
                                                                    <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 10}}/>
                                                                </TouchableOpacity>
                                                            </View> : 
                                                            <View style = {styles.contactSubView}>
                                                                {
                                                                    this.state.bccEmailContactPhoto? <Thumbnail square source = {this.state.bccEmailContactPhoto} style = {styles.avatarImg}/> :
                                                                    <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                                }
                                                                <Text style = {styles.nameTxt}>{this.state.bccEmailName}</Text>
                                                            </View>
                                                        }
                                                    </TouchableOpacity>
                                                </View> : 
                                                <TextInput
                                                    style = {styles.inputTxt1}
                                                    onChangeText = { text => this.filterContact2(text)}
                                                    value = {this.state.bccEmailName}
                                                    placeholder = ""
                                                    placeholderTextColor = "#999"
                                                    returnKeyType = "next"
                                                    underlineColorAndroid='rgba(0,0,0,0)'
                                                    autoCapitalize = {'none'}
                                                    autoCorrect = {false}
                                                />
                                            }
                                            </View>
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                        </Expand>
                    </View>
                    
                    <View style = {{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                        <View style = {styles.subjectView}>
                            <Select
                                onSelect = {this.onSelectTemplat.bind(this)}
                                defaultText  = {this.state.templateTxt}
                                style = {styles.selectoptionView}
                                textStyle = {styles.selectedTxt}
                                backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                                transparent = {true}
                                optionListStyle = {styles.optionList_template}
                            >
                                <Option value = "Follow up from inspection" styleText = {styles.optiontxt}>Follow up from inspection</Option>
                                <Option value = "Vendor report" styleText = {styles.optiontxt}>Vendor report</Option>
                                <Option value = "Invite to inspetion" styleText = {styles.optiontxt}>Invite to inspetion</Option>
                                <Option value = "Document after inspection" styleText = {styles.optiontxt}>Document after inspection</Option>
                            </Select>
                            <TouchableOpacity onPress={() => this.setState({ open1: !this.state.open1 })}>
                                {
                                    this.state.open1? <Ionicons name = 'ios-arrow-up' size = {18} color = 'gray'/> : <Ionicons name = 'ios-arrow-down' size = {18} color = 'gray'/>
                                }
                            </TouchableOpacity>
                        </View>
                        <Expand
                            minHeight={0}
                            containerStyle={{ flexGrow: 1 }}
                            ref="expand1"
                            value={this.state.open1}
                            animatedValue={animatedValue1}>
                            <View style={{ flex: 1 }}>
                                <Animated.View style={{ height1, justifyContent: 'center', backgroundColor: 'transparent' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style = {styles.view1} onPress = {() => this.onClickListing()}>
                                            <Text style = {styles.label1}>Listing</Text>
                                            {
                                                this.state.propertyName?
                                                <View style = {[styles.contactSubView, {marginLeft: 10}]}>
                                                    {
                                                        this.state.propertyPhoto? <Thumbnail square source = {{uri: this.state.propertyPhoto}} style = {styles.avatarImg}/> : 
                                                        <Thumbnail square source = {images.placeholderImage} style = {styles.avatarImg}/>
                                                    }
                                                    <Text style = {styles.nameTxt}>{this.state.propertyName}</Text>
                                                    <TouchableOpacity onPress = {() => this.removeListing()}>
                                                        <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 7}}/>
                                                    </TouchableOpacity>
                                                </View> : null
                                            }
                                        </TouchableOpacity>
                                        <TouchableOpacity style = {styles.view1} onPress = {() => this.onSelectContact()}>
                                            <Text style = {styles.label1}>Contact</Text>
                                            {
                                                this.state.contactName?
                                                <View style = {[styles.contactSubView, {marginLeft: 10}]}>
                                                    {
                                                        this.state.contactPhoto? <Thumbnail square source = {this.state.contactPhoto} style = {styles.avatarImg}/> : 
                                                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                    }
                                                    <Text style = {styles.nameTxt}>{this.state.contactName}</Text>
                                                    <TouchableOpacity onPress = {() => this.removeContact()}>
                                                        <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 7}}/>
                                                    </TouchableOpacity>
                                                </View>  : null
                                            }
                                        </TouchableOpacity>
                                        {
                                            (this.state.propertyName && this.state.documentList.length != 0)?
                                            <View style = {styles.view2}>
                                                <Text style = {styles.label1}>Attachment</Text>
                                                <View>
                                                {
                                                    this.state.documentList.map((item, index) => {
                                                        text = item.attributes.url;
                                                        parts = text.split('%2F');
                                                        return(
                                                            <View key = {index} style = {styles.eachAttachView}>
                                                                <Text style = {styles.eachAttachTxt}>{parts[2]}</Text>
                                                                <TouchableOpacity onPress = {() => {this.setState({ isClickedAttach: !this.state.isClickedAttach})}}>
                                                                    <Thumbnail square source = {this.state.isClickedAttach?images.ic_checkbox : images.ic_uncheckbox} style = {styles.checkImg}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    })
                                                }
                                                </View>
                                            </View> : null
                                        }
                                        
                                    </View>
                                    
                                </Animated.View>
                            </View>
                        </Expand>
                    </View>

                    <View style = {styles.subjectView}>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ subject: text })}
                            value = {this.state.subject}
                            placeholder = "Subject"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                    </View>
                    <View style = {styles.emailView}>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ composeemail: text })}
                            value = {this.state.composeemail}
                            placeholder = "Compose email"
                            placeholderTextColor = "#999"
                            keyboardType = 'email-address'
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                    </View>
                </KeyboardAwareScrollView>

                {
                    this.state.filterContactList.length > 0 ? this.showContactList() : null
                }
                {
                    this.state.filterContactList1.length > 0 ? this.showContactList1() : null
                }
                {
                    this.state.filterContactList2.length > 0 ? this.showContactList2() : null
                }

            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        relationship_inspection: state.home.selected_inspection,
        selected_contact_info: state.contacts.selected_contact_info,
        selected_propertyForTask: state.listings.selected_propertyForTask,
        selected_contactForTask: state.contacts.selected_contactForTask,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(sendEmail);
