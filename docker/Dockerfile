# syntax=docker/dockerfile:experimental
# Base Image
FROM node:18.7.0-alpine3.15 as base
ENV VERSION=$VERSION
WORKDIR /app
COPY package*.json .
RUN npm install

# Test Image
FROM base as test
ENTRYPOINT ["node", "tests/index.js"]

# Production Image
FROM base as prod
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]