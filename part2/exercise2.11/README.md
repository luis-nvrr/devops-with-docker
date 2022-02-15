# Development environment

## Dockerfile

The dev environment uses one dev.Dockerfile for both the frontend and backend.
There, I've set up the node image with the dependencies from the package.json

## Docker Compose

The docker-compose.dev.yml specifies 4 services:
- App: the frontend app
- Server: the backend server
- Mongo: the database server
- Nginx: the reverse proxy server

### App

App specifies 2 volumes: the first one maps the entire frontend folder to be able to modify and see the changes. The node_modules volume allows to persist the node_modules folder from the container, so that it is not overwritten by an empty node_modules in the ./blogs-frontend folder.

### Server

Server, similarly to App, also specifies 2 volumes.

### Mongo

Mongo provides the database service.

### Nginx

Nginx is used as a reverse proxy, and allows requests to /api/ to be redirected to the server.
