<template>
<div class="page">

  <head>
    <!-- Import Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
  </head>

  <div class="hero">
    <img class="logo" src="../assets/tuglife-logo.png" width="30%">
    <br>
  </div>
  <!-- Table with all active objects (TUG/TOWAGE and status) -->
  <div class="table-container">
    <table class="table">
      <tr>
        <td>
          <h1>This table contains all current towage missions and their states. <br />Press update on a tug boat to update its states.</h1>
          <table class="table">
            <thead>
              <!-- Correct headers are set here -->
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
              <!-- For every boat in boatArray, display their info under correct table headers -->
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
                <!-- Press update button to change the status of a boat -->
                <td> <button class="btn btn-book" v-on:click="updateLocation(boat)">Update</button> </td>
              </tr>
              <!-- For every "between object" in toArrayOut, display the location info of that object -->
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

<!-- Table to change location state and service state. When the Update button above is pressed, update these input fields with the correct boat information -->
    <table class="table">
      <tr class="changeRow">
        <td>
          <div class="form-box">
              <h1>Change Location State</h1>
              <form action="#" method="post" class="contact-form">
                  <label>Vessel ID</label> <br />
                  <input v-model="vesselId" readonly> <br />
                  <label>Reported By</label> <br />
                  <input v-model="reportedBy"> <br />
                  <label>Reference Object</label> <br />
                    <select v-model="referenceObject">
                      <option>ESCORT_TUG</option>
                      <option>TUG</option>
                    </select> <br />
                  <label>Time</label> <br />
                  <input class="inputTime" v-model="time" type="datetime-local" id="theTime"> <br />
                  <label>Time Type</label> <br />
                    <select v-model="timeType">
        								<option>ACTUAL</option>
        								<option>ESTIMATED</option>
        							</select> <br />
                  <label>Arrival Location </label> <br />
                    <select v-model="arrivalLocationType">
                      <option>ETUG_ZONE</option>
                      <option>TUG_ZONE</option>
                      <option>BERTH</option>
                    </select> <br />
                    <label>Departure Location</label> <br />
                    <select v-model="departureLocation">
                      <option>LOC</option>
                      <option>VESSEL</option>
                    </select>
              </form>
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
              <h1>Change Service State</h1>
              <form action="#" method="post" class="contact-form">
                  <label>Vessel ID</label> <br />
                  <input v-model="vesselId"> <br />
                  <label>Service Object</label> <br />
                    <select v-model="performingActor">
                        <option> ESCORT_TOWAGE </option>
                        <option> TOWAGE </option>
                      </select> <br />
                  <label>Time Sequence</label> <br />
                    <select v-model="timeSequence">
                        <option> COMMENCED </option>
                        <option> COMPLETED </option>
                        <option> CONFIRMED </option>
                        <option> DENIED </option>
                        <option> REQUEST_RECEIVED </option>
                        <option> REQUESTED </option>
                      </select> <br />
                  <label>Time</label> <br />
                  <input class="inputTime" v-model="timeSer" type="datetime-local" id="theTime"> <br />
                  <label>Time Type</label> <br />
                    <select v-model="timeTypeSer">
                      <option>ACTUAL</option>
                      <option>ESTIMATED</option>
                      <option>EXPECTED</option>
                    </select> <br />
                  <label>At Location</label> <br />
                  <input v-model="at"> <br  />
                  <label>Between: To Location</label> <br />
                  <input v-model="to"> <br />
                  <label>Between: From Location</label> <br />
                  <input v-model="from">
              </form>
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
<!-- Runs bootstrap script -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous">

</script>

<script>
// import dependencies and css
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
    const input = ['service', 'urn:mrn:stm:portcdm:port_call:SEGOT:1965050c-657f-42ef-b388-1cd1d743ddee', 'urn:mrn:stm:vessel:IMO:9501368', 'TOWAGE', this.performingActor, 'COMMENCED', '2017-06-02T', 'ACTUAL',
      this.at, 'VESSEL', 'VESSEL'
    ]
    const answer = await api.postState(input)
    if (!answer) {
      console.log('Could not get API Service')
    }
    this.statuscodeServ = answer.status
    this.messageServ = answer.data
    const getStates = await api.getStatesQueue()
    if (!getStates) {
      throw new Error('could not get states')
    }
    this.getStatesFromQueue(getStates)
  },
  // These are all reactive data fields which can be updated when needed
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
    // updateLocation sets the input fields in the location and service state when the Update button is pressed
    updateLocation (boat) {
      this.portCallId = boat.portCallId
      this.vesselId = boat.vesselId
      this.messageId = boat.messageId
      this.time = this.timeSer = moment(boat.serviceState.time).format('YYYY-MM-DDThh:mm')
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
    // filterCall filters the returned API call and returns only the relevant information in an array. After the array is filtered, the boats are displayed in the table
    filterCall (array) {
      const answers = (array.map(m => ({
        'portCallId': m.portCallId,
        'messageId': m.messageId,
        'vesselId': m.vesselId,
        'locationState': m.locationState,
        'serviceState': m.serviceState
      })))
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
    // Makes an API call every five seconds and updates the table accordingly
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
