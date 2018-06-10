import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
    },
    container2: {
        width: width,
        height: (Platform.OS == 'ios')? height-Header.HEIGHT: height - Header.HEIGHT-20
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
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
    categoryView1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 45,
    },
    categoryItemTxt: {
        fontSize: 15,
        color: '#2B3643',
        fontFamily: 'open-sans-regular',
        maxWidth: width - 105,
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
    view1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 7,
    },
    view3: {
        width: width/2,
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
    label2: {
        color:'black',
        fontSize: 20,
        fontFamily: 'open-sans-regular'
    },
    label3: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
    },
    seperateLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 1,
        backgroundColor: '#e3e3e3'
    },
    view2: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 30,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:'lightgray'
    },
    rowSubView: {
        marginLeft: 15,
        flex: 1,
    },
    avatarImg: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
        marginLeft: 5
    },
    subView1: {
        borderTopWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        flex: 1,
    },
    subView2: {
        borderTopWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        marginTop: 30,
        flex: 1,
    },
    tagView: {
        flexDirection:'row',
        marginTop: 5,
        flex: 1,
    },
    eachtag: {
        backgroundColor: '#B4BCC8',
        paddingLeft: 8,
        paddingRight: 8,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    tagTxt: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'open-sans-regular',
    },
    blankView: {
        width: 0,
        height: 0
    },
    groupView1: {
        flex: 1,
        backgroundColor: 'white', 
    },
    inputTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 20,
        fontFamily: 'open-sans-regular',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#e3e3e3'
    },
    selectedTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 22,
        fontFamily: 'open-sans-regular',
        marginTop: -5,
        marginLeft: -10,
        paddingHorizontal: 5,
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
    selectoptionView: {
        borderWidth : 1, 
        borderColor : "#e3e3e3", 
        height: 40, 
        width: width - 30,
        marginBottom: 5,
        marginTop: 5,
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
    optiontxt: {
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    groupAddView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        width: width,
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
    deleteBtn: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: -5
    },
    modalView: {
       width: width,
       height: height,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalMainView: {
        width: width * 0.8,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        // alignItems: 'center',
        borderRadius: 6,
        padding: 20
    },
    selecttxt: {
        fontSize: 18,
    },
    blankModalView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
}

