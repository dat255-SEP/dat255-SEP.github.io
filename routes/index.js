var express = require('express');
var router = express.Router();
import * as api from '../api'

/* GET home page. */
router.get('/', function(req, res) {
    var bordenogintevarasahar = '';
    var eeeh = '';
    api.test().then(function(msg) {
        const response = msg.data;

        const locationStates = response.map(m => (m.locationState || m.serviceState))
        const answers = locationStates.filter(function(el){
            return el !== null
        })
        eeeh = answers.filter(function(awd){
          return awd.referenceObject == 'TUG' || awd.referenceObject == 'ESCORT_TUG' || awd.serviceObject == 'TOWAGE' || awd.serviceObject == 'ESCORT_TOWAGE'
        })

        console.log(eeeh)
        bordenogintevarasahar = JSON.stringify(eeeh)



    }).catch(function(error) {
        console.log(error);
        bordenogintevarasahar = 'API_call failed'
    }).then(function() {
        var scope = {
            data: {
                title: 'HelloWorld',
                boatArray: eeeh,
                test: bordenogintevarasahar
            }

        }
        res.render('index', scope)
    })
})

router.post('/test', function(req, res) {

    var scope = {
        data: {
            title: 'HelloWorld',
            item1: 'bosse',
            item2: 'test',
            item3: 'cool tabell',
            test: 'haj'

        }
    }

    res.render('index', scope)
    console.log('test')
})

module.exports = router;
