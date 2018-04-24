import { API } from '../constants'

function getCompletedTasks(token) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_TASKS + '?filter[completed]=1', {
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

function getUnCompletedTasks(token) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_TASKS + '?filter[completed]=0', {
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

function getTaskContacts(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_TASKS + '/' + id + '?include=property,contact', {
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

module.exports = {
    getCompletedTasks,
    getUnCompletedTasks,
    getTaskContacts,
}