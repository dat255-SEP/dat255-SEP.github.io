var express = require('express');
var router = express.Router();
import * as api from '../api'

/* GET home page. */
router.get('/', function(req, res) {
    var filteredTugs = '';
    var toFromArray = '';

    api.test().then(function(msg) {
        const response = msg.data;

        const locationStates = response.map(m => (m.locationState || m.serviceState))
        const answers = locationStates.filter(function(el) {
            return el !== null
        })
        filteredTugs = answers.filter(function(el) {
            return el.referenceObject == 'TUG' || el.referenceObject == 'ESCORT_TUG' || el.serviceObject == 'TOWAGE' || el.serviceObject == 'ESCORT_TOWAGE'
        })

        const betweenStates = filteredTugs.map(s => (s.between))

        toFromArray = betweenStates.filter(function(el) {
            if (el !== undefined) {
                return el.to
            }
        })


    }).catch(function(error) {
        console.log(error);
    }).then(function() {
        var scope = {
            data: {
                title: 'HelloWorld',
                boatArray: filteredTugs,
                toArrayOut: toFromArray
            }

        }
        res.render('index', scope)
    })
})

module.exports = router;
