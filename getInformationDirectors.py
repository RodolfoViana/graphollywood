# -*- coding: utf-8 -*-


import imdb
print 'diretor\tfoto\tbiografia\tbirthDate\tdeathDate'

ia = imdb.IMDb()
with open('formatData/directors.txt') as f:
    next(f)
    for id_directors in f:
        director = ia.get_person(id_directors)

        if (director.has_key('headshot')):
           foto = str(director['headshot'])
        else:
            foto = "NA"

        if (director.has_key('biography')):
            biografia = str(director['biography'])
        else:
            biografia = "NA"

        if (director.has_key('birth date')):
            nascimento = str(director['birth date'])
        else:
            nascimento = "NA"

        if (director.has_key('death date')):
            morte = str(director['death date'])
        else:
            morte = "NA"

        print str(director) + '\t ' + foto + '\t ' + biografia + '\t ' + nascimento + '\t ' + morte






