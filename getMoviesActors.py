# -*- coding: utf-8 -*-


import imdb
print 'actor\tmovie\tyear\trating\tvotes\tcover\tfcover'

ia = imdb.IMDb()
with open('formatData/directors.txt') as f:
    next(f)
    #for id_actors in f:
        #actor = ia.get_person(id_actors)
    actor = ia.get_person('0000210')
    movie_list = actor['actress']


    for movie in movie_list:
            movieId = movie.getID()
            movie = ia.get_movie(movieId)

            if (movie.has_key('year')):
                year = str(movie['year'])
            else:
                year = "NA"

            if (movie.has_key('rating')):
                rating = str(movie['rating'])
            else:
                rating = "NA"

            if (movie.has_key('votes')):
                votes = str(movie['votes'])
            else:
                votes = "NA"

            if (movie.has_key('cover url')):
                cover = str(movie['cover url'])
            else:
                cover = "NA"

            if (movie.has_key('full-size cover url')):
                fcover = str(movie['full-size cover url'])
            else:
                fcover = "NA"

            print str(actor) + '\t ' + str(movie) + '\t ' + year + '\t ' + rating + '\t ' + votes + '\t ' + cover + '\t ' + fcover



