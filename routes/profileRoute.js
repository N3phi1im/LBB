
// Declare Dependencies

var express = require('express');
var mongoose = require('mongoose');
var Beer_had = mongoose.model('Beer_had');
var Beer_want = mongoose.model('Beer_want');
var jwt = require('express-jwt');
var router = express.Router();

var auth = jwt({secret: 'bananas', userProperty: 'payload'});

// Set Params

router.param('beer_had_id', function(req, res, next, id) {
  Beer_had.findOne({
    _id: id
  }).exec(function(err, beer) {
    if (err) return next(err);
    req.beer = beer;
    next();
  });
});

router.param('beer_want_id', function(req, res, next, id) {
  Beer_want.findOne({
    _id: id
  }).exec(function(err, beer) {
    if (err) return next(err);
    req.beer = beer;
    next();
  });
});


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
  if(req.body.description) {
    cbeer.description = req.body.description;
  }
  if(req.body.nameDisplay) {
    cbeer.nameDisplay = req.body.nameDisplay;
  }
  if(req.body.abv) {
    cbeer.abv = req.body.abv;
  }
  if(req.body.ibu) {
    cbeer.ibu = req.body.ibu;
  }
  if(req.body.labels) {
    cbeer.label = req.body.labels.medium;
  }
  if(req.body.available) {
    cbeer.available = req.body.available.name;
  }
  if(req.body.style.shortName) {
    cbeer.style = req.body.style.shortName;
  }
  cbeer.id = req.body.id;
  cbeer.user = req.payload.id;
  cbeer.save(function(err, beer_had) {
    if(err) return next(err);
    res.send({id: beer_had._id});
  });
});

// Get Beers Wishlist

router.get('/beer_want', auth, function(req, res, next) {
  var query = Beer_want.find({user:req.payload.id});
  query.exec(function(err, beers) {
    if(err) return next(err);
    res.json(beers);
  });
});

// Send beer to wishlist

router.post('/beer_want', auth, function(req, res, next) {
  var cbeer = new Beer_want(req.body);
  if(req.body.description) {
    cbeer.description = req.body.description;
  }
  if(req.body.nameDisplay) {
    cbeer.nameDisplay = req.body.nameDisplay;
  }
  if(req.body.abv) {
    cbeer.abv = req.body.abv;
  }
  if(req.body.ibu) {
    cbeer.ibu = req.body.ibu;
  }
  if(req.body.labels) {
    cbeer.label = req.body.labels.medium;
  }
  if(req.body.available) {
    cbeer.available = req.body.available.name;
  }
  if(req.body.style.shortName) {
    cbeer.style = req.body.style.shortName;
  }
  cbeer.id = req.body.id;
  cbeer.user = req.payload.id;
  cbeer.save(function(err, beer_want) {
    if(err) return next(err);
    res.send({id: beer_want._id});
  });
});

router.get('/grab/want/:beer_want_id', function(req, res, next) {
  res.send(req.beer);
});

router.get('/grab/had/:beer_had_id', function(req, res, next) {
  res.send(req.beer);
});

router.delete('/beer_want/:beer_want_id', auth, function(req, res, next) {
  Beer_want.remove({
    _id: req.body._id,
    user: req.payload._id
  }, function(err) {
    if(err) return next(err);
  });
  res.send();
});

router.post('/beer_had/:beer_had_id', function(req, res, next) {
  Beer_had.update({
    _id: req.body._id,
    user: req.payload._id,
    like: req.body.tf
  }, function(err) {
    if(err) return next(err);
  });
});

router.use(function(err, req, res, next) {
  res.status(400).json(err);
});


module.exports = router;
