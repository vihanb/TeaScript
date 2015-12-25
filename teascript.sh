#!/bin/sh
if [ ! -d "TeaScript" ]; then
  echo "TeaScript not installed. Installing TeaScript..."
  mkdir TeaScript
  wget -O TeaScript/macros.js https://raw.githubusercontent.com/vihanb/TeaScript/master/macros.js
  wget -O TeaScript/props.json https://github.com/vihanb/TeaScript/blob/master/props.json
  wget -O TeaScript/teascript.js https://github.com/vihanb/TeaScript/blob/master/v/2/teascript.js
  sed -i -e 's/window/this/g' -e 's/\/\*props\.json\*\//JSON.parse(read("props.json"))/g' TeaScript/teascript.js
  printf "var shoco={};var console={warn:print,log:print,error:print}" > TeaScript/sh.js
fi
cd TeaScript;
read -p "Code: " Code
read -p "Input: " Input
js -f sh.js macros.js teascript.js -e "print(TeaScript(\`${Code//\`/\\\`}\`,\"${Input//,/","}\",{}).code)"
