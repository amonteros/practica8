//https://www.eclipse.org/paho/clients/js/
var cont=0;
//function LED1_On() {
	//alert("led on");
	//console.log("Led_ON");
	//document.getElementById("sensor").innerHTML="led on";
	//message = new Paho.MQTT.Message("ON");
    	//message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
    	//client.send(message);
  
//}
//function LED1_Off(){	
	//alert("OFF");
	//console.log("Led_OFF");
	//message = new Paho.MQTT.Message("OFF");
    	//message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
    	//client.send(message);
	//document.getElementById("sensor").innerHTML="led off";
//}

function Historial_sensor1(){	
	
	console.log("HISTORIAL1");
	message = new Paho.MQTT.Message("HISTORIAL1");
    	message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
    	client.send(message);
}
function Historial_sensor2(){

	console.log("HISTORIAL2");
	message = new Paho.MQTT.Message("HISTORIAL2");
    	message.destinationName = "amonteros.fie@unach.edu.ec/prueba1";
    	client.send(message);
	
}





// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "amonteros.fie@unach.edu.ec",
    password: "ajjazmin1997",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	

 
    client.subscribe("amonteros.fie@unach.edu.ec/prueba2");

	  
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
// called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("sensor").innerHTML=message.payloadString;
  } 

  
        
   
  
  
  
