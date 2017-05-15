var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create({timeout: 5000})
var isXML = require('is-xml')

router.get('/getStates', async(req, res, next) => {
  const response = await api.get('http://192.168.56.101:8080/dmp/mss/state_update?count=30&api_key=mb%2Fmqs', {
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee'
    }
  })
  res.send(response.data)
})

router.post('/postDat', async(req, res, next) => {
  var xml =
  '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:portCallId>urn:x-mrn:stm:portcdm:port_call:SEGOT:e093e8f1-7622-435e-b0cb-73f64c58f5e5</ns2:portCallId>' +
  '<ns2:vesselId>urn:x-mrn:stm:vessel:IMO:9501368</ns2:vesselId>' +
  '<ns2:messageId>urn:x-mrn:stm:portcdm:message:0129ab7c-22fb-43a1-a21b-dc36bfd45d32</ns2:messageId>' +
  '<ns2:reportedBy>VesselAppLocStateView</ns2:reportedBy>' +
  '<ns2:locationState>' +
  '<ns2:referenceObject>VESSEL</ns2:referenceObject>' +
  '<ns2:time>2017-05-10T18:42:00.000Z</ns2:time>' +
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
  '</ns2:arrivalLocation>' +
  '</ns2:locationState>' +
  '</ns2:portCallMessage>'
  const response = await api.post('http://192.168.56.101:8080/dmp/mss/state_update', xml, {
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee',
      'Content-Type': 'application/xml'
    }
  }).catch(error => {
    console.log(error)
  })
  console.log(response.status)
  res.send(response.data)
})

module.exports = router
