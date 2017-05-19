<template>
<div class="hello">

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
              </tr>
            </tbody>
          </table>
        </td>
        <td>
          <table class="table">
            <thead>
              <tr class="table2-titles">
                <th> To: Location Type </th>
                <th> To: Name </th>
                <th> From: Location Type </th>
                <th> From: Name </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="between in toArrayOut">
                <td> {{ between.to.locationType }} </td>
                <td> {{ between.to.name }} </td>
                <td> {{ between.from.locationType}} </td>
                <td> {{ between.from.name }} </td>
              </tr>
            </tbody>


          </table>
          <td>
            <table class="table">
              <thead>
                <tr class="table2-titles">
                  <th> Update </th>
                </tr>
              </thead>

              <tbody>
              <tr v-for="boat in boatArray">
                <td> <button class="btn btn-book" id="updateLocation" v-on:click="updateLocation(boat)">Update</button> </td>
              </tr>
            </tbody>

            </table>
          </td>
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
                <div> <input v-model="portCallId" readonly> </div>
              </div>
              <div>
                <div> <label>Vessel ID</label> </div>
                <div> <input v-model="vesselId" readonly> </div>
              </div>
              <div>
                <div> <label>Message ID</label> </div>
                <div> <input v-model="messageId"> </div>
              </div>
              <div>
                <div> <label>Reported By</label> </div>
                <div> <input v-model="reportedBy"> </div>
              </div>
              <div>
                <div> <label>Reference Object</label> </div>
                <div>
                  <select v-model="referenceObject">
                    <option>ESCORT_TOWAGE</option>
                    <option>TOWAGE</option>
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
                <div> <label>Arrival Location Type</label> </div>
                <div>
                  <select v-model="arrivalLocationType">
                    <option>ESCORT_TUG_ZONE FUNGERAR EJ</option>
                    <option>TUG_ZONE</option>
                    <option>BERTH</option>
                  </select>
                </div>
              </div>
              <div>
                <div> <label>Arrival Location</label> </div>
                <div>
                  <select v-model="arrivalLocation">
                    <option>-</option>
                    <option>Vessel</option>
                  </select>
                </div>
              </div>
              <div>
                <div> <label>Departure Location</label> </div>
                <div>
                  <select v-model="departureLocation">
                    <option>LOC</option>
                    <option>Vessel</option>
                  </select>
                </div>
              </div>
              <div>
                <div> <label>Departure Location Type</label> </div>
                <div>
                  <select v-model="departureLocationType">
                    <option>From</option>
                    <option>To</option>
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
                <div> <input v-model="portCallId" readonly> </div>
              </div>
              <div>
                <div> <label>Message ID</label> </div>
                <div> <input v-model="messageId" readonly> </div>
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

