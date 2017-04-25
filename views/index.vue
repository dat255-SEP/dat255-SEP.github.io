<template lang="html">
    <div>

        <h1>{{title}}</h1>
        <p>Welcome to the {{title}} demo {{test}}.</p>


        <table>
                <tr>
                    <th align="left">
                        Boat
                    </th>
                    <th>
                        Available
                    </th>
                </tr>

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

<style lang="css">

</style>
