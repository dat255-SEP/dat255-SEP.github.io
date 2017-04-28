<template lang="html">
    <div>
    <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css" integrity="sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD" crossorigin="anonymous">

    <!-- Bootstrap -->
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>


        <h1>{{title}}</h1>
        <p wait-for="created"> Welcome to the {{title}} demo {{test}}.</p>


        <table class="table">
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
                      {{'hej'}}
                    </td>
                </tr>
        </table>

    </div>



</template>

<script>
import * as api from '../api'

export default {

    data: function() {
        return {
            test: ''
        }
    },

    async created() {
        this.fetchApi()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchApi'
    },

    methods: {
        async fetchApi() {

            const response = await api.test()

            if (!response) {
                throw new Error('i dun goofd')
            }

            // Logga resultatet
            console.log(response)

            // Eller om du vill spara som en property på this
            this.test = response
        }
    }
}
</script>

<!-- Bootstrap -->








<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>












<script src="//unpkg.com/tether@latest/dist/js/tether.min.js"></script>












<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>












<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.12/vue.js"></script>

<style>

</style>
