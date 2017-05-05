<template>
<div class="hello">
  <h1>{{ msg }}</h1>

  <table class="table">
    <tr>
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

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hello',

  created () {
    this.getStates()
  },
  data () {
    return {
      msg: '',
      boatArray: '',
      toArrayOut: ''
    }
  },
  methods: {
    getStates () {
      axios.get('http://192.168.56.101:8080/dmp/mss/state_update?count=30&api_key=mb%2Fmqs', {
        headers: {
          'X-PortCDM-UserId': 'porter',
          'X-PortCDM-Password': 'porter',
          'X-PortCDM-APIKey': 'eeee'
        }
      }).then(res => {
        const response = res.data
        const locationStates = response.map(m => (m.locationState || m.serviceState))
        const answers = locationStates.filter(function (el) {
          return el !== null
        })
        const filteredTugs = answers.filter(function (el) {
          return el.serviceObject === 'TOWAGE' || el.serviceObject === 'ESCORT_TOWAGE'
        })
        this.boatArray = filteredTugs

        const betweenStates = filteredTugs.map(s => (s.between))

        const toFromArray = betweenStates.filter(function (el) {
          if (el !== undefined) {
            return el.to
          }
        })
        this.toArrayOut = toFromArray
      }).catch(error => {
        console.log(error)
      })
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
</style>
