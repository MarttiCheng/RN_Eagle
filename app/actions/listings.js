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

module.exports = {
    getProperties,
}