# executar o commando: python3 parseAllMoviesToJSON.py <nome-do-arquivo-csv>
# será gerado um arquivo .json a partir do arquivo de entrada.
# a estrutura do json é semelhante a do arquivo jsonmovieexample.json
# OBS.: filmes com ratings NA não estão sendo considerados.

import csv
import json
import sys
directorNames = []

data = []

csvfile = open(sys.argv[1], 'r')

rows = csvfile.readlines()[1:]

for row in rows:
	row = row.split('\t')

	if row[3].strip() != "NA":
		name = row[0]
		
		year = row[2].strip()
		if year.isdigit():
			year = int(year)

		print(year)


		rating = row[3].strip()
		if rating.isalpha() == False:
			rating = float(rating)

		print(rating)

		movie = { "movie": row[1].strip(),
					  "year": year,
					  "rating": rating,
					  "cover": row[4].strip(),
					  "fcover": row[5].strip()
				}

		if name not in directorNames:
			director = {}
			director["director"] = name
			director["movies"] = []

			
			director["movies"].append(movie)
			data.append(director)
			directorNames.append(name)
		else:
			for e in data:
				if e["director"] == name:
					e["movies"].append(movie)

json_data = json.dumps(data)

f_outputname = sys.argv[1].split('.')[0] + ".json"
f_output = open( f_outputname, "w")

f_output.write(json_data)

f_output.close()
csvfile.close()