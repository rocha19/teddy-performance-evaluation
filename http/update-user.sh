#!/bin/bash

### INFO: Update user
USER_ID="5277c614-03ba-4c4f-bef9-69c1562b18a7"
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

### INFO: Data to update the user
USER_DATA=$(
  cat <<EOF
{
  "email": "newemail@email.com",
  "password": "newpassword123"
}
EOF
)

### INFO: Send PUT request to update the user
RESPONSE=$(curl -s -o /dev/stderr -w "%{http_code}" -X PATCH "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d "$USER_DATA")

STATUS_CODE="${RESPONSE: -3}"

echo -e "\n\nStatus Code: $STATUS_CODE"
