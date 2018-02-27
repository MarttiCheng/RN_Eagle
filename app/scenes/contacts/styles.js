import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
export default {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchView: {
        width: width,
        height: 60,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center'
    }
}