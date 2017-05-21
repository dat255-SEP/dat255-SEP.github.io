var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create({timeout: 5000})

router.post('/bookBoat/:vesselId', async(req, res, next) => {
  const converted = convertBook(req.params.vesselId)
  const response = await api.post('http://dev.portcdm.eu:8080/mb/mss', converted, {
    headers: {
      'X-PortCDM-UserId': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': 'application/xml'
    }
  }).catch(error => {
    console.log(error)
  })
  res.writeHead(response.status)
  res.write(converted)
  res.end()
})

router.post('/getQueue', async(req, res, next) => {
  const response = await api.post('http://dev.portcdm.eu:8080/mb/mqs?fromTime=2017-05-21T14:20:21Z', '', {
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
  const response = await api.post('http://dev.portcdm.eu:8080/mb/mss', respXml, {
    headers: {
      'X-PortCDM-UserId': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': 'application/xml'
    }
  }).catch(error => {
    console.log(error)
  })
  res.send(response.data)
})

function convertBook (vesselId) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:portCallId>urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee</ns2:portCallId>' +
  '<ns2:vesselId>urn:mrn:stm:vessel:IMO:8506373</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:3e950f9a-3cf0-4946-a1ef-9e72c8b1451d</ns2:messageId>' +
  '<ns2:serviceState>' +
  '<ns2:serviceObject>TOWAGE</ns2:serviceObject>' +
  '<ns2:timeSequence>COMMENCED</ns2:timeSequence>' +
  '<ns2:time>2017-05-10T18:30:00.000Z</ns2:time>' +
  '<ns2:timeType>ESTIMATED</ns2:timeType>' +
  '<ns2:between>' +
  '<ns2:to>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:TRAFFIC_AREA</ns2:locationMRN>' +
  '</ns2:to>' +
  '<ns2:from>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:TRAFFIC_AREA</ns2:locationMRN>' +
  '</ns2:from>' +
  '</ns2:between>' +
  '</ns2:serviceState>' +
  '</ns2:portCallMessage>'
  return xml
}

function convertXmlLocation (xmlInput) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:portCallId>' + xmlInput[1] + '</ns2:portCallId>' + '<ns2:vesselId>' + xmlInput[2] + '</ns2:vesselId>' +
  '<ns2:messageId>' + xmlInput[3] + '</ns2:messageId>' + '<ns2:reportedBy>' + xmlInput[4] + '</ns2:reportedBy>' +
  '<ns2:locationState>' + '<ns2:referenceObject>' + xmlInput[5] + '</ns2:referenceObject>' + '<ns2:time>' + xmlInput[6] +
  ':00.000Z</ns2:time>' + '<ns2:timeType>' + xmlInput[7] + '</ns2:timeType>' + '<ns2:arrivalLocation>' + '<ns2:to>' +
  '<ns2:position>' + '<ns2:latitude>0</ns2:latitude>' + '<ns2:longitude>0</ns2:longitude>' + '<ns2:name>' + xmlInput[8] + '</ns2:name>' + '</ns2:position>' + '<ns2:locationType>' + xmlInput[9] + '</ns2:locationType>' + '</ns2:to>' + '</ns2:arrivalLocation>' + '<ns2:departureLocation>' + '<ns2:from>' + '<ns2:position>' + '<ns2:latitude>0</ns2:latitude>' + '<ns2:longitude>0</ns2:longitude>' + '<ns2:name>' + xmlInput[11] + '</ns2:name>' + '</ns2:position>' + '</ns2:from>' + '<ns2:locationType>' + xmlInput[10] + '</ns2:locationType>' + '</ns2:departureLocation>' + '</ns2:locationState>' + '</ns2:portCallMessage>'
  return xml
}

function convertXmlService (xmlInput) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:portCallId>urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee</ns2:portCallId>' +
  '<ns2:vesselId>urn:mrn:stm:vessel:IMO:8506373</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:3e950f9a-3cf0-4946-a1ef-9e05c8b1452d</ns2:messageId>' +
  '<ns2:comment>TugLajf</ns2:comment>' +
  '<ns2:serviceState>' +
  '<ns2:serviceObject>' + xmlInput[4] + '</ns2:serviceObject>' +
  '<ns2:timeSequence>' + xmlInput[6] + '</ns2:timeSequence>' +
  '<ns2:time>' + xmlInput[7] + ':00.000Z</ns2:time>' +
  '<ns2:timeType>' + xmlInput[8] + '</ns2:timeType>' +
  '<ns2:between>' +
  '<ns2:to>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[10] + '</ns2:locationMRN>' +
  '</ns2:to>' +
  '<ns2:from>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[11] + '</ns2:locationMRN>' +
  '</ns2:from>' +
  '</ns2:between>' +
  '</ns2:serviceState>' +
  '</ns2:portCallMessage>'
  return xml
}
module.exports = router
