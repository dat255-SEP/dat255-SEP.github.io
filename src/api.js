import axios from 'axios'

const api = axios.create({timeout: 5000})

export async function getBoatStuffs () {
  return api.get('http://192.168.56.101:8080/dmp/mss/state_update?count=30&api_key=mb%2Fmqs', {
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee'
    }
  })
}

export async function postState (xmlData) {
  const querystring = require('querystring')
  return api.post('https://dev.portcdm.eu/dmp/mss/state_update', querystring.stringify({}), {
    data: {
      xmlData
    },
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee',
      'Content-Type': 'application/xml '

    }
  })
}
