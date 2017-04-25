import axios from 'axios'

var querystring = require('querystring')
const api = axios.create({timeout: 5000})

export async function test() {
    api.post('http://192.168.56.101:8080/mb/mqs',
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
