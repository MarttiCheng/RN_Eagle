import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        marginTop: 20,
    },
    taskItemView: {
        marginTop: 0
    },
    view1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    rowSubView: {
        marginLeft: 15,
        flex: 1
    },
    checkImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    label1: {
        color:'black',
        fontSize: 16, 
        fontFamily: 'open-sans-regular',
    },
    line1: {
        height: 1,
        width: 200,
    },
    favoriteDate: {
        fontSize: 11,
        color: '#999',
        marginLeft: 10,
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
    nomoretxt: {
        marginTop: 25,
        width: width,
        textAlign: 'center',
        fontSize: 16, 
        color: '#364150',
        fontFamily: 'open-sans-bold',
    },
    BackBtn: {
        width: width/3,
        height: 45,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    }
}