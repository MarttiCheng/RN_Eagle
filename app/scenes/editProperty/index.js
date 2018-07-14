import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab, Header
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Modal, TextInput, Platform, Animated, Event
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'

class editProperty extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isAbout: true,
            isProperties: false,
            isActivity: false,
            isTasks: false,
            addModal: false,

            listingInfo: [],
            propertyType: '',
            auctionTime: '',
            expiryDate: '',
            keyNumber: '',
            keyLocation: '',
            alarmCode: '',
            internalNote: '',
            bedRooms: '',
            bathRooms: '',
            garageSpaces: '',
            carportSpaces: '',
            openCarSpaces: '',
            landSize: '',
            floorArea: '',

            keyboardHeight: new Animated.Value(0),
        }  
    }
    
    animateKeyboardHeight = (toValue, duration) => {
        Animated.timing(
            this.state.keyboardHeight,
            {toValue, duration},
        ).start();
    };

    componentWillMount() {
        this.setState({
            listingInfo: this.props.navigation.state.params.info,
            propertyType: this.props.navigation.state.params.info.attributes.property_type,
            auctionTime: this.props.navigation.state.params.info.attributes.auction_datetime,
            expiryDate: this.props.navigation.state.params.info.attributes.listing_expiry_date,
            keyNumber: this.props.navigation.state.params.info.attributes.key_number,
            keyLocation: this.props.navigation.state.params.info.attributes.key_location,
            alarmCode: this.props.navigation.state.params.info.attributes.alarm_code,
            internalNote: this.props.navigation.state.params.info.attributes.internal_notes,
            bedRooms: this.props.navigation.state.params.info.attributes.bedrooms? this.props.navigation.state.params.info.attributes.bedrooms.toString() : null,
            bathRooms: this.props.navigation.state.params.info.attributes.bathrooms? this.props.navigation.state.params.info.attributes.bathrooms.toString() : null,
            garageSpaces: this.props.navigation.state.params.info.attributes.garage_spaces? this.props.navigation.state.params.info.attributes.garage_spaces.toString() : null,
            carportSpaces: this.props.navigation.state.params.info.attributes.carport_spaces? this.props.navigation.state.params.info.attributes.carport_spaces.toString() : null,
            openCarSpaces: this.props.navigation.state.params.info.attributes.car_spaces? this.props.navigation.state.params.info.attributes.car_spaces.toString() : null,
            landSize: this.props.navigation.state.params.info.attributes.land_size? this.props.navigation.state.params.info.attributes.land_size.toString() : null,
            floorArea: this.props.navigation.state.params.info.attributes.commercial_floor_area ? this.props.navigation.state.params.info.attributes.commercial_floor_area.toString() : null,
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

    scrollToInput = (reactNode) => {
        // this.view.scrollToFocusedInput(reactNode)
        this.refs.scroll.scrollToFocusedInput(reactNode)
    };

    handleOnFocus = (e) => {
        if (Platform.OS === "android") {
            this.scrollToInput(ReactNative.findNodeHandle(e.target))
        }
    };

    render() {
        console.log(this.state.listingInfo.attributes)
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <TouchableOpacity style = {styles.backBtn} onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack(); }}>
                        <Thumbnail square source = {images.ic_back_btn} style = {styles.backImg}/>
                    </TouchableOpacity>
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{this.state.listingInfo.attributes.full_address}</Label>
                    <TouchableOpacity >
                        <Label style = {styles.saveTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView
                    ref={ref => this.view = ref}
                    style={styles.mainView}
                    enableOnAndroid
                    extraHeight={Platform.OS === "android" ? -300 : undefined}
                    scrollEnabled = {true}
                ><View style = {{flex: 1}}>
                    <View style = {styles.groupView}>
                        <View style = {!this.state.propertyType? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Property type</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ propertyType: text })}
                                value = {this.state.propertyType}
                                placeholder = "Property type"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View> 
                        <View style = {!this.state.auctionTime? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Auction datetime</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ auctionTime: text })}
                                value = {this.state.auctionTime}
                                placeholder = "Auction datetime"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.expiryDate? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Listing expiry date</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ expiryDate: text })}
                                value = {this.state.expiryDate}
                                placeholder = "Listing expiry date"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.keyNumber? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Key number</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ keyNumber: text })}
                                value = {this.state.keyNumber}
                                placeholder = "Key number"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.keyLocation? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Key location</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ keyLocation: text })}
                                value = {this.state.keyLocation}
                                placeholder = "Key location"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.alarmCode? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Alarm code</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ alarmCode: text })}
                                value = {this.state.alarmCode}
                                placeholder = "Alarm code"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.internalNote? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Internal notes</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ internalNote: text })}
                                value = {this.state.internalNote}
                                placeholder = "Internal notes"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                    </View>
                    <View style = {styles.groupView}>
                        <View style = {!this.state.bedRooms? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Bedrooms</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ bedRooms: text })}
                                value = {this.state.bedRooms}
                                placeholder = "Bedrooms"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.bathRooms? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Bathrooms</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ bathRooms: text })}
                                value = {this.state.bathRooms}
                                placeholder = "Bathrooms"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.garageSpaces? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Garage spaces</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ garageSpaces: text })}
                                value = {this.state.garageSpaces}
                                placeholder = "Garage spaces"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.carportSpaces? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Carport spaces</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ carportSpaces: text })}
                                value = {this.state.carportSpaces}
                                placeholder = "Carport spaces"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.openCarSpaces? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Open car spaces</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ openCarSpaces: text })}
                                value = {this.state.openCarSpaces}
                                placeholder = "Open car spaces"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {!this.state.landSize? styles.blankView : styles.subView1}>
                            <Label style = {styles.label1}>Land size</Label>
                            <TextInput
                                onFocus={(event: Event) => { this._scrollToInput(ReactNative.findNodeHandle(event.target)) } }
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ landSize: text })}
                                value = {this.state.landSize}
                                placeholder = "Land size"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                    </View>
                    <View style = {!this.state.floorArea? styles.blankView : styles.subView1}>
                        <View style = {styles.subView1}>
                            <Label style = {styles.label1}>Floor area</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ floorArea: text })}
                                value = {this.state.floorArea}
                                placeholder = "Floor area"
                                placeholderTextColor = "#999"
                                returnKeyType = "next"
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                    </View>
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(editProperty);