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
import { MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons'
import Accordion from 'react-native-collapsible/Accordion';
import Expand  from 'react-native-simple-expand';

const { width, height } = Dimensions.get('window')

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
            ccEmail: '',
            bccEmail: '',
            open: false,
            animatedValue: new Animated.Value(0),
            filterContactList:[],
        }   
    }

    componentWillMount() {
        getCompletedTasks(this.props.token).then(data => {
            getUnCompletedTasks(this.props.token).then(data1 => {
                this.setState({
                    isLoading: false,
                    completedTaskList: data.data,
                    uncompletedTaskList: data1.data
                })
            })
        })
    }

    onSendMail(){
        // alert('send')
    }

    _renderSectionTitle(section) {
        return (
        <View style={styles.content}>
            <Text>{section.content}</Text>
        </View>
        );
    }

    _renderHeader(section) {
        return (
            <View style = {styles.toView}>
                <Text style = {styles.label1}>To</Text>
                <View style = {styles.subView}>
                    <View style = {styles.contactSubView}>
                        <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        <Text style = {styles.nameTxt}>send email</Text>
                    </View>
                </View>
                <Ionicons name = 'ios-arrow-down' size = {18} color = 'gray'/>
            </View>
        );
    }

    _renderContent(section) {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    }

    getMaxHeight = () => {
        if (!this.refs || !this.refs.expand)
            return 9999;

        return this.refs.expand.state.maxHeight;
    };

    filterContact(text) {
        this.setState({ toEmail: text })
        if(text){
            searchContacts(this.props.token, text).then((data => {
                console.log(data)
                this.setState({ 
                    filterContactList: data.data
                })
            }))
        }
    }

    showContactList() {
        return(
            <View style = {styles.popView}>

            </View>
        )
    }

    render() {
        const { animatedValue } = this.state;
        const maxHeight = this.getMaxHeight();

        const height = this.state.animatedValue.interpolate({
            inputRange: [0, maxHeight * .3, maxHeight],
            outputRange: [0, 0, 100],
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
                <View style = {styles.mainView}>
                    <View style = {{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                        <View style = {styles.toView}>
                            <Text style = {styles.label1}>To</Text>
                            <TextInput
                                style = {styles.inputTxt1}
                                onChangeText = { text => this.filterContact(text)}
                                value = {this.state.toEmail}
                                placeholder = ""
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                            />
                            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
                                <Ionicons name = 'ios-arrow-down' size = {18} color = 'gray'/>
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
                                            <TextInput
                                                style = {[styles.inputTxt1, {width: width - 63}]}
                                                onChangeText = { text => this.setState({ ccEmail: text })}
                                                value = {this.state.ccEmail}
                                                placeholder = ""
                                                placeholderTextColor = "#999"
                                                returnKeyType = "next"
                                                underlineColorAndroid='rgba(0,0,0,0)'
                                                autoCapitalize = {'none'}
                                                autoCorrect = {false}
                                            />
                                        </View>
                                        <View style = {styles.bccView}>
                                            <Text style = {styles.label1}>Bcc</Text>
                                            <TextInput
                                                style = {[styles.inputTxt1, {width: width - 63}]}
                                                onChangeText = { text => this.setState({ bccEmail: text })}
                                                value = {this.state.bccEmail}
                                                placeholder = ""
                                                placeholderTextColor = "#999"
                                                returnKeyType = "next"
                                                underlineColorAndroid='rgba(0,0,0,0)'
                                                autoCapitalize = {'none'}
                                                autoCorrect = {false}
                                            />
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                        </Expand>
                    </View>
                    
                    <View style = {styles.toView}>
                        <Text style = {styles.label1}>Template</Text>
                        <Ionicons name = 'ios-arrow-down' size = {18} color = 'gray'/>
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
                </View>

                {
                    this.state.filterContactList.length > 0 ? this.showContactList() : null
                }

            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
    }
}

//make this component available to the app
export default connect(mapStateToProps)(sendEmail);
