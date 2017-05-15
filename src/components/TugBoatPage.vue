<template>
<div class="hello">

  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
  </head>

  <!-- <h1>{{ msg }}</h1> -->
  <div class="hero">
    <img class="logo" src="../assets/tuglife-logo.png" width="30%">
    <br>

  </div>


  <div class="table-container">
    <table class="table">
      <tr>
        <td v-if="idArrayOut.length !== 0">
          <table class="table">
            <thead>
              <th align="left">
                ID
              </th>
            </thead>
            <tbody>
              <tr v-for="performingActor in idArrayOut">
                <td> {{ performingActor.id.id }} </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td v-if="idArrayOut.length == 0">
          <table class="table">
            <thead>
              <th align="left">
                ID
              </th>
            </thead>
            <tbody>
              <tr v-for="fakeID in idArrayOut2">
                <td> {{ fakeID }} </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td>
          <table class="table">
            <thead>
              <tr class="table-titles">
                <th> Service Object </th>
                <th> Performing Actor </th>
                <th> Time Sequence </th>
                <th> Time </th>
                <th> Type </th>
                <th> Update </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="boat in boatArray">
                <td> {{ boat.serviceObject }} </td>
                <td> {{ boat.performingActor }} </td>
                <td> {{ boat.timeSequence }} </td>
                <td> {{ boat.time }} </td>
                <td> {{ boat.timeType }} </td>
                <td>
                  <button class="btn btn-book" id="updateLocation" v-on:click="updateLocation(boat)">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td>
          <table class="table">
            <thead>
              <tr class="table2-titles">
                <th> To: Location State </th>
                <th> To: Location Type </th>
                <!-- <th> To: Pos </th> -->
                <th> To: Name </th>
                <th> From: Location Type </th>
                <!-- <th> From: Pos </th> -->
                <th> From: Name </th>
                <th> Update </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="between in toArrayOut">
                <td> {{ between.to.at }} </td>
                <td> {{ between.to.locationType }} </td>
                <!--    <td> {{ between.to.position }} </td>   -->
                <td> {{ between.to.name }} </td>
                <td> {{ between.from.locationType}} </td>
                <!--    <td> {{ between.from.position }} </td>     -->
                <td> {{ between.from.name }} </td>
                <td>
                  <button class="btn btn-book" id="editState">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
  </div>

  <div id="inputfield">

    <!--
    <h1>Change Locationstate</h1>
    <table class="table">
      <tr>
        <td>
          <table class="table">
            <thead>
              <tr>
                <th> vesselId </th>
                <th> messageId </th>
                <th> reportedBy </th>
                <th> referenceObject </th>
                <th> time </th>
                <th> timeType </th>
                <th> arrivalLocation </th>
              </tr>
            </thead>
            <tbody>
              <td> <input v-model="vesselId" placeholder="9501368">
              </td>
              <td> <input v-model="messageId" placeholder="5919ab7c-22fb-43a1-a21b-dc36bfd45d32">
              </td>
              <td> <input v-model="reportedBy" placeholder="TugAppLocStateView">
              </td>
              <td> <input v-model="referenceObject" placeholder="TUG">
              </td>
              <td> <input v-model="time" placeholder="2017-05-10T18:20:00.000Z">
              </td>
              <td> <input v-model="timeType" placeholder="EXPECTED">
              </td>
              <td> <input v-model="arrivalLocation" placeholder="Gothenburg Port">
              </td>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
