<template>

<div class="hello">

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
</head>

<!-- <button type="button" class="btn btn-default">Bootstrap Test</button> -->

  <!-- <h1>{{ msg }}</h1> -->
  <div class="hero">
    <img class="logo" src="../assets/tuglife-logo.png" width="30%">
    <br>
    <button type="button" class="btn btn-book">Book a Tug boat</button>
  </div>

  <table class="table">
    <tr>
      <td>
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
      <td>
        <table class="table">
          <thead>
            <tr>
              <th> Service Object </th>
              <th> Performing Actor </th>
              <th> Time Sequence </th>
              <th> Time </th>
              <th> Type </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="boat in boatArray">
              <td> {{ boat.serviceObject }} </td>
              <td> {{ boat.performingActor }} </td>
              <td> {{ boat.timeSequence }} </td>
              <td> {{ boat.time}} </td>
              <td> {{ boat.timeType }} </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <table class="table">
          <thead>
            <tr>
              <th> To: Location State </th>
              <th> To: Location Type </th>
              <!-- <th> To: Pos </th> -->
              <th> To: Name </th>
              <th> From: Location Type </th>
              <!-- <th> From: Pos </th> -->
              <th> From: Name </th>
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
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>

  <div id="inputfield">

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

    <button id="post_button" v-on:click="postServiceState">Post</button>

    <h2> {{ 'Statuscode: ' }} </h2>
    <p> {{ statuscode }} </p>
    <h2> {{ 'API-Message: ' }}.</h2>
    <p> {{ message }} </p>
  </div>

</div>
</template>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script>
import * as api from '../api'
import moment from 'moment'
import * as converter from '../converter'

export default {
  created () {
    this.getStates()
  },
  data () {
    return {
      msg: 'Tug Life',
      boatArray: '',
      toArrayOut: '',
      idArrayOut: '',
      vesselId: '',
      messageId: '',
      reportedBy: '',
      referenceObject: '',
      time: '',
      timeType: '',
      arrivalLocation: '',
      message: '',
      statuscode: ''
    }
  },
  methods: {
    async getStates () {
      await api.getBoatStuffs()
        .then(res => {
          const response = res.data
          const locationStates = response.map(m => (m.locationState || m.serviceState))
          const answers = locationStates.filter(function (el) {
            return el !== null
          })
          const filteredTugs = answers.filter(function (el) {
            return el.serviceObject === 'TOWAGE' || el.serviceObject === 'ESCORT_TOWAGE'
          })

          filteredTugs.filter(function (tid) {
            tid.time = moment(tid.time).format('DD MMM YYYY hh:mm a')
          })

          this.boatArray = filteredTugs

          console.log(filteredTugs)

          const betweenStates = filteredTugs.map(s => (s.between))

          const toFromArray = betweenStates.filter(function (el) {
            if (el !== undefined) {
              return el.to
            }
          })
          const perfActorStates = filteredTugs.map(x => (x.performingActor))

          const idArray = perfActorStates.filter(function (el) {
            if (el !== undefined) {
              return el.id
            }
          })
          this.toArrayOut = toFromArray
          this.idArrayOut = idArray
        }).catch(error => {
          console.log(error)
        })
    },

    async postServiceState () {
      const input = [this.vesselId, this.messageId, this.reportedBy, this.referenceObject, this.time, this.timeType, this.arrivalLocation]
      const xmlData = await converter.convertServiceState(input)
      const response = await api.postServiceState(xmlData)
      if (!response) {
        console.log('Could not get API Service')
      }
      this.statuscode = response.status
      this.message = response.data
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  overflow-x: hidden;
  font-family: "Roboto Slab", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.logo {

}

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
  background-image: linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url("../assets/hero-image.jpg");
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
</style>
