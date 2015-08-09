
// Delcare Dependencies
var express = require('express');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('6fc41969a626d0aa90d7a610f9e55dfb');
var router = express.Router();


// Routes

// Beer search

router.post('/searchBeer', function(req, res, next) {
  console.log(req.body);
  brewdb.search.beers(req.body, function(err, data) {
    res.send(data);
  });
});

// Get Categories of Beer

router.post('/Category', function(req, res, next) {
  brewdb.category.all(function(err, data) {
    res.send(data);
  });
});

// Get Beers in Category of Beer

router.post('/Category/beers', function(req, res, next) {
  brewdb.beer.styleId(1);
});

// Get Styles of Beer

router.post('/Style', function(req, res, next) {
  brewdb.style.all(function(err, data) {
    res.send(data);
  });
});

// Module ready for use

module.exports = router;
