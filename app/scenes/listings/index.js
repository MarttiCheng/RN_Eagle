import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Drawer
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity, Animated, Platform, Modal
} from 'react-native'
import styles from './styles'
import images from '../../themes/images'
import Search from 'react-native-search-box';
import { NavigationActions, Header } from 'react-navigation'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Font } from 'expo'
import { getProperties, getThumbnailUrl } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import {Select, Option} from "react-native-chooser";
import SelectAddPropertyModal from '../../components/SelectAddPropertyModal'

class listings extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            searchText: '',
            listingsList: [],
            search_listingsList: [],
            y1: new Animated.Value((Platform.OS == 'ios')? -40: -28),
            scale1: new Animated.Value(0.001),
            display: 'All listings',
            group: 'All type',
            addModal: false,
        }   
    }

    componentWillMount() {
        var list = []
        getProperties(this.props.token).then(data => {
            this.setState({
                isLoading: false,
                listingsList: data.data,
                search_listingsList: data.data,
            })
        })
    }

    clickListing(item, index) {
        var { dispatch } = this.props;
        dispatch ({ type: 'GET_LISTINGS', data: item})
        dispatch(NavigationActions.navigate({routeName: 'listingsShow', params: {info: item}}))
    }

    showForSale(item){
        if(item.attributes.listing_type == "residential_rental"){
            return(
                <Label style = {styles.saleTxt}>For Rent</Label>
            )
        }
        else if(item.listing_type == 'commercial' && item.commercial_listing_type == "commercial_lease"){
            return(
                <Label style = {styles.saleTxt}>For Rent</Label>
            )
        }
        else if(item.commercial_listing_type == "commercial_sale_and_lease"){
            return(
                <Label style = {styles.saleTxt}>For Sale And Rent</Label>
            )
        }
        else {
            return(
                <Label style = {styles.saleTxt}>For Sale</Label>
            )
        }
    }

    capitalizeListingTypeTag(text){
        var res = text.split('_')
        var newRes = []
        for(var i = 0 ; i < res.length ; i++){
            newRes.push(res[i].charAt(0).toUpperCase() + res[i].slice(1))
        }
        return newRes.join(' ')
    }

    renderRow(item, index) {
        return(
            <TouchableOpacity key = {index} onPress = {() => this.clickListing(item, index)}>
                <View style = {styles.rowView}>
                    {
                        item.attributes.thumbnail?<Thumbnail square source = {{uri:item.attributes.thumbnail }} style = {styles.avatarImg} defaultSource = {images.placeholderImage}/> :
                        <Thumbnail square style = {styles.avatarImg} source = {images.placeholderImage}/>
                    }
                    
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>{item.attributes.full_address}</Label>
                        <View style = {styles.tagView}>
                            <View style = {styles.eachtag}>
                                <Label style = {styles.labeltag}>{this.capitalizeListingTypeTag(item.attributes.listing_type)}</Label>
                            </View>
                            <View style = {styles.eachtag}>
                                <Label style = {styles.labeltag}>{this.capitalizeListingTypeTag(item.attributes.property_type)}</Label>
                            </View>
                        </View>
                    </View>
                    {
                        this.showForSale(item)
                    }
                    <View style = {styles.line}/>
                </View>
            </TouchableOpacity>
        )
    }

    filterStates = (value) => {
        if(value){
            this.setState({
                search_listingsList: this.state.listingsList.filter(item => item.attributes.full_address.toLowerCase().includes(value.toLowerCase())),
            })
        }
        else {
            this.setState({
                search_listingsList: this.state.listingsList,
            })
        }
    }

    onSelectDisplay(value, label) {
        this.setState({ 
            display : value 
        });
    }

    onSelectGroup(value, label) {
        this.setState({ 
            group: value,
        })
    }

    onFilter() {
        Animated.parallel([
            Animated.timing(                  
                this.state.y1,            
                {
                    toValue: (Platform.OS == 'ios')? 64: 76,                    
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
            group: 'All Groups'
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
    }

    addNewListing() {
        this.setState({ addModal: true })
    }

    onClickedNewNote() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewNote', params: {noteType: 'General'}}))
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
    
    onClickedNewInspectionAttendee() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewInspection'}))
    }

    onClickedNewInspectionTime() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewInspection'}))
    }

    onClickedNewOffer() {
        var { dispatch } = this.props;
        this.setState({ addModal: false })
        dispatch(NavigationActions.navigate({routeName: 'addNewOffer'}))
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'menu' size = {25} color = 'white'  style = {{marginLeft: 10}}
                                onPress={ () => { this.props.navigation.navigate('DrawerOpen') }} />
                    <Label style = {styles.title}>Listings</Label>
                    <TouchableOpacity onPress = {() => this.onFilter()}>
                        <Thumbnail square source = {images.ic_filter} style = {{width: 18, height: 18, marginRight: 15}} />
                    </TouchableOpacity>
                </View>
                <Content showsVerticalScrollIndicator = {false}>
                    <View style = {styles.searchBoxView}>
                        <Search
                            ref = 'search'
                            titleCancelColor = 'black'
                            backgroundColor = 'lightgray'
                            
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
                        this.state.search_listingsList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                </Content>
                <TouchableOpacity style = {styles.addBtn} onPress = {() => this.addNewListing()}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>
                
                <Animated.View style={[styles.filterView, {transform: [ {translateY: this.state.y1},{scaleY: this.state.scale1}]}]}>
                    <Text style = {styles.displayTxt}>Status</Text>
                    <View style = {styles.dropView1}>
                        <Thumbnail square source = {images.ic_arrowdown} style = {styles.arrowImg}/>
                        <Select
                            onSelect = {this.onSelectDisplay.bind(this)}
                            defaultText  = {this.state.display}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList}
                        >
                            <Option value = "Draft" styleText = {styles.optiontxt}>Draft</Option>
                            <Option value = "Active" styleText = {styles.optiontxt}>Active</Option>
                            <Option value = "Sold" styleText = {styles.optiontxt}>Sold</Option>
                            <Option value = "Leased" styleText = {styles.optiontxt}>Leased</Option>
                            <Option value = "Withdrawn" styleText = {styles.optiontxt}>Withdrawn</Option>
                        </Select>
                    </View>
                    
                    <Text style = {styles.groupTxt}>Type</Text>
                    <View style = {styles.dropView1}>
                        <Thumbnail square source = {images.ic_arrowdown} style = {styles.arrowImg}/>
                        <Select
                            onSelect = {this.onSelectGroup.bind(this)}
                            defaultText  = {this.state.group}
                            style = {styles.selectoptionView}
                            textStyle = {styles.selectedTxt}
                            backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                            transparent = {true}
                            optionListStyle = {styles.optionList1}
                        >   
                            <Option value = "Residential Sale" styleText = {styles.optiontxt}>Residential Sale</Option>
                            <Option value = "Residential Rental" styleText = {styles.optiontxt}>Residential Rental</Option>
                            <Option value = "Land" styleText = {styles.optiontxt}>Land</Option>
                            <Option value = "Rural" styleText = {styles.optiontxt}>Rural</Option>
                            <Option value = "Commercial" styleText = {styles.optiontxt}>Commercial</Option>
                            <Option value = "Businesses" styleText = {styles.optiontxt}>Businesses</Option>
                        </Select>
                    </View>

                    <View style = {styles.filterButtonsView}>
                        <Button transparent style = {styles.clearBtn} onPress = {() => this.onClearFilter()}>
                            <Text style = {styles.clearTxt}>CANCEL</Text>
                        </Button>
                        <Button transparent style = {styles.saveBtn} onPress = {() => this.onSaveFilter()}>
                            <Text style = {styles.clearTxt}>SAVE FILTER</Text>
                        </Button>
                    </View>
                </Animated.View>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.addModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        this.setState({ addModal: false })
                    }}>
                    <SelectAddPropertyModal 
                        onClickedBack = {() => this.setState({ addModal: false })} 
                        onClickedNewNote = {() => this.onClickedNewNote()}
                        onClickedNewTask = {() => this.onClickedNewTask()}
                        onClickedNewEnquiry = {() => this.onClickedNewEnquiry()}
                        onClickedNewInspectionAttendee = {() => this.onClickedNewInspectionAttendee()}
                        onClickedNewInspectionTime = {() => this.onClickedNewInspectionTime()}
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
    }
}

//make this component available to the app
export default connect(mapStateToProps)(listings);