import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
import {Label} from 'native-base';
const { width, height } = Dimensions.get('window')
export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    headerView: {
        width: width,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#364150',
    },
    avatarImg: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    nameTxt: {
        marginTop: 10,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'
    },
    jobTxt: {
        marginTop: 3,
        color: 'white',
        fontSize: 16,
        fontFamily: 'open-sans-regular'
    },
    tabTitleView: {
        width: width, 
        height: 35, 
        backgroundColor:'#364150',
        flexDirection: 'row'
    },
    tabItem: {
        height: 35, 
        width: width/4, 
        justifyContent:'center', 
        alignItems:'center'
    },
    tabline: {
        width: width/4,
        height: 3.5,
        backgroundColor: '#35AA47',
        position:'absolute',
        bottom: 0,
        left: 0,
    },
    tabTxt: {
        color: 'white', 
        fontSize: 14,
        marginBottom: 6,
        fontFamily: 'open-sans-regular'
    },
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#364150',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTxt: {
        color: 'white',
        fontSize: 42,
        fontWeight: '300',
        marginTop: -5
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
        fontSize: 18
    }
}