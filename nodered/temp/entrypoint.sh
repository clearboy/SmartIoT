#!/bin/bash

trap stop SIGINT SIGTERM

function stop() {
	kill $CHILD_PID
	wait $CHILD_PID
}

/usr/local/bin/node $NODEOPTIONS node_modules/node-red/red.js --userDir /data $FLOWS &

        "start": "node $NODE_OPTIONS node_modules/node-red/red.js $FLOWS"        

CHILD_PID="$!"

wait "${CHILD_PID}"