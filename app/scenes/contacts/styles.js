import { Dimensions } from 'react-native';
import {Label} from 'native-base';
const { width, height } = Dimensions.get('window')
export default {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBoxView: {
        flex: 1,
        width: width,
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    rowView: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12
    },
    avatarImg: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
        marginLeft: 5
    }, 
    rowSubView: {
        marginLeft: 15
    },
    label1: {
        fontSize: 16,
        color: '#000'
    },
    label2: {
        fontSize: 14,
        color: '#999'
    },
    line: {
        height: 1,
        width: width,
        backgroundColor: 'lightgray',
        marginTop: 12
    }
}