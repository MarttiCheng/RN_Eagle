//import liraries
import React, { Component } from 'react';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, 
  ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, TextInput, Animated, Dimensions
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import TaskShow from '../../components/TaskShow'
import { getCompletedTasks, getUnCompletedTasks, searchContacts } from '../../actions'
import {connect} from 'react-redux';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Accordion from 'react-native-collapsible/Accordion';
import Expand  from 'react-native-simple-expand';
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'

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
            isLoading: true,
            completedTaskList: [],
            uncompletedTaskList: [],
            subject: '',
            composeemail: '',
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
            
            isToEmailNameTextFieldHidden: false,
            isToEmailFieldHidden: false,
            isCcEmailNameTextFieldHidden: false,
            isCcEmailFieldHidden: false,
            isBccEmailNameTextFieldHidden: false,
            isBccEmailFieldHidden: false,

            templateTxt: '',
            contactName: this.props.selected_contact_info.attributes.first_name + ' ' + this.props.selected_contact_info.attributes.last_name,
            contactId: this.props.selected_contact_info.id,
            contactPhoto: this.props.selected_contact_info.attributes.photo_url,
            propertyName: this.props.relationship_inspection.attributes.full_address,
            propertyId: this.props.relationship_inspection.id,
            propertyPhoto: this.props.relationship_inspection.attributes.thumbnail,
        }   
    }

    componentWillMount() {        
        // console.log(this.props.relationship_inspection)
        // console.log(this.props.selected_contact_info)
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
        this.setState({ toEmailName: text })
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
        Keyboard.dismiss(); 
        this.setState({
            toEmailName: item.attributes.first_name + ' ' + item.attributes.last_name,
            toEmail: item.attributes.email?item.attributes.email : item.attributes.first_name + ' ' + item.attributes.last_name,
            filterContactList: [],
            isToEmailNameTextFieldHidden: true,
            toEmailContactPhoto: item.attributes.photo_url,
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
                            <TouchableOpacity onPress = {() => this.onEachToContact(item)}>
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
                            <TouchableOpacity onPress = {() => this.onEachToContact1(item)}>
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
                            <TouchableOpacity onPress = {() => this.onEachToContact2(item)}>
                                <Text style = {styles.itemTxt}>{item.attributes.first_name} {item.attributes.last_name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    
    doubleClickToContact() {
        this.setState({
            isToEmailFieldHidden: !this.state.isToEmailFieldHidden
        })
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

    removeToEmail() {
        this.setState({
            isToEmailNameTextFieldHidden: false,
            isToEmailFieldHidden: false,
            toEmail: '',
            toEmailName: '',
        })
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

    handleOnNavigateBack(){
        this.fetchContactTask()
    }

    onClickListing() {
        // var { dispatch } = this.props
        // dispatch(NavigationActions.navigate({routeName: 'propertyIndex'}))
        this.props.navigation.navigate('propertyIndex', {
            onNavigateBack: this.handleOnNavigateBack.bind(this)
        })
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
                    scrollEnabled = {true}
                >
                    <View style = {{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                        <View style = {styles.toView}>
                            <Text style = {styles.label1}>To</Text>
                            {
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
                                <TextInput
                                    style = {styles.inputTxt1}
                                    onChangeText = { text => this.filterContact(text)}
                                    value = {this.state.toEmailName}
                                    placeholder = ""
                                    placeholderTextColor = "#999"
                                    returnKeyType = "next"
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    autoCapitalize = {'none'}
                                    autoCorrect = {false}
                                />
                            }
                            
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
                                                    style = {[styles.inputTxt1, {width: width - 63}]}
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
                                        <View style = {styles.bccView}>
                                            <Text style = {styles.label1}>Bcc</Text>
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
                                                    style = {[styles.inputTxt1, {width: width - 63}]}
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
                                    </Animated.View>
                                </View>
                            </View>
                        </Expand>
                    </View>
                    
                    <View style = {{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                        <View style = {styles.subjectView}>
                            <TextInput
                                style = {styles.inputTxt1}
                                onChangeText = { text => this.setState({ templateTxt: text })}
                                value = {this.state.templateTxt}
                                placeholder = "Template"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                            />
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
                                    <View>
                                        <TouchableOpacity style = {styles.view1} onPress = {() => this.onClickListing()}>
                                            <Text style = {styles.label1}>Listing</Text>
                                            <View style = {[styles.contactSubView, {marginLeft: 10}]}>
                                                {
                                                    this.state.propertyPhoto? <Thumbnail square source = {{uri: this.state.propertyPhoto}} style = {styles.avatarImg}/> : 
                                                    <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                }
                                                <Text style = {styles.nameTxt}>{this.state.propertyName}</Text>
                                                <TouchableOpacity onPress = {() => this.removeCcEmail()}>
                                                    <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 10}}/>
                                                </TouchableOpacity>
                                            </View> 
                                        </TouchableOpacity>
                                        <View style = {styles.view1}>
                                            <Text style = {styles.label1}>Contact</Text>
                                            <View style = {[styles.contactSubView, {marginLeft: 10}]}>
                                                {
                                                    this.state.contactPhoto? <Thumbnail square source = {this.state.contactPhoto} style = {styles.avatarImg}/> : 
                                                    <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                                                }
                                                <Text style = {styles.nameTxt}>{this.state.contactName}</Text>
                                                <TouchableOpacity onPress = {() => this.removeCcEmail()}>
                                                    <MaterialCommunityIcons name = 'close-circle' size = {20} color = '#a6a6a6' style = {{marginLeft: 7}}/>
                                                </TouchableOpacity>
                                            </View> 
                                        </View>
                                        <View style = {styles.view2}>
                                            <Text style = {styles.label1}>Attachment</Text>
                                            <View>
                                            {
                                                attachmentList.map((item, index) => {
                                                    return(
                                                        <View style = {styles.eachAttachView}>
                                                            <Text style = {styles.eachAttachTxt}>{item}</Text>
                                                            <Thumbnail square source = {images.ic_uncheckbox} style = {styles.checkImg}/>
                                                        </View>
                                                    )
                                                })
                                            }
                                            </View>
                                        </View>
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
    }
}

//make this component available to the app
export default connect(mapStateToProps)(sendEmail);
