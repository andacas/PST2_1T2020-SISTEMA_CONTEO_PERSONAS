import cap as cap
import  numpy as np
import cv2
import requests
import serial, time
import datetime
arduino = serial.Serial("COM3", 9600)
payload ={'id':1}
time.sleep(2)
def intentar_ingresar():
	r = requests.get("https://trabajocastro4.000webhostapp.com/cantidad_python.php", params=payload)
	print(r.text)
	if(r.text =="verdad"):
		arduino.write(b'I')
		arduino.write(b'D')
		tiempo = datetime.datetime.now()
		tiempo = tiempo.replace(minute=0, second=0, microsecond=0)
		print(tiempo)

		payload2 = {'id': 1,'fecha':tiempo}
		r2 = requests.get("https://trabajocastro4.000webhostapp.com/revisar_informe.php", params=payload2)
		print(r2.text)

		if(r2.text == "no existe"):
			payload3 = {'id': 1, 'fecha': tiempo}
			r3 = requests.get("https://trabajocastro4.000webhostapp.com/crear_informes_vacios.php", params=payload3)
			print(r3.text)

		payload4 = {'id': 1, 'fecha': tiempo}
		r4 = requests.get("https://trabajocastro4.000webhostapp.com/ingreso_por_id.php", params=payload4)
		print(r4.text)
	else:
		arduino.write(b'F')
	r = requests.get("https://trabajocastro4.000webhostapp.com/cantidad_python.php", params=payload)
	print(r.text)
	if (r.text == "verdad"):
		arduino.write(b'D')
	else:
		arduino.write(b'F')





def intentar_salir():
	arduino.write(b'S')
	arduino.write(b'D')
	tiempo = datetime.datetime.now()
	tiempo = tiempo.replace(minute=0, second=0, microsecond=0)
	print(tiempo)

	payload2 = {'id': 1, 'fecha': tiempo}
	r2 = requests.get("https://trabajocastro4.000webhostapp.com/revisar_informe.php", params=payload2)
	print(r2.text)
	if (r2.text == "no existe"):
		payload3 = {'id': 1, 'fecha': tiempo}
		r3 = requests.get("https://trabajocastro4.000webhostapp.com/crear_informes_vacios.php", params=payload3)
		print(r3.text)
	payload4 = {'id': 1, 'fecha': tiempo}
	r4 = requests.get("https://trabajocastro4.000webhostapp.com/salida_por_id.php", params=payload4)
	print(r4.text)




face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
cap = cv2.VideoCapture(1)
cap2 = cv2.VideoCapture(0)
hay_elementos_1 = False
hay_elementos_2 = False
contar_cuadros_1=0;
contar_cuadros_2 = 0;
while True:
	ret, img = cap.read()
	gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
	faces = face_cascade.detectMultiScale(gray,1.3,5)
	hay_elementos_1 = False
	for (x,y,w,h) in faces:
		cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
		roi_gray = gray[y:y+h , x:x+w]
		roi_color = img[y:y+h , x:x+w]
		eyes = eye_cascade.detectMultiScale(roi_gray)
		for(ex,ey,ew,eh) in eyes:
			cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
			hay_elementos_1 = True
	if(hay_elementos_1):
		contar_cuadros_1 += 1
		if(contar_cuadros_1>=30):
			intentar_ingresar()
			contar_cuadros_1 = 0
	else:
		contar_cuadros_1 = 0
	cv2.imshow('img',img)
	k = cv2.waitKey(30) & 0xff
	if k ==27:
		break


	ret2, img2 = cap2.read()
	gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
	faces2 = face_cascade.detectMultiScale(gray2, 1.3, 5)
	hay_elementos_2 = False
	for (x, y, w, h) in faces2:
		cv2.rectangle(img2, (x, y), (x + w, y + h), (255, 0, 0), 2)
		roi_gray2 = gray2[y:y + h, x:x + w]
		roi_color2 = img2[y:y + h, x:x + w]
		eyes2 = eye_cascade.detectMultiScale(roi_gray2)
		for (ex, ey, ew, eh) in eyes2:
			cv2.rectangle(roi_color2, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
			hay_elementos_2 = True
			if (hay_elementos_2):
				contar_cuadros_2 += 1
				if (contar_cuadros_2 >= 30):
					print("salir")
					intentar_salir()
					contar_cuadros_2 = 0
			else:
				contar_cuadros_2 = 0
	cv2.imshow('img2', img2)
	k = cv2.waitKey(30) & 0xff
	if k == 27:
		break

cap.release()
cap2.release()
cv2.destroyAllWindows()


