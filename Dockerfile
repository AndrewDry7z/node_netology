FROM node
WORKDIR /app
COPY ./src/package*.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY ./src ./
CMD ["yarn", "start"]
