#!/bin/bash

### INFO: Delete user
USER_ID="00d9fb67-e33a-47c1-a23d-80937875eedf"
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

### INFO: Send DELETE request to delete the user
RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" -X DELETE "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN")

STATUS_CODE="${RESPONSE: -3}"

echo -e "\n\nStatus Code: $STATUS_CODE"
