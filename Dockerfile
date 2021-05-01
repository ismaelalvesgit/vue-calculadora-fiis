## @Author Ismael alves
## @LastUpdate 30/04/2021

# Phase 1 - Responsible in building the application
FROM node:latest as node
WORKDIR /app
COPY package.json /app/
RUN npm i
COPY ./ /app/
RUN npm run build

# Phase 2 - Responsible for exposing the application
FROM nginx:alpine
LABEL maintainer="Ismael Alves <cearaismael1997@gmail.com>"
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=60s --timeout=20s CMD curl --fail http://localhost || exit 1
COPY --from=node /app/dist/ /usr/share/nginx/html