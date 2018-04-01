
import { API } from '../constants'
import images from '../themes/images';
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

function getContactProperty_Vendor(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '?include=vendor_of', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Contact Property Vendor Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Property Vendor Failed', err);
            reject(err);
        })
    })
}

function getContractProperty_Enquired(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '/notes?filter[note_type]=enquiry,Enquiry,Inspection,Offer&include=property', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Contact Property Enquired Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Property Enquired Failed', err);
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

function getContactActivity(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '/notes', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Contact Activity Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Activity Failed', err);
            reject(err);
        })
    })
}

function getContactTasks(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '/tasks?filter[completed]=0', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Contact Tasks Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Tasks Failed', err);
            reject(err);
        })
    })
}

function getThumbnailUrl(token, URL){
    return new Promise((resolve, reject) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Thumbnail Image Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Thumbnail Image Failed', err);
            reject(err);
        })
    })
}

module.exports = {
    getAllContacts,
    getContact,
    getContactProperty_Vendor,
    getContractProperty_Enquired,
    getContactGroups,
    getContactRelationships,
    getContactActivity,
    getContactTasks,
    getThumbnailUrl,
}