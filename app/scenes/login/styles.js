import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
export default {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        resizeMode: 'stretch'
    },
    logoImg: {
        width: width - 50,
        height: (width - 50)/2,
        resizeMode: 'contain',
        marginTop: 30
    },
    logintxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: -40
    },
    inputItem1: {
        width: width - 40,
        height: 40,
        marginTop: 40
    },
    inputItem2: {
        width: width - 40,
        height: 40,
        marginTop: 20
    },
    inputTxt: {
        backgroundColor:'#e9ebea'
    },
}
