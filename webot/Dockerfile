### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY webot/. .
RUN npm run buildprod

### STAGE 2: Run ###
FROM nginx
COPY --from=build /usr/src/app/dist/webot /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
