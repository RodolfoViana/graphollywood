# -*- coding: utf-8 -*-


import imdb
print 'movieId,movieTitle,movieDirector,movieRating,movieMetascore,listMovieCast'
ia = imdb.IMDb()
with open('directors.txt') as f:
    next(f)
    for id_directors in f:
        print id_directors

