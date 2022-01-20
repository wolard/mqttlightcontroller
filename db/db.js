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
    posX: 17+i*2,
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
      posX: 30+127*2,
      posY: 25+i*2,
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0 
  
    })); 
  }
  
  const generateBackWallSpots = ()=>{
    return [...Array(118)].map((_, i) => ({
      n: (i).toString(),
      posX: 35+i*2,
      posY: 45+92*2,
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    })); 
  }
  
  const generateClosetWallSpots = ()=>{
    return [...Array(57)].map((_, i) => ({
      n: (118+92+126+i).toString(),
      posX: 5,
      posY: 20+(i*2),
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  
  const generateShortConcreteWallSpots = ()=>{
    return [...Array(10)].map((_, i) => ({
      n: (118+92+126+57+i).toString(),
      posX: i*2,
      posY: 35+(57*2),
      radius:5,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
   
  const generateLongConcreteWallSpots = ()=>{
    return [...Array(23)].map((_, i) => ({
      n: (118+92+126+57+10+i).toString(),
      posX: 10*2,
      posY: 50+(57*2)+(i*2),
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
