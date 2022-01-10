const mongoose = require('mongoose');
const Led = require('../models/ledmodel');
const mongoDB = process.env.MONGO_DB||'mongodb://mongodb/lights';
console.log(mongoDB)

const initdb=()=>
{
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => console.log(error));
 
const db = mongoose.connection;
//Led.collection.drop()
const generateBackWallSpots = ()=>{
  return [...Array(117)].map((_, i) => ({
    num: (117-i).toString(),
    posX: 5+i*3,
    posY: 5,
    radius:5,
    r:0,
    g:0,
    b:0,
    w:0

  }));
}
const generateWindowWallSpots = ()=>{
    return [...Array(92)].map((_, i) => ({
      num: (117+i).toString(),
      posX: 5,
      posY: 5+i*3,
      radius:5,
      r:0,
      g:0,
      b:0,
      w:0
  
    }));
  }
  const generateFrontWallSpots = ()=>{
    return [...Array(126)].map((_, i) => ({
      num: (117+92+i).toString(),
      posX: 5+i*3,
      posY: 92*3,
      radius:5,
      r:0,
      g:0,
      b:0,
      w:0
  
    }));
  }
  const generateClosetWallSpots = ()=>{
    return [...Array(57)].map((_, i) => ({
      num: (117+92+126+57-i).toString(),
      posX: 127*3,
      posY: (35*3)+(i*3),
      radius:5,
      r:0,
      g:0,
      b:0,
      w:0
  
    }));
  }
  const generateShortConcreteWallSpots = ()=>{
    return [...Array(10)].map((_, i) => ({
      num: (117+92+126+57+i).toString(),
      posX: (127*3)-(i*3),
      posY: (35*3),
      radius:5,
      r:0,
      g:0,
      b:0,
      w:0
  
    }));
  }
  const generateLongConcreteWallSpots = ()=>{
    return [...Array(24)].map((_, i) => ({
      num: (117+92+126+57+10+i).toString(),
      posX: (127*3)-(10*3),
      posY: (35*3)-(i*4),
      radius:5,
      r:0,
      g:0,
      b:0,
      w:0
  
    }));
  }
const backWall=generateBackWallSpots()
const windowWall=generateWindowWallSpots()
const frontWall=generateFrontWallSpots()
const closetWall=generateClosetWallSpots()
const concreteWall=generateShortConcreteWallSpots()
const concreteWallLong=generateLongConcreteWallSpots()
Led.insertMany(backWall)
Led.insertMany(windowWall)
Led.insertMany(frontWall)
Led.insertMany(closetWall)
Led.insertMany(concreteWall)
Led.insertMany(concreteWallLong)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}
module.exports=initdb
