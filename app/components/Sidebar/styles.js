import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },

    sidebar: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#0074aa',
    },
    title:{
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    drawer:{
        flex: 1,
        height: 150,
        padding: 20,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    drawerCover: {
        height: 150,
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'cover'
    },
    line: {
        height: 1,
        width: 400,
        backgroundColor:'white',
        position: 'absolute',
        top: 79,
        left: 0,
        opacity:0.3,
    },
    menuItem:{
        color: 'black',
        opacity: 1,
        fontSize: 15,
        marginLeft: 15,
    },
    menuIcon: {
        width: 18,
        height: 18,
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 20,
    },
    name: {
        color: 'white',
        fontSize: 18,
        marginTop: 10
    },
    edit: {
        color: 'white'
    },
    editBtn: {
        position: 'absolute',
        top: 40,
        right: 20,
    },

}