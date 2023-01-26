FROM node:17-alpine as builder
WORKDIR /route-zero-enterprise
COPY ./package.json .
RUN npm install 
COPY . .
CMD ["npm", "run", "build"]
FROM nginx
COPY ./build /usr/share/nginx/html 
