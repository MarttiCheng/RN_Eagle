import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab, Header
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Modal, TextInput, Platform, Animated, Event, Dimensions, Alert
} from 'react-native'
import { MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'
import {Select, Option} from "react-native-chooser";
import DatePicker from 'react-native-datepicker'
import MultiSelect from 'react-native-multiple-select';

const { width, height } = Dimensions.get('window')
STATUSES = ["Draft",
            "Active",
            "Off Market",
            "Withdrawn",
            "Sold",
            "Under Offer"];

 RENTAL_STATUSES = ["Draft",
                    "Active",
                    "Deleted",
                    "Let",
                    "Off Market",
                    "Withdrawn",
                    "Under Offer"];

 COMMERCIAL_STATUSES = ["Draft",
                        "Active",
                        "Deleted",
                        "Let",
                        "Off Market",
                        "Sold",
                        "Under Offer"];

 TYPES = ["Acreage/Semi-Rural",
        "Apartment",
        "Block Of Units",
        "Duplex",
        "Semi-detached",
        "Flat",
        "House",
        "Retirement Living",
        "Serviced Apartment",
        "Studio",
        "Terrace",
        "Townhouse",
        "Unit",
        "Villa",
        "Warehouse"];
 HOLIDAY_TYPES = [  "House",
                    "Alpine",
                    "Apartment",
                    "Backpacker-Hostel",
                    "Bed And Breakfast",
                    "Campground",
                    "Caravan-Holiday Park",
                    "Duplex Semi-detached",
                    "Executive Rental",
                    "Farm Stay",
                    "Flat",
                    "Hotel",
                    "House Boat",
                    "Lodge",
                    "Motel",
                    "Resort",
                    "Retreat",
                    "Self Contained Cottage",
                    "Serviced Apartment",
                    "Studio",
                    "Terrace",
                    "Townhouse",
                    "Unit",
                    "Villa",
                    "Other"];
COMMERCIAL_TYPES = ["Commercial Farming",
                    "Land/Development",
                    "Hotel/Leisure",
                    "Industrial/Warehouse",
                    "Medical/Consulting",
                    "Offices",
                    "Retail",
                    "Showrooms/Bulky Goods",
                    "Other"];
BUSINESS_TYPES = ["Accommodation/Tourism",
                    'Aged Care',
                    'Backpacker/Hostel',
                    'Boarding Kennels',
                    'Caravan Park',
                    'Function Centre',
                    'Guest House/B&B',
                    'Hotel' ,
                    'Management Rights',
                    'Motel' ,
                    'Resort' ,
                    'Retirement Village' ,
                    'Theme Park' ,
                    'Tours' ,
                    'Farm Stays' ,
                    'Self-contained' ,
                    'Transportation' ,
                    'Automotive',
                    'Accessories/Parts' ,
                    'Aeronautical' ,
                    'Auto Electrical' ,
                    'Bike and Motorcycle' ,
                    'Car Dealership' ,
                    'Car Rental' ,
                    'Car Wash' ,
                    'Vehicle Detailing' ,
                    'Driving Schools' ,
                    'Boats/Marine' ,
                    'Mechanical Repair' ,
                    'Panel Beating' ,
                    'Service Station' ,
                    'Truck' ,
                    'Wreckers' ,
                    'Beauty/Health',
                    'Beauty Products' ,
                    'Beauty Salon' ,
                    'Dental' ,
                    'Hair Salon' ,
                    'Hospital' ,
                    'Medical' ,
                    'Nail Salon' ,
                    'Nursing Home' ,
                    'Massage' ,
                    'Health Spa' ,
                    'Medical Practice' ,
                    'Natural Therapies' ,
                    'Sport Complex/Gym' ,
                    'Education/Training',
                    'Child Care' ,
                    'Employment/Recruitment' ,
                    'Educational' ,
                    'Training/RTO' ,
                    'Food/Hospitality',
                    'Alcohol/Liquor' ,
                    'Bakery' ,
                    'Butcher' ,
                    'Cafe/Coffee Shop' ,
                    'Catering' ,
                    'Convenience Store' ,
                    'Deli' ,
                    'Distributors' ,
                    'Fruit/Veg' ,
                    'Juice Bar' ,
                    'Manufacturers' ,
                    'Restaurant' ,
                    'Retailer' ,
                    'Supermarket' ,
                    'Takeaway Food' ,
                    'Wholesalers' ,
                    'Winery' ,
                    'Home/Garden',
                    'Home Based/Work from Home' ,
                    'Homewares/Hardware' ,
                    'Irrigation Services' ,
                    'Gardening' ,
                    'Nursery' ,
                    'Import/Export/Whole',
                    'Freight' ,
                    'Customs' ,
                    'Import' ,
                    'Export' ,
                    'Wholesale' ,
                    'Industrial/Manufacturing',
                    'Building and Construction' ,
                    'Civil' ,
                    'Clothing/Footwear' ,
                    'Electrical' ,
                    'Food/Beverage' ,
                    'Furniture/Timber' ,
                    'Glass/Ceramic' ,
                    'Machinery/Metal' ,
                    'Manufacturing/Engineering' ,
                    'Mining/Earth Moving' ,
                    'Oil/Gas' ,
                    'Paper/Printing' ,
                    'Plastic' ,
                    'Water' ,
                    'Welding' ,
                    'Leisure/Entertainment',
                    'Adult' ,
                    'Aircraft' ,
                    'Amusements' ,
                    'Aquatic/Marine' ,
                    'Arts/Crafts' ,
                    'Bars/Nightclubs' ,
                    'Function Centre' ,
                    'Gambling' ,
                    'Garden/Nurseries' ,
                    'Hotel' ,
                    'Music/Video' ,
                    'Recreation/Sport' ,
                    'Vending Machines' ,
                    'Professional',
                    'Accounting' ,
                    'Advertising/Marketing' ,
                    'Bookkeeping' ,
                    'Brokerage' ,
                    'Civil' ,
                    'Communications' ,
                    'Computer/IT' ,
                    'Finance' ,
                    'Insurance' ,
                    'Online Business' ,
                    'Legal' ,
                    'Media' ,
                    'Medical' ,
                    'Property/Real Estate' ,
                    'Recruitment' ,
                    'Scientific' ,
                    'Security' ,
                    'Travel' ,
                    'Retail',
                    'Clothing/Accessories' ,
                    'Entertainment/Tech' ,
                    'Florist/Nursery' ,
                    'Food/Beverage' ,
                    'Health/Beauty' ,
                    'Homeware/Hardware' ,
                    'Newsagency/Tatts' ,
                    'Office Supplies' ,
                    'Animal related' ,
                    'Pharmacies' ,
                    'Post Offices' ,
                    'Vending Machines' ,
                    'Jewellers' ,
                    'Sports' ,
                    'Rural',
                    'Aerial' ,
                    'Agricultural' ,
                    'Aquaculture' ,
                    'Crop Harvesting' ,
                    'Dairy Farming' ,
                    'Farming' ,
                    'Fertiliser' ,
                    'Fishing/Forestry' ,
                    'Fruit Picking' ,
                    'Hunting/Trap' ,
                    'Insemination' ,
                    'Irrigation Services' ,
                    'Land Clearing' ,
                    'Livestock' ,
                    'Clearing Sale',
                    'Machinery' ,
                    'Mustering' ,
                    'Shearing' ,
                    'Wool Classing' ,
                    'Services',
                    'Aircraft' ,
                    'Alarms' ,
                    'Animal related' ,
                    'Boats/Marine' ,
                    'Car/Bus/Truck' ,
                    'Cleaning' ,
                    'Communication' ,
                    'Copy/Laminate' ,
                    'Courier' ,
                    'Driving Schools' ,
                    'Entertainment' ,
                    'Garden/Household' ,
                    'Hire/Rent' ,
                    'Limousine/Taxi' ,
                    'Machinery' ,
                    'Medical' ,
                    'Mobile Services' ,
                    'Pest related' ,
                    'Pool/Water' ,
                    'Print/Photo' ,
                    'Repair' ,
                    'Car Park/Parking Space' ,
                    'Transport/Distribution',
                    'Bus' ,
                    'Car Freight' ,
                    'Rail' ,
                    'Road' ,
                    'Sea Freight' ,
                    'Taxi/Limousine' ,
                    'Truck Freight',
                    'Storage Sheds'];
 RURAL_TYPES = ["Cropping",
                "Dairy",
                "Farmlet",
                "Horticulture",
                "Livestock",
                "Viticulture",
                "Mixed Farming",
                "Lifestyle",
                "Other"];
items = [{
    id: '92iijs7yta',
    name: 'John Smith',
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Sandra Sully',
  }, {
    id: '16hbajsabsd',
    name: 'Marg Jones',
}];

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
            vendorName: null,
            vendorId: null,
            listingInfo: [],
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
            status: '',
            propertyType: '',
            keyboardHeight: new Animated.Value(0),
            selectedItems : [],
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
            status: this.props.navigation.state.params.info.attributes.status,
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected_contactForTask.length != 0){
            this.setState({
                vendorName: nextProps.selected_contactForTask.attributes.first_name + ' ' + nextProps.selected_contactForTask.attributes.last_name,
                vendorId: nextProps.selected_contactForTask.id,
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

    onSelectStatus(value) {
        this.setState({status: value});
    }

    onSelectProperty(value) {
        this.setState({propertyType: value})
    }

    showStatusSelectTextFiled(listing_type) {
        if(listing_type == 'residential_sale' || listing_type == 'rural' || listing_type == 'business'){
            return(
                <Select
                    onSelect = {this.onSelectStatus.bind(this)}
                    defaultText  = {this.state.status}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {styles.optionList_status}
                >  
                    {
                        STATUSES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        if(listing_type == 'residential_rental'){
            return (
                <Select
                    onSelect = {this.onSelectStatus.bind(this)}
                    defaultText  = {this.state.status}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {[styles.optionList_status, {height: 315}]}
                >  
                    {
                        RENTAL_STATUSES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        if(listing_type == 'commercial'){
            return (
                <Select
                    onSelect = {this.onSelectStatus.bind(this)}
                    defaultText  = {this.state.status}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {[styles.optionList_status, {height: 315}]}
                >  
                    {
                        COMMERCIAL_STATUSES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
    }

    showPropertySelectTextFiled(listing_type) {
        if(listing_type == 'residential_sale' || listing_type == 'residential_rental'){
            return(
                <Select
                    onSelect = {this.onSelectProperty.bind(this)}
                    defaultText  = {this.state.propertyType}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {styles.optionList_property}
                >  
                    {
                        TYPES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        if(listing_type == 'residential_rental' && this.state.listingInfo.attributes.holiday){
            return (
                <Select
                    onSelect = {this.onSelectProperty.bind(this)}
                    defaultText  = {this.state.propertyType}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {styles.optionList_property}
                >  
                    {
                        HOLIDAY_TYPES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        if(listing_type == 'rural'){
            return(
                <Select
                    onSelect = {this.onSelectProperty.bind(this)}
                    defaultText  = {this.state.propertyType}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {styles.optionList_property}
                >  
                    {
                        RURAL_TYPES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        if(listing_type == 'business'){
            return(
                <Select
                    onSelect = {this.onSelectProperty.bind(this)}
                    defaultText  = {this.state.propertyType}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {styles.optionList_property}
                >  
                    {
                        BUSINESS_TYPES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        if(listing_type == 'commercial'){
            return(
                <Select
                    onSelect = {this.onSelectProperty.bind(this)}
                    defaultText  = {this.state.propertyType}
                    style = {styles.selectoptionView}
                    textStyle = {styles.selectedTxt}
                    backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                    transparent = {true}
                    optionListStyle = {styles.optionList_property}
                >  
                    {
                        COMMERCIAL_TYPES.map((item, index) => {
                            return(
                                <Option key = {index} value = {item} styleText = {styles.optiontxt}>{item}</Option>
                            )
                        })
                    }
                </Select>
            )
        }   
    }

    onSelectVendor() {
        var { dispatch } = this.props
        dispatch(NavigationActions.navigate({routeName: 'contactsIndex'}))
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    onDelete() {
        Alert.alert(
            '',
            'Are you sure you want to delete?',
            [
                {text: 'OK', onPress: () => { console.log('Pressed cancel button') }},
                {text: 'CANCEL', onPress: () => { console.log('Pressed cancel button') }},
            ],
            { cancelable: false }
        )
    }

    render() {
        const { selectedItems } = this.state;
        var listing_type = this.state.listingInfo.attributes.listing_type
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
                    showsVerticalScrollIndicator = {false}
                >
                    <View style = {styles.subView}>
                        <MultiSelect
                            hideTags
                            items={items}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Listing Agents"
                            searchInputPlaceholderText="Search agents..."
                            onChangeInput={ (text)=> console.log(text)}
                            fontSize = {18}
                            textColor = "black"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
                        <View>
                            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                        </View>
                        <View style = {styles.seperateLine}/>
                    </View>
                    <View style = {styles.groupView}>
                        <View style = {styles.subView1}>
                            <Label style = {styles.label1}>Status</Label>
                            {
                                this.showStatusSelectTextFiled(listing_type)
                            }
                            <View style = {styles.seperateLine}/>
                        </View>
                        <TouchableOpacity style = {styles.subView1}  onPress = {() => this.onSelectVendor()}>
                            <Label style = {this.state.vendorName? styles.label3 : styles.label2}>Vendor/s name</Label>
                            {
                                this.state.vendorName? <Label style = {styles.vendorTxt}>{this.state.vendorName}</Label> : null
                            }
                            <View style = {styles.seperateLine}/>
                        </TouchableOpacity>
                        <View style = {styles.subView1}>
                            <Label style = {styles.label1}>Property type</Label>
                            {
                                this.showPropertySelectTextFiled(listing_type)
                            }
                            <View style = {styles.seperateLine}/>
                        </View> 
                        <View style = {styles.subView1}>
                            <Label style = {styles.label1}>Auction datetime</Label>
                            <DatePicker
                                style={{width: width - 30}}
                                date={this.state.auctionTime}
                                mode="datetime"
                                format="MMM Do YYYY h:mm a"
                                minDate="1970-05-01"
                                maxDate="2030-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: styles.dateTxt
                                }}
                                onDateChange={(date) => {this.setState({auctionTime: date});}}
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {styles.subView1}>
                            <Label style = {styles.label1}>Listing expiry date</Label>
                            <DatePicker
                                style={{width: width - 30}}
                                date={this.state.expiryDate}
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate="1970-05-01"
                                maxDate="2030-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: styles.dateTxt
                                }}
                                onDateChange={(date) => {this.setState({expiryDate: date});}}
                            />
                            <View style = {styles.seperateLine}/>
                        </View>
                        <View style = {styles.subView1}>
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
                        <View style = {styles.subView1}>
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
                        <View style = {styles.subView1}>
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
                        <View style = {styles.subView1}>
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
                    <TouchableOpacity style = {styles.deleteView} onPress = {() => this.onDelete()}>
                        <FontAwesome name = 'trash' size = {20} color = 'white' />
                        <Label style = {styles.deleteTxt}>  Delete listing</Label>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        selected_contactForTask: state.contacts.selected_contactForTask,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(editProperty);