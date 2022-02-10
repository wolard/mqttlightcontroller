const express = require('express');
const router = express.Router();
const MqttController = require('../controller/mqttcontroller')

const Led = require('../models/ledmodel');
// Home page route.
router.post('/getleds', async  (req, res) =>{
    const currLeds= await Led.find({})
   // console.log(currLeds)
    res.send(currLeds)
  })
  

  
module.exports = router;