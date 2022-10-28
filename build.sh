#!/bin/bash
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

home=$(pwd)
file="index.html"
count=0
timestamp=`date +"%Y-%m-%d %T"`

cd $BASE_PATH

for f in */; do
  list+="<div>${f%/}</div>"
  let count++
done

cd $home && cat > $file << EOF
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Disco do meu primo</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
  </head>
  <body>
    <header>$count artists listed. Last updated $timestamp.</header>
    <section>$list</section>
  </body>
</html>
EOF

git add . && \
git add -u && \
git commit -m "Update database ($count artists)" && \
git push origin HEAD
