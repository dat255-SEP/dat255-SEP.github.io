var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create({timeout: 5000})

router.post('/bookBoat/:vesselId', async(req, res, next) => {
  const converted = convertBook(req.params.vesselId)
  const response = await api.post('http://dev.portcdm.eu:8080/amss/state_update', converted, {
    headers: {
      'X-PortCDM-UserId': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': 'application/xml'
    }
  })
  if (!response) {
    throw new Error('OPSI, could not get api')
  }
  res.sendStatus(response.status)
})

router.post('/getQueue', async(req, res, next) => {
  const response = await api.post('http://dev.portcdm.eu:8080/mb/mqs?fromTime=2017-05-10T14:20:21Z', '', {
    headers: {
      'X-PortCDM-UserId': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': 'application/json'
    }
  }).catch(error => {
    console.log(error)
  })
  res.send(response.data)
})

router.get('/getAllThoseCalls/:queueId', async(req, res, next) => {
  const queueId = req.params.queueId
  const response = await api.get('http://dev.portcdm.eu:8080/mb/mqs/' + queueId, {
    headers: {
      'X-PortCDM-UserId': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc'
    }
  }).catch(error => {
    console.log(error)
  })
  res.send(response.data)
})

router.post('/postDat/:xml', async(req, res, next) => {
  const splitInput = (req.params.xml.split(','))
  let respXml = ''
  if (splitInput[0].localeCompare('location') === 0) {
    respXml = convertXmlLocation(splitInput)
  } else {
    respXml = convertXmlService(splitInput)
  }
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

function convertBook (vesselId) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:vesselId>urn:mrn:stm:vessel:IMO:' + vesselId + '</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:5e989f8a-3cf6-4921-a0ef-9e70c8b1321d</ns2:messageId>' +
  '<ns2:locationState>' +
  '<ns2:referenceObject>VESSEL</ns2:referenceObject>' +
  '<ns2:time>2017-05-21T06:30:00.000Z</ns2:time>' +
  '<ns2:timeType>ESTIMATED</ns2:timeType>' +
  '<ns2:arrivalLocation>' +
  '<ns2:to>' +
  '<ns2:locationMRN>urn:mrn:stm:location:segot:BERTH:arendal750</ns2:locationMRN>' +
  '</ns2:to>' +
  '</ns2:arrivalLocation>' +
  '</ns2:locationState>' +
  '</ns2:portCallMessage>'
  return xml
}

function convertXmlLocation (xmlInput) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:portCallId>' + xmlInput[1] + '</ns2:portCallId>' +
  '<ns2:vesselId>' + xmlInput[2] + '</ns2:vesselId>' +
  '<ns2:messageId>' + xmlInput[3] + '</ns2:messageId>' +
  '<ns2:reportedBy>' + xmlInput[4] + '</ns2:reportedBy>' +
  '<ns2:locationState>' +
  '<ns2:referenceObject>' + xmlInput[5] + '</ns2:referenceObject>' +
  '<ns2:time>' + xmlInput[6] + ':00.000Z</ns2:time>' +
  '<ns2:timeType>' + xmlInput[7] + '</ns2:timeType>' +
  '<ns2:arrivalLocation>' +
  '<ns2:to>' +
  '<ns2:position>' +
  '<ns2:latitude>0</ns2:latitude>' +
  '<ns2:longitude>0</ns2:longitude>' +
  '<ns2:name>' + xmlInput[8] + '</ns2:name>' +
  '</ns2:position>' +
  '<ns2:locationType>' + xmlInput[9] + '</ns2:locationType>' +
  '</ns2:to>' +
  '</ns2:arrivalLocation>' +
  '<ns2:departureLocation>' +
  '<ns2:from>' +
  '<ns2:position>' +
  '<ns2:latitude>0</ns2:latitude>' +
  '<ns2:longitude>0</ns2:longitude>' +
  '<ns2:name>' + xmlInput[11] + '</ns2:name>' +
  '</ns2:position>' +
  '</ns2:from>' +
  '<ns2:locationType>' + xmlInput[10] + '</ns2:locationType>' +
  '</ns2:departureLocation>' +
  '</ns2:locationState>' +
  '</ns2:portCallMessage>'
  return xml
}

function convertXmlService (xmlInput) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:portCallId>urn:x-mrn:stm:portcdm:port_call:SEGOT:e093e8f1-7622-435e-b0cb-73f64c58f5e5</ns2:portCallId>' +
  '<ns2:messageId>urn:x-mrn:stm:portcdm:message:e3f58f50-0b65-41a5-b43b-04be6721d92d</ns2:messageId>' +
  '<ns2:serviceState>' +
  '<ns2:serviceObject>TOWAGE</ns2:serviceObject>' +
  '<ns2:timeSequence>COMMENCED</ns2:timeSequence>' +
  '<ns2:time>2017-05-10T18:30:00.000Z</ns2:time>' +
  '<ns2:timeType>ESTIMATED</ns2:timeType>' +
  '<ns2:between>' +
  '<ns2:to>' +
  '<ns2:position>' +
  '<ns2:latitude>0</ns2:latitude>' +
  '<ns2:longitude>0</ns2:longitude>' +
  '<ns2:name>Gothenburg Port</ns2:name>' +
  '</ns2:position>' +
  '<ns2:locationType>TRAFFIC_AREA</ns2:locationType>' +
  '</ns2:to>' +
  '<ns2:from>' +
  '<ns2:position>' +
  '<ns2:latitude>0</ns2:latitude>' +
  '<ns2:longitude>0</ns2:longitude>' +
  '<ns2:name>Gothenburg Port</ns2:name>' +
  '</ns2:position>' +
  '<ns2:locationType>TRAFFIC_AREA</ns2:locationType>' +
  '</ns2:from>' +
  '</ns2:between>' +
  '</ns2:serviceState>' +
  '</ns2:portCallMessage>'
  return xml
}
module.exports = router
