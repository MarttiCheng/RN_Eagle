import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    modalView: {
       width: width,
       height: height,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalMainView: {
        width: width - 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 6,
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 15
    },
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    noteTxt: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'open-sans-regular',
        marginBottom: 10
    },
    saveBtn: {
        width: width/4,
        height: 35,
        backgroundColor: '#2B3643',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: (width - 110 - width/4)/2,
        marginTop: 15
    },
    saveTxt: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'open-sans-regular',
    },
    inputTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 14,
        fontFamily: 'open-sans-regular',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#e3e3e3'
    },
    visibleVendorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    checkimg: {
        width: 14,
        height: 14,
    },
    visibleVendortxt: {
        fontSize: 14,
        fontFamily: 'open-sans-regular',
    },
}