import cap as cap
import  numpy as np
import cv2
import requests
def intentar_ingresar():
	print("se esta abriendo la entrada ")

def intentar_salir():
	print("se esta abriendo la salida")
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
cap = cv2.VideoCapture(1)
cap2 = cv2.VideoCapture(0)
hay_elementos_1 = False
hay_elementos_2 = False
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
			intentar_ingresar()
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
			intentar_salir()
	cv2.imshow('img2', img2)
	k = cv2.waitKey(30) & 0xff
	if k == 27:
		break

cap.release()
cap2.release()
cv2.destroyAllWindows()


