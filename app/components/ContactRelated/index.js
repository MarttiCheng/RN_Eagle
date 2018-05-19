//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, Alert, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item, Input
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, Header } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { getContactTasks } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'
import Swipeout from 'react-native-swipeout'
import {Select, Option} from "react-native-chooser";


// create a component
class ContactRelated extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            tasksList: [],
            contactsName: '',
            note: '',
            relationship: 'Select relationship',
        }
    }

    handlePress(item){
        this.setState({
            isdeletLoading: true
        })
        deleteWatchList(this.props.userId, item.id).then(data1 => {
            if(data1.success){
                getWatchList(this.props.userId).then(data => {
                    if(data.success){
                        this.setState({ 
                            isdeletLoading: false,
                            watchList: data.data.items
                        })
                        alert("TICKER deleted from your watch list successfully.")
                        
                    }else{
                        this.setState({ isLoading: false })
                        alert('Please connect Wi-Fi or network')
                    }
                })
            }else{
                this.setState({ isdeletLoading: false })
                alert('Please connect Wi-Fi or network')
            }
        })
    }

    removeWatchListItem() {
        Alert.alert(
            '',
            'Are you sure you want to remove?',
            [
                // {text: 'OK', onPress: () => this.handlePress(item), style: 'destructive'},
                {text: 'OK', onPress: () => { console.log('Pressed ok button') }},
                {text: 'CANCEL', onPress: () => { console.log('Pressed cancel button') }},
            ],
            { cancelable: false }
        )
   }

    showContactRelationships(relationList){
        var swipeoutBtns = [
            {
                backgroundColor: '#f8373d',                
                buttonWidth: 60,
                onPress: () => { this.removeWatchListItem() },
                component:
                    (
                        <View style = {styles.swipeView}>
                            <Thumbnail square source={images.ic_delete} style={styles.swipeIcon}/>
                            <Text style = {styles.swipeTxt}>Remove</Text>
                        </View>
                    )
            },
        ]
        var user_name = ''
        var contact1_name = ''
        var contact2_name = ''
        
        if(this.props.contact_groups.data.attributes.last_name){
            user_name = this.props.contact_groups.data.attributes.first_name + ' ' + this.props.contact_groups.data.attributes.last_name
        }else {
            user_name = this.props.contact_groups.data.attributes.first_name
        }
        if(relationList.attributes.contact1_last_name){
            contact1_name = relationList.attributes.contact1_first_name + ' ' + relationList.attributes.contact1_last_name
        }else {
            contact1_name = relationList.attributes.contact1_first_name
        }
        if(relationList.attributes.contact2_last_name){
            contact2_name = relationList.attributes.contact2_first_name + ' ' + relationList.attributes.contact2_last_name
        }else {
            contact2_name = relationList.attributes.contact2_first_name 
        }

        if(user_name == contact1_name){
            return(
                <Swipeout right={swipeoutBtns}>
                    <View style = {styles.view2} >
                        {
                            relationList.attributes.contact2_photo_url? <Thumbnail square source = {relationList.attributes.contact2_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>{contact2_name}</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                </Swipeout>
            )
        }
        else {
            return(
                <Swipeout right={swipeoutBtns}>
                    <View style = {styles.view2} >
                        {
                            relationList.attributes.contact1_photo_url? <Thumbnail square source = {relationList.attributes.contact1_photo_url} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                            <Thumbnail square source = {images.ic_placeholder_image} style = {styles.avatarImg}/>
                        }
                        
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label3}>{contact1_name}</Label>
                            <View style = {styles.tagView}>
                                <View style = {styles.eachtag}>
                                    <Label style = {styles.tagTxt}>{relationList.attributes.relationship_type}</Label>
                                </View>
                            </View>
                        </View>
                    </View>
                </Swipeout>
            )
        }
    }

    onSelectRelationShip(value, label) {
        this.setState({relationship : value});
    }

    render() {
        console.log(this.props.contact_groups.Relationships)
        return (
            <View style = {styles.container}>
                <View style = {styles.saveView}>
                    <Input
                        ref = 'contactsname'
                        style = {styles.inputTxt}
                        onChangeText = { text => this.setState({ password: text })}
                        value = {this.state.password}
                        placeholder = "Start typing the contacts name..."
                        placeholderTextColor = "#999"
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />
                    <Select
                        onSelect = {this.onSelectRelationShip.bind(this)}
                        defaultText  = {this.state.relationship}
                        style = {styles.selectoptionView}
                        textStyle = {styles.selectedTxt}
                        backdropStyle  = {{backgroundColor : "rgba(0,0,0, 0.7)"}}
                        transparent = {true}
                        optionListStyle = {styles.optionList}
                    >
                        <Option value = "Spouse" styleText = {styles.optiontxt}>Spouse</Option>
                        <Option value = "Solicitor" styleText = {styles.optiontxt}>Solicitor</Option>
                        <Option value = "Client" styleText = {styles.optiontxt}>Client</Option>
                        <Option value = "Sibling" styleText = {styles.optiontxt}>Sibling</Option>
                        <Option value = "Child" styleText = {styles.optiontxt}>Child</Option>
                        <Option value = "Parent" styleText = {styles.optiontxt}>Parent</Option>
                        <Option value = "Business Parnter" styleText = {styles.optiontxt}>Business Parnter</Option>
                        <Option value = "Associate" styleText = {styles.optiontxt}>Associate</Option>
                        <Option value = "House Mate" styleText = {styles.optiontxt}>House Mate</Option>
                        <Option value = "Ex-Spouse" styleText = {styles.optiontxt}>Ex-Spouse</Option>
                    </Select>
                    <Input
                        ref = 'note'
                        style = {styles.inputTxt}
                        onChangeText = { text => this.setState({ note: text })}
                        value = {this.state.note}
                        
                        placeholder = "Enter notes..."
                        placeholderTextColor = "#999"
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />

                    <Button transparent style = {styles.saveBtn}>
                        <Text style = {styles.saveTxt}>Save</Text>
                    </Button>
                </View>
                {   
                    this.props.contact_groups.Relationships.data.length > 0 ?
                        this.props.contact_groups.Relationships.data.map((item, index) => {
                            return this.showContactRelationships(item)
                        }) :
                       
                        <Label style = {styles.nomoretxt}>There's nothing here.</Label>
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        contact_groups: state.contacts.contact_groups,
    }
}

export default connect(mapStateToProps)(ContactRelated)

