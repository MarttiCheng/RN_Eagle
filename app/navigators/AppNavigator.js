import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, DrawerNavigator } from 'react-navigation'
import login from '../scenes/login/index';
import contacts from '../scenes/contacts/index';
import contactsShow from '../scenes/contactsShow/index';


export const AppNavigator = StackNavigator({
    login: { screen: login },
    contacts: { screen: contacts },
    contactsShow: { screen: contactsShow },
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