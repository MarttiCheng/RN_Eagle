import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        
        paddingLeft: 15,
        paddingRight: 15
    },
    activityItem: {
        marginTop: 20
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    dateTxt: {
        color: '#717171',
        fontSize: 12,
        marginLeft: 5,
        fontFamily: 'open-sans-regular',
    },
    view2: {
        width: width - 30,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    titleTxt: {
        color: '#2B3643',
        fontSize: 14,
        fontFamily: 'open-sans-regular',
    },
    contactTxt: {
        color: '#2B3643',
        fontSize: 12,
        marginTop: 3,
        fontFamily: 'open-sans-regular',
    },
    text: {
        fontSize: 14,
        color: '#717171',
        marginTop: 10
    },
    detailNoteView: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#ddd',
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    blankView: {
        width: 25,
        height: 25,
        backgroundColor: 'transparent'
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    contentView: {
        flex: 1,
        backgroundColor: '#ddd',
    }
}