#!/bin/bash

grep "/nm" htmlsource.txt >> aux1.txt

cut -c35-41 aux1.txt >> directors.txt

rm -rf aux1.txt
