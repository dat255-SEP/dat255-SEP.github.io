var express = require('express');
var router = express.Router();
import * as api from '../api'

/* GET home page. */
router.get('/', function(req, res) {
    var bordenogintevarasahar = '';
    api.test().then(function(msg) {
        const response = msg.data;
        const locationStates = response.map(m => m.locationState)
        const answers = locationStates.filter(function(el) {
            return el !== null
        })
        const boats = answers.filter(function(serviceObject) {
            return serviceObject.referenceObject == 'TUG' || serviceObject.referenceObject == 'ESCORT_TUG'
        })


        console.log(boats)
        bordenogintevarasahar = JSON.stringify(boats)


    }).catch(function(error) {
        console.log(error);
        bordenogintevarasahar = 'API_call failed'
    }).then(function() {
        var scope = {
            data: {
                title: 'HelloWorld',
                boatArray: [{
                        name: "Kalle",
                        serviceState: "17:00",
                        locationState: "Vinga"
                    },
                    {
                        name: "Emil",
                        serviceState: "15:00",
                        locationState: "Gotland"
                    }
                ],
                test: bordenogintevarasahar
            }
        }
        res.render('index', scope)
    })
})

module.exports = router;
