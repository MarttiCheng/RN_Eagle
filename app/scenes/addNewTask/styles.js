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
        height: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT + 20,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
    },
    backBtn: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    title: {
        color: 'white',
        width: width - 140,
        fontSize: 18,
        fontFamily: 'open-sans-regular',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    editTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 45,
        textAlign: 'left',
    },
    bodyView: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 5,
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: 90,
    },
    view1: {
        paddingLeft: 15,
        paddingRight: 15,
        minHeight: 70,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 5
    },
    label1: {
        color: '#7c98b6',
        fontSize: 13.5,
        fontFamily: 'open-sans-regular',
    },
    label2: {
        color: '#33475b',
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    inputTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 18,
        fontFamily: 'open-sans-regular',
        marginTop: 5,
        marginBottom: 5,
    },
    dateTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 20,
        paddingLeft: 0,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
        borderWidth: 0,
        width: width - 30
    },
    seperateLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 1,
        backgroundColor: '#e3e3e3'
    },
    contactTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 20,
        paddingLeft: 0,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
        borderWidth: 0,
        width: width - 30,
    },
    selectoptionView: {
        borderWidth : 0, 
        borderColor : "transparent", 
        height: 40, 
        width: width - 30,
    },
    selectedTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 20,
        fontFamily: 'open-sans-regular',
        marginTop: -5,
        marginLeft: -10,
    },
    optionList_permision: {
        width: width*0.8, 
        height: 90, 
        backgroundColor: 'white',
    },
    optiontxt: {
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
}