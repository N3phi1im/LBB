
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
  var query = Beer_had.find({user:req.payload.id});
  query.exec(function(err, beers) {
    if(err) return next(err);
    res.json(beers);
  });
});

// Send beer to Had

router.post('/beer_had', auth, function(req, res, next) {
  var cbeer = new Beer_had(req.body);
  cbeer.dateHad = new Date();
  cbeer.description = req.body.description;
  cbeer.nameDisplay = req.body.nameDisplay;
  cbeer.abv = req.body.abv;
  cbeer.ibu = req.body.ibu;
  cbeer.id = req.body.id;
  cbeer.available = req.body.available.name;
  if(req.body.labels.medium) {
    cbeer.label = req.body.labels.medium;
  }
  cbeer.style = req.body.style.shortName;
  cbeer.user = req.payload.id;
  cbeer.save(function(err, beer_had) {
    if(err) return next(err);
    res.send({id: beer_had._id});
  });
});

router.post('/grab', function(req, res, next) {
  brewdb.beer.getById(req.body.id, {}, function(err, data) {
    res.send(data);
  });
});

module.exports = router;
