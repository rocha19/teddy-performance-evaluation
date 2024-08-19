# Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run
FROM node:18
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY nest-cli*.json ./
RUN npm install --only=production
COPY .env ./
RUN npx migrate:deploy
EXPOSE 8080
CMD ["npm", "run", "start"]
