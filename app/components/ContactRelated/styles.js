import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    container1: {
        width: width,
        height: (Platform.OS == 'ios')? height-Header.HEIGHT: height - Header.HEIGHT-20,
        backgroundColor: '#ddd',
    },
    rowSubView: {
        marginLeft: 15,
        flex: 1,
    },
    avatarImg: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
        marginLeft: 5
    },
    label3: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'open-sans-regular',
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
    view2: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:'lightgray'
    },
    nomoretxt: {
        marginTop: 25,
        width: width,
        textAlign: 'center',
        fontSize: 16, 
        color: '#364150',
        fontFamily: 'open-sans-bold',
    },
    swipeView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    swipeIcon: {
        width: 18,
        height: 18,
        resizeMode:'contain',
        tintColor: 'white'
    },
    swipeTxt: {
        color: 'white',
        fontSize: 12,
        marginTop: 5
    },
    saveView: {
        width: width,
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 15,
        // alignItems: 'center'
    },
    selectoptionView: {
        borderWidth : 1, 
        borderColor : "#e3e3e3", 
        height: 40, 
        width: width - 30,
        marginBottom: 5,
        marginTop: 5,
    },
    selectedTxt: {
        backgroundColor:'transparent',
        color:'black',
        fontSize: 15,
        fontFamily: 'open-sans-regular',
        paddingRight: 10,
    },
    optionList: {
        width: width*0.8, 
        height: 450, 
        backgroundColor: 'white',
    },
    optiontxt: {
        fontSize: 18,
        fontFamily: 'open-sans-regular',
    },
    inputTxt: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        fontSize: 15,
        height: 40,
    },
    inputTxt1: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'lightgray',
        fontSize: 15,
    },
    saveBtn: {
        backgroundColor: '#33e098',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        marginTop: 10,
        marginLeft: (width-130)/2
    },
    saveTxt: {
        color: 'white'
    },
    nameListView: {
        width: width - 30,
        paddingVertical: 0,
        paddingHorizontal: 10,
        position: 'absolute',
        top: 57,
        right: 15,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#eee'
    },
    nametxt: {
        fontSize: 13,
        paddingVertical: 5
    },
    loadingView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 100,
        right: (width-60)/2,
        padding: 10,


    }
}