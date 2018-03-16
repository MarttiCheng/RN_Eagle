import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
import {Label} from 'native-base';
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
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
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
        fontSize: 18,
        color: '#000',
        fontFamily: 'open-sans-regular'
    },
    label2: {
        fontSize: 15,
        color: '#999',
        fontFamily: 'open-sans-regular'
    },
    line: {
        height: 1,
        width: width,
        backgroundColor: 'lightgray',
        marginTop: 13
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
    title: {
        color: 'white',
        fontSize: 18
    },
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#364150',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTxt: {
        color: 'white',
        fontSize: 42,
        fontWeight: '300',
        marginTop: -5
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