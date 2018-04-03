import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Tab, Tabs, ScrollableTab
} from 'native-base'
import {
    Keyboard, AsyncStorage, StatusBar, ListView, ScrollView, TouchableOpacity
} from 'react-native'
import styles from './styles'
import images from '../../themes/images';
import Search from 'react-native-search-box';
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'

class tasksShow extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            isAbout: true,
            isProperties: false,
            isActivity: false,
            isTasks: false
        }  
    }

    onClickedMail(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'sendEmail'}))
    }   

    render() {
        return(
            <Container style = {styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                
                <View style = {styles.menuView}>
                    <MaterialCommunityIcons name = 'arrow-left' size = {25} color = 'white'
                                onPress={ () => { this.props.navigation.goBack() }} />
                    <Label style = {styles.title} numberOfLines = {1} clip = 'tail'>Taks</Label>
                    <TouchableOpacity onPress = {this._onSearch}>
                        <Label style = {styles.editTxt}>Save</Label>
                    </TouchableOpacity>
                </View>
                <Content>
                    <View style = {{flex: 1}}>
                        <View style = {styles.titleView}>
                            <Label>{this.props.tasks.attributes.body}</Label>
                        </View>
                        <View style = {styles.assignView}>
                            <Label style = {styles.assignTxt}>Assigned To</Label>
                            <Label style = {styles.assignNameTxt}>Luke Paverd</Label>
                        </View>
                        <View style = {styles.assignView}>
                            <Label style = {styles.assignTxt}>Due Date</Label>
                            <Label style = {styles.assignNameTxt}>{this.props.tasks.attributes.due_date}</Label>
                        </View>
                        
                        <Label style = {styles.contactTxt}>Contact</Label>

                        <View style = {styles.contacvView}>
                            <Label style = {styles.label1}>Sally Sample</Label>
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
                                <TouchableOpacity style = {{marginLeft: 10}}>
                                    <MaterialCommunityIcons name = 'close' size = {18} color = '#717171' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button transparent style = {styles.attachBtn}>
                            <Label style = {styles.attachTxt}>+ ATTACH CONTACT</Label>
                        </Button>

                        <Label style = {styles.listingtxt}>Listing</Label>
                        <View style = {styles.sublistingView}>
                            <Thumbnail square source = {images.barbados_small} style = {styles.listingIcon}/>
                            <Label style = {styles.listingLable}>50 Bay St, Double Bay</Label>
                            <TouchableOpacity style = {{marginLeft: 10}}>
                                <MaterialCommunityIcons name = 'close' size = {18} color = '#717171' />
                            </TouchableOpacity>
                        </View>

                        <Button transparent style = {styles.attachBtn}>
                            <Label style = {styles.attachTxt}>+ ATTACH CONTACT</Label>
                        </Button>

                        <View style = {styles.buttonView}>
                            <TouchableOpacity>
                                <View style = {styles.deleteView}>
                                    <FontAwesome name = 'trash' size = {20} color = 'white' />
                                    <Label style = {styles.deleteTxt}>DELETE</Label>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {styles.completeView}>
                                    <MaterialIcons name = 'check' size = {20} color = 'white' />
                                    <Label style = {styles.deleteTxt}>MARK AS COMPLETE</Label>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>  
                </Content>              
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token, 
        tasks: state.task.tasks,
        completed_task: state.task.tasks_completed,
        uncompleted_task: state.task.tasks_uncompleted,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(tasksShow);