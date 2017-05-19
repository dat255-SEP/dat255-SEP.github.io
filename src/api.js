import axios from 'axios'

const api = axios.create({timeout: 5000})

export async function getStatesQueue () {
  const response = await api.post(`/api/getQueue`)
  if (!response) {
    throw new Error('could not get states')
  }
  return response.data
}

export async function getStatesFromQueue (id) {
  const response = await api.get(`/api/getAllThoseCalls/${id}`)
  if (!response) {
    throw new Error('could not get States from queue')
  }
  return response.data
}

export async function getBoatStuffs () {
  const response = await api.get(`/api/getStates`)
  if (!response) {
    throw new Error('could not get states')
  }
  return response.data
}

export async function postState (xml) {
  const response = await api.post(`/api/postDat/${xml}`)
  if (!response) {
    throw new Error('could not get states')
  }
  return response
}
