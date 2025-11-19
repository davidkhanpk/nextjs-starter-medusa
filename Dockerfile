FROM node:20

WORKDIR /app

RUN corepack enable

COPY . .

RUN yarn install

# No build-time env vars - will be provided at runtime
RUN yarn build

EXPOSE 8000
CMD ["yarn", "start"]