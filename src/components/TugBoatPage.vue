<template>
<div class="page">

  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
  </head>

  <div class="hero">
    <img class="logo" src="../assets/tuglife-logo.png" width="30%">
    <br>
  </div>
  <div class="table-container">
    <table class="table">
      <tr>
        <td>
          <table class="table">
            <thead>
              <tr class="table-titles">
                <th> VesselIds </th>
                <th> Service Object </th>
                <th> Performing Actor </th>
                <th> Time Sequence </th>
                <th> Time </th>
                <th> Type </th>
                <th> Location </th>
                <th> Update </th>
                <!-- <th> From: Location </th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="boat in boatArray">
                <td> {{ boat.vesselId }} </td>
                <td> {{ boat.serviceState.serviceObject }} </td>
                <td> {{ boat.performingActor }} </td>
                <td> {{ boat.serviceState.timeSequence }} </td>
                <td> {{ boat.serviceState.time }} </td>
                <td> {{ boat.serviceState.timeType }} </td>
                <td>
                  {{ ' ' }}
                </td>
                <td> <button class="btn btn-book" v-on:click="updateLocation(boat)">Update</button> </td>
              </tr>
                <tr v-for="between in toArrayOut">
                  <td> {{ between.vesselId }} </td>
                  <td> {{ between.locationState.referenceObject }} </td>
                  <td> {{ ' '}} </td>
                  <td> {{ ' ' }} </td>
                  <td> {{ between.locationState.time }} </td>
                  <td> {{ between.locationState.timeType }} </td>
                  <td> {{ between.locationState.arrivalLocation || between.locationState.departureLocation }} </td>
                  <td> <button class="btn btn-book" v-on:click="updateLocation(between)">Update</button> </td>
                </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
  </div>

  <table class="table">
    <tr class="changeRow">
      <td>
        <div class="form-box">
          <div class="locationTitle">
            <h1>Change Location State</h1> </div>
          <div>
            <form action="#" method="post" class="contact-form">
              <div>
                <div> <label>PortCall ID</label> </div>
                <div> <input v-model="portCallId"> </div>
              </div>
              <div>
                <div> <label>Vessel ID</label> </div>
                <div> <input v-model="vesselId" readonly> </div>
              </div>
              <div>
                <div> <label>Reported By</label> </div>
                <div> <input v-model="reportedBy"> </div>
              </div>
              <div>
                <div> <label>Reference Object</label> </div>
                <div>
                  <select v-model="referenceObject">
                    <option>ESCORT_TUG</option>
                    <option>TUG</option>
                  </select>
                </div>
              </div>
              <div>
                <div> <label>Time</label> </div>
                <div> <input class="inputTime" v-model="time" type="datetime-local" id="theTime"> </div>
              </div>
              <div>
                <div> <label>Time Type</label> </div>
                <div>
                  <select v-model="timeType">
      								<option>ACTUAL</option>
      								<option>ESTIMATED</option>
      							</select>
                </div>
              </div>
              <div>
                <div> <label>Arrival Location </label> </div>
                <div>
                  <select v-model="arrivalLocationType">
                    <option>ETUG_ZONE</option>
                    <option>TUG_ZONE</option>
                    <option>BERTH</option>
                  </select>
                </div>
              </div>
              <div>
                <div> <label>Departure Location</label> </div>
                <div>
                  <select v-model="departureLocation">
                    <option>LOC</option>
                    <option>VESSEL</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <button id="post_button" v-on:click="postLocationState">Post</button>
        <div class="post">
          <h2> {{ 'Statuscode: ' }} </h2>
          <form>
            <textarea class="status-form"> {{ statuscode }} </textarea>
          </form>
        </div>
      </td>
      <td>
        <div class="form-box">
          <div class="locationTitle">
            <h1>Change Service State</h1> </div>
          <div>
            <form action="#" method="post" class="contact-form">
              <div>
                <div> <label>PortCall ID</label> </div>
                <div> <input v-model="portCallId"> </div>
              </div>
              <div>
                <div> <label>Vessel ID</label> </div>
                <div> <input v-model="vesselId"> </div>

              </div>
              <div>
                <div> <label>Performing Actor</label> </div>
                <div>
                  <select v-model="performingActor">
                      <option> EscortTowage </option>
                      <option> Towage </option>
                    </select>
                </div>
              </div>
              <div>
                <div> <label>Service Object</label> </div>
                <div> <input v-model="serviceObject"> </div>
              </div>
              <div>
                <div> <label>Time Sequence</label> </div>
                <div>
                  <select v-model="timeSequence">
                      <option> COMMENCED </option>
                      <option> COMPLETED </option>
                      <option> CONFIRMED </option>
                      <option> DENIED </option>
                      <option> REQUEST_RECEIVED </option>
                      <option> REQUESTED </option>
                    </select>
                </div>
              </div>
              <div>
                <div> <label>Time</label> </div>
                <div> <input class="inputTime" v-model="timeSer" type="datetime-local" id="theTime"> </div>
              </div>
              <div>
                <div> <label>Time Type</label> </div>
                <div>
                  <select v-model="timeTypeSer">
                    <option>ACTUAL</option>
                    <option>ESTIMATED</option>
                    <option>EXPECTED</option>
                    </select>
                </div>
              </div>
              <div>
                <div> <label>At Location</label> </div>
                <div> <input v-model="at"> </div>
              </div>
              <div>
                <div> <label>Between: To Location</label> </div>
                <div> <input v-model="to"> </div>
              </div>
              <div>
                <div> <label>Between: From Location</label> </div>
                <div> <input v-model="from"> </div>
              </div>
              <div>
                <div> <label>&nbsp;</label> </div>
              </div>
            </form>
          </div>
        </div>
        <button id="post_button" v-on:click="postServiceState">Post</button>
        <div class="post">
          <h2> {{ 'Statuscode: ' }} </h2>
          <form> <textarea class="status-form"> {{ statuscodeServ }} </textarea> </form>
        </div>
      </td>
    </tr>
  </table>
