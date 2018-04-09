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
            console.log('Get All Inspections Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Inspections Failed', err);
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
                console.log('Get Inspections Relationshiop Success', data);
                resolve(data);
            })
            .catch(err => {
                console.log('Get Inspections Relationshiop Failed', err);
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
        // fetch(API.BASE_URL + API.ALL_INSPECTIONS + '/' + id + '/notes?filter[note_type]=Inspection&include=contact', {
        fetch(API.BASE_URL + API.ALL_INSPECTIONS + '/' + id + '/notes?filter[note_type]=InspectionRegistration', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Inspection Pre-registered Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Inspection Pre-registered Failed', err);
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
            console.log('Inspection Enquired Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Inspection Enquired Failed', err);
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
            console.log('Inspection Attendees List Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Inspection Attendees List Failed', err);
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
}
