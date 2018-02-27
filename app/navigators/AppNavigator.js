import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import login from '../scenes/login/index';
import contacts from '../scenes/contacts/index';



export const AppNavigator = StackNavigator({
    login: { screen: login },
    contacts: { screen: contacts },
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