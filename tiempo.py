import datetime
tiempo = datetime.datetime.now()
tiempo = tiempo.replace(minute=0,second=0,microsecond=0)
print(tiempo)