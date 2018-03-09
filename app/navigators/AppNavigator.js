import React from 'react'
import { connect } from 'react-redux'
var { Router, Scene } = require('react-native-router-flux');
import { StackNavigator, addNavigationHelpers, DrawerNavigator } from 'react-navigation'
import login from '../scenes/login/index';
import contacts from '../scenes/contacts/index';
import contactsShow from '../scenes/contactsShow/index';
import listings from '../scenes/listings/index';
import home from '../scenes/home/index';
import tasks from '../scenes/tasks/index';
import Sidebar from '../components/Sidebar/index';
import listingsShow from '../scenes/listingsShow/index';

const Drawer = DrawerNavigator(
    {
        contacts: { screen: contacts },
        listings: { screen: listings},
        home: { screen: home },
        tasks: { screen: tasks },
    },
    {
        initialRouteName: 'contacts',
        headerMode: 'screen',
        contentComponent: props => <Sidebar {...props}/>
    }
);


export const AppNavigator = StackNavigator({
    login: { screen: login },
    contactsShow: { screen: contactsShow },
    Drawer: { screen: Drawer },
    listingsShow: { screen: listingsShow },
    },{
        headerMode: 'none',
    }
);

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({
        dispatch, 
        state: nav,
        })}
    />
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);