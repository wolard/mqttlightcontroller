const express = require('express');
const router = express.Router();
const MqttController = require('../controller/mqttcontroller')
const mongoose = require('mongoose');
const Led = require('../models/ledmodel');
const mongoDB = 'mongodb://127.0.0.1/lights';
// Home page route.
router.post('/getleds', async function (req, res) {
    const currLeds= await Led.find({})
   // console.log(currLeds)
    res.send(currLeds)
  })
  
  // About page route.
  router.post('/setleds', MqttController.setLights)
module.exports = router;