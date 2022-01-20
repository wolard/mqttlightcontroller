const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const LedSchema = new Schema({
  n: String,
  posX: Number,
  posY: Number,
  radius: Number,
  r:Number,
  g:Number,
  b:Number,
  a:Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Led', LedSchema );