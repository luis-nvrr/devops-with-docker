FROM node:lts-alpine3.15

EXPOSE 5000

WORKDIR /home/node/app

COPY ./example-frontend/package* ./

RUN npm ci

COPY ./example-frontend .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/

RUN npm run build && npm install -g serve

CMD ["serve","-s","-l","5000","build"]
