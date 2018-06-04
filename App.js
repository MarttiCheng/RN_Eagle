import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppWithNavigationState from './app/navigators/AppNavigator' ;
import AppReducer from './app/reducers/index';



export default class App extends Component<{}>{
    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', function() {
    //         const { dispatch, navigation, nav } = this.props;
    //         if (nav.routes.length === 1 && (nav.routes[0].routeName === 'Login' || nav.routes[0].routeName === 'Start')) {
    //             return false;
    //         }
    //         // if (shouldCloseApp(nav)) return false
    //         dispatch({ type: 'Navigation/BACK' });
    //         return true;
    //     }.bind(this));
    // }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress');
    // }
   
    store = createStore(AppReducer);

    componentDidMount() {
        Expo.Font.loadAsync({
            'open-sans-bold': require('./app/assets/fonts/OpenSans-Bold.ttf'),
            'open-sans-regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
        });
    }

    render(){
        console.disableYellowBox = true
        return (
            <Provider store = {this.store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