export default {
  created () {
    this.getStates()
    this.updateAPICall()
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
    async getStates () {
      this.msg = 'Tug Life'
      await api.getBoatStuffs()
        .then(res => {
          this.filterCall(res)
        }).catch(error => {
          console.log(error)
        })
    },

    async postServiceState () {
      const input = ['service', this.portCallId, this.vesselId, this.messageId, this.serviceObject, this.performingActor, this.timeSequence, this.timeSer, this.timeTypeSer,
        this.at, this.to, this.from]
      const response = await api.postState(input)
      if (!response) {
        console.log('Could not get API Service')
      }
      this.statuscodeServ = response.status
      this.messageServ = response.data
    },

    async postLocationState () {
      const input = ['location', this.portCallId, this.vesselId, this.messageId, this.reportedBy, this.referenceObject, this.time, this.timeType, this.arrivalLocation, this.arrivalLocationType, this.departureLocation, this.departureLocationType]
      console.log(input)
      const response = await api.postState(input)
      if (!response) {
        console.log('Could not get API Service')
      }
      this.statuscode = response.status
      this.message = response.data
    }
  },

  async postServiceState () {
    const input = [this.serviceObject, this.performingActor, this.timeSequence, this.timeSer, this.timeTypeSer,
      this.at, this.to, this.from
    ]
    const response = await api.postState(input)
    if (!response) {
      console.log('Could not get API Service')
    }
    this.statuscodeServ = response.status
    this.messageServ = response.data
  },

  async postLocationState () {
    const input = [this.portCallId, this.vesselId, this.messageId, this.reportedBy, this.referenceObject, this.time, this.timeType, this.arrivalLocation, this.arrivalLocationType, this.departureLocation, this.departureLocationType]
    console.log(input)
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
      await api.getBoatStuffs()
          .then(res => {
            vm.filterCall(res)
          }).catch(error => {
            console.log(error)
          })
    }, 30000)
  },

  filterCall (array) {
    const answers = (array.map(m => ({
      'portCallId': m.portCallId,
      'messageId': m.messageId,
      'vesselId': m.vesselId,
      'locationState': m.locationState,
      'serviceState': m.serviceState
    })))

    answers.forEach(el => {
        // console.log(el.locationState)
      if (el.locationState === null) {
        delete (el.locationState)
      } else if (el.serviceState === null) {
        delete (el.serviceState)
      }
    })

    const filteredTugs = answers.filter(function (el) {
      if (el.locationState) {} else if (el.serviceState) {
        if (el.serviceState.serviceObject === 'TOWAGE' || el.serviceState.serviceObject === 'ESCORT_TOWAGE') {
          return el
        }
      }
    })
    filteredTugs.filter(function (tid) {
      tid.serviceState.time = moment(tid.serviceState.time).local().format('MM/DD/YYYY, hh:mm')
    })
    this.boatArray = filteredTugs

    for (var i = 0; i < this.boatArray.length; i++) {
      if (this.boatArray[i].performingActor == null) {
        this.boatArray[i].performingActor = 'NotSpecified' + i
      }
    }

    const betweenStates = filteredTugs.map(s => (s.serviceState.between))

    const toFromArray = betweenStates.filter(function (el) {
      if (el !== undefined) {
        return el.to
      }
    })
    this.toArrayOut = toFromArray
    const perfActorStates = filteredTugs.map(x => (x.performingActor))

    var tempArray = []
    for (var i2 = 0; i2 < perfActorStates.length; i2++) {
      tempArray.push('No ID-' + i2)
    }
    this.idArrayOut2 = tempArray

    const idArray = perfActorStates.filter(function (el) {
      if (el !== undefined) {
        return el.id
      }
    })
    this.idArrayOut = idArray
  },
  updateLocation (boat) {
    console.log(boat)
    this.portCallId = boat.portCallId
    this.vesselId = boat.vesselId
    this.messageId = boat.messageId
    this.time = moment(boat.serviceState.time).format('YYYY-MM-DDThh:mm')
    this.timeType = this.timeTypeSer = boat.serviceState.timeType
    this.referenceObject = boat.serviceState.serviceObject
    this.timeSequence = boat.serviceState.timeSequence
    this.to = boat.serviceState.between.to.name
    this.from = boat.serviceState.between.from.name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  overflow-x: hidden;
  font-family: "Roboto Slab", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #e5e5e5;
}

.logo {}

.btn-book {
  color: white;
  background-color: #3498db;
  border-color: #3498db;
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
}

.btn-book:hover,
.btn-book:focus,
.btn-book:active,
.btn-book.active,
.open .dropdown-toggle.btn-book {
  color: white;
  background-color: #2980b9;
  border-color: #2980b9;
}

.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url("../assets/hero-image.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 40px;
  background-attachment: fixed;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

table {
  margin: 50px auto;
}


.post {
  margin-top: 50px;
}

.leftbox {
  padding-top: 0px;
  margin: 0px;
}

.message-form {
  width: 50%;
  height: 200px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
  margin-bottom: 30px;
  margin-top: 10px;
}

.inputTime {
  width: 23%;
}

.changeRow {
  vertical-align: top;
}

.status-form {
  text-align: center;
  margin-top: 10px;
  width: 50%;
  height: 50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
  margin-bottom: 30px;
}

.table-container {}

.form-box {
  margin-bottom: 50px;
}

.post-container {
  background-color: #fcfcfc;
  padding: 20px;
}

.leftcell {
  padding-top: 0px
}

#post_button {
  height: 50px;
  width: 20%;
  border: none;
  box-shadow: 2px 2px 10px #888888;
  border-radius: 5px;
  background-color: rgb(13, 155, 255);
  transition: all .2s ease-in-out;
  font-size: 20px;
  color: rgb(46, 46, 46);
}

#post_button:hover {
  transform: scale(1.02);
}

[type="date"] {
  background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50% no-repeat;
}

[type="date"]::-webkit-inner-spin-button {
  display: none;
}

[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

label {
  display: block;
}

input {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 190px;
}

.table-titles th {
  text-align: center;
}

.table2-titles th {
  text-align: center;
}
</style>
