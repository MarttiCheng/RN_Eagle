import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
import {Label} from 'native-base';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT+20,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-regular'
    },
    timetitle: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'open-sans-regular'
    },
    inactiveTxt: {
        fontSize: 13, 
        color: 'rgba(255, 255, 255, 0.72)',
        fontFamily: 'open-sans-regular'
    },
    activeTxt: {
        fontSize: 13, 
        color: 'white',
        fontFamily: 'open-sans-regular'
    },
    titleView: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
}