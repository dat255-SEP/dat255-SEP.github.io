var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function (req, res) {
    var scope = {
      data: {
        title: 'HelloWorld',
        item1: 'hej',
        item2: 'test',
        item3: 'cool tabell'
      }
    }
    res.render('index', scope)
})

module.exports = router;
