const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const LedSchema = new Schema({
  num: String,
  posX: Number,
  posY: Number,
  radius: Number,
  r:Number,
  g:Number,
  b:Number,
  w:Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Led', LedSchema );