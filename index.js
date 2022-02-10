const express = require('express')
require('dotenv').config({path: './.env.local'})
const app = express()
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const port = 3006
const router = require('./router/router.js');
const { Server } = require("socket.io");
const MqttController = require('./controller/mqttcontroller')
const io = new Server(server,{
  cors: {
    origin: "*",
  },
});
const initDb = require('./db/db');
initDb()
 
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));
app.use(router);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
 
})



io.on('connection', (socket) => {
  console.log('connected')
  socket.on("disconnect", (reason) => {
  console.log(reason)
  });
  socket.on("effect", (data) => {
    console.log('effect',data)   
    MqttController.effect(data)
    //MqttController.setLEd(data)

     });
  socket.on("colorAll", (data) => {
      console.log('colorall',data)    
      MqttController.colorAll(data)
      //MqttController.setLEd(data)
  
       });
       socket.on("colorSelected", (data) => {
        console.log('colorSelected',data)    
        MqttController.colorSelected(data)
        //MqttController.setLEd(data)
    
         });
});


