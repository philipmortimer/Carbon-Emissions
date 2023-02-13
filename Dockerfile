FROM maven:3-openjdk-17 as build-backend

COPY backend/server/src src
COPY backend/server/pom.xml .
RUN mvn package

# samples liscened under CC0 (creative commons) thus they are free to use comercially and otherwise without warrenty. 

FROM node:lts AS development

#RouteZeroEnterprise
WORKDIR /rze

# COPY <repo-location> <container-location>

# copy react settings
COPY frontend/route-zero-enterprise/package.json /rze/package.json
COPY frontend/route-zero-enterprise/package-lock.json /rze/package-lock.json

RUN npm install 

COPY frontend/route-zero-enterprise/. /rze

# https://stackoverflow.com/questions/55926939/node-in-docker-npm-test-and-exit
# tests run then exit
ENV CI=true

CMD ["npm", "start"]

FROM development AS build

RUN npm run build

# hereafter copied straight from source*

FROM development as dev-envs
RUN apt-get update && apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode && groupadd docker && usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

# 2. For Nginx setup
FROM nginx:alpine AS boot-nginx

# Copy config nginx
COPY --from=build /rze/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /rze/build .

# grab backend assets from a prior build stage
WORKDIR /backend

RUN apk add openjdk17

# Take the compiled Java files 
COPY --from=build-backend target/server-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build-backend src/main/resources src/main/resources

# link to our repo
LABEL org.opencontainers.image.source https://github.com/spe-uob/2022-RouteZeroCarbonSavings/

# For the following script we install bash
RUN apk update && apk add bash

COPY ./start start

RUN chmod 700 start

ENTRYPOINT ["./start"]
#            |  |  |
#            V  V  V
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
#ENTRYPOINT ["java", "-jar", "/app.jar"]

