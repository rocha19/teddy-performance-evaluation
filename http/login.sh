#!/bin/bash

## POST Login
URL="http://localhost:8080/login"

DATA='{
  "email": "john@example.com",
  "password": "secret"
}'

RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "$DATA")

STATUS_CODE="${RESPONSE: -3}"
BODY="${RESPONSE%$STATUS_CODE}"

echo "Status Code: $STATUS_CODE"
echo "Response Body: $BODY"
