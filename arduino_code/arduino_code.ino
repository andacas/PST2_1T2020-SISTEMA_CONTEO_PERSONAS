#include <Servo.h>
 
// Declaramos la variable para controlar el servo
Servo servoMotor_entrada;
Servo servoMotor_salida;
//variable para lectura puerto serial
char Dato;
//variable de estado de la puertas 
bool entrando = false;
bool saliendo = false;
// variables para esperar un tiempo sin metodo delay
unsigned long previousMillis_entrada = 0;        // will store last time LED was updated
unsigned long previousMillis_salida = 0;    
// intervalo que se demoran los servos
const long interval = 1000;   
//pines de los leds para indicar si se puede ingresar 
int red_light_pin= 12;
int green_light_pin = 13;

void setup() {
  // Iniciamos el monitor serie para mostrar el resultado
  Serial.begin(9600);
  
  // Iniciamos el servo para los pines 6 y 5 
  servoMotor_entrada.attach(6);
  servoMotor_salida.attach(5);
  
  // definir pines de salida
  pinMode(red_light_pin, OUTPUT);
  pinMode(green_light_pin, OUTPUT);
  
  //encender led verde 
  digitalWrite(red_light_pin,LOW);
  digitalWrite(green_light_pin,HIGH);
  
  // poner en 0 grados los servos
  servoMotor_salida.write(0);
  servoMotor_entrada.write(0);
}
 
void loop() {
  //leer tiempo actual 
  unsigned long currentMillis = millis();

  //verificar que se escribe en el puerto serial
  if (Serial.available() > 0) {
    // leer el Dato del puerto serial y ejecutar la accion de abrir,cerrar,mostrar ocupado o mostrar disponible dependiendo del valor (I,S,F,D)
    Dato = Serial.read();
    if(Dato == 'I' and entrando == false){
      entrando = true;
      previousMillis_entrada = currentMillis;
    }
    if(Dato == 'S' and saliendo == false){
      saliendo = true;
      previousMillis_salida = currentMillis;
    }
    if(Dato == 'F'){
        digitalWrite(red_light_pin,HIGH);
       digitalWrite(green_light_pin,LOW);
    }
    if(Dato == 'D'){
        digitalWrite(red_light_pin,LOW);
        digitalWrite(green_light_pin,HIGH);
    }
  }
  //si el estado del servo es verdadero se abre un tiempo el servo 
  if(entrando){
    servoMotor_entrada.write(90);
    if (currentMillis - previousMillis_entrada >= interval) {
      entrando = false;
      servoMotor_entrada.write(0);
    }
  }
  
    if(saliendo){
      servoMotor_salida.write(90);
      if (currentMillis - previousMillis_salida >= interval) {
        saliendo = false;
        servoMotor_salida.write(0);
      }
    }
  

}
