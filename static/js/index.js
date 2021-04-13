//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	//alert("led on");
	console.log("Led_ON");
	//document.getElementById("sensor").innerHTML="led on";
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
    	client.send(message);
  
}
function LED1_Off(){	
	//alert("OFF");
	console.log("Led_OFF");
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
    	client.send(message);
	//document.getElementById("sensor").innerHTML="led off";
}

function HISTORIAL_led(){	
	
	console.log("Led_HISTORIAL");
	message = new Paho.MQTT.Message("HISTORIAL");
    	message.destinationName = "amonteros.fie@unach.edu.ec/prueba";
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
	

    client.subscribe("amonteros.fie@unach.edu.ec/prueba1");
    //client.subscribe("amonteros.fie@unach.edu.ec/prueba");
	  
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
	
		msm=message.payloadString;
		if(msm="ON"){
		
			document.getElementById("sensor").innerHTML=msm;
		}
		 if(msm="OFF"){
		
			document.getElementById("sensor").innerHTML=msm;
		}
	  
	        if(msm[0]=="1"){
		
			var sms=[];
			for (i=1;i<msm.length;i++){
			sms[i-1]=msm[i];
		}
		document.getElementById("sensor2").innerHTML=sms;
        
    }
  } 
  
        
   
  
  
  
