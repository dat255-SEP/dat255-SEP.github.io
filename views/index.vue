<template lang="html">
    <div>
        <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css" integrity="sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD" crossorigin="anonymous">

        <!-- Bootstrap -->
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>


        <h1>{{ title }}</h1>
        <p wait-for="created"> Welcome to the {{ title }} demo.</p>

        <table class="table">
          <thead>
                <tr>

                    <th align="left">
                        Boat
                    </th>
                    <th>
                        Performing Actor
                    </th>
                    <th>
                        Time Sequence
                    </th>
                    <th>
                        At
                    </th>
                    <th>
                        Between
                    </th>
                    <th>
                        Time
                    </th>
                    <th>
                        Time Type
                    </th>
                    <th>
                        Arrival Location
                    </th>
                    <th>
                        Location Type
                    </th>
                    <th>
                        Position
                    </th>
                    <th>
                        Departure Location
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="boat in boatArray">
                    <td> {{ boat.name }} </td>
                    <td> {{ boat.serviceState }} </td>
                    <td> {{ boat.locationState }} </td>
                </tr>
            </tbody>
        </table>
        <div>
          <p>
            Hello_world_api:  {{test}}
          </p>
        </div>
    </div>
    <!--
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable" style="width:100%;">
          <thead>
            <tr>
              <th class="mdl-data-table__cell--non-numeric">Status</th>
              <th class="mdl-data-table__cell--non-numeric">Customer name</th>
              <th class="mdl-data-table__cell--non-numeric">Company</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers">
              <td class="mdl-data-table__cell--non-numeric">{{ customer.status }}</td>
              <td class="mdl-data-table__cell--non-numeric">{{ customer.name }}</td>
              <td class="mdl-data-table__cell--non-numeric">{{ customer.company }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    -->


</template>

<script>
import * as api from '../api'

export default {

    data: function() {
        return {
        }
    },
}
</script>

<!-- Bootstrap -->

<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>

<script src="//unpkg.com/tether@latest/dist/js/tether.min.js"></script>

<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.12/vue.js"></script>

<style>

</style>
