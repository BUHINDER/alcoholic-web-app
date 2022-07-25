FROM node:16.15.0-alpine AS builder
WORKDIR /main
COPY package.json /main/package.json
RUN npm install --only=prod
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]