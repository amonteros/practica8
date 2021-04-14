import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(7,GPIO.IN)
GPIO.setup(11,GPIO.IN)
GPIO.setup(35,GPIO.OUT)
GPIO.setup(36,GPIO.OUT)


global estado

############### SENSOR 1 #############################
def on_messageA(client, obj, msg):    
	estado = (msg.payload.decode("utf-8"))
	print(estado)
	
		
	if estado == "HISTORIAL1":
		f=open("texto1.txt","r")
		datos=f.read()
		f.close()
		mqttcA.publish("amonteros.fie@unach.edu.ec/prueba2",datos)	
		
############### SENSOR 2 #############################	
		
	if estado == "HISTORIAL2":
		f=open("texto2.txt","r")
		datos=f.read()
		f.close()
		mqttcA.publish("amonteros.fie@unach.edu.ec/prueba2",datos)	
 
 ################ CLIENTE A ########################
 
mqttcA = mqtt.Client() 
mqttcA.on_message = on_messageA
mqttcA.username_pw_set("amonteros.fie@unach.edu.ec","ajjazmin1997") 
mqttcA.connect("maqiatto.com", 1883) 
mqttcA.subscribe("amonteros.fie@unach.edu.ec/prueba", 0)
mqttcA.subscribe("amonteros.fie@unach.edu.ec/prueba1", 0)

rc=0
cont=0
print("inicio...")
while rc == 0:
   
      time.sleep(3)
      if GPIO.input(7):
	       GPIO.setmode(GPIO.BOARD)
	       GPIO.setup(36, GPIO.OUT)
	       GPIO.output(36, True)
	       print("Sensor1_ON")
	       f=open("texto1.txt","a")
	       f.write("on\n")
	       f.close()
		
		
      else:
	       GPIO.setmode(GPIO.BOARD)
	       GPIO.setup(36, GPIO.OUT)
	       GPIO.output(36, False)
	       print("Sensor1_OFF")
	       f=open("texto1.txt","a")
	       f.write("off\n")
	       f.close()
	       
      if GPIO.input(11):
	       GPIO.setmode(GPIO.BOARD)
	       GPIO.setup(35, GPIO.OUT)
	       GPIO.output(35, True)
	       print("Sensor2 _ON")
	       f=open("texto2.txt","a")
	       f.write("on\n")
	       f.close()
		
		
      else:
	       GPIO.setmode(GPIO.BOARD)
	       GPIO.setup(35, GPIO.OUT)
	       GPIO.output(35, False)
	       print("Sensor2_OFF")
	       f=open("texto2.txt","a")
	       f.write("off\n")
	       f.close()
	    
      rc = mqttcA.loop()


