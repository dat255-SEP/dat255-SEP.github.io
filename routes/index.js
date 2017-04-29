var express = require('express');
var router = express.Router();
import * as api from '../api'

/* GET home page. */
router.get('/', function (req, res) {
    var bordenogintevarasahar = '';
    api.test().
    then(function (msg) {
        bordenogintevarasahar = msg.data;
    }).
    catch(function (error) {
        console.log(error);
    }).
    then(function () {
        var scope = {
            data: {
                title: 'HelloWorld',
                item1: 'hej',
                item2: 'test',
                item3: 'cool tabell',
                test: bordenogintevarasahar
            }
        }
        res.render('index', scope)
    })
})

module.exports = router;
