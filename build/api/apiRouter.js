var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create({timeout: 5000})
const moment = require('moment')

router.post('/bookBoat/:xml', async(req, res, next) => {
  const splitInput = (req.params.xml.split(','))
  const converted = convertBook(splitInput, uuid())
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
  const timeNow = new Date()
  const correctTime = moment(timeNow - (3600000 * 3)).local().format('YYYY-MM-DDTHH:mm:ss')
  const response = await api.post('http://dev.portcdm.eu:8080/mb/mqs?fromTime=' + encodeURIComponent(correctTime + 'Z'), '', {
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
    if (splitInput[7].localeCompare('ETUG_ZONE') === 0 || splitInput[7].localeCompare('TUG_ZONE') === 0 ||
        splitInput[7].localeCompare('BERTH') === 0) {
      respXml = convertXmlLocationArrival(splitInput, uuid())
    } else {
      respXml = convertXmlLocationDeparture(splitInput, uuid())
    }
  } else {
    respXml = convertXmlService(splitInput, uuid())
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

function convertBook (xmlInput, messageId) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:portCallId>urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee</ns2:portCallId>' +
  '<ns2:vesselId>urn:mrn:stm:vessel:IMO:' + xmlInput[1] + '</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:' + messageId + '</ns2:messageId>' +
  '<ns2:serviceState>' +
  '<ns2:serviceObject>' + xmlInput[0] + '</ns2:serviceObject>' +
  '<ns2:timeSequence>REQUESTED</ns2:timeSequence>' +
  '<ns2:time>' + xmlInput[2] + 'Z</ns2:time>' +
  '<ns2:timeType>ACTUAL</ns2:timeType>' +
  '<ns2:between>' +
  '<ns2:to>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[3] + '</ns2:locationMRN>' +
  '</ns2:to>' +
  '<ns2:from>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[4] + '</ns2:locationMRN>' +
  '</ns2:from>' +
  '</ns2:between>' +
  '</ns2:serviceState>' +
  '</ns2:portCallMessage>'
  return xml
}

function convertXmlLocationArrival (xmlInput, messageId) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:portCallId>urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee</ns2:portCallId>' +
  '<ns2:vesselId>' + xmlInput[2] + '</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:' + messageId + '</ns2:messageId>' +
  '<ns2:reportedBy>' + xmlInput[3] + '</ns2:reportedBy>' +
  '<ns2:locationState>' +
  '<ns2:referenceObject>' + xmlInput[4] + '</ns2:referenceObject>' +
  '<ns2:time>' + xmlInput[5] + ':00.000Z</ns2:time>' +
  '<ns2:timeType>' + xmlInput[6] + '</ns2:timeType>' +
  '<ns2:arrivalLocation>' + '<ns2:to>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[7] + '</ns2:locationMRN>' +
  '</ns2:to>' +
  '</ns2:arrivalLocation>' +
  '</ns2:locationState>' +
  '</ns2:portCallMessage>'
  return xml
}

function convertXmlLocationDeparture (xmlInput, messageId) {
  console.log(xmlInput)
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:portCallId>urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee</ns2:portCallId>' +
  '<ns2:vesselId>' + xmlInput[2] + '</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:' + messageId + '</ns2:messageId>' +
  '<ns2:reportedBy>' + xmlInput[3] + '</ns2:reportedBy>' +
  '<ns2:locationState>' +
  '<ns2:referenceObject>' + xmlInput[4] + '</ns2:referenceObject>' +
  '<ns2:time>' + xmlInput[5] + ':00.000Z</ns2:time>' +
  '<ns2:timeType>' + xmlInput[6] + '</ns2:timeType>' +
  '<ns2:departureLocation>' +
  '<ns2:from>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[8] + '</ns2:locationMRN>' +
  '</ns2:from>' +
  '</ns2:departureLocation>' +
  '</ns2:locationState>' +
  '</ns2:portCallMessage>'
  return xml
}

function convertXmlService (xmlInput) {
  var xml = '<ns2:portCallMessage xmlns:ns2="urn:mrn:stm:schema:port-call-message:0.6">' +
  '<ns2:portCallId>urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee</ns2:portCallId>' +
  '<ns2:vesselId>' + xmlInput[2] + '</ns2:vesselId>' +
  '<ns2:messageId>urn:mrn:stm:portcdm:message:' + uuid() + '</ns2:messageId>' +
  '<ns2:comment>TugLajf</ns2:comment>' +
  '<ns2:serviceState>' +
  '<ns2:serviceObject>' + xmlInput[4] + '</ns2:serviceObject>' +
  '<ns2:timeSequence>' + xmlInput[5] + '</ns2:timeSequence>' +
  '<ns2:time>' + xmlInput[6] + ':00.000Z</ns2:time>' +
  '<ns2:timeType>' + xmlInput[7] + '</ns2:timeType>' +
  '<ns2:between>' +
  '<ns2:to>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[9] + '</ns2:locationMRN>' +
  '</ns2:to>' +
  '<ns2:from>' +
  '<ns2:locationMRN>urn:mrn:stm:location:SEGOT:' + xmlInput[10] + '</ns2:locationMRN>' +
  '</ns2:from>' +
  '</ns2:between>' +
  '</ns2:serviceState>' +
  '</ns2:portCallMessage>'
  return xml
}

function uuid () {
  return s4() + s4() + '-' + s4() + '-4' + s4().substring(0, 3) + '-B' +
  s4().substring(0, 3) + '-' + s4() + s4() + s4()
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1)
}
module.exports = router
