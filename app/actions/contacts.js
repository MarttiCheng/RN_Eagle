
import { API } from '../constants'
var Promiss = require('bluebird')

function getAllContacts(token){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get All Contacts Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Contacts Failed', err);
            reject(err);
        })
    })
}

function getContact(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Contact Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Failed', err);
            reject(err);
        })
    })
}

function getContactProperty(token, url){
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Contact Property Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Property Failed', err);
            reject(err);
        })
    })
}

function getContactGroups(token, idList) {
    promises = []
    for (var i = 0 ; i < idList.length ; i++ ) {
        var new_promise = new Promise((resolve, reject) => {
            fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + idList[i] + '?include=contact_groups', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => res.json())
            .then(data => {
                console.log('Get Contact_Groups Success', data);
                resolve(data);
            })
            .catch(err => {
                console.log('Get Contact_Groups Failed', err);
                reject(err);
            })
        })
        promises.push(new_promise)
    }
    return Promise.all(promises).then(function(data) {
        return data;
    })
}

function getContactRelationships(token, idList) {
    promises = []
    for (var i = 0 ; i < idList.length ; i++ ) {
        var new_promise = new Promise((resolve, reject) => {
            fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + idList[i] + '/contact-relationships', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => res.json())
            .then(data => {
                console.log('Get Contact_Relationships Success', data);
                resolve(data);
            })
            .catch(err => {
                console.log('Get Contact_Relationships Failed', err);
                reject(err);
            })
        })
        promises.push(new_promise)
    }
    return Promise.all(promises).then(function(data) {
        return data;
    })
}

module.exports = {
    getAllContacts,
    getContact,
    getContactProperty,
    getContactGroups,
    getContactRelationships
}
