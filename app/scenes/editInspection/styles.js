import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? 64: 76,
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
    titleView: {
        paddingTop: 5,
        paddingBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2.5
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
    saveTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 50,
        textAlign: 'left',
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
    seperateLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 1,
        backgroundColor: '#e3e3e3'
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
    mainView: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 10
    },
    deleteView: {
        width: width/2,
        height: 36,
        backgroundColor: '#2B3643',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15 
    },
    deleteTxt: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'open-sans-regular'
    },

}