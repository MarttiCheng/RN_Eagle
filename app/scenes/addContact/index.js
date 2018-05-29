import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Modal, Animated, Platform, TextInput
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { updateContact, updateContactGroup, createNewContact } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";
import Icon1 from 'react-native-vector-icons/Ionicons';
import reactNativeTextinputEffects from 'react-native-textinput-effects';

var isAddGroup = false
var property_alerts_subscribed = true;
var sms_subscribed = true;
var subscribed = true;

var addGroupsList = [
    'buyer', 'landlord', 'tenant', 'vendor', 'vendor-past', 'investor', 'looking to rent', 'out of market', 
    'automatic emails', 'automatic emails - buyer', 'automatic emails - prospective vendor','automatic emails - looking to rent', 
    'automatic emails - prospective landlord', 'hot', 'cold', 'simpsons', 'appraisal', 'appraisal lost'
]

class addContact extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
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
            assignedTo: 'Me',
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
            isLoading: false,
        }
    }

    componentWillMount() {
        if (Platform.OS === "android") {
            this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", ({endCoordinates}) => {
                this.animateKeyboardHeight(150, 0)
            });
            this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
                this.animateKeyboardHeight(0, 300)
            })
        }
    }

    animateKeyboardHeight = (toValue, duration) => {
        Animated.timing(
            this.state.keyboardHeight,
            {toValue, duration},
        ).start();
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
                            <Label style = {[styles.categoryItemTxt, {marginLeft: 0}]}>{item}</Label>
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

    onSelectCountry(value, label) {
        this.setState({country_category : value});
    }

    onSelectBelongsTo(value, label) {
        this.setState({assignedTo : value});
    }

    onSelectSource(value, label) {
        this.setState({source : value});
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
    
    onSaveContact() {
        console.log('save')
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
            "gender": null,
            "solicitor_id": null,
            "spouse_id": null,
            "country": this.state.country_category == 'Other' ? this.state.country: this.state.country_category,
            "background_info": this.state.backgroundInfo,
            "subscribed": this.state.subscribed,
            "referred_by": this.state.source,
            "sms_subscribed": this.state.sms_subscribed,
            "fax": this.state.fax,
            "dob": null,
            "property_alerts_subscribed": this.state.property_alerts_subscribed,
            "permission_type": null,
            "facebook_username": null,
            "linkedin_username": null,
            "twitter_username": null,
            "photo_url": null,
            "jobs": null,
            "education": null,
            "found_phones": null,
            "found_addresses": null,
            "found_name": null,
            "uid": null,
            "unsubscribe_reason": null,
            "showed_at": null,
        }
        this.setState({ isLoading: true })
        createNewContact(this.props.token, this.props.userID, arr).then(data => {
           console.log('okkkkkkk')
           console.log(data)
           this.setState({ 
                isLoading: false,
                // isEdit: false
            })
            // this.props.contact_group.data = data.data
        })
    }

    onCancel(){
        Keyboard.dismiss(); 
        this.props.navigation.goBack()
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack() }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <View style = {styles.titleView}>
                        <Label style = {styles.title}>Add new contact</Label>
                    </View>
                    <TouchableOpacity style = {{width: 45, height: 45}}/>
                </View>
                
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 10, marginBottom: 10}}/> :
                
                    <ScrollView style = {{flex: 1}}>
                        <View style = {this.state.isAddGroup? styles.container2: styles.container}>
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
                                        keyboardType = 'numeric'
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
                                        <Option value = "Unassigned" styleText = {styles.optiontxt}>Unassigned</Option>
                                        <Option value = "Me" styleText = {styles.optiontxt}>Me</Option>
                                    </Select>
                                    <View style = {styles.seperateLine}/>
                                </View>
                                <View style = {styles.saveView}>
                                    <Button transparent style = {styles.saveBtn} onPress = {() => this.onSaveContact()}>
                                        <Text style = {styles.saveTxt}>Save Contact</Text>
                                    </Button>
                                    <Button transparent style = {styles.cancelBtn} onPress = {() => this.onCancel()}>
                                        <Text style = {styles.cancelTxt}>Cancel</Text>
                                    </Button>
                                </View>
                                <Animated.View style={{height: this.state.keyboardHeight}}/>
                            </View>
                            
                            {
                                this.state.isAddGroup?
                                    <ScrollView  style = {styles.groupAddDialogBox} >
                                        {
                                            addGroupsList.map((item, indexe) => {
                                                return(
                                                    <TouchableOpacity style = {styles.eachValue} onPress = {() => this.onEachGroup(item)}>
                                                        <Text style = {styles.eachAddtxt}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                : null
                            }
                        </View>
                    </ScrollView>
                }
                
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_group: state.contacts.contact_groups,
        edit_contact_item: state.contacts.edit_contact_item,
        userID: state.user.user_id,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(addContact);

