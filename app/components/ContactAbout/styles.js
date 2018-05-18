import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    container1: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#fff',
    },
    categoryView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width-60,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        minHeight: 45,
    },
    categoryItemTxt: {
        fontSize: 16,
        color: '#2B3643',
        fontFamily: 'open-sans-regular'
    },
    categoryItem: {
        marginVertical: 3,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center'
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
        backgroundColor: '#ddd'
    },
    addgroupImg: {
        position: 'absolute',
        right: 5,
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
        paddingVertical: 5,
    },
    eachValue: {
        width: width*0.7,
        height: 25,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    eachAddtxt: {
        fontSize: 13,
        textAlign: 'left'
    }
}

