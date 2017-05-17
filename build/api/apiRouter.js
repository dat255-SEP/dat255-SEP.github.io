var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create({timeout: 5000})

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

router.post('/postDat/:xml', async(req, res, next) => {
  const respXml = convertXmlLocation((req.params.xml).split(','))
  const response = await api.post('http://192.168.56.101:8080/dmp/mss/state_update', respXml, {
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee',
      'Content-Type': 'application/xml'
    }
  }).catch(error => {
    console.log(error)
  })
  res.send(response.data)
})

function convertXmlLocation (xmlInput) {
  var xml =
        '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
        '<ns2:portCallId>' + xmlInput[0] + '</ns2:portCallId>' +
        '<ns2:vesselId>' + xmlInput[1] + '</ns2:vesselId>' +
        '<ns2:messageId>' + xmlInput[2] + '</ns2:messageId>' +
        '<ns2:reportedBy>' + xmlInput[3] + '</ns2:reportedBy>' +
        '<ns2:locationState>' +
        '<ns2:referenceObject>' + xmlInput[4] + '</ns2:referenceObject>' +
        '<ns2:time>' + xmlInput[5] + 'T18:42:00.000Z</ns2:time>' +
        '<ns2:timeType>' + xmlInput[6] + '</ns2:timeType>' +
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
  return xml
}

module.exports = router
