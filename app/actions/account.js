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
            console.log('Get All Accounts Success', data);
            console.log('->', token)
            console.log(API.BASE_URL + API.ALL_ACCOUNTS)
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Accounts Failed', err);
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
            console.log('Get Account Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Account Failed', err);
            reject(err);
        })
    })
}

module.exports = {
    getAllAccounts,
    getAccount,
}
