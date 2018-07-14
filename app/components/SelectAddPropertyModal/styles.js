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
        height: 280,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 6,
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 40
    },
    
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    selecttxt: {
        fontSize: 18,
        paddingVertical: 7,
    },
    cancelText: {
        color: '#ff4f55',
        fontSize: 16
    },
    cancelBtn: {
        position: 'absolute',
        bottom: 15,
        right: 25
    }
}