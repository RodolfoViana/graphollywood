import os
import urllib
import json
import re

with open('information_directors.json') as data_file:    
	data = json.load(data_file)

newpath = r'directors_pic/'

if not os.path.exists(newpath):    
		os.makedirs(newpath)

directors = data["directors"][1:]

for d in directors:
	director_name = d["FIELD1"]
	director_pic = d["FIELD2"]

 	print("--- DIRECTOR ---")
	print(director_name)
	
	dpic = d['FIELD2']
	print(dpic)

	f = re.sub('[^A-Za-z0-9]+', '', director_name)	
	if 'http' in dpic:
		urllib.urlretrieve(dpic, newpath + '/' + f + ".jpg")
		print('--- ok ---')


data_file.close()