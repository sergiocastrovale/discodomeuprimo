#!/bin/bash
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)

  home=$(pwd)
  file="list"
  count=0
  timestamp=`date +"%Y-%m-%d %T"`

  if [[ $1 = 'expanded' ]] ; then
    # WIP
    echo "Building the list with albums. This will take a while..."
    tree $BASE_PATH -idf --charset=ISO8859-1 > list_expanded
    mv list_expanded $home
    # | sed 's/F:\/mp3\/mainstream\///'
  else
    cd $BASE_PATH

    for f in */; do
      text+="${f%/}\n"
      let count++
    done

    cd $home

    echo -n "" > $file
    printf "$count|$timestamp\n" >> $file
    printf "$text" >> $file
    echo "*** Updated $file ($count artists)"
  fi

  if [[ $1 != 'no-deploy' ]] ; then
    git add . && \
    git add -u && \
    git commit -m "Update database ($count artists)" && \
    git push origin HEAD
    echo "*** Deployed new version to Github ($count artists)."
  fi

else
  echo "You need to set the BASE_PATH in .env to build the list."
fi
