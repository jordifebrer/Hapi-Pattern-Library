#!/bin/bash
if [ -z "$1" ]
  then
    echo "No argument supplied, creating new-pattern"
    pattern="new-pattern"
else
  echo "Created new $1 pattern"
  pattern="$1"
fi

eval "cd ./pattern-library/patterns";
eval "touch ${pattern}.html";
