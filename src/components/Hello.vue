<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <img src="../assets/tommy.png" width="30%">
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
    <h1>Change Service State</h1>
    <input placeholder="instruction">
    <button v-on:click="postServiceState">Post</button>
    <h2> {{ 'Statuscode: ' }} </h2>
    <p> {{ statuscode }} </p>
    <h2> {{ 'API-Message: ' }}.</h2>
    <p> {{ message }} </p>
  </div>

</div>
</template>

<script>
import * as api from '../api'
import moment from 'moment'

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
      const response = await api.postServiceState()
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
  margin: auto;
}
</style>
