FROM node:16

WORKDIR /home/node

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --loglevel verbose

COPY . .

CMD ["npm", "run", "dev"]