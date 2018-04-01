import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import nav from './nav';
import user from './user';
import contacts from './contacts';
import listings from './listings';
import task from './task';


const AppReducer  = combineReducers({
    nav,
    user,
    contacts,
    listings,
    task,
});

export default AppReducer;
