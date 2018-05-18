import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
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
import { updateContact } from '../../actions'
import { BallIndicator } from 'react-native-indicators'

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
            isLoading: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        var isEdit = this.state.isEdit
        this.setState({
            isEdit: false
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
                <ContactAbout navigation = {this.props.navigation} isEdit = {this.state.isEdit}/>
            )
        }
        if(this.state.isRelated){
            return(
                <ContactRelated navigation = {this.props.navigation}/>
            )
        }
        if(this.state.isProperties){
            return(
                <ContactProperties navigation = {this.props.navigation}/>
            )
        }
        if(this.state.isActivity){
            return(
                <ContactActivity navigation = {this.props.navigation}/>
            )
        }
        if(this.state.isTasks){
            return(
                <ContactTask navigation = {this.props.navigation}/>
            )
        }
    }

    showCompany(){
        var params = this.props.contact_group
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
            this.setState({ isLoading: true})
            updateContact(this.props.token, this.props.contact_group.data.id, arr).then(data => {
                this.setState({ 
                    isLoading: false,
                    isEdit: false
                })
                this.props.contact_group.data = data.data
            })
        }
        else {
            this.setState({
                isEdit: true
            })
        }
    }

    render() {
        var params = this.props.contact_group
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
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
                                            <Text style = {styles.tabTxt}>Related</Text>
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

                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => { Keyboard.dismiss(); this.props.navigation.goBack(); this.setState({ isEdit: false }) }} />
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{params.data.attributes.first_name} {params.data.attributes.last_name}</Label>
                    
                    <TouchableOpacity onPress = {() => this._onEdit()}>
                        {
                            this.state.isAbout? 
                            <Label style = {styles.editTxt}>{this.state.isEdit? "Save" : "Edit" }</Label> : <Label style = {styles.editTxt}></Label>
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style = {styles.addBtn}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>

                {
                     this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {styles.indicator}/> : null
                }
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_group: state.contacts.contact_groups,
        edit_contact_item: state.contacts.edit_contact_item
    }
}

//make this component available to the app
export default connect(mapStateToProps)(contactsShow);

