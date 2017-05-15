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

router.get('/postDat', async(req, res, next) => {
  const querystring = require('querystring')
  const response = await api.post('http://192.168.56.101:8080/dmp/mss/state_update', querystring.stringify({}), {
    headers: {
      'X-PortCDM-UserId': 'porter',
      'X-PortCDM-Password': 'porter',
      'X-PortCDM-APIKey': 'eeee',
      'Content-Type': 'application/xml'

    }
  })
  console.log(response.status)
  res.send(response.data)
})

module.exports = router
