const MQTT = require("async-mqtt");
const filo=[]
let feedback
const Led = require('../models/ledmodel');
const ledCommands = require('../controller/commands');
const client = MQTT.connect("tcp://192.168.1.201:1883");
client.subscribe('initial')

// When passing async functions as event listeners, make sure to have a try catch block
client.on('message', async (topic, message)=> {
    // message is Buffer
   //console.log(filo)
   // console.log('done setting led on',message.toString())
   if (process.env.MQTT==='ACTIVE')
    {
   
 if (topic==='initial')
 {


Led.
find({}).
select('r g b a n -_id'). 

exec( async (err, data)=> {
   // console.log(data)
    await client.publish('/rgb',JSON.stringify(data))
 });

 }

    }
  })

exports.colorSelected = async (data) =>{
    
  
  
   
    let vals=[];
for(var item of data){
   vals.push(item.n,item.r,item.g,item.b,item.a); 
}
   
     let res=ledCommands.led.concat(',',vals)+','

     console.log('dot sepatated vals',res.toString())
     try {
        
  

     
  
   
    
      
      //await  Led.findOneAndUpdate({n:rgb.n},{r:rgb.r,g:rgb.g,b:rgb.b,a:rgb.a})

  //  await Led.updateMany({n:req.body.n}, {r:req.body.rgbArray.r,g:req.body.rgbArray.g,b:req.body.rgbArray.b,n:req.body.rgbArray.n})
  
   
  // console.log(jsonarr) 
  //await client.publish('leds',JSON.stringify(req.body))
  if (process.env.MQTT==='ACTIVE')
  {
  await client.publish('/ledroof',res.toString())
  } 
  for( i=0;i<data.length;i++)
       
    {
        await  Led.findOneAndUpdate({n:data[i].n},{r:data[i].r,g:data[i].g,b:data[i].b,a:data[i].a})
  
 
    } 
    


} catch (e){
    // Do something about it!
    console.log(e.stack);
    process.exit();
}


}

exports.effect = async(data) =>{
    if (process.env.MQTT==='ACTIVE')
    {
    await client.publish('effect',JSON.stringify(data))
    }
}
exports.colorAll = async(data) =>{
    console.log('data rom frontend',data)
    let vals=[data.n,data.r,data.g,data.b,data.a];
console.log(vals)
   

   
     let res=ledCommands.allLeds.concat(',',vals)+','


  console.log(res.toString())
 
   
   
    try {
        if (process.env.MQTT==='ACTIVE')
    {
     
       await client.publish('/ledroof',res.toString())
    }
        for( i=0;i<450;i++)
        
     {
         await  Led.findOneAndUpdate({n:(i.toString())},{r:data.r,g:data.g,b:data.b,a:data.a})
   
  
     } 
     // This line doesn't run until the server responds to the publish
 //	await client.end();
     // This line doesn't run until the client has disconnected without error
     console.log("sent");
   
 } catch (e){
     // Do something about it!
     console.log(e.stack);
     process.e
 }
}

   



exports.setLEd = async(data) =>{
   
  
    data.a=data.a*254
   
 //console.log(data)
   
   
    try {
        if (process.env.MQTT==='ACTIVE')
    {
     await client.publish('led',JSON.stringify(data))
    }
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