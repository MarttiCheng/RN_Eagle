import React, { Component } from 'react';
import {StatusBar} from 'react-native'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppWithNavigationState from './app/navigators/AppNavigator' ;
import AppReducer from './app/reducers/index';



export default class App extends Component<{}>{
    store = createStore(AppReducer);

    componentDidMount() {
        Expo.Font.loadAsync({
            'open-sans-bold': require('./app/assets/fonts/OpenSans-Bold.ttf'),
            'open-sans-regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
        });
    }

    render(){
        return (
            <Provider store = {this.store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

