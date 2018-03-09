import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    view1: {
        paddingLeft: 5,
        paddingTop: 20,
        paddingBottom: 7,
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    dateTxt: {
        color: '#717171',
        fontSize: 14,
        marginLeft: 5,
        fontFamily: 'open-sans-regular',
    },
    view2: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    titleTxt: {
        color: '#2B3643',
        fontSize: 14,
        fontFamily: 'open-sans-regular',
    },
    duractionTxt: {
        color: '#2B3643',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
        marginLeft: 10
    },   
}