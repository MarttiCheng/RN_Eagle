import { Dimensions } from 'react-native';
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
    }   
}