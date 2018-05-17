import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    categoryView: {
        width: width,
        height: 60,
        backgroundColor:'#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#999',
        flexDirection: 'row',
    },
    categoryItemTxt: {
        fontSize: 16,
        color: '#2B3643',
        fontFamily: 'open-sans-regular'
    },
    categoryItem: {
        marginLeft: 13,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10, 
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
        // marginBottom: 30
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
        width: width, 
        height: 200, 
        backgroundColor: 'white',
        // position: 'absolute',
        // bottom: 0,
    },
    optionList_country: {
        width: width, 
        height: 140, 
        backgroundColor: 'white',
        // position: 'absolute',
        // bottom: 0,
    },
    optionList_belong: {
        width: width, 
        height: 95, 
        backgroundColor: 'white',
        // position: 'absolute',
        // bottom: 0,
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
        fontSize: 14
    },
    optiontxt: {
        fontSize: 18
    }
}

