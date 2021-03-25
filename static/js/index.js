//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
    
	console.log("Encendido");
    sendMessage("On");
}
function LED1_Off(){	
	console.log("Apagado");
    sendMessage("Off");
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
    console.log("Conectado....");
	
    client.subscribe("amonteros.fie@unach.edu.ec/prueba");
    sendMessage("hola desde mii web");
	
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
    mensaje=message.payloadString.split("= ");
    document.getElementById("sensor").innerHTML=mensaje[1];
    console.log("MensajeRecibido:"+message.payloadString);

  }

  function sendMessage(Texto){
    message = new Paho.MQTT.Message(Texto);
    message.destinationName = "amonteros.fie@unach.edu.ec/prueba1";
    client.send(message);
  }
  
