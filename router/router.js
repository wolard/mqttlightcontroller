const express = require('express');
const router = express.Router();
const MqttController = require('../controller/mqttcontroller')
// Home page route.
router.post('/getleds', function (req, res) {
    
    console.log(req.body)
    res.send('Wiki home page');
  })
  
  // About page route.
  router.post('/setleds', MqttController.setLights)
module.exports = router;