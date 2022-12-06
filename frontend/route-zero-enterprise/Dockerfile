FROM node:17-alpine as builder
WORKDIR /route-zero-enterprise
COPY ./package.json .
RUN npm install 
COPY . .
CMD ["npm", "run", "start"]
