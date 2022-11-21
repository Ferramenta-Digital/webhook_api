FROM node:16-alpine

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
