const MQTT = require("async-mqtt");
const filo=[]
let feedback
const client = MQTT.connect("tcp://192.168.1.201:1883");
client.subscribe('ledstatus')

// When passing async functions as event listeners, make sure to have a try catch block
client.on('message', function (topic, message) {
    // message is Buffer
   //console.log(filo)
   // console.log('done setting led on',message.toString())
  let item=filo.find(i=>i.num==message.toString())
  //console.log('filo item',item)
  filo.pop(item)
  
    //todo erase command from array
  })


exports.setLights = async(req, res) =>{
   
  
   req.body.a=req.body.a*255
   console.log(req.body.a)

  
  
   try {
    await client.publish('leds',JSON.stringify(req.body))
   
    // This line doesn't run until the server responds to the publish
//	await client.end();
    // This line doesn't run until the client has disconnected without error
    console.log("Done");
    res.status(200).send('ok');
} catch (e){
    // Do something about it!
    console.log(e.stack);
    process.exit();
}

   // res.send('NOT IMPLEMENTED: Book create POST');
};
exports.addToQueue = async(data) =>{
    filo.push(data)
}

   
        setInterval( async () => {
            if (filo.length>0)
            {
       
        try {
            let comm=filo.pop()
            console.log('command from array',comm)
            comm.a=1-comm.a
            if (comm.a===0)
            {
              
                comm.a=0.01
            }
            await client.publish('led',JSON.stringify(comm))
            
            // This line doesn't run until the server responds to the publish
        //	await client.end();
            // This line doesn't run until the client has disconnected without error
            console.log("sending command to",comm);
          
        } catch (e){
            // Do something about it!
            console.log(e.stack);
            process.exit();
        }
    }    
    }, 100);
   



exports.setLEd = async(data) =>{
   
  
    data.a=data.a*254
   
 //console.log(data)
   
   
    try {
     await client.publish('led',JSON.stringify(data))
     // This line doesn't run until the server responds to the publish
 //	await client.end();
     // This line doesn't run until the client has disconnected without error
    // console.log("Done");
  
 } catch (e){
     // Do something about it!
     console.log(e.stack);
     process.exit();
 }
 
    // res.send('NOT IMPLEMENTED: Book create POST');
 };