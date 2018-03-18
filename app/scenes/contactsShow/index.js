import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs
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

class contactsShow extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isAbout: true,
            isProperties: false,
            isActivity: false,
            isTasks: false
        }  
    }

    _onAbout = () => {
        this.setState({
            isAbout: true,
            isProperties: false,
            isActivity: false,
            isTasks: false
        })
    }

    _onProperties = () => {
        this.setState({
            isAbout: false,
            isProperties: true,
            isActivity: false,
            isTasks: false
        })
    }

    _onActivity = () => {
        this.setState({
            isAbout: false,
            isProperties: false,
            isActivity: true,
            isTasks: false
        })
    }

    _onTasks = () => {
        this.setState({
            isAbout: false,
            isProperties: false,
            isActivity: false,
            isTasks: true
        })
    }

    showTabView(){
        if(this.state.isAbout){
            return(
                <ContactAbout navigation = {this.props.navigation} info = {this.props.navigation.state.params.info}/>
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

    render() {
        var params = this.props.navigation.state.params
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => { this.props.navigation.goBack() }} />
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>{params.info.first_name} {params.info.last_name}</Label>
                    <TouchableOpacity onPress = {this._onSearch}>
                        <Label style = {styles.editTxt}>Edit</Label>
                    </TouchableOpacity>
                </View>
                <View style = {styles.headerView}>
                    <Thumbnail square source = {params.info.photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
                    <Label style = {styles.nameTxt}>{params.info.first_name} {params.info.last_name}</Label>
                    <Label style = {styles.jobTxt}>{params.info.company}</Label>
                </View>
                
                <View style = {styles.tabTitleView}>
                    <TouchableOpacity style = {styles.tabItem} onPress = {this._onAbout}>
                        <Text style = {styles.tabTxt}>ABOUT</Text>
                        <View style = {this.state.isAbout? styles.tabline : null}/>
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
                    
                </View>
                         
                <Content showsVerticalScrollIndicator = {false}>
                    {this.showTabView()}
                </Content>
                
                <TouchableOpacity style = {styles.addBtn}>
                    <Label style = {styles.addTxt}>+</Label>
                </TouchableOpacity>
            </Container>
        )
    }
}

//make this component available to the app
export default connect()(contactsShow);

