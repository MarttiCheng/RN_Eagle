
import { API } from '../constants'

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
            console.log('Get All Contacts Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Contacts Failed', err);
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
            console.log('Get Contact Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Contact Failed', err);
            reject(err);
        })
    })
}

module.exports = {
    getAllContacts,
    getContact,
}
