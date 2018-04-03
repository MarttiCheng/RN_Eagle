import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
import {Label} from 'native-base';
const { width, height } = Dimensions.get('window')
export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT+20,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        marginLeft: 15
    },
    titleView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    sendTxt: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'open-sans-regular'
    }
}