
// Declare Dependencies

var mongoose = require('mongoose');

// Beer Template

var BeerSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dateHad: Date,
  description: String,
  nameDisplay: String,
  abv: String,
  ibu: String,
  id: String,
  available: String,
  label: String,
  style: String,
  like: Boolean
});

// Module ready for use

mongoose.model('Beer_had', BeerSchema);
