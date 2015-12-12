#!/bin/bash

grep "/nm" htmlsource2.txt >> aux1.txt

cut -c35-41 aux1.txt >> actors.txt

rm -rf aux1.txt
