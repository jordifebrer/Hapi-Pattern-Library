#!/bin/bash
if [ -z "$1" ]
  then
    echo "No argument supplied, creating new-template"
    template="new-template"
else
  echo "Created new $1 template"
  template="$1"
fi

eval "cd ./pattern-library/templates";
eval "mkdir ${template} && cd ${template}";
eval "touch index.html context.json";
eval "printf '{}' >> context.json";
