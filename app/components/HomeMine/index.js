//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { NavigationActions } from 'react-navigation'
import { getAllInspections } from '../../actions'
import { BallIndicator } from 'react-native-indicators'


// create a component
class HomeMine extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            inspectionsList:[]
        }
    }

    componentWillMount() {
        getAllInspections(this.props.token).then(data => {
            this.setState({
                isLoading: false,
                inspectionsList: data.data
            })
        })
    }


    onClickHome() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'homeShow'}))
    }

    renderRow(item, index) {
        return(
            <View key = {index}>
                <View style = {styles.dateView}>
                    <Label style = {styles.dateTxt}>{moment(item.attributes.start_datetime).format('Do MMMM')}</Label>
                </View>
                <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()} key = {index}>
                <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                    <View style = {styles.rowSubView}>
                        <Label style = {styles.label1}>10am - 10:30am</Label>
                        <Label style = {styles.label2}>50 Bay St, Double Bay</Label>
                    </View>
                    <Label style = {styles.saleTxt}>For Sale</Label>
                </TouchableOpacity>
            </View>
            
        )
    }

    showHomeInspections(){
        if(this.state.inspectionsList.length > 0){
            return(
                this.state.inspectionsList.map((item, index) => {
                    return(this.renderRow(item, index))
                })
            )
        }
        else {
            return(
                <Label style = {styles.nomoretxt}>No more data</Label>
            )
        }
    }
    
    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100}}/> : this.showHomeInspections()
                } 
                {/*<View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>10th March</Label>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>10am - 10:30am</Label>
                            <Label style = {styles.label2}>50 Bay St, Double Bay</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                    <View style = {styles.line1}/>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}> 
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>11am - 11:30am</Label>
                            <Label style = {styles.label2}>123 Silverdale St, Silverydale</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                </View>

                <View style = {styles.propertyItemView}>
                    <Label style = {styles.propertyItemTitle}>12th March</Label>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.barbados_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>10am - 10:30am</Label>
                            <Label style = {styles.label2}>50 Bay St, Double Bay</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                    <View style = {styles.line1}/>
                    <TouchableOpacity style = {styles.view1} onPress = {() =>  this.onClickHome()}>
                        <Thumbnail square source = {images.france_small} style = {styles.avatarImg}/>
                        <View style = {styles.rowSubView}>
                            <Label style = {styles.label1}>11am - 11:30am</Label>
                            <Label style = {styles.label2}>123 Silverdale St, Silverydale</Label>
                        </View>
                        <Label style = {styles.saleTxt}>For Sale</Label>
                    </TouchableOpacity>
                </View>*/}

            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(HomeMine)

