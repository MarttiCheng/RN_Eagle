import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBoxView: {
        flex: 1,
        width: width,
        height: 70,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    rowView: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        flex:1
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        marginLeft: 5
    }, 
    rowSubView: {
        marginLeft: 15,
        flex: 1,
    },
    label1: {
        color:'black',
        fontSize: 16,  
        fontFamily: 'open-sans-regular'
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
    labeltag: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'open-sans-regular',
    },
    line: {
        height: 1,
        width: width,
        backgroundColor: 'lightgray',
        position: 'absolute',
        bottom: 0
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
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    saleTxt: {
        color: 'white',
        backgroundColor: '#B4BCC8',
        padding: 5,
        fontSize: 13,
        fontFamily: 'open-sans-regular'
    },
    tagView: {
        flexDirection:'row',
        flex: 1,
        marginTop: 5,
    },
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#364150',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#364150',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {height: 0, width: 0},
    },
    addTxt: {
        color: 'white',
        fontSize: 35,
        fontWeight: '300',
        marginTop: -5
    },
    filterView: {
        width: width,
        height: 200,
        backgroundColor: '#2B3643',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 15,
        paddingTop: 5,
    },
    displayTxt: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'open-sans-regular',
    },
    dropView1: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'white',
        paddingBottom: 5,
    },
    selectoptionView: {
        borderWidth : 1, 
        borderColor : "transparent", 
        height: 35, 
        width: width - 20,
        marginLeft: -10,
        backgroundColor: 'transparent'
    },
    selectedTxt: {
        backgroundColor:'transparent',
        color:'white',
        fontSize: 14,
        fontFamily: 'open-sans-regular',
        paddingRight: 10,
    },
    optionList: {
        width: width*0.8, 
        height: 225, 
        backgroundColor: 'white',
    },
    optiontxt: {
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    arrowImg: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginRight: 5,
        tintColor: 'white',
        position: 'absolute',
        bottom: 13,
        right: 2,
    },
    groupTxt: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'open-sans-regular',
        marginTop: 15,
    },
    filterButtonsView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    clearBtn: {
        width: (width - 40)/3+20,
        height: 35,
        backgroundColor: '#cfcfcf',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtn: {
        width: (width - 40)*2/3-20,
        height: 35,
        backgroundColor: '#b3bcc8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearTxt: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'open-sans-regular',
    },
    optionList1: {
        width: width*0.8, 
        height: 270, 
        backgroundColor: 'white',
    },
}