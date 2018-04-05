import { API } from '../constants'

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

module.exports = {
    getAllInspections
}
