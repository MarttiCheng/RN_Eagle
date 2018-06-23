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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

function getListingsActivity(token, id, page) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_LISTINGS + '/' + id + '/notes' + '?sort=-created_at' + '&page[offset]=' + page*20 + '&page[limit]=20', {
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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
            resolve(data);
        })
        .catch(err => {
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