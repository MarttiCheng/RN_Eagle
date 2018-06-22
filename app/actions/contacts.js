
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

function getMyContacts(token, user_id, group_id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '?filter[user_id]=' + user_id + '&filter[contact_group_ids]=' + group_id, {
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

function getMyContacts1(token, user_id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '?filter[user_id]=' + user_id, {
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

function getContactGroup(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '?include=contact_groups', {
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

function getEachContactRelationships(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '/contact-relationships', {
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

function getContactActivity(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '/notes'+ '?sort=-created_at' + '&page[offset]=0&page[limit]=20', {
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
                        "user_id": arr.user_id,
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

function createContactRelationship(token, id1, id2, contactType){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.CONTACT_RELATIONSHIP, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": {
                    "type": "contact_relationships",
                    "attributes": {
                        "contact1_id": id1,
                        "contact2_id": id2,
                        "relationship_type": contactType
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

function deleteContactRelationship(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.CONTACT_RELATIONSHIP + '/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
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

function listContactGroups(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.CONTACT_GROUPS, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
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

function createNewContact(token, id, arr){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '?filter%5Bfirst_name%5D=' + arr.first_name + '&filter%5Blast_name%5D=' + arr.last_name + '&filter%5Btitle%5D=' + arr.title + '&filter%5Bcompany%5D=' + arr.company + '&filter%5Breferred_by%5D=' + arr.referred_by + '&filter%5Bsubscribed%5D=' + arr.subscribed + '&filter%5Bsms_subscribed%5D=' + arr.sms_subscribed +'&filter%5Bproperty_alerts_subscribed%5D=' + arr.property_alerts_subscribed + '&filter%5Bquery%5D=query', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": {
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
                        "user_id": arr.user_id,
                        "showed_at": arr.showed_at
                    }
                },
                "relationships": {
                    "account": {
                        "data": {
                            "type": "accounts",
                            "id": id
                        }
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

function updateContactGroup(token, id, arr){
    var array = []
    for (var i = 0 ; i < arr.length ; i++ ) {
        var a = {
            "type": "contact_groups",
            "id": arr[i].id
        }
        array.push(a)
    }
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_CONTACTS + '/' + id + '/relationships/contact-groups', {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": array
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

function createNote(token, id, arr){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_NOTE , {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": {
                    "type": "notes",
                    "attributes": {
                        "contact_id": arr.contact_id,
                        "property_id": arr.property_id,
                        "text": arr.text,
                        "account_id": id,
                        "note_type": arr.note_type,
                        "offer_price": arr.offer_price,
                        "permission_type": arr.permission_type,
                        "visible_to_vendor": arr.visible_to_vendor
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
    getMyContacts,
    getMyContacts1,
    getContact,
    getContactProperty_Vendor,
    getContractProperty_Enquired,
    getContactGroups,
    getContactGroup,
    getContactRelationships,
    getContactActivity,
    getContactTasks,
    getThumbnailUrl,
    updateContact,
    updateContactGroup,
    createContactRelationship,
    getEachContactRelationships,
    deleteContactRelationship,
    listContactGroups,
    createNewContact,
    createNote,
}