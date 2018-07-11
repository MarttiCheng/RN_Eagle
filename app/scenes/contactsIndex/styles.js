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
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        marginLeft: 5,
    }, 
    rowSubView: {
        marginLeft: 15,
        flex: 1,
    },
    label1: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'open-sans-regular',
    },
    label2: {
        fontSize: 15,
        color: '#999',
        fontFamily: 'open-sans-regular'
    },
    line: {
        height: 1,
        width: width,
        backgroundColor: '#e3e3e3',
        position: 'absolute',
        bottom: 0,
        left: 0,
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
    tagView: {
        flexDirection:'row',
        marginTop: 5,
        flex: 1,
        flexWrap: 'wrap',
        width: width - 83,
    },
    eachtag: {
        backgroundColor: '#B4BCC8',
        paddingHorizontal: 8,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5
    },
    tagTxt: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'open-sans-regular',
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
    blankView: {
        width: 45,
        height: 45,
    }
}