const MQTT = require("async-mqtt");
const { status } = require("express/lib/response");

const client = MQTT.connect("tcp://192.168.1.201:1883");

// When passing async functions as event listeners, make sure to have a try catch block

const doStuff = async () => {

	console.log("Starting");
	try {
		await client.publish("leds", "It works!");
		// This line doesn't run until the server responds to the publish
	//	await client.end();
		// This line doesn't run until the client has disconnected without error
		console.log("Done");
	} catch (e){
		// Do something about it!
		console.log(e.stack);
		process.exit();
	}
}

//client.on("connect", doStuff);



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