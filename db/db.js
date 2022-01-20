const mongoose = require('mongoose');
const Led = require('../models/ledmodel');
const mongoDB = process.env.MONGO_DB||'mongodb://mongodb/lights';
console.log(mongoDB)

const initdb=()=>
{
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => console.log(error));
 
const db = mongoose.connection;
Led.collection.drop()
const generateFrontkWallSpots = ()=>{
  return [...Array(126)].map((_, i) => ({
    n: (118+92+126-i).toString(),
    posX: 5+i*3,
    posY: 5,
    radius:5,
    r:0,
    g:0,
    b:0,
    a:0

  }));
}

const generateWindowWallSpots = ()=>{
    return [...Array(92)].map((_, i) => ({
      n: (118+92-i).toString(),
      posX: 127*3,
      posY: 5+i*3,
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  
  const generateBackWallSpots = ()=>{
    return [...Array(117)].map((_, i) => ({
      n: (i).toString(),
      posX: 35+i*3,
      posY: 92*3,
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  
  const generateClosetWallSpots = ()=>{
    return [...Array(57)].map((_, i) => ({
      n: (117+92+126+i).toString(),
      posX: 5,
      posY: (i*3),
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  
  const generateShortConcreteWallSpots = ()=>{
    return [...Array(10)].map((_, i) => ({
      n: (117+92+126+57+i).toString(),
      posX: i*3,
      posY: (57*3),
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  
  const generateLongConcreteWallSpots = ()=>{
    return [...Array(24)].map((_, i) => ({
      n: (117+92+126+57+10+i).toString(),
      posX: 10*3,
      posY: (57*3)+(i*4),
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }

Led.insertMany(generateBackWallSpots())
Led.insertMany(generateWindowWallSpots())
Led.insertMany(generateFrontkWallSpots())
Led.insertMany(generateClosetWallSpots())
Led.insertMany(generateShortConcreteWallSpots())
Led.insertMany(generateLongConcreteWallSpots())
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
return db
}
module.exports=initdb
