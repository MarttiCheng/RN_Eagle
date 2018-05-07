
import { API } from '../constants'
import {Content} from 'native-base';
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

function updateContact(token, id, arr){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": {
                    "id": id,
                    "type": "contacts",
                    "attributes": {
                        "first_name": arr.first_name,
                        "last_name": arr.last_name,
                        "title": arr.title,
                        "company": arr.company,
                        "business_hours_phone": arr.business_hours_phone,
                        "after_hours_phone": arr.after_hours_phone,
                        "mobile_phone": arr.mobile_phone,
                        "email": arr.email,
                        "address_line_1": arr.address_line_1,
                        "address_line_2": arr.address_line_2,
                        "suburb": arr.suburb,
                        "state": arr.state,
                        "postcode": arr.postcode,
                        "gender": arr.gender,
                        "solicitor_id": arr.solicitor_id,
                        "spouse_id": arr.spouse_id,
                        "country": arr.country,
                        "background_info": arr.background_info,
                        "subscribed": arr.subscribed,
                        "referred_by": arr.referred_by,
                        "sms_subscribed": arr.sms_subscribed,
                        "fax": arr.fax,
                        "dob": arr.dob,
                        "property_alerts_subscribed": arr.property_alerts_subscribed,
                        "permission_type": arr.permission_type,
                        "facebook_username": arr.facebook_username,
                        "linkedin_username": arr.linkedin_username,
                        "twitter_username": arr.twitter_username,
                        "photo_url": arr.photo_url,
                        "jobs": arr.jobs,
                        "education": arr.education,
                        "found_phones": arr.found_phones,
                        "found_addresses": arr.found_addresses,
                        "found_name": arr.found_name,
                        "uid": arr.uid,
                        "unsubscribe_reason": arr.unsubscribe_reason,
                        "showed_at": arr.showed_at
                    }
                }
            })
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
    updateContact,
}