#!/bin/bash

### INFO: Access Original URL by Shortened URL
DOMAIN="http://localhost:8080/api"
LOGIN_URL="http://localhost:8080/api/login"
PARAM_CODE="otemco"

### INFO: Get JWT token
JWT_TOKEN=$(curl -s -X POST "$LOGIN_URL" \
  -H "Content-Type: application/json" \
  -d '{ "email": "johndoe@email.com", "password": "123456"}')

if [ -z "$JWT_TOKEN" ]; then
  echo "Failed to retrieve JWT token"
  exit 1
fi

RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" "$DOMAIN/$PARAM_CODE" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN")

STATUS_CODE="${RESPONSE: -3}"

echo -e "\n\nStatus Code: $STATUS_CODE"
