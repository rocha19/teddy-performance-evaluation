#!/bin/bash

### INFO: Delete user
USER_ID="c01f53a2-f4db-47e7-977a-612f694a5bd7"
URL_ID="6ca65f16-dfb6-4db5-83bc-4bc3fe5d65e9"
URL="http://localhost:8080/api/shortener/$USER_ID/$URL_ID"
LOGIN_URL="http://localhost:8080/api/login"

### INFO: Get JWT token
JWT_TOKEN=$(curl -s -X POST "$LOGIN_URL" \
  -H "Content-Type: application/json" \
  -d '{ "email": "johndoe@email.com", "password": "123456"}')

if [ -z "$JWT_TOKEN" ]; then
  echo "Failed to retrieve JWT token"
  exit 1
fi

### INFO: Send DELETE request to delete the user
RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" -X DELETE "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN")

STATUS_CODE="${RESPONSE: -3}"

echo -e "\n\nStatus Code: $STATUS_CODE"
