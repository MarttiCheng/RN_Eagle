import { API } from '../constants'

function getAllAccounts(token){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_ACCOUNTS, {
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

function getAccount(token, id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ALL_ACCOUNTS + '/' + id, {
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
    getAllAccounts,
    getAccount,
}
