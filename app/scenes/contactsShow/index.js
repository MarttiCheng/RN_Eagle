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
    static navigationOptions = ({ navigation, screenProps }) => ({
        title:  navigation.state.params.info.name,
        headerStyle: {
            backgroundColor: '#2B3643'
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        headerLeft: <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white' style = {{marginLeft: 10}}
                                onPress={ () => { navigation.goBack() }} />,
        headerRight: <TouchableOpacity>
                        <Label style = {{color: 'white', marginRight: 10, fontSize: 15}}>Edit</Label>
                    </TouchableOpacity>
    });

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
                <View style = {{ backgroundColor: 'white'}}>
                    <ContactAbout navigation = {this.props.navigation}/>
                </View>
            )
        }
        if(this.state.isProperties){
            return(
                <View style = {{ backgroundColor: 'white'}}>
                    <ContactProperties navigation = {this.props.navigation}/>
                </View>
            )
        }
        if(this.state.isActivity){
            return(
                <View style = {{ backgroundColor: 'white'}}>
                    <ContactActivity navigation = {this.props.navigation}/>
                </View>
            )
        }
        if(this.state.isTasks){
            return(
                <View style = {{ backgroundColor: 'white'}}>
                    <ContactTask navigation = {this.props.navigation}/>
                </View>
            )
        }
    }

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Content>
                    <View style = {styles.headerView}>
                        <Thumbnail square source = {this.props.navigation.state.params.info.avatar} style = {styles.avatarImg}/>
                        <Label style = {styles.nameTxt}>{this.props.navigation.state.params.info.name}</Label>
                        <Label style = {styles.jobTxt}>{this.props.navigation.state.params.info.job}</Label>
                    </View>
                    <View>
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
                        {this.showTabView()}
                    </View>
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