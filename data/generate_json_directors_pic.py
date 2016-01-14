#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
import json


data = open('information_directors.json', 'r')

data_json = json.load(data)

directors = data_json["directors"][1:]

for d in directors:
	
	director_name = d['FIELD1']
	director_pic = d["FIELD2"]

	print(director_name)
	print(director_pic)

	f = re.sub('[^A-Za-z0-9]+', '', director_name)
	

	
	d["FIELD2"] = 'img/directors_pic/' + f + '.jpg'	
	print(d["FIELD2"])
		

with open('info_directors.json', 'w') as outfile:
    json.dump(data_json, outfile)


   

data.close()
outfile.close()