#!/bin/bash

javac /home/iara/hackfest/graphollywood/formatData/readData.java

while read p; do
  echo "executando para "$p
  curl http://www.imdb.com/name/nm$p/awards?ref_=nm_ql_2 > /tmp/$p".txt"
  java readData /tmp/$p".txt" >> awards.csv
  rm -rf /tmp/$p".txt"
  echo "proximo ator."

done </home/iara/hackfest/graphollywood/formatData/actors.txt
