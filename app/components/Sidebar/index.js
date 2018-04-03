//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import {
    Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
	Label,
    Thumbnail,
} from 'native-base'
import styles from './styles'
import images from '../../themes/images'
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons'
import listings from '../../scenes/listings/index';
import contacts from '../../scenes/contacts/index';
import login from '../../scenes/login/index';
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

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.menuProfileView}>
                    <Thumbnail square source = {images.avatar_john} style = {styles.avartarImg}/>
                    <Label style = {styles.nameTxt}>Luke Paverd</Label>
                    <Label style = {styles.emailTxt}>luke@eaglesoftware.com.au</Label>
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
                </View>                
            </View>
        );
    }
}

//make this component available to the app
export default connect()(Sidebar);
