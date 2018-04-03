import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    inspectionTxt:{
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 15,
        backgroundColor: 'yellow',
        borderBottomWidth: 1,
        borderColor: 'red',
        width: 305,
        height: 40,
    }
}