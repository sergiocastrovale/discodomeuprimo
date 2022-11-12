#!/bin/bash
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)

  file="list.txt"
  file_expanded="list_expanded.txt"
  home=$(pwd)
  count=$(find $BASE_PATH -mindepth 1 -maxdepth 1 -type d | wc -l)
  timestamp=`date +"%Y-%m-%d %T"`

  if [[ $1 = 'expanded' ]] ; then
    echo "*** Building the list with albums. This will take a while..."
    tree $BASE_PATH -idf --charset=ISO8859-1 >> $file_expanded

    # Remove base path
    sed -i -z "s%$(head -1 $file_expanded)%%g" $file_expanded

    # Append count and timestamp
    sed -i "1s/^/${count}|${timestamp}/" $file_expanded
  else
    echo "*** Building the list..."
    cd $BASE_PATH

    for f in */; do
      text+="${f%/}\n"
    done

    cd $home

    echo -n "" > $file
    printf "$count|$timestamp\n" >> $file
    printf "$text" >> $file
  fi

  echo "*** Updated list ($count artists)"

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
