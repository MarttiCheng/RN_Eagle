import { API } from '../constants'
var Promiss = require('bluebird')

function getAllInspections(token){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_INSPECTIONS, {
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

function getInspectionsRelationship(token, idList){
    promises = []
    for (var i = 0 ; i < idList.length ; i++ ) {
        var new_promise = new Promise((resolve, reject) => {
            fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + idList[i], {
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

function getInspectionPreregistered(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_INSPECTIONS + '/' + id + '/notes?filter[note_type]=Inspection&include=contact', {
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

function getInspectionEnquired(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/notes?filter[note_type]=Enquiry,enquiry&include=contact', {
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

function getInspectionAttendees(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_INSPECTIONS + '/' + id + '/notes?filter[note_type]=Inspection&include=contact', {
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

function getOwnerVendors(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/vendors', {
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
    getAllInspections,
    getInspectionsRelationship,
    getInspectionPreregistered,
    getInspectionEnquired,
    getInspectionAttendees,
    getOwnerVendors,
}
