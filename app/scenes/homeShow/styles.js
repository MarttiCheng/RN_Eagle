import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? 79: 91,
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
    
    editTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 45,
        textAlign: 'left',
    },
    timetitle: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'open-sans-regular',
        marginTop: 5
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
        paddingBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: width - 94
    },
}