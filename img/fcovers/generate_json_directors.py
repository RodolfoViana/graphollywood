import re
import json



# with open('listMovieDirectors.json') as in_file:
# 	lines = in_file.readlines()

# 	output = open('movieDirectors.json', 'w')

# 	for line in lines:
# 		output.write(line)

# 	output.close()

# in_file.close()


data = open('listMovieDirectors.json', 'r')

data_json = json.load(data)

for d in data_json:
	
	director_name = d['director']
	# print(d['director'])
	for m in d['movies']:
		movie_name = m['movie']

		if m['fcover'][:4] == 'http':
			m['fcover'] = 'example/img/fcovers/' + director_name + '/' +re.sub('[^A-Za-z0-9]+', '', movie_name) + '.jpg'	
		print(m['fcover'])
	

with open('movieDirectors.json', 'w') as outfile:
    json.dump(data_json, outfile)

data.close()
outfile.close()

