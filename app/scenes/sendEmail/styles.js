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
    },
    mainView: {
        flex: 1,
    },
    toView: {
        width: width,
        flexDirection: 'row',
        padding: 15,
        alignItmes: 'center',
        justifyContent: 'space-between',
        
    },
    ccView: {
        width: width,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItmes: 'center',
        justifyContent: 'space-between',
        marginTop: -35
    },
    bccView: {
        width: width,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItmes: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    subView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    contactSubView: {
        flexDirection: 'row',
        paddingRight: 10,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'lightgray',
        alignItems: 'center'
    },
    avatarImg: {
        width: 16,
        height: 16,
        resizeMode: 'cover',
        borderRadius: 8,
        overflow: 'hidden',
    },
    label1: {
        fontSize: 16,
        color: 'gray'
    },
    nameTxt: {
        fontSize: 12,
        color: 'black',
        marginLeft: 10
    },
    subjectView: {
        width: width,
        padding: 15,
        alignItmes: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
    inputTxt: {
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
        width: width - 30
    },
    inputTxt1: {
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
        width: width - 90,
        height: 22
    },
    emailView: {
        width: width,
        padding: 15,
        alignItmes: 'center',
    },

    content: {
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    },
    popView: {
        width: width - 50,
        height: 200,
        position: 'absolute',
        top: 120,
        left: 30,
        backgroundColor: 'yellow'
    }
}