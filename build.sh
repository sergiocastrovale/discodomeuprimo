#!/bin/bash
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)

  file="list.txt"
  home=$(pwd)
  count=$(find $BASE_PATH -mindepth 1 -maxdepth 1 -type d | wc -l)
  timestamp=`date +"%Y-%m-%d %T"`

  echo "*** Parsing the list and the full catalogue. This will take a while..."

  tree $BASE_PATH -idf --charset=ISO8859-1 >> $file

  # Remove base path
  sed -i -z "s%$(head -1 $file)%%g" $file

  # Append count and timestamp
  sed -i "1s/^/${count}|${timestamp}/" $file

  echo "*** Updated list ($count artists)"

  # if [[ $1 != 'no-deploy' ]] ; then
  #   git add . && \
  #   git add -u && \
  #   git commit -m "Update database ($count artists)" && \
  #   git push origin HEAD
  #   echo "*** Deployed new version to Github."
  # fi

else
  echo "You need to set the BASE_PATH in .env to build the list."
fi
