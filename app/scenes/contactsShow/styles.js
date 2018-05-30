import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    headerView: {
        width: width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#364150',
        paddingTop: 15,
    },
    avatarImg: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        tintColor: 'white'
    },
    nameTxt: {
        marginTop: 10,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'
    },
    jobTxt: {
        marginTop: 3,
        color: 'white',
        fontSize: 16,
        fontFamily: 'open-sans-regular'
    },
    tabTitleView: {
        backgroundColor:'#364150',
        height: 50,
        width: width, 
    },
    tabItem: {
        height: 50, 
        width: (width+120)/5, 
        justifyContent:'center', 
        alignItems:'center'
    },
    tabline: {
        width: (width+120)/5,
        height: 3.5,
        backgroundColor: '#35AA47',
        position:'absolute',
        bottom: 0,
        left: 0,
    },
    tabTxt: {
        color: 'white', 
        fontSize: 14,
        marginBottom: 0,
        fontFamily: 'open-sans-regular'
    },
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#364150',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#364150',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {height: 0, width: 0},
    },
    addTxt: {
        color: 'white',
        fontSize: 35,
        fontWeight: '300',
        marginTop: -5
    },
    menuView: {
        width: width,
        height: (Platform.OS == 'ios')? Header.HEIGHT: Header.HEIGHT+20,
        paddingTop: (Platform.OS == 'ios')? 20 : StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#2B3643',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
    },
    backBtn: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    title: {
        color: 'white',
        width: width - 140,
        fontSize: 18,
        fontFamily: 'open-sans-regular',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    editTxt:{
        color: 'white', 
        fontSize: 17, 
        fontFamily: 'open-sans-regular',
        width: 45,
        textAlign: 'left',
    },
    parallaxView: {
        marginTop: (Platform.OS == 'ios')? Header.HEIGHT : Header.HEIGHT+20,
        flex: 1, 
        backgroundColor: '#364150'
    },
    titleView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        marginRight: 10,
    },
    indicator: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 150,
        left: (width - 100)/2,
        backgroundColor: 'transparent'
    },
    inactiveTxt: {
        fontSize: 13, 
        color: 'rgba(255, 255, 255, 0.72)',
        fontFamily: 'open-sans-regular'
    },
    activeTxt: {
        fontSize: 13, 
        color: 'white',
        fontFamily: 'open-sans-regular'
    },
}