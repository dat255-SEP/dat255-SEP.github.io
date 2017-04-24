<template lang="html">

    <div>
        <h1>{{title}}</h1>
        <p>Welcome to the {{title}} demo.</p>


        <table>
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
                </tr>
            </tbody>
        </table>

    </div>



</template>

<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>

<style lang="css">
</style>
