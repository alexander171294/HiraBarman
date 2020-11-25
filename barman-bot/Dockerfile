
FROM node:10-alpine
WORKDIR /app
COPY ./package.json ./
COPY . .
RUN npm install
EXPOSE 8181
CMD ["npm", "run", "start:prod"]