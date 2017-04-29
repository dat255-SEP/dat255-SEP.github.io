var express = require('express');
var router = express.Router();
import * as api from '../api'

/* GET home page. */
router.get('/', function(req, res) {
    var bordenogintevarasahar = '';
    api.test().then(function(msg) {
        const response = msg.data;
        const locationStates = response.map(m => m.locationState)
        const answers = locationStates.filter(function(el){
            return el !== null
        })
        const eeeh = answers.filter(function(awd){
          return awd.referenceObject == 'TUG' || awd.referenceObject == 'ESCORT_TUG'
        })
        console.log(eeeh)
        bordenogintevarasahar = JSON.stringify(eeeh)

    }).catch(function(error) {
        console.log(error);
    }).then(function() {
        var scope = {
            data: {
                title: 'HelloWorld',
                item1: tid,
                item2: 'test',
                item3: 'cool tabell',
                test: bordenogintevarasahar
            }
        }
        res.render('index', scope)
    })
})

module.exports = router;
