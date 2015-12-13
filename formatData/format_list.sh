#!/bin/bash

grep "/nm" htmlsource5.txt >> aux1.txt

cut -c35-41 aux1.txt >> actresses.txt

rm -rf aux1.txt
