# -*- coding: utf-8 -*-


import imdb
print 'actor\tfoto\tbiografia\tbirthDate\tdeathDate'

ia = imdb.IMDb()
with open('formatData/actors.txt') as f:
    next(f)
    for id_actors in f:
        actor = ia.get_person(id_actors)

        if (actor.has_key('headshot')):
           foto = str(actor['headshot'])
        else:
            foto = "NA"

        if (actor.has_key('biography')):
            biografia = str(actor['biography'])
        else:
            biografia = "NA"

        if (actor.has_key('birth date')):
            nascimento = str(actor['birth date'])
        else:
            nascimento = "NA"

        if (actor.has_key('death date')):
            morte = str(actor['death date'])
        else:
            morte = "NA"

        print str(actor) + '\t ' + foto + '\t ' + biografia + '\t ' + nascimento + '\t ' + morte






