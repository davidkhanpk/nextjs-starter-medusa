FROM node:20

WORKDIR /app

RUN corepack enable

COPY . .

RUN yarn install

# Prevent build-time API calls
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_7f41b345f0191e6f857d1f707ff179e6425dc35c6b33f9846c6abdcca208fd47

RUN yarn build

EXPOSE 8000
CMD ["yarn", "start"]