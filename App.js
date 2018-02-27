import React, { Component } from 'react';
import {StatusBar} from 'react-native'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppWithNavigationState from './app/navigators/AppNavigator' ;
import AppReducer from './app/reducers/index';



export default class App extends Component<{}>{
  store = createStore(AppReducer);

  render(){
      return (
          <Provider store = {this.store}>
              <AppWithNavigationState/>
          </Provider>
      );
  }
}

