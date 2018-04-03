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
        height: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT+20,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        color: 'white',
        width: width - 140,
        fontSize: 18,
        fontFamily: 'open-sans-regular',
        marginLeft: 30,
        marginRight: 10,
        textAlign: 'center',
    },
    editTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 45,
        textAlign: 'right',
    },
    titleView: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white'
    },
    assignView: {
        padding: 15,
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
        fontSize: 22,
        fontFamily: 'open-sans-regular'
    },
    contactTxt: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 15,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    contacvView: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'lightgray'
    },
    label1: {
        color: 'black',
        fontSize: 15,
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
        width: width/2,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginLeft: width/4,
        marginTop: 3

    },
    attachTxt: {
        color: '#999',
        fontSize: 14,
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
        backgroundColor: '#B4BCC8',
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
    }
}