</div>
</template>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous">

</script>

<script>
import * as api from '../api'
import moment from 'moment'
require('../stylesheets/style.css')

export default {
  async created () {
    const response = await api.getStatesQueue()
    if (!response) {
      throw new Error('could not get states')
    }
    this.getStatesFromQueue(response)
    this.updateAPICall()
    this.updateLocation([''])
  },
  data () {
    return {
      msg: '',
      boatArray: '',
      toArrayOut: '',
      idArrayOut: '',
      idArrayOut2: '',
      vesselId: '',
      messageId: '',
      reportedBy: '',
      referenceObject: '',
      time: '',
      timeType: '',
      arrivalLocation: '',
      message: '',
      statuscode: '',
      serviceObject: '',
      performingActor: '',
      timeSequence: '',
      timeSer: '',
      timeTypeSer: '',
      at: '',
      to: '',
      from: '',
      statuscodeServ: '',
      messageServ: '',
      vesselIdArray: '',
      portCallId: '',
      arrivalLocationType: '',
      departureLocation: '',
      departureLocationType: ''
    }
  },
  methods: {
    updateLocation (boat) {
      this.portCallId = boat.portCallId
      this.vesselId = boat.vesselId
      this.messageId = boat.messageId
      this.time = moment(boat.serviceState.time).format('YYYY-MM-DDThh:mm')
      this.timeType = this.timeTypeSer = boat.serviceState.timeType
      this.timeSequence = boat.serviceState.timeSequence
      this.to = boat.serviceState.between.to.name
      this.from = boat.serviceState.between.from.name
      if (boat.locationState) {
        this.referenceObject = boat.locationState.referenceObject
      } else {
        this.serviceObject = boat.serviceState.serviceObject
      }
    },
    filterCall (array) {
      const answers = (array.map(m => ({
        'portCallId': m.portCallId,
        'messageId': m.messageId,
        'vesselId': m.vesselId,
        'locationState': m.locationState,
        'serviceState': m.serviceState
      })))
      console.log(array)
      answers.forEach(el => {
        if (el.locationState === null) {
          delete (el.locationState)
        } else if (el.serviceState === null) {
          delete (el.serviceState)
        }
      })

      const locationArray = []
      const filteredTugs = answers.filter(function (el) {
        if (el.locationState) {
          if (el.locationState.referenceObject === 'TUG' || el.locationState.referenceObject === 'ESCORT_TUG') {
            locationArray.push(el)
          }
        } else if (el.serviceState) {
          if (el.serviceState.serviceObject === 'TOWAGE' || el.serviceState.serviceObject === 'ESCORT_TOWAGE') {
            return el
          }
        }
      })

      filteredTugs.filter(function (tid) {
        tid.serviceState.time = moment(tid.serviceState.time).local().format('MM/DD/YYYY, hh:mm')
      })
      this.boatArray = filteredTugs
      this.toArrayOut = locationArray
    },
    async getStatesFromQueue (id) {
      const datQueueThough = await api.getStatesFromQueue(id)
      if (!datQueueThough) {
        throw new Error('could not get dat queue though')
      }
      this.filterCall(datQueueThough)
    },

    async postServiceState () {
      const input = ['service', this.portCallId, this.vesselId, this.serviceObject, this.performingActor, this.timeSequence, this.timeSer, this.timeTypeSer,
        this.at, this.to, this.from
      ]
      const response = await api.postState(input)
      if (!response) {
        console.log('Could not get API Service')
      }
      this.statuscodeServ = response.status
      this.messageServ = response.data

      const getStates = await api.getStatesQueue()
      if (!getStates) {
        throw new Error('could not get states')
      }
      this.getStatesFromQueue(getStates)
    },

    async postLocationState () {
      const input = ['location', this.portCallId, this.vesselId, this.reportedBy, this.referenceObject, this.time, this.timeType, this.arrivalLocationType, this.departureLocation]
      const response = await api.postState(input)
      if (!response) {
        console.log('Could not get API Service')
      }
      this.statuscode = response.status
      this.message = response.data
    },
    async updateAPICall () {
      var vm = this
      setInterval(async function () {
        await api.getStatesQueue()
            .then(res => {
              vm.getStatesFromQueue(res)
            }).catch(error => {
              console.log(error)
            })
      }, 5000)
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component onl
<style scoped>

</style>
-->
