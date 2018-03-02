import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, DrawerNavigator } from 'react-navigation'
import login from '../scenes/login/index';
import contacts from '../scenes/contacts/index';
import contactsShow from '../scenes/contactsShow/index';

import listings from '../scenes/listings/index';
import home from '../scenes/home/index';
import tasks from '../scenes/tasks/index';
import Sidebar from '../components/Sidebar/index';

const Drawer = DrawerNavigator(
    {   
        contacts: { screen: contacts },
        listings: { screen: listings},
        home: { screen: home },
        tasks: { screen: tasks },
    },
    {
        initialRouterName: 'contacts',
        contentOptions: {
            activeTintColor: 'red'
        },
        contentComponent: props => <Sidebar {...props}/>
    }
);


export const AppNavigator = StackNavigator({
    login: { screen: login },
    contacts: { screen: contacts },
    contactsShow: { screen: contactsShow },
    // Drawer: { screen: Drawer },
    
});

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