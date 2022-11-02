FROM node:15.14.0-slim

WORKDIR /app
COPY package*.json ./
COPY db.json .
RUN npm ci --silent --production

USER node
EXPOSE 3333

CMD ["npm", "run", "api"]
