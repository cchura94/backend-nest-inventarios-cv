FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

CMD [ "node", "dist/src/main.js" ]

