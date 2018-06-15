import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#2B3643',
    },
    menuView:{
        flex: 1, 
        backgroundColor:'#364150', 
    },
    submenuView: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#3F4B5A',
    },
    menuItem:{
        color: '#B4BCC8',
        opacity: 1,
        fontSize: 20,
        marginLeft: 15,
        fontFamily: 'open-sans-regular'
    },
    menuProfileView: {
        backgroundColor: '#2B3643',
        height: 200,
        justifyContent: 'center',
        padding: 20,
    },
    avatarView: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    avatarImg: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 35,
        // marginTop: 50
    },
    nameTxt:{
        fontSize: 18,
        color: '#B4BCC8',
        fontFamily: 'open-sans-regular',
        marginTop: 8
    },
    emailTxt: {
        fontSize: 17,
        color: '#B4BCC8',
        fontFamily: 'open-sans-regular',
    },
    itemView: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        height: 60,
        alignItems: 'center'
    },
    line: {
        position: 'absolute',
        left: 62,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: '#3F4B5A',
    },
    logoutView: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
}