-->
    <div class="post-container">
      <div class="form-box">
        <div class="locationTitle">
          <h1>Change Location State</h1>
        </div>
        <div>
          <form action="#" method="post" class="contact-form">
            <div>
              <div>
                <label for="name">vesselId</label>
              </div>
              <div>
                <input v-model="vesselId" placeholder="9501368">
              </div>
            </div>
            <div>
              <div>
                <label for="email">messageId</label>
              </div>
              <div>
                <input v-model="messageId" placeholder="5919ab7c-22fb-43a1-a21b-dc36bfd45d32">
              </div>
            </div>
            <div>
              <div>
                <label for="email">reportedBy</label>
              </div>
              <div>
                <input v-model="reportedBy" placeholder="TugAppLocStateView">
              </div>
            </div>
            <div>
              <div>
                <label>referenceObject</label>
              </div>
              <div>
                <select>
                      <option selected v-model="referenceObject">TUG</option>
      							</select>
              </div>
            </div>
            <div>
              <div>
                <label for="email">time</label>
              </div>
              <div>
                <input v-model="time" type="date" id="theTime">
              </div>
            </div>
            <div>
              <div>
                <label>timeType</label>
              </div>
              <div>
                <select v-model="timeType">
      								<option selected >EXPECTED</option>
      								<option>ACTUAL</option>
      								<option>ESTIMATED</option>
      							</select>
              </div>
            </div>
            <div>
              <div>
                <label>arrivalLocation</label>
              </div>
              <div>
                <select>
      								<option selected v-model="arrivalLocation">Gothenburg Port</option>
      							</select>
              </div>
            </div>
            <div>
              <div>
                <label>&nbsp;</label>
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

        <h2> {{ 'API-Message: ' }} </h2>
        <form>
          <textarea class="message-form"> {{ message }} </textarea>
        </form>
      </div>

    </div>

    <div class="post-container">
      <div class="form-box">
        <div class="locationTitle">
          <h1>Change Service State</h1>
        </div>
        <div>
          <form action="#" method="post" class="contact-form">
            <div>
              <div>
                <label for="name">serviceObject</label>
              </div>
              <div>
                <input v-model="serviceObject" placeholder="9501368">
              </div>
            </div>
            <div>
              <div>
                <label for="email">performingActor</label>
              </div>
              <div>
                <input v-model="performingActor" placeholder="5919ab7c-22fb-43a1-a21b-dc36bfd45d32">
              </div>
            </div>
            <div>
              <div>
                <label for="email">timeSequence</label>
              </div>
              <div>
                <input v-model="timeSequence" placeholder="TugAppLocStateView">
              </div>
            </div>
            <div>
              <div>
                <label>timeSer</label>
              </div>
              <div>
                <select>
                      <option selected v-model="timeSer">TUG</option>
                    </select>
              </div>
            </div>
            <div>
              <div>
                <label for="email">time</label>
              </div>
              <div>
                <input v-model="time" type="date" id="theTime">
              </div>
            </div>
            <div>
              <div>
                <label>timeTypeSer</label>
              </div>
              <div>
                <select>
                      <option selected v-model="timeTypeSer">EXPECTED</option>
                      <option>ACTUAL</option>
                      <option>ESTIMATED</option>
                    </select>
              </div>
            </div>
            <div>
              <div>
                <label for="name">at</label>
              </div>
              <div>
                <input v-model="at" placeholder="a location">
              </div>
            </div>
            <div>
              <div>
                <label for="name">to</label>
              </div>
              <div>
                <input v-model="to" placeholder="to location">
              </div>
            </div>
            <div>
              <div>
                <label for="name">from</label>
              </div>
              <div>
                <input v-model="from" placeholder="from location">
              </div>
            </div>
            <div>
              <div>
                <label>&nbsp;</label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <button id="post_button" v-on:click="postServiceState">Post</button>

      <div class="post">
        <h2> {{ 'Statuscode: ' }} </h2>
        <form>
          <textarea class="status-form"> {{ statuscodeServ }} </textarea>
        </form>

        <h2> {{ 'API-Message: ' }} </h2>
        <form>
          <textarea class="message-form"> {{ messageServ }} </textarea>
        </form>
      </div>

    </div>

  </div>
</div>
</template>





<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script>
import * as api from '../api'
//  import * as update from '../update'
import moment from 'moment'
import * as converter from '../converter'

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
      messageServ: ''
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
      const input = [this.serviceObject, this.performingActor, this.timeSequence, this.timeSer, this.timeTypeSer,
        this.at, this.to, this.from
      ]
      const xmlData = await converter.convertServiceState(input)
      const response = await api.postState(xmlData)
      if (!response) {
        console.log('Could not get API Service')
      }
      this.statuscodeServ = response.status
      this.messageServ = response.data
    },

    async postLocationState () {
      const input = [this.vesselId, this.messageId, this.reportedBy, this.referenceObject, this.time, this.timeType, this.arrivalLocation]
      const xmlData = await converter.convertLocationState(input)
      const response = await api.postState(xmlData)
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
            // vm.msg = 'swaaaaaaag'
            vm.filterCall(res)
            console.log('Updated table')
          }).catch(error => {
            console.log(error)
          })
      }, 30000)
    },

    filterCall (array) {
      const locationStates = array.map(m => (m.locationState || m.serviceState))
      const answers = locationStates.filter(function (el) {
        return el !== null
      })
      const filteredTugs = answers.filter(function (el) {
        return el.serviceObject === 'TOWAGE' || el.serviceObject === 'ESCORT_TOWAGE'
      })

      filteredTugs.filter(function (tid) {
        tid.time = moment(tid.time).format('DD MMM YYYY hh:mm a')
      })

      // console.log(locationStates)
      this.boatArray = filteredTugs

      for (var i = 0; i < this.boatArray.length; i++) {
        if (this.boatArray[i].performingActor == null) {
          this.boatArray[i].performingActor = 'NotSpecified' + i
        }
      }

      const betweenStates = filteredTugs.map(s => (s.between))

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
      // console.log(tempArray)
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
      this.vesselId = boat.vesselId
      this.time = moment(new Date(boat.time)).format('YYYY-MM-DD')
      this.timeType = boat.timeType
    }
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

#post_button {
  height: 70px;
  width: 40%;
  border: none;
  box-shadow: 2px 2px 10px #888888;
  border-radius: 5px;
  background-color: rgb(13, 155, 255);
  transition: all .2s ease-in-out;
  font-size: 40px;
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
