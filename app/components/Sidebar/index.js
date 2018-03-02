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
} from 'native-base'
import styles from './styles'
import images from '../../themes/images'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import listings from '../../scenes/listings/index';
import contacts from '../../scenes/contacts/index';

const datas = [
	{
		name: "Contacts",
		route: "contacts",
        icon: <MaterialCommunityIcons name = 'person_outline' size = {25} color = '#B4BCC8'/>
	},
    {
		name: "Listings",
		route: "listings",
        icon: <MaterialCommunityIcons name = 'home' size = {25} color = '#B4BCC8'/>
	},
    {
		name: "Open Homes",
		route: "home",
        icon: <MaterialCommunityIcons name = 'eye' size = {25} color = '#B4BCC8'/>
	},
    {
		name: "Tasks",
		route: "tasks",
        icon: <MaterialCommunityIcons name = 'check_square' size = {25} color = '#B4BCC8'/>
	},
]
// create a component
class Sidebar extends Component {
    constructor(props) {
		super(props);
		this.state = {
            name:'',
            blob_id:'',
		};
	}
    _onEdit = () => {
        this.props.navigation.navigate('ProfileEdit')
    }

    render() {
        return (
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: 'white'}}>
                    <Content>
                        <List
                            style = {{marginTop:15, paddingBottom: 100, backgroundColor:'white', height: 400}} 
                            dataArray={datas}
                            renderRow={data =>
                                <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)} style = {{height:50, padding:10}}>
                                    <Image source = {data.icon} style = {styles.menuIcon}/>
                                    <Text style = {styles.menuItem}>{data.name}</Text>
                                </ListItem>
                            }
                        >
                        </List>
                    </Content>
                </Content>
            </Container>
        );
    }
}

//make this component available to the app
export default Sidebar;
