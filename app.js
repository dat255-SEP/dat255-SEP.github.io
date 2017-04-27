var path = require('path')
var express = require('express')
var expressVue = require('express-vue')
var app = express()
var index = require('./routes/index')

app.engine('vue', expressVue)
app.set('view engine', 'vue')
app.set('views', path.join(__dirname, '/views'))
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
})

app.use('/', index);

app.listen(3000)
console.log('Express server listening on port 3000')
