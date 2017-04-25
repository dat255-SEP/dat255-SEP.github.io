<template lang="html">
    <div>
    <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css" integrity="sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD" crossorigin="anonymous">


        <h1>{{title}}</h1>
        <p>Welcome to the {{title}} demo {{test}}.</p>


        <table class="pure-table">
          <thead>


                <tr>
                    <th align="left">
                        Boat
                    </th>
                    <th>
                        Available
                    </th>
                </tr>
            </thead>
            <tbody>


                <tr>
                    <td>
                        {{ item1 }}
                    </td>
                    <td>
                        {{ item2 }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ item3 }}
                    </td>
                    <td>
                        {{ item4 }}
                    </td>
                </tr>
        </table>

    </div>



</template>

<script>

import * as api from '../api'

export default {
    async created () {
      this.test = await api.test()
    },

    data: function() {
        return {
          test: ''
        }
    }
}

</script>

<style>
</style>
