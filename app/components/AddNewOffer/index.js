import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, 
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions
} from 'react-native';
import styles from './styles';
import images from '../../themes/images'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView, KeyboardAwareSectionView } from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get('window');
var visibleVendor = false

class AddNewOffer extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            contactID: '',
            propertyID: '',
            text: '',
            price: '',
            visibleVendor: true
        }
    }

    onVisibleVendor() {
        visibleVendor =! visibleVendor
        this.setState({ visibleVendor: visibleVendor })
    }

    render(){
        return(
            <KeyboardAwareScrollView style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                
                <View style = {styles.modalMainView}>
                    <View>
                        <Text style = {styles.noteTxt}>Offer</Text>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ contactID: text })}
                            value = {this.state.contactID}
                            placeholder = "Contact"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ propertyID: text })}
                            value = {this.state.propertyID}
                            placeholder = "Property"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ price: text })}
                            value = {this.state.price}
                            placeholder = "Price"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ text: text })}
                            value = {this.state.text}
                            placeholder = "Text"
                            placeholderTextColor = "#999"
                            returnKeyType = "next"
                            multiline={true}
                            numberOfLines={3}
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <TouchableOpacity style = {styles.visibleVendorView} onPress = {() => this.onVisibleVendor()}>
                            <Thumbnail square source = {this.state.visibleVendor? images.ic_checkbox1: images.ic_uncheckbox1} style = {styles.checkimg} />
                            <Text style = {styles.visibleVendortxt}>  Visible on vendor report</Text>
                        </TouchableOpacity>
                    </View>
                    <Button transparent style = {styles.saveBtn} onPress = { this.props.onClickedBack}>
                        <Text style = {styles.saveTxt}>Save</Text>
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default connect()(AddNewOffer);