import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import nav from './nav'
import user from './user'
import contacts from './contacts'

const AppReducer  = combineReducers({
    nav,
    user,
    contacts,
});

export default AppReducer;
