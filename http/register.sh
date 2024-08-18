#!/bin/bash

### INFO: POST Register a new user
URL="http://localhost:8080/api/user"

DATA='{
  "email": "johndoe@gmail.com",
  "password": "123456"
}'

RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "$DATA")

STATUS_CODE="${RESPONSE: -3}"
BODY="${RESPONSE%$STATUS_CODE}"

echo "Status Code: $STATUS_CODE"
echo "Response Body: $BODY"
