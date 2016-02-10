#!/bin/bash
if [ -z "$1" ]
  then
    echo "No argument supplied, creating new-component"
    component="new-component"
else
  echo "Created new $1 component"
  component="$1"
fi

eval "cd ./pattern-library/components";
eval "mkdir ${component} && cd ${component}";
eval "touch index.html docs.md context.json";
eval "printf '{}' >> context.json";
eval "mkdir scripts styles";
eval "cd scripts && touch main.js && cd ..";
eval "cd styles && touch main.scss";
