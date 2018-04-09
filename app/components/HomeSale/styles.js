import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    propertyItemTitle: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        width: width,
        backgroundColor: '#ddd',
        color:'#444',
        fontSize: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:'lightgray',
        // fontFamily: 'open-sans-regular',
    },
    view1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        // flex:1
    },
    rowSubView: {
        marginLeft: 15,
        marginRight: 10,
        flex: 1
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor:'lightgray',
        borderWidth: 1,
    },
    label2: {
        color: '#999',
        fontSize: 13,
        marginTop: 3,
        fontFamily: 'open-sans-regular',
    },
    label1: {
        color:'black',
        fontSize: 17,  
        fontFamily: 'open-sans-regular',
    },
    line1: {
        height: 1,
        width: 200,
    },
    favoriteDate: {
        fontSize: 11,
        color: '#999',
        fontFamily: 'open-sans-regular',
    },
    favoriteImg: {
        width: 20,
        height : 20,
        resizeMode: 'contain',
        marginTop: 5
    },
    favoriteView: {
        alignItems: 'center',
        marginLeft: 10
    },
    saleTxt: {
        color: 'white',
        backgroundColor: '#B4BCC8',
        padding: 5,
        fontSize: 13,
        fontFamily: 'open-sans-regular'
    },
    nomoretxt: {
        marginTop: 25,
        width: width,
        textAlign: 'center',
        fontSize: 16, 
        color: '#364150',
        fontFamily: 'open-sans-bold',
    },
    dateView: {
        paddingLeft: 5,
        paddingTop: 20,
        paddingBottom: 7,
        flexDirection: 'row'
    },
    dateTxt: {
        color: '#717171',
        fontSize: 14,
        marginLeft: 5,
        fontFamily: 'open-sans-regular',
    },
}