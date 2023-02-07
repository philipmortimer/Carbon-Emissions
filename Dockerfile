# for source*, see https://github.com/docker/awesome-compose/blob/master/react-nginx/Dockerfile
# samples liscened under CC0 (creative commons) thus they are free to use comercially and otherwise without warrenty. 

FROM node:lts AS development

#RouteZeroEnterprise
WORKDIR /frontend

# COPY <repo-location> <container-location>

# copy react settings
COPY /frontend/route-zero-enterprise/package.json package.json
COPY /frontend/route-zero-enterprise/package-lock.json package-lock.json

RUN npm install 

COPY /frontend/route-zero-enterprise .

# https://stackoverflow.com/questions/55926939/node-in-docker-npm-test-and-exit
# tests run then exit
ENV CI=true
EXPOSE 3000 8080

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
FROM nginx:alpine

# Copy config nginx
COPY --from=build /frontend/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /frontend/build .

# Containers run nginx with global directives and daemon off
#######
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

#RUN echo "Server started and hosting on ${PORT}"


######### BACKEND #########

FROM maven:3-openjdk-17 as build-backend

WORKDIR /backend

COPY /backend/server/src src
COPY /backend/server/pom.xml .
# COPY /backend/server/.mvn .mvn

RUN mvn package

FROM openjdk:17
COPY --from=build-backend /backend/target/server-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build-backend /backend/src/main/resources src/main/resources


# ENTRYPOINT ["java", "-jar", "/app.jar"]

WORKDIR /scripts

COPY ./start .

RUN ["chmod", "700", "start"]

ENTRYPOINT ["/scripts/start"]


# os concepts for  