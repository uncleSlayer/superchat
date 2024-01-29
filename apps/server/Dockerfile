FROM node:21

WORKDIR /app

COPY . .

RUN corepack enable

RUN pnpm i

RUN pnpm build

CMD [ "pnpm", "start" ]