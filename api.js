import axios from 'axios'

var querystring = require('querystring')
export const api = axios.create({timeout: 5000})

export async function test2() {
    return api.post('http://192.168.56.101:8080/mb/mqs',
    querystring.stringify({

    }), {
        headers: {
            'X-PortCDM-UserId': 'porter',
            'X-PortCDM-Password': 'porter',
            'X-PortCDM-APIKey': 'eeee',
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
}

export async function test() {
    return api.get('http://192.168.56.101:8080/dmp/mss/state_update?count=30&api_key=mb%2Fmqs',
    {
        headers: {
            'X-PortCDM-UserId': 'porter',
            'X-PortCDM-Password': 'porter',
            'X-PortCDM-APIKey': 'eeee'
        }
    }).then(function(response) {
        return (response.data)
    }).catch((error) => {
      console.log(error)
    })
}
