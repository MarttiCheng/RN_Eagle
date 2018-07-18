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
    titleView: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white'
    },
    assignView: {
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white'
    },
    assignTxt: {
        color: '#999',
        fontSize: 13.5,
        fontFamily: 'open-sans-regular'
    },
    assignNameTxt: {
        marginTop: 5,
        color:'black',
        fontSize: 20,
        fontFamily: 'open-sans-regular'
    },
    contactTxt: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 15,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        fotnSize: 20,
        fontFamily: 'open-sans-regular'
    },
    label1: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    subcontactView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contactItemView: {
        backgroundColor: '#2B3643',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent :'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 10,
    },
    attachBtn: {
        width: width/2 - 40,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginLeft: width/4 + 20,
        marginTop: 3

    },
    attachTxt: {
        color: '#999',
        fontSize: 12,
        fontFamily: 'open-sans-regular',
    },
    listingtxt: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 15,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    sublistingView: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    listingIcon: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    listingLable: {
        flex: 1,
        fontSize: 15,
        marginLeft: 15,
        fontFamily: 'open-sans-regular',
    },
    buttonView: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deleteView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkgray',
        width: (width-45)/3,
        height: 40,
        borderRadius: 4,
    },
    deleteTxt: {
        fontSize: 13,
        color: 'white',
        marginLeft: 7,
        fontFamily: 'open-sans-regular',
    },
    completeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#35AA47',
        width: (width-45)*2/3,
        height: 40,
        borderRadius: 4,
    },
    view2: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent :'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:'lightgray'
    },
    avatarImg: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
        marginLeft: 5
    },
    rowSubView: {
        marginLeft: 15,
        flex: 1,
        justifyContent: 'center',
    },
    label3: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
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
}