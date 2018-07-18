import { Dimensions, Platform } from 'react-native';
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
        paddingLeft: 0,
        marginTop: 5,
    },
    txtinput2: {
        width: width-30,
        paddingLeft: 30,
        marginTop: 5,
    },
    textInput: {
        position: 'absolute',
        bottom: 2,
        left: 5,
        padding: 0,
        color: '#6a7989',
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    labelTxt: {
        color: '#0099CC',
        fontSize: 14,
        fontFamily: 'open-sans-regular'
    },
    editPropertyView: {
        width: width - 30,
        height: 36,
        backgroundColor: '#2B3643',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15 
    },
    editTxt: {
        color: 'white',
        fontSize: 13,
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
        fontFamily: 'open-sans-regular'
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
        marginLeft: 0,
        marginTop: -1,
        paddingTop: 20,
        paddingLeft: 15,
        paddingBottom: 7,
        backgroundColor: '#CFCFCF',
        fontSize: 14,
        fontFamily: 'open-sans-regular'
    },
    rowRenderView: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
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
    labelStyle3: {
        fontSize: 12,
        fontFamily: 'open-sans-regular',
    },
    labelStyle4: {
        fontSize: 15,
        fontFamily: 'open-sans-regular',
    },
    line: {
        height: 1,
        width: width,
        backgroundColor: 'lightgray',
        position: 'absolute',
        bottom: 0,
        left: 60
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
    tagView: {
        flexDirection:'row',
        flex: 1,
    },
    checkView: {
        width: 62,
        height: 26,
        borderRadius: 8,
        backgroundColor: '#2B3643',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkTxt: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'open-sans-regular'
    },
    redbarView: {
        backgroundColor: 'red',
        width: width,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15
    },
    closeTxt: {
        fontSize: 14,
        color: 'white'
    },
    detailCloseView: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'white',
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? 59: 51,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
    contentView: {
        flex: 1,
        backgroundColor: 'white',
    },
    blankView: {
        width: 25,
        height: 25,
        backgroundColor: 'transparent'
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular'
    },
    closeEachView: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    nameTxt: {
        color: '#3B3C36	',
        fontSize: 15,
        fontFamily: 'open-sans-regular'
    },
    emailTxt: {
        color: 'darkgray',
        fontSize: 12,
        fontFamily: 'open-sans-regular'
    }
}