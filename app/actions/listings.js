import { API } from '../constants'

function getProperties(token) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Listings Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Listings Failed', err);
            reject(err);
        })
    })
}

function getListingsVendors(token, id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/vendors', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Listings Vendors Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Listings Vendors Failed', err);
            reject(err);
        })
    })
}

function getListingsActivity(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/notes', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Listings Activity Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Listings Activity Failed', err);
            reject(err);
        })
    })
}

function getListingsInspections(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/inspections', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Listings Inspections Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Listings Inspections Failed', err);
            reject(err);
        })
    })
}

function getListingsDocuments(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/documents', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Listings Documents Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Listings Documents Failed', err);
            reject(err);
        })
    })
}

function getListingsTasks(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/tasks', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Listings Tasks Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Listings Tasks Failed', err);
            reject(err);
        })
    })
}

module.exports = {
    getProperties,
    getListingsVendors,
    getListingsActivity,
    getListingsInspections,
    getListingsDocuments,
    getListingsTasks,
}