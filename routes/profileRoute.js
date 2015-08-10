
// Declare Dependencies

var express = require('express');
var mongoose = require('mongoose');
var Beer_had = mongoose.model('Beer_had');
var Beer_want = mongoose.model('Beer_want');
var jwt = require('express-jwt');
var router = express.Router();

var auth = jwt({secret: 'bananas', userProperty: 'payload'});

// Get Beers Had

router.get('/beer_had', auth, function(req, res, next) {
  var query = Beer_had.find({});
  query.exec(function(err, beers) {
    if(err) return next(err);
    res.json(beers);
  });
});

// Send beer to Had

router.post('/beer_had', function(req, res, next) {
  var cbeer = new Beer_had(req.body);
  cbeer.dateHad = new Date();
  cbeer.beer_had = req.body;
  cbeer.save(function(err, task) {
    if(err) return next(err);
    res.send({id: beer_had._id});
  });
});

module.exports = router;
