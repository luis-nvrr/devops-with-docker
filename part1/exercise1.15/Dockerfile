FROM node:lts-alpine3.15

EXPOSE 5000

WORKDIR /home/node/app

COPY ./frontend/package* ./

RUN npm ci

COPY ./frontend/ .

RUN npm run build && npm install -g serve

CMD ["serve","-s","-l","5000","build"]
