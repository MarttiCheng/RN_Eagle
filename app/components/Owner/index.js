//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import images from '../../themes/images'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { getOwnerVendors } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import moment from 'moment'

ownersList = [
    {name: 'Sally Sample'},
    {name: 'John Sample'}
]

// create a component
class Owner extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            ownersList: []
        }
    }

    componentWillMount() {
        getOwnerVendors(this.props.token, this.props.inspectionInfo.attributes.property_id).then(data => {
            this.setState({
                isLoading: false,
                ownersList: data.data
            })
        })
    }

    renderRow(item, index){
        return(
           <TouchableOpacity key = {index} onPress = {() => this.clickAttendee(item, index)}>
                <View style = {styles.rowRenderView}>
                    {
                        item.attributes.photo_url ? 
                        <Thumbnail square source = {{uri: item.attributes.photo_url}} style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/> :
                        <Thumbnail square style = {styles.avatarImg} defaultSource = {images.ic_placeholder_image}/>
                    }
                    <Label style = {styles.nametxt}>{item.attributes.first_name} {item.attributes.last_name}</Label>                     

                    <View style = {styles.subcontactView}>
                        <TouchableOpacity onPress = {() => this.onClickedMail()}>
                            <View style = {styles.contactItemView}>
                                <FontAwesome name = 'envelope' size = {18} color = 'white' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {styles.contactItemView}>
                                <MaterialIcons name = 'sms' size = {18} color = 'white' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {styles.contactItemView}>
                                <FontAwesome name = 'phone' size = {18} color = 'white' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.line}/>
                </View>
                
            </TouchableOpacity>
        )
    }

    showOwners(){
        return(
            <View>
                 <View style = {styles.mainView}>
                    <Label style = {styles.inspectionTxt}>Inspection Details</Label>
                    <View style = {styles.assignView}>
                        <Label style = {styles.assignTxt}>Attendees</Label>
                        <Label style = {styles.assignNameTxt}>5</Label>
                    </View>
                    <View style = {styles.assignView}>
                        <Label style = {styles.assignTxt}>Interested</Label>
                        <Label style = {styles.assignNameTxt}>3</Label>
                    </View>
                    <View style = {styles.assignView}>
                        <Label style = {styles.assignTxt}>Documents Sent</Label>
                        <Label style = {styles.assignNameTxt}>1</Label>
                    </View>
                    <View style = {styles.sendPropertyView}>
                        <Label style = {styles.sendTxt}>Send Vendor Report</Label>
                    </View>
                </View>
                <Label style = {styles.vendorTxt}>Vendor/s</Label>
                {
                    this.state.ownersList.map((item, index) => {
                        return(this.renderRow(item, index));
                    })
                }
            </View>
        )
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showOwners()
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token,
        inspectionInfo: state.home.inspectionInfo,
    }
}

export default connect(mapStateToProps)(Owner)

