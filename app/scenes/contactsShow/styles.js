import { Dimensions } from 'react-native';
import {Label} from 'native-base';
const { width, height } = Dimensions.get('window')
export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    headerView: {
        width: width,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#364150',
    },
    avatarImg: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    nameTxt: {
        marginTop: 10,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    jobTxt: {
        marginTop: 3,
        color: 'white',
        fontSize: 15,
    },
    tabTitleView: {
        width: width, 
        height: 30, 
        backgroundColor:'#364150',
        flexDirection: 'row'
    },
    tabItem: {
        height: 30, 
        width: width/4, 
        justifyContent:'center', 
        alignItems:'center'
    },
    tabline: {
        width: width/4,
        height: 3.5,
        backgroundColor: '#35AA47',
        position:'absolute',
        bottom: 0,
        left: 0,
    },
    tabTxt: {
        color: 'white', 
        fontSize: 13,
        marginBottom: 8
    },
    addBtn: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#364150',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTxt: {
        color: 'white',
        fontSize: 28,
        // textAlign: 'center',
        // textAlignVertical: 'top',
        fontWeight: '200',
        marginTop: -2
    }
}