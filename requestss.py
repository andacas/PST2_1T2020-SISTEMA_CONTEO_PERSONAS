import requests

#para preguntar por la cantidad de presonas dentro de un local
payload ={"id":"1"}
r = requests.get("https://tareaautonoma4.000webhostapp.com/getImage.php",params=payload)
print(r.text)