#!/bin/bash

### INFO: Get user info and activity
USER_ID="c01f53a2-f4db-47e7-977a-612f694a5bd7"
URL="http://localhost:8080/api/user/$USER_ID"
LOGIN_URL="http://localhost:8080/api/login"

### INFO: Get JWT token
JWT_TOKEN=$(curl -s -X POST "$LOGIN_URL" \
  -H "Content-Type: application/json" \
  -d '{ "email": "johndoe@email.com", "password": "123456"}')

if [ -z "$JWT_TOKEN" ]; then
  echo "Failed to retrieve JWT token"
  exit 1
fi

RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN")

STATUS_CODE="${RESPONSE: -3}"

echo -e "\n\nStatus Code: $STATUS_CODE"
