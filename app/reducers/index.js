import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import nav from './nav';
import user from './user';
import contacts from './contacts';
import listings from './listings';
import task from './task';
import home from './home';

const AppReducer  = combineReducers({
    nav,
    user,
    contacts,
    listings,
    task,
    home
});

export default AppReducer;
