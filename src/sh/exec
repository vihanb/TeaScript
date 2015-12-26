#!/bin/bash
read code; read input; 
js -f sh.js macros.js teascript.js -e "print(TeaScript(\`${code//\`/\\\`}\`,\"${input//,/","}\",{}).out)"
