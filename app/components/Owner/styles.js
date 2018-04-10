import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    inspectionTxt:{
        paddingTop: 25,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 15,
        backgroundColor: 'transparent',
        width: width,
    },
    assignView: {
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white'
    },
    assignTxt: {
        color: '#999',
        fontSize: 13.5,
        fontFamily: 'open-sans-regular'
    },
    assignNameTxt: {
        marginTop: 5,
        color:'black',
        fontSize: 22,
        fontFamily: 'open-sans-regular'
    },
    sendPropertyView: {
        width: width - 30,
        height: 36,
        backgroundColor: '#2B3643',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15 ,
        marginLeft: 15,
    },
    sendTxt: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'open-sans-regular'
    },
    vendorTxt: {
        paddingTop: 25,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 15,
        backgroundColor: 'transparent',
        width: width,
    },
    rowRenderView: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex:1
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        marginLeft: 5
    }, 
    nametxt: {
        flex: 1,
        color:'black',
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'open-sans-regular'
    },
    subcontactView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contactItemView: {
        backgroundColor: '#2B3643',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent :'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 10,
    },
    line: {
        height: 1,
        width: width-70,
        backgroundColor: 'lightgray',
        position: 'absolute',
        left: 70,
        bottom: 0
    },
}