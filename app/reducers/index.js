import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import nav from './nav'

const AppReducer  = combineReducers({
    nav,
});

export default AppReducer;
