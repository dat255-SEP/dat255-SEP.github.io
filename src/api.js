import axios from 'axios'
import xml2js from 'xml2js'
var parser = new xml2js.Parser()

const api = axios.create({timeout: 5000})

export async function getBoatStuffs () {
  const response = await api.get(`/api/getStates`)
  if (!response) {
    throw new Error('could not get states')
  }
  return response.data
}

export async function postState (xml) {
  const xmlParsed = parseXML(xml)
  const response = await api.post(`/api/postDat/${xmlParsed}`)
  if (!response) {
    throw new Error('could not get states')
  }
  return response
}

function parseXML (xml) {
  let lol = ''
  parser.parseString(xml, function (err, result) {
    if (err) {
      console.log(err)
    }
    lol = result
  })
  return JSON.stringify(lol)
}
