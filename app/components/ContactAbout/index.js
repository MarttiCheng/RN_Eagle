//import libraries
import React, { Component } from 'react';
import ReactNative,{ StyleSheet, StatusBar, Image, TouchableOpacity, Animated, ScrollView, TextInput, Dimensions, Keyboard, KeyboardAvoidingView, Modal } from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item, Input
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import Moment from 'react-moment';
import moment from 'moment'
import { getContact } from '../../actions'
import DatePicker from 'react-native-datepicker'
import {Select, Option} from "react-native-chooser";
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import Icon1 from 'react-native-vector-icons/Ionicons';
import { BallIndicator } from 'react-native-indicators'
import { NavigationActions } from 'react-navigation'
import Communications from 'react-native-communications';

const { width, height } = Dimensions.get('window')

var property_alerts_subscribed = true;
var sms_subscribed = true;
var subscribed = true;

var isAddGroup = false

// create a component
class ContactAbout extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            company: '',
            title: '',
            mobile: '',
            fax: '',
            businessHours: '',
            afterHours: '',
            email: '',
            address1: '',
            address2: '',
            backgroundInfo: '',
            assignedTo: '',
            source: '',
            createdAt: '',
            updatedAt: '',
            suburb: '',
            state: '',
            postcode: '',
            country: '',
            country_category: '',
            property_alerts_subscribed: true,
            sms_subscribed: true,
            subscribed: true,
            keyboardHeight: new Animated.Value(0),
            contactGroups: [],
            isAddGroup: false,
            usersList: [],
            user_id: null,
            // isLoading: true,
            phoneModal: false,
        }
    }

    animateKeyboardHeight = (toValue, duration) => {
        Animated.timing(
            this.state.keyboardHeight,
            {toValue, duration},
        ).start();
    };

    componentWillMount() {
        var address1 = ''
        var address2 = ''
        var params = this.props.contactInfo
        
        if(!params.data.attributes.address_line_1 || params.data.attributes.address_line_1 == '' || params.data.attributes.address_line_1 == 'null'){
            address1 = '';
        }
        else{
            address1 = params.data.attributes.address_line_1;
            if(!params.data.attributes.address_line_2 || params.data.attributes.address_line_2 == '' || params.data.attributes.address_line_2 == 'null'){
                address2 = '';
            }
            else{
                address2 =  params.data.attributes.address_line_2;
            }
        }

        property_alerts_subscribed = params.data.attributes.property_alerts_subscribed;
        sms_subscribed = params.data.attributes.sms_subscribed;
        subscribed = params.data.attributes.subscribed;

        var arr = []
        if(params.included){
            for(var i = 0 ; i < params.included.length; i++) {
                arr.push(params.included[i])
            }
        }
        
        var arr1 = []
        for(var i = 0 ; i < this.props.usersList.length ; i++){
            if(this.props.usersList[i].id !=  this.props.userID){
                arr1.push(this.props.usersList[i])
            }
        }

        this.setState({
            firstname: params.data.attributes.first_name,
            lastname: params.data.attributes.last_name,
            company: params.data.attributes.company,
            title: params.data.attributes.title,
            mobile: params.data.attributes.mobile_phone,
            fax: params.data.attributes.fax,
            businessHours: params.data.attributes.business_hours_phone,
            afterHours: params.data.attributes.after_hours_phone,
            email: params.data.attributes.email,
            address1: address1,
            address2: address2,
            backgroundInfo: params.data.attributes.background_info,
            assignedTo: this.props.belongsName,
            user_id: this.props.userID,
            source: params.data.attributes.referred_by,
            createdAt: moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma'),
            updatedAt: moment(params.data.attributes.showed_at).format('MMM Do YYYY h:mma'),
            suburb: params.data.attributes.suburb,
            state: params.data.attributes.state,
            postcode: params.data.attributes.postcode,
            country_category: params.data.attributes.country,
            property_alerts_subscribed: params.data.attributes.property_alerts_subscribed,
            sms_subscribed: params.data.attributes.sms_subscribed,
            subscribed: params.data.attributes.subscribed,
            contactGroups: arr,
            usersList: arr1,
            // isLoading: false
        })

        if (Platform.OS === "android") {
            this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", ({endCoordinates}) => {
                this.animateKeyboardHeight(endCoordinates.height, 0)
            });
            this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
                this.animateKeyboardHeight(0, 300)
            })
        }
    }

    fetchAbout(value) {
        
    }

    scrollToInput = (reactNode) => {
        this.view.scrollToFocusedInput(reactNode)
    };

    handleOnFocus = (e) => {
        if (Platform.OS === "android") {
            this.scrollToInput(ReactNative.findNodeHandle(e.target))
        }
    };

    onGroupItem(index) {
        var a = this.state.contactGroups
        var b = this.state.contactGroups.splice(index, 1)
        this.setState({
            contactGroups: a
        })
    }

    showContactGroups(){
        var groupList = this.state.contactGroups;
        if(groupList){
            return(
                groupList.map((item, index) => {
                    return(
                        <View style = { styles.categoryItem } key = {index}>
                            <TouchableOpacity onPress = {() => this.onGroupItem(index)}>
                                <Icon1 name="ios-close" size={24} color="#2B3643" style = {{marginTop: 4, width: 24 }}/>
                            </TouchableOpacity>
                            <Label style = {[styles.categoryItemTxt, {marginLeft: 0}]}>{item.attributes.name}</Label>
                        </View>
                    )
                })
            )
        }
    }
    
    showContactGroups1(){
        var groupList = this.state.contactGroups;
        if(groupList){
            return(
                groupList.map((item, index) => {
                    return(
                        <View style = { styles.categoryItem } key = {index}>
                            <Label style = {styles.categoryItemTxt}>{item.attributes.name}</Label>
                        </View>
                    )
                })
            )
        }
    }

    showAddgroupView() {
        isAddGroup =! isAddGroup
        this.setState({
            isAddGroup: isAddGroup
        })
    }

    onClickMobile(number){
        this.setState({ phoneModal: true })  
    }

    onClickBusinessHours(number) {
        Communications.phonecall(number, true)
        this.setState({ phoneModal: false})
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'addNewNote',  params: {noteType: 'Call'}}))
    }

    onClickAfterHours(number) {
        Communications.phonecall(number, true)
        this.setState({ phoneModal: false})
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'addNewNote',  params: {noteType: 'Call'}}))
    }
    
    showContactAbout(){
        return(
            <View>
                <View style = {styles.categoryView1}>
                    {
                        this.showContactGroups1() 
                    }
                    
                </View>
                <View style = {styles.groupView1}>
                    <TouchableOpacity style = {(!this.state.mobile || this.state.mobile == '')? styles.blankView : styles.view1} onPress = {() => this.onClickMobile(this.state.mobile)}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <Label style = {styles.label2}>{this.state.mobile}</Label>
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {(!this.state.businessHours || this.state.businessHours == '')? styles.blankView : styles.view1} onPress = {() => this.onClickBusinessHours(this.state.businessHours)}>
                        <Label style = {styles.label1}>Business Hours</Label>
                        <Label style = {styles.label2}>{this.state.businessHours}</Label>
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {(!this.state.afterHours || this.state.afterHours == '')? styles.blankView : styles.view1} onPress = {() => this.onClickAfterHours(this.state.afterHours)}>
                        <Label style = {styles.label1}>After Hours</Label>
                        <Label style = {styles.label2}>{this.state.afterHours}</Label>
                        <View style = {styles.seperateLine}/>
                    </TouchableOpacity>
                    <View style = {(!this.state.email || this.state.email == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <Label style = {styles.label2}>{this.state.email}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.address1 || this.state.address1 == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <Label style = {styles.label2}>{this.state.address1}</Label>
                        <Label style = {styles.label2}>{this.state.address2}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.backgroundInfo || this.state.backgroundInfo == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <Label style = {styles.label2}>{this.state.backgroundInfo}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView1}>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Belongs to</Label>
                        <Label style = {styles.label2}>{this.state.assignedTo}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {(!this.state.source || this.state.source == '')? styles.blankView : styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <Label style = {styles.label2}>{this.state.source}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Created at</Label>
                        <Label style = {styles.label2}>{this.state.createdAt}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Updated at</Label>
                        <Label style = {styles.label2}>{this.state.updatedAt}</Label>
                        <View style = {styles.seperateLine}/>
                    </View>
                </View>

                <View style = {styles.subView2}>
                    {
                        this.state.subscribed? 
                            <View style = {styles.view1}>
                                <Label style = {styles.label1}>Subscribed to bulk communications</Label>
                                <Label style = {styles.label2}>Yes</Label>
                                <View style = {styles.seperateLine}/>
                            </View> : null
                    }
                    {
                        this.state.property_alerts_subscribed?
                            <View style = {styles.view1}>
                                <Label style = {styles.label1}>Subscribed to Propertt Alerts</Label>
                                <Label style = {styles.label2}>Yes</Label>
                                <View style = {styles.seperateLine}/>
                            </View> : null
                    }   
                    {
                        this.state.sms_subscribed?
                            <View style = {styles.view1}>
                                <Label style = {styles.label1}>Subscribed to SMS</Label>
                                <Label style = {styles.label2}>Yes</Label>
                                <View style = {styles.seperateLine}/>
                            </View> : null
                    }
                    
                </View>
            </View>
        )
    }

    showEidtContactAbout(){
        return(
            <KeyboardAwareScrollView
                ref={ref => this.view = ref}
                style={styles.container1}
                enableOnAndroid
                extraHeight={Platform.OS === "android" ? -500 : undefined}
                scrollEnabled = {false}
            >
                <View style = {styles.groupAddView}>
                    <View style = {styles.categoryView}>
                        {
                            this.showContactGroups() 
                        }
                    </View>
                    <TouchableOpacity style = {styles.addgroupImgView} onPress = {() => this.showAddgroupView()}>
                        <Thumbnail square source = {images.ic_add_group} style = {styles.addgroupImg}/>
                    </TouchableOpacity>
                </View>
                <View style = { styles.groupView1 }>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Name</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ firstname: text })}
                            value = {this.state.firstname}
                            placeholder = "First name"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ lastname: text })}
                            value = {this.state.lastname}
                            placeholder = "Last name"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Title</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ title: text })}
                            value = {this.state.title}
                            placeholder = "Title"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>    
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Company</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ company: text })}
                            value = {this.state.company}
                            placeholder = "Company"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Email</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ email: text })}
                            value = {this.state.email}
                            placeholder = "Email"
                            placeholderTextColor = "#999"
                            keyboardType = 'email-address'
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Business Hours Phone</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ businessHours: text })}
                            value = {this.state.businessHours}
                            placeholder = "Business Hours"
                            placeholderTextColor = "#999"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>After Hours Phone</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ afterHours: text })}
                            value = {this.state.afterHours}
                            placeholder = "After Hours"
                            placeholderTextColor = "#999"
                            keyboardType = 'numeric'
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Mobile</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ mobile: text })}
                            value = {this.state.mobile}
                            placeholder = "Mobile"
                            placeholderTextColor = "#999"
                            keyboardType = 'numeric'
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Fax</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ fax: text })}
                            value = {this.state.fax}
                            placeholder = "Fax"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Address</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ address1: text })}
                            value = {this.state.address1}
                            placeholder = "Address1"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ address2: text })}
                            value = {this.state.address2}
                            placeholder = "Address2"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Suburb</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ suburb: text })}
                            value = {this.state.suburb}
                            placeholder = "Suburb"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ state: text })}
                            value = {this.state.state}
                            placeholder = {this.state.country == 'New Zealand'? "District" : "State"}
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ postcode: text })}
                            value = {this.state.postcode}
                            placeholder = {this.state.country == 'New Zealand'? "Locality" : "Postcode"}
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Country</Label>
                        <Select
                            onSelect = {this.onSelectCountry.bind(this)}
                            defaultText  = {this.state.country_category}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList_country}
                        >
                            <Option value = "Australia" styleText = {styles.optiontxt}>Australia</Option>
                            <Option value = "New Zealand" styleText = {styles.optiontxt}>New Zealand</Option>
                            <Option value = "Other" styleText = {styles.optiontxt}>Other</Option>
                        </Select>
                        {
                            this.state.country_category == 'Other' ?
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ country: text })}
                                value = {this.state.country}
                                placeholder = "Enter Country"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            /> : null
                        }
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Source</Label>
                        <Select
                            onSelect = {this.onSelectSource.bind(this)}
                            defaultText  = {this.state.source}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList}
                        >
                            <Option value = "Website" styleText = {styles.optiontxt}>Website</Option>
                            <Option value = "RealEstate.com.au" styleText = {styles.optiontxt}>RealEstate.com.au</Option>
                            <Option value = "Domain.com.au" styleText = {styles.optiontxt}>Domain.com.au</Option>
                            <Option value = "Other Property Website" styleText = {styles.optiontxt}>Other Property Website</Option>
                            <Option value = "Door knocking" styleText = {styles.optiontxt}>Door knocking</Option>
                            <Option value = "Walk-in" styleText = {styles.optiontxt}>Walk-in</Option>
                            <Option value = "Phone-in" styleText = {styles.optiontxt}>Phone-in</Option>
                            <Option value = "Newspaper" styleText = {styles.optiontxt}>Newspaper</Option>
                            <Option value = "Referral" styleText = {styles.optiontxt}>Referral</Option>
                            <Option value = "Internet" styleText = {styles.optiontxt}>Internet</Option>
                            <Option value = "Signboard" styleText = {styles.optiontxt}>Signboard</Option>
                            <Option value = "Cold-calling" styleText = {styles.optiontxt}>Cold-calling</Option>
                            <Option value = "Letterbox drop" styleText = {styles.optiontxt}>Letterbox drop</Option>
                            <Option value = "Personal contact" styleText = {styles.optiontxt}>Personal contact</Option>
                            <Option value = "Yellow Pages" styleText = {styles.optiontxt}>Yellow Pages</Option>
                            <Option value = "Window display" styleText = {styles.optiontxt}>Window display</Option>
                            <Option value = "Previous client" styleText = {styles.optiontxt}>Previous client</Option>
                            <Option value = "Open house" styleText = {styles.optiontxt}>Open house</Option>
                            <Option value = "Conjunction with other agency" styleText = {styles.optiontxt}>Conjunction with other agency</Option>
                            <Option value = "Drive past" styleText = {styles.optiontxt}>Drive past</Option>
                            <Option value = "Mobile app" styleText = {styles.optiontxt}>Mobile app</Option>
                        </Select>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Subscribed</Label>
                        <TouchableOpacity style = {styles.subscribedView} onPress = {() => this.onNewsletters()}>
                            <Thumbnail square source = {this.state.subscribed? images.ic_checkbox1: images.ic_uncheckbox1} style = {styles.checkimg} />
                            <Text style = {styles.subscribedtxt}>  Receive newsletters/bulk emails</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.subscribedView} onPress = {() => this.onPropertyAlert()}>
                            <Thumbnail square source = {this.state.property_alerts_subscribed? images.ic_checkbox1: images.ic_uncheckbox1} style = {styles.checkimg} />
                            <Text style = {styles.subscribedtxt}>  Receive property alerts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.subscribedView} onPress = {() => this.onSmsmessages()}>
                            <Thumbnail square source = {this.state.sms_subscribed? images.ic_checkbox1: images.ic_uncheckbox1} style = {styles.checkimg} />
                            <Text style = {styles.subscribedtxt}>  Receive SMS messages</Text>
                        </TouchableOpacity>
                        <View style = {styles.seperateLine}/>
                    </View>

                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Background info</Label>
                        <TextInput
                            onFocus={this.handleOnFocus}
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ backgroundInfo: text })}
                            value = {this.state.backgroundInfo}
                            placeholder = "Background info"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            multiline={true}
                            numberOfLines={3}
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.view1}>
                        <Label style = {styles.label1}>Belongs to</Label>
                        <Select
                            onSelect = {this.onSelectBelongsTo.bind(this)}
                            defaultText  = {this.state.assignedTo}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList_belong}
                        >
                            <Option value = {{name: 'Unassigned', id: null}} styleText = {styles.optiontxt}>Unassigned</Option>
                            <Option value = {{name: 'Me', id: this.props.userID}} styleText = {styles.optiontxt}>Me</Option>
                            {
                                this.state.usersList.map((item, index) => {
                                    return(
                                        <Option value = {{name:item.attributes.first_name + ' ' + item.attributes.last_name , id: item.id}} styleText = {styles.optiontxt}>{item.attributes.first_name} {item.attributes.last_name}</Option>
                                    )
                                })
                            }
                        </Select>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <Animated.View style={{height: this.state.keyboardHeight}}/>
                </View>

            </KeyboardAwareScrollView>
        )
    }

    onEachGroup(value) {
        var arr = this.state.contactGroups
        arr.push(value)
        isAddGroup = this.state.isAddGroup
        isAddGroup =! isAddGroup
        this.setState({
            contactGroups: arr,
            isAddGroup: isAddGroup
        })
    }

    onSelectSource(value, label) {
        this.setState({source : value});
    }

    onSelectBelongsTo(value, label) {
        this.setState({
            assignedTo : value.name,
            user_id: value.id
        });
    }

    onSelectCountry(value, label) {
        this.setState({country_category : value});
    }

    onNewsletters() {
        subscribed =! subscribed
        this.setState({ subscribed: subscribed })
    }

    onPropertyAlert() {
        property_alerts_subscribed =! property_alerts_subscribed
        this.setState({ property_alerts_subscribed: property_alerts_subscribed })
    }
    onSmsmessages() {
        sms_subscribed =! sms_subscribed
        this.setState({ sms_subscribed: sms_subscribed})
    }

    showAbout(){
        return(
            this.props.isEdit?
                this.showEidtContactAbout() :
                this.showContactAbout()
        )
    }

    onClickCall() {
        Communications.phonecall(this.state.mobile, true)
        this.setState({ phoneModal: false})
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'addNewNote', params: {noteType: 'Call'}}))
    }

    onClickSMS() {
        Communications.text(this.state.mobile, '')
    }

    render() {
        var params = this.props.contactInfo
        var arr = {
            "first_name" : this.state.firstname,
            "last_name" : this.state.lastname,
            "title": this.state.title,
            "company": this.state.company,
            "business_hours_phone": this.state.businessHours,
            "after_hours_phone": this.state.afterHours,
            "mobile_phone": this.state.mobile,
            "email": this.state.email,
            "address_line_1": this.state.address1,
            "address_line_2": this.state.address2,
            "suburb": this.state.suburb,
            "state": this.state.state,
            "postcode": this.state.postcode,
            "gender": params.data.attributes.gender,
            "solicitor_id": params.data.attributes.solicitor_id,
            "spouse_id": params.data.attributes.spouse_id,
            "country": this.state.country_category == 'Other' ? this.state.country: this.state.country_category,
            "background_info": this.state.backgroundInfo,
            "subscribed": this.state.subscribed,
            "referred_by": this.state.source,
            "sms_subscribed": this.state.sms_subscribed,
            "fax": this.state.fax,
            "dob": params.data.attributes.dob,
            "property_alerts_subscribed": this.state.property_alerts_subscribed,
            "permission_type": params.data.attributes.permission_type,
            "facebook_username": params.data.attributes.facebook_username,
            "linkedin_username": params.data.attributes.linkedin_username,
            "twitter_username": params.data.attributes.twitter_username,
            "photo_url": params.data.attributes.photo_url,
            "jobs": params.data.attributes.jobs,
            "education": params.data.attributes.education,
            "found_phones": params.data.attributes.found_phones,
            "found_addresses": params.data.attributes.found_addresses,
            "found_name": params.data.attributes.found_name,
            "uid": params.data.attributes.uid,
            "user_id": this.state.user_id,
            "unsubscribe_reason": params.data.attributes.unsubscribe_reason,
            "showed_at": params.data.attributes.showed_at,
        }
        var { dispatch } = this.props;
        dispatch ({ type: 'EDIT_CONTACT_ITEM', data: arr})
        dispatch ({ type: 'EDIT_CONTACT_GROUPS_ITEM', data: this.state.contactGroups})
        return (
            <View style = {this.state.isAddGroup? styles.container2: styles.container}>
                {
                    this.showAbout()
                }
                
                {
                    this.state.isAddGroup?
                        <ScrollView  style = {styles.groupAddDialogBox} >
                            {
                                this.props.addGroupsList.map((item, indexe) => {
                                    return(
                                        <TouchableOpacity style = {styles.eachValue} onPress = {() => this.onEachGroup(item)}>
                                            <Text style = {styles.eachAddtxt}>{item.attributes.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    : null
                }
                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.phoneModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        this.setState({ phoneModal: false})
                    }}>
                    <View style = {styles.modalView}>
                        <TouchableOpacity style = {styles.blankModalView} onPress = {() => this.setState({ phoneModal: false}) }>
                        </TouchableOpacity>
                        <View style = {styles.modalMainView}>
                            <TouchableOpacity onPress = {() => this.onClickCall()}>
                                <Text style = {styles.selecttxt}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => this.onClickSMS()}>
                            <Text style = {styles.selecttxt}>Send SMS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
        addGroupsList: state.contacts.default_contactGroup_list,
        usersList: state.user.usersList,
        userID: state.user.user_id,
    }
}

export default connect(mapStateToProps)(ContactAbout)

