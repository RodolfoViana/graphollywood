import sys
import re
import json

filename = sys.argv[1]
data = open(filename, 'r')

data_json = json.load(data)

for d in data_json:
	
	director_name = d['director']
	# print(d['director'])
	for m in d['movies']:
		movie_name = m['movie']

		if m['fcover'][:4] == 'http':
			m['fcover'] = 'img/fcovers/' + director_name + '/' +re.sub('[^A-Za-z0-9]+', '', movie_name) + '.jpg'	
		print(m['fcover'])
	

with open('movieDirectors-2015.json', 'w') as outfile:
    json.dump(data_json, outfile)

data.close()
outfile.close()