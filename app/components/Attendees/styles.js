import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowView: {
        flex:1,
        flexDirection: 'row',
        width: width - 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtinput1: {
        width: (width-40)/2,
        paddingLeft: 30,
    },
    txtinput2: {
        width: width-30,
        paddingLeft: 30
    },
    labelTxt: {
        color: '#0099CC',
        fontSize: 14,
        fontFamily: 'open-sans-regular'
    },
    editSegementView: {
        flexDirection: 'row',
        width: width - 30,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    nonInterestedView: {
        width: (width - 30)/3,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#364150'
    },
    interestedTxt: {
        color: '#364150',
        fontSize: 13,
        fontFamily: 'open-sans-regular',
    },
    maybeInterestedView:{
        width: (width - 30)/3,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#364150'
    },
    InterestedView: {
        width: (width - 30)/3,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderWidth:1,
        borderColor: '#364150'
    },
    buttonView: {
        width: width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
    },
    clearBtnView: {
        width: (width - 45) /3,
        height: 36,
        borderRadius: 5,
        backgroundColor: '#CFCFCF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    clearTxt: {
        color:'white',
        fontSize: 13,
    },
    saveBtnView: {
        width: (width - 45) * 2 /3,
        height: 36,
        borderRadius: 5,
        backgroundColor: '#35AA47',
        alignItems: 'center',
        justifyContent: 'center'
    },
    preregisteredTitle: {
        width: width,
        paddingTop: 20,
        paddingLeft: 15,
        paddingBottom: 7,
        backgroundColor: '#CFCFCF',
        fontSize: 14,
        fontFamily: 'open-sans-regular'
    },
    rowRenderView: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        marginLeft: 5
    }, 
    rowSubView: {
        marginLeft: 15,
        flex: 1,
    },
    label1: {
        color:'black',
        fontSize: 16,  
        fontFamily: 'open-sans-regular'
    },
    label2: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'open-sans-regular',
    },
    line: {
        height: 1,
        width: width,
        backgroundColor: 'lightgray',
        position: 'absolute',
        bottom: 0,
        left: 70
    },
    tagView: {
        flexDirection:'row',
        marginTop: 5,
        flex: 1,
    },
    eachtag: {
        backgroundColor: '#B4BCC8',
        paddingLeft: 8,
        paddingRight: 8,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    tagTxt: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'open-sans-regular',
    },
    nomoretxt: {
        marginTop: 25,
        width: width,
        textAlign: 'center',
        fontSize: 16, 
        color: '#364150',
        fontFamily: 'open-sans-bold',
    },  
    inactiveTxt: {
        fontSize: 13, 
        color: 'black',
        fontFamily: 'open-sans-regular'
    },
    activeTxt: {
        fontSize: 13, 
        color: 'black',
        fontFamily: 'open-sans-regular'
    },  
}