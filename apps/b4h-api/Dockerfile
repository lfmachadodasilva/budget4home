## build
FROM node:22 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /app
COPY . /app
RUN yarn install --frozen-lockfile
RUN npx nx build b4h-api --prod

## deploy
FROM node:22-slim
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app

RUN yarn install --frozen-lockfile --production

COPY --chown=node:node --from=build /app/apps/b4h-api/dist /app/apps/b4h-api/dist
COPY --chown=node:node node_modules /app/node_modules

CMD ["dumb-init", "node", "/app/apps/b4h-api/dist/main.js"]
