FROM node:14-alpine

ARG CACHEBUST=1

ARG INTERNAL_PACKAGES_GITLAB

RUN mkdir -p /home/node/project/dist && chown -R node:node /home/node/project

WORKDIR /home/node/project

COPY package*.json ./

USER node

RUN npm install --no-update-package-lock --clean-node-modules

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "server"]
