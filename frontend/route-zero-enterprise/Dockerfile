# for source*, see https://github.com/docker/awesome-compose/blob/master/react-nginx/Dockerfile
# samples liscened under CC0 (creative commons) thus they are free to use comercially and otherwise without warrenty. 

FROM node:lts AS development

#RouteZeroEnterprise
WORKDIR /rze

# COPY <repo-location> <container-location>

# copy react settings
COPY package.json /rze/package.json
COPY package-lock.json /rze/package-lock.json

RUN npm install 

COPY . /rze

# https://stackoverflow.com/questions/55926939/node-in-docker-npm-test-and-exit
# tests run then exit
ENV CI=true
ENV PORT=3000

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
COPY --from=build /rze/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /rze/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
