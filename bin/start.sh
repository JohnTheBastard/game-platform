#!/bin/bash
args=("$@")

# For future reference:
#argcount=("$#")
#echo ${args[0]} ${args[1]} ${args[2]} ' -> args=("$@"); echo ${args[0]} ${args[1]} ${args[2]}'
#echo $@ ' -> echo $@'
#echo $1 $2 $3 ' -> echo $1 $2 $3'

if [ $# -eq 0 ]; then
 	$( npm start | tee /dev/tty )
elif [ ${args[0]} = "test" ]; then
	if [ $# -eq 1 ]; then
		$( npm test | tee /dev/tty )
	elif [ ${args[1]}  = "all" ]; then
		$( npm test | tee /dev/tty )
	else
		num=1
		while [ $num -lt $# ]
		do
			(( num++ ))
			files=$files' --option '${!num}
		done
		
		$( npm run gulp -- $files | tee /dev/tty )
	fi
elif [ ${args[0]} = "client" ]; then
	$( npm run client-start )
elif [ ${args[0]} = "express" ]; then
	$( npm run express-start | tee /dev/tty )
else
	echo "invalid args"
fi