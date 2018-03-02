import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    categoryView: {
        width: width,
        height: 50,
        backgroundColor:'#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#999',
        flexDirection: 'row',
    },
    categoryItemTxt: {
        fontSize: 13,
        color: '#364150'
    },
    categoryItem: {
        marginLeft: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10, 
    },
    view1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    label1: {
        color: '#999',
        fontSize: 13
    },
    label2: {
        color:'black',
        fontSize: 18,
        marginTop: 3
    },
    label3: {
        color: 'black',
        fontSize: 16,
    },
    seperateLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 1,
        backgroundColor: 'lightgray'
    },
    view2: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 30,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:'lightgray'
    },
    rowSubView: {
        marginLeft: 15
    },
    avatarImg: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
        marginLeft: 5
    },
    subView1: {
        borderTopWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        marginTop: 30
    },
}