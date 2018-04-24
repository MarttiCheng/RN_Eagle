
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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
                resolve(data);
            })
            .catch(err => {
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
                resolve(data);
            })
            .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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