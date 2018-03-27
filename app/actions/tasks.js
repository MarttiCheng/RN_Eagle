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
            console.log('Get Completed Tasks Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Uncompleted Failed', err);
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
            console.log('Get Completed Tasks Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Uncompleted Failed', err);
            reject(err);
        })
    })
}

module.exports = {
    getCompletedTasks,
    getUnCompletedTasks,
}