<template lang="html">
    <div>
        <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css" integrity="sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD" crossorigin="anonymous">

        <!-- Bootstrap -->
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

        <h1>{{ title }}</h1>
        
        <p wait-for="created"> Welcome to the {{ title }} demo. </p>
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
import * as api from '../api'

export default {

    data: function() {
        return {}
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
