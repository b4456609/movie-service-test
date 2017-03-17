#!/bin/bash
FILE=""
for file in `find ./build/reports/pact -type f`;
do
    FILE="$FILE -F \"files=@$file\""
done

COMMAND="curl -X POST -H \"Content-Type: multipart/form-data\" $FILE http://$MGP/api/test/serviceTest"
echo "uplaod command"
echo $COMMAND
eval ${COMMAND}