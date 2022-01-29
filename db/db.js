const mongoose = require('mongoose');
const Led = require('../models/ledmodel');
const mongoDB = process.env.MONGO_DB||'mongodb://mongodb/lights';
console.log(mongoDB)

const initdb=()=>
{
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => console.log(error));
 
const db = mongoose.connection;

const generateFrontkWallSpots = ()=>{
  return [...Array(126)].map((_, i) => ({
    name:'frontwall',
    n: (118+92+126-i).toString(),
    posX: 5+(i/135)*95,
    posY: 5,
    radius:8,
    r:0,
    g:0,
    b:0,
    a:0

  }));
}

const generateWindowWallSpots = ()=>{
    return [...Array(92)].map((_, i) => ({
      name:'windowwall',
      n: (118+92-i).toString(),
      posX: 96,
      posY: 5+ (i/126)*95,
      radius:8,
      r:0,
      g:0,
      b:0,
      a:0 
  
    })); 
  }
  
  const generateBackWallSpots = ()=>{
    return [...Array(118)].map((_, i) => ({
      name:'backwall',
      n: (i).toString(),
      posX: 9+(i/126)*90,
      posY: 4+(92/126)*95,
      radius:8,
      r:0,
      g:0,
      b:0,
      a:0
  
    })); 
  }
  
  const generateClosetWallSpots = ()=>{
    return [...Array(57)].map((_, i) => ({
      name:'closetwall',
      n: (118+92+126+i).toString(),
      posX: 5,
      posY: 8+(i/126)*93,
      radius:8,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  
  const generateShortConcreteWallSpots = ()=>{
    return [...Array(10)].map((_, i) => ({
      name:'shortconcretewall',
      n: (118+92+126+57+i).toString(),
      posX: 5+(i/126)*93,
      posY: 11+(57/126)*92,
      radius:8,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
   
  const generateLongConcreteWallSpots = ()=>{
    return [...Array(23)].map((_, i) => ({
      name:'longconcretewall',
      n: (118+92+126+57+10+i).toString(),
      posX: 10,
      posY: 15+((57/126)*90)+((i/135)*90),
      radius:8,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  const generateReadingLightSpots = ()=>{
    return [...Array(24)].map((_, i) => ({
      name:'readinglight',
      n: (118+92+126+57+10+23+i).toString(),
      posX: 10,
      posY: 15+((57/126)*90)+((i/135)*90),
      radius:8,
      r:0,
      g:0,
      b:0,
      a:0
  
    }));
  }
  console.log('seed',process.env.DB_ACTION)
if (process.env.DB_ACTION==='SEED')
{
  console.log('seeding db')
  Led.collection.drop()
Led.insertMany(generateBackWallSpots())
Led.insertMany(generateWindowWallSpots())
Led.insertMany(generateFrontkWallSpots())
Led.insertMany(generateClosetWallSpots())
Led.insertMany(generateShortConcreteWallSpots())
Led.insertMany(generateLongConcreteWallSpots())
Led.insertMany(generateReadingLightSpots())
}
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
return db
}
module.exports=initdb
