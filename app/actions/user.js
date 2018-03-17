import { API } from '../constants'

function getToken(){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.SESSION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json'
            },
            body:JSON.stringify({
                "data": {
                    "type": "sessions",
                    "attributes": {
                        "email": "testing@crmmobileapp.com",
                        "password": "example123"
                    }
                }
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Token Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get Token Failed', err);
            reject(err);
        })
    })
}

module.exports = {
    getToken,
}