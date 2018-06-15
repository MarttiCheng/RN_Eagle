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

function createTask(token, id, arr){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_TASKS , {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": { 
                    "type": "tasks", 
                    "attributes": { 
                        "due_date": arr.due_date,
                        "body": arr.body,
                        "property_id": arr.property_id,
                        "contact_id": arr.contact_id,
                        "permission_type": arr.permission_type
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

function updateTask(token, id, arr){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_TASKS + '/' + id , {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": { 
                    "type": "tasks", 
                    "id": id,
                    "attributes": { 
                        "due_date": arr.due_date,
                        "body": arr.body,
                        "property_id": arr.property_id,
                        "contact_id": arr.contact_id,
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
    getCompletedTasks,
    getUnCompletedTasks,
    getTaskContacts,
    createTask,
    updateTask,
}