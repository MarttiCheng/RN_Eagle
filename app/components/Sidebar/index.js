//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Drawer
} from 'native-base'
import styles from './styles'
import { NavigationActions, Header } from 'react-navigation'
import images from '../../themes/images'
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux'

// create a component
class Sidebar extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
		super(props);
		this.state = {
            
		};
	}

    logOut() {
        var { dispatch } = this.props;
        dispatch ({ type: 'INIT_TOKEN', data: [] })
        dispatch(NavigationActions.navigate({routeName: 'login'}));
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.menuProfileView}>
                    {/*<Thumbnail square source = {images.avatar_john} style = {styles.avartarImg}/>*/}

                    {
                        this.props.user_info.avatar_url == ''?
                        <View style = {styles.avatarView}>
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/> 
                        </View>:
                        <View style = {styles.avatarView}>
                            <Thumbnail square source = {this.props.user_info.avatar_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
                        </View>
                    }

                    <Label style = {styles.nameTxt}>{this.props.user_info.first_name} {this.props.user_info.last_name}</Label>
                    <Label style = {styles.emailTxt}>{this.props.user_info.email}</Label>
                </View>

                <View style = {styles.menuView}>
                    <View style = {styles.submenuView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('contacts')}>
                            <View style = {styles.itemView}>
                                <MaterialIcons name = 'person-outline' size = {33} color = '#B4BCC8'/>
                                <Text style = {styles.menuItem}>Contacts</Text>
                                <View style = {styles.line}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('listings')}>
                            <View style = {styles.itemView}>
                                <FontAwesome name = 'home' size = {33} color = '#B4BCC8'/>
                                <Text style = {styles.menuItem}>Listings</Text>
                                <View style = {styles.line}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                            <View style = {styles.itemView}>
                                <FontAwesome name = 'eye' size = {33} color = '#B4BCC8'/>
                                <Text style = {styles.menuItem}>Open Homes</Text>
                                <View style = {styles.line}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('tasks')}>
                            <View style = {styles.itemView}>
                                <FontAwesome name = 'check-square' size = {33} color = '#B4BCC8'/>
                                <Text style = {styles.menuItem}>Tasks</Text>
                            </View>
                        </TouchableOpacity>

                        
                    </View>
                    <TouchableOpacity style = {styles.logoutView} onPress = {() => this.logOut()}>
                        <Text style = {styles.logoutTxt}>Log Out</Text>
                    </TouchableOpacity> 
                </View>                
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        contacts: state.contacts.contacts,
        user_info: state.user.user_info,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(Sidebar);
