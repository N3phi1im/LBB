
// Declare Dependencies

var mongoose = require('mongoose');

// Beer Template

var BeerSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  beer_want: [{}]
});

// Module ready for use

mongoose.model('Beer_want', BeerSchema);
