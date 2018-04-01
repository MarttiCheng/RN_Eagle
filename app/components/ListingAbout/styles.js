import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    categoryView: {
        width: width,
        height: 60,
        backgroundColor:'#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#999',
        flexDirection: 'row',
    },
    categoryItemTxt: {
        fontSize: 16,
        color: '#2B3643',
        fontFamily: 'open-sans-regular'
    },
    categoryItem: {
        marginRight: 13,
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
        paddingTop: 7,
        paddingBottom: 7
    },
    label1: {
        color: '#999',
        fontSize: 13.5,
        fontFamily: 'open-sans-regular'
    },
    label2: {
        color:'black',
        fontSize: 22,
        fontFamily: 'open-sans-regular'
    },
    label3: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
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
        flex:1,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    propertyItemTitle: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 10,
        width: width,
        backgroundColor: '#ddd',
        color:'black',
        fontSize: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:'lightgray',
        fontFamily: 'open-sans-regular',
    },
    rowSubView: {
        marginLeft: 15,
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
    homeImg: {
        width: width,
        height: 285,
        resizeMode: 'cover'
    },
    detailView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#364150'
    },
    streetTxt: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    streetNameTxt: {
        color: 'white',
        fontFamily: 'open-sans-regular',
        fontSize: 16,
        textAlign: 'center'
    },
    roomdetailView: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    iconImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 5,
    },
    line1: {
        height: 1,
        width: 200,
    },
    venderSubtitle: {
        color:'white',
        fontSize: 10,
        fontFamily: 'open-sans-regular',
    },
    venderCategoryView: {
        backgroundColor: '#B4BCC8',
        borderRadius: 8,
        height: 16,
        width: 56,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
}