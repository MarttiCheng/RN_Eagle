import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? 64: 76,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        color: 'white',
        width: width - 140,
        fontSize: 18,
        fontFamily: 'open-sans-regular',
        marginLeft: 30,
        marginRight: 10,
        textAlign: 'center',
    },
    editTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 45,
        textAlign: 'right',
    },
    mainView: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowView: {
        flex:1,
        flexDirection: 'row',
        width: width - 30,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noteView: {
        flex:1,
        width: width - 30,
        marginTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#b9c1ca',
        paddingHorizontal: 5
    },
    noteTxt: {
        color: '#6a7989',
        fontSize: 12,
        fontFamily: 'open-sans-regular',
        marginLeft: 9,
        marginBottom: 3
    },
    noteTextInput: {
        width: width-30,
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: '#6a7989',
        // fontWeight: '450',
    },
    txtinput1: {
        width: (width-40)/2,
        paddingLeft: 0,
        fontSize: 15,
        marginTop: 5,
        fontFamily: 'open-sans-regular',
    },
    txtinput2: {
        width: width-30,
        paddingLeft: 30,
        fontSize: 10,
        marginTop: 5,
        fontFamily: 'open-sans-regular',
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
        height: 36,
        backgroundColor: '#2B3643',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15 
    },
    editTxt1: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'open-sans-regular',
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
    },
    saveBtnView: {
        width: width - 30,
        height: 36,
        borderRadius: 5,
        backgroundColor: '#35AA47',
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveTxt: {
        fontSize: 13,
        color: 'white',
    },  
    editInspectionTxt: {
        width: width,
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
        justifyContent: 'center',
    },
    checkTxt: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'open-sans-regular',
    },
    followRowView: {
        flexDirection: 'row',
        width: width,
        height: 55,
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    follwRowTxt: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
    },
    labelStyle1: {
        fontSize: 12,
        fontFamily: 'open-sans-regular',
    },
    labelStyle2: {
        fontSize: 15,
        fontFamily: 'open-sans-regular',
    },
    indicator: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 150,
        left: (width - 100)/2,
        backgroundColor: 'transparent'
    },
}