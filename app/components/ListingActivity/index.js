//import libraries
import React, { Component } from 'react';
import { 
    StyleSheet, StatusBar, Image, TouchableOpacity, RefreshControl, AsyncStorage, ActivityIndicator, ScrollView, Modal, ListView
} from 'react-native';
import {
    Content, Text, List, ListItem, Icon, Container, Left, Right, Button, View, Label, Thumbnail,Item
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'
import images from '../../themes/images'
import { getListingsActivity } from '../../actions'
import { BallIndicator } from 'react-native-indicators'
import { FontAwesome} from '@expo/vector-icons'
import moment from 'moment'
import HTML from 'react-native-render-html'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// create a component
class ListingActivity extends Component {
    constructor(props){
        super(props)

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            isLoading: true,
            activityList: [],
            modalVisible: false,
            selected_note: [],
            page: 0,
            dataSource: ds,
            data: [],
            fetching: false,
            refreshing: false,
        }
    }
    
    componentWillMount() {
       this._fetchMore(this.state.page)
    }

    _onRefresh() {
        if (this.state.refreshing) {
            return;
        }

        this.setState({refreshing: true, page: 0});

        getListingsActivity(this.props.token, this.props.listings_about.id, this.state.page).then(data => {
           this.setState({
               isLoading: false,
               refreshing: false,
           }) 
        })
    }

    _fetchMore(page) {
        if (this.state.fetching) {
            return;
        }

        this.setState({fetching: true});

        getListingsActivity(this.props.token, this.props.listings_about.id, page).then(data => { 
            var data;
            if (this.state.refreshing) {
                data = data.data;
            } else {
                data = [...this.state.data, ...data.data];
            }

           this.setState({
               isLoading: false,
               page: page + 1,
               dataSource: this.state.dataSource.cloneWithRows(data),
               data: data,
               fetching: false
           }) 
        })
    }


    showNoteIcon(note_type) {
        if(note_type == "Email" || note_type == "Property Alert Email"){
            return(
                <FontAwesome name = 'envelope' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "Enquiry"){
            return(
                <FontAwesome name = 'question-circle' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "Inspection"){
            return(
                <FontAwesome name = 'eye' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "Offer"){
            return(
                <FontAwesome name = 'dollar' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "sms"){
            return(
                <FontAwesome name = 'mobile-phone' size = {25} color = '#717171'/>
            )
        }
        else if(note_type == "WebsiteLog"){
            return(
                <FontAwesome name = 'link' size = {25} color = '#717171'/>
            )
        }
        else{
            return(
                <FontAwesome name = 'sticky-note' size = {25} color = '#717171'/>
            )
        }
    }

    onClickedNote(item) {
        this.setState({
            modalVisible: true,
            selected_note: item.attributes,
        })
    }

    _renderRow(item) {
        return (
            <TouchableOpacity onPress = {() => this.onClickedNote(item)}>
                <View style = {styles.activityItem} >
                    <View style = {styles.view1}>
                        { this.showNoteIcon(item.attributes.note_type) }
                        <Label style = {styles.dateTxt}>{item.attributes.note_type}</Label>
                        <Label style = {styles.dateTxt}>
                            {moment(item.attributes.created_at).format('DD MMM YYYY, h:mma')}
                        </Label>
                    </View>
                    <View style = {styles.view2}>
                        <HTML html = {item.attributes.description}/>
                        <Label style = {styles.text}>{item.attributes.text}</Label>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    showContactActivity() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                onEndReached={() => this._fetchMore(this.state.page)}
                enableEmptySections
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        )
    }

    render() {
        return (
            <Content style = {styles.container} showsVerticalScrollIndicator = {false}>
                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {{marginTop: 100, marginBottom: 10}}/> : this.showContactActivity()
                }
                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.modalVisible}
                    onRequestClose = {() => [
                        alert('Modal has been closed')
                    ]}>
                    <Container style = {styles.detailNoteView}>
                        <View style = {styles.menuView}>
                            <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => this.setState({ modalVisible:false } )} />
                            <Label style = {styles.title}>{this.state.selected_note.note_type}</Label>
                            <View style = {styles.blankView}></View>
                        </View>
                        <Content style = {styles.contentView}>
                            <View style = {{padding: 15}}>
                                <HTML html = {this.state.selected_note.description}/>
                                <Label style = {styles.text}>{this.state.selected_note.text}</Label>
                            </View>
                            
                        </Content>
                    </Container>
                </Modal>
            </Content>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        listings_about: state.listings.listings
    }
}

export default connect(mapStateToProps)(ListingActivity)

