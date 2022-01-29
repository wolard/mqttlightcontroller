const MQTT = require("async-mqtt");
const filo=[]
let feedback
const Led = require('../models/ledmodel');
const client = MQTT.connect("tcp://192.168.1.201:1883");
client.subscribe('initial')

// When passing async functions as event listeners, make sure to have a try catch block
client.on('message', async (topic, message)=> {
    // message is Buffer
   //console.log(filo)
   // console.log('done setting led on',message.toString())
   
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


  })

exports.setAllLights = async (req, res) =>{
    
    
    
    try {
        
  

     
  
   
    
      
      //await  Led.findOneAndUpdate({n:rgb.n},{r:rgb.r,g:rgb.g,b:rgb.b,a:rgb.a})

  //  await Led.updateMany({n:req.body.n}, {r:req.body.rgbArray.r,g:req.body.rgbArray.g,b:req.body.rgbArray.b,n:req.body.rgbArray.n})
  let jsonarr=JSON.stringify(req.body.rgbArray)
   
  // console.log(jsonarr) 
  //await client.publish('leds',JSON.stringify(req.body))
  await client.publish('/rgb',JSON.stringify(req.body.rgbArray))
    for( i=0;i<req.body.rgbArray.length;i++)
       
    {
        await  Led.findOneAndUpdate({n:req.body.rgbArray[i].n},{r:req.body.rgbArray[i].r,g:req.body.rgbArray[i].g,b:req.body.rgbArray[i].b,a:req.body.rgbArray[i].a})
  
 
    } 
    

 
    res.status(200).send('ok');
} catch (e){
    // Do something about it!
    console.log(e.stack);
    process.exit();
}


}
exports.setLights = async(req, res) =>{
   
  
   req.body.a=255-req.body.a
   console.log(req.body.a)

  
  
   try {
    await client.publish('leds',JSON.stringify(req.body))
    for( i=0;i<450;i++)
       
    {
        await  Led.findOneAndUpdate({n:(i.toString())},{r:req.body.r,g:req.body.g,b:req.body.b,a:req.body.a})
  
 
    } 
    // This line doesn't run until the server responds to the publish
//	await client.end();
    // This line doesn't run until the client has disconnected without error
    console.log("Doune");
    res.status(200).send('ok');
} catch (e){
    // Do something about it!
    console.log(e.stack);
    process.e
}

   // res.send('NOT IMPLEMENTED: Book create POST');
};
exports.effect = async(data) =>{
   
    await client.publish('effect',JSON.stringify(data))
}
exports.colorAll = async(data) =>{
   
  
    console.log(data.a)
 
   
   
    try {
     await client.publish('leds',JSON.stringify(data))
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
exports.addToQueue = async(data) =>{
    filo.push(data)
}

   
        setInterval( async () => {
            if (filo.length>0)
            {
                await client.publish('led',JSON.stringify(comm))
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