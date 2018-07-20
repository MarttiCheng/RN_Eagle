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
    mainView: {
        flex: 1,
        backgroundColor: 'white',
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
    saveTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 45,
        textAlign: 'left',
    },
    groupView: {
        flex: 1,
        backgroundColor: 'white', 
    },
    subView: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 7,
        justifyContent: 'center',
    },
    subView1: {
        height: 70,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 7,
        justifyContent: 'center',
    },
    label1: {
        color: '#999',
        fontSize: 13.5,
        fontFamily: 'open-sans-regular',
        marginTop: 3,
    },
    inputTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 20,
        fontFamily: 'open-sans-regular',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#e3e3e3'
    },
    seperateLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 1,
        backgroundColor: '#e3e3e3'
    },
    blankView:  {
        width: 0,
        height: 0,
        backgroundColor: 'transparent'
    },
    selectoptionView: {
        borderWidth : 1, 
        borderColor : "#e3e3e3", 
        height: 37, 
        width: width - 30,
        marginBottom: 5,
        marginTop: 5,
    },
    selectedTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 20,
        fontFamily: 'open-sans-regular',
        marginTop: -5,
        marginLeft: -10,
        paddingHorizontal: 5,
    },
    optionList_status: {
        width: width*0.8, 
        height: 270, 
        backgroundColor: 'white',
    },
    optionList_property: {
        width: width*0.8, 
        height: 405, 
        backgroundColor: 'white',
    },
    optiontxt: {
        fontSize: 18,
        fontFamily: 'open-sans-regular',
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
    label3: {
        color: '#999',
        fontSize: 13.5,
        fontFamily: 'open-sans-regular',
    },
    label2: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    vendorTxt: {
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
    deleteView: {
        flexDirection: 'row',
        width: width - 30,
        height: 36,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 15
    },
    deleteTxt: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'open-sans-regular'
    },
}