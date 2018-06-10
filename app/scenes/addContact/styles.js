import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    container2: {
        flex: 1,
        width: width,
        height: (Platform.OS == 'ios')? height-Header.HEIGHT: height - Header.HEIGHT-20
        // height: 300
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
    groupAddView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        width: width,
    },
    categoryView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width-60,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 45,
    },
    addgroupImgView: {
        position: 'absolute',
        right: 5,
        width: 55,
        height: 55,
    },
    addgroupImg: {
        width: 55,
        height: 55,
        resizeMode: 'contain'
    },
    groupView1: {
        flex: 1,
        backgroundColor: 'white', 
    },
    view1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 7,
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
    selectoptionView: {
        borderWidth : 1, 
        borderColor : "#e3e3e3", 
        height: 40, 
        width: width - 30,
        marginBottom: 5,
        marginTop: 5,
    },
    selectedTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 22,
        fontFamily: 'open-sans-regular',
        marginTop: -5,
        marginLeft: -10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    optionList: {
        width: width*0.8, 
        height: 225, 
        backgroundColor: 'white',
    },
    optionList_country: {
        width: width*0.8, 
        height: 135, 
        backgroundColor: 'white',
    },
    optionList_belong: {
        width: width*0.8, 
        minHeight: 90,
        maxHeight: 225,
        backgroundColor: 'white',
    },
    optiontxt: {
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    categoryItem: {
        marginVertical: 3,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: width - 70,
    },
    categoryItemTxt: {
        fontSize: 15,
        color: '#2B3643',
        fontFamily: 'open-sans-regular',
        maxWidth: width - 105,
    },
    subscribedView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    checkimg: {
        width: 14,
        height: 14,
    },
    subscribedtxt: {
        fontSize: 14,
        fontFamily: 'open-sans-regular',
    },
    saveView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: 'white'
    },
    saveBtn: {
        width: (width - 40)/3+20,
        height: 35,
        backgroundColor: '#2B3643',
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupAddDialogBox: {
        width: width*0.7,
        height: 220,
        borderWidth: 1,
        borderColor: '#2B3643',
        borderRadius: 3,
        backgroundColor: '#eee',
        position: 'absolute',
        top: 44,
        right: 7,
        overflow: 'hidden'
    },
    eachValue: {
        width: width*0.7,
        height: 25,
        paddingHorizontal: 10,
    },
    eachAddtxt: {
        fontSize: 13,
        textAlign: 'left'
    },
    saveTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 50,
        textAlign: 'left',
    },
}