import { API } from '../constants'

function getToken(email, password){
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
                        "email": email,
                        "password": password
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
    getToken,
}