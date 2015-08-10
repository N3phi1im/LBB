
// Declare Dependencies

var mongoose = require('mongoose');

// Beer Template

var BeerSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dateHad: Date,
  beer_had: []
});

// Module ready for use

mongoose.model('Beer_had', BeerSchema);
