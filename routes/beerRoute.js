
// Delcare Dependencies
var express = require('express');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('6fc41969a626d0aa90d7a610f9e55dfb');
var router = express.Router();


// Routes

// Beer search

router.post('/searchBeer', function(req, res, next) {
  brewdb.search.all({ q:"IPA" }, function(err, data) {
    res.send(data);
  });
});

router.post('/Category', function(req, res, next) {
  brewdb.category.all(function(err, data) {
    res.send(data);
  });
});

router.post('/Style', function(req, res, next) {
  brewdb.style.all(function(err, data) {
    res.send(data);
  });
});

// Module ready for use

module.exports = router;
