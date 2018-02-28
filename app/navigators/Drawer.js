//import libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { 
    DrawerNavigator, 
    StackNavigator } from 'react-navigation'
var { Router, Scene } = require('react-native-router-flux');

import SideBar from './components/sidebar/SideBar'
import contacts from '../scenes/contacts/index';

const Drawer = DrawerNavigator(
    {   
        contacts: { screen: contacts },
        
    },
    {
        initialRouterName: 'Dashboard',
        contentOptions: {
            activeTintColor: 'red'
        },
        contentComponent: props => <SideBar {...props}/>
    }
);

export default Drawer;