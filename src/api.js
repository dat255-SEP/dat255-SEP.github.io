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

var xml = '' +
'<?xml version="1.0" encoding="UTF-8"?>' +
'<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:vesselId>urn:mrn:stm:vessel:IMO:9501368</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:5919ab7c-22fb-43a1-a21b-dc36bfd45d32</ns2:messageId>'
'<ns2:reportedBy>VesselAppLocStateView</ns2:reportedBy>' +
  '<ns2:locationState>' +
      '<ns2:referenceObject>VESSEL</ns2:referenceObject>' +
      '<ns2:time>2017-05-10T18:20:00.000Z</ns2:time>' +
      '<ns2:timeType>ESTIMATED</ns2:timeType>' +
      '<ns2:arrivalLocation>' +
          '<ns2:to>' +
              '<ns2:position>' +
                  '<ns2:latitude>0</ns2:latitude>' +
                  '<ns2:longitude>0</ns2:longitude>' +
                  '<ns2:name>Gothenburg Port</ns2:name>' +
              '</ns2:position>' +
              '<ns2:locationType>TRAFFIC_AREA</ns2:locationType>' +
          '</ns2:to>' +
      '</ns2:arrivalLocation>'
'</ns2:locationState>'
'</ns2:portCallMessage>'

export async function postServiceState () {
  const querystring = require('querystring')
  return api.post('https://dev.portcdm.eu/mb/mqs', querystring.stringify({}), {
    data: {
      xml
    },
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee',
      'Content-Type': 'application/xml '

    }
  })
}
