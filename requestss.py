import requests

#para preguntar por la cantidad de presonas dentro de un local
payload ={}
r = requests.get("https://trabajocastro4.000webhostapp.com/index.php",params=payload)
print(r.text)

