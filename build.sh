#!/bin/bash
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)

  home=$(pwd)
  file="list.txt"
  count=0
  timestamp=`date +"%Y-%m-%d %T"`

  cd $BASE_PATH

  for f in */; do
    text+="${f%/}\n"
    let count++
  done

  cd $home

  echo -n "" > $file
  printf "$count|$timestamp\n" >> $file
  printf "$text" >> $file

  git add . && \
  git add -u && \
  git commit -m "Update database ($count artists)" && \
  git push origin HEAD
else
  echo "You need to set the BASE_PATH in .env to build the list."
fi
