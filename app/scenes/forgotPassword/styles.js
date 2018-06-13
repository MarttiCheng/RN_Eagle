import { Dimensions } from 'react-native';
import {Colors} from '../../constants'
const { width, height } = Dimensions.get('window');

export default {
    container: {
        backgroundColor: 'white',
        paddingBottom: 10
    },
    webView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: width,
        height: height
    },
    topbar: {
        flexDirection: 'row',
        position: 'absolute',
        top: 30,
        left: 20,
    },
    topbarText: {
        color: 'black',
        marginLeft: 10,
        fontSize: 15
    }
}