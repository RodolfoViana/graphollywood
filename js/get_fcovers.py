import os
import urllib
import json
import re

with open('listMovieDirectors.json') as data_file:    
	data = json.load(data_file)


for d in data:
	director_name = d["director"]

	newpath = r'fcovers/' + director_name

	if not os.path.exists(newpath):    
		os.makedirs(newpath)

 	print("--- DIRECTOR ---")
	print(director_name)
	dmovies = d['movies']
	for m in dmovies:
		print("--- MOVIES ---")
		fcover = m['fcover']
		movie = m['movie']

		print(movie)

		f = re.sub('[^A-Za-z0-9]+', '', movie)	
		if fcover != 'NA':
			urllib.urlretrieve(fcover, newpath+ '/' + f + ".jpg")
			print('--- ok ---')


data_file.close()