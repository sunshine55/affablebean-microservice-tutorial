Table of Contents

- [Overview](#overview)
- [Services](#services)
- [Reference](#reference)
- [Local Development](#local-development)
  - [Create the Swarm](#create-the-swarm)
  - [Bring up the API](#bring-up-the-api)
  - [Bring up the GUI](#bring-up-the-gui)
  - [Bring up the CDN server](#bring-up-the-cdn-server)

# Overview

Breakdown [affablebean-spring-tutorial](https://github.com/sunshine55/affablebean-spring-tutorial) app into microservices and containerize them.

Each microservice has diffrent a tech stack.

Docker compose in this tutorial only works for localhost development only. In order to demo on cloud:
* afbb-api: pom changes to automate cloud deployment
* afbb-db: media files should be served on CDN, at localhost development it should be mounted as part of `afbb-proxy`
* afbb-gui: env changes to adapt cloud deployment
* afbb-proxy: not recommended for cloud deployment, use at localhost development as static content service

# Services

* afbb-api: web service
* afbb-db: mongo db scripts, media contents
* afbb-gui: PWA React apps
  - admin (work in progress): manage products
  - [store](./afbb-gui/store-pwa/README.md): displays products
* afbb-proxy: serve static contents for other services

# Reference

Develop microservices with VSCode:
* Shared development environment with [VSCode devcontainer](https://code.visualstudio.com/docs/remote/create-dev-container)
* Connect multiple [VSCode devcontainers with Docker Compose](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)

# Local Development

Prerequisites: Docker, VSCode and Git

## Create the Swarm

Bring up all containers `docker compose up -d`

There are 3 containers orderly created: "afbb-db", "afbb-api" and "afbb-gui" which share the docker-compose network

## Bring up the API

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-api" folder
2. Wait for container window loading completed, all extensions should be installed (the extension IDs are defined in `.devcontainer.json`)
3. Select "Spring Boot Dashboard" and Run/Debug service
4. At local host, use browser or any HTTP client tool to test APIs, i.e.: `http://localhost:8080/category/getAll`

Run with CLI command: `mvn spring-boot:run`

## Bring up the GUI

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-gui" folder
2. Wait for container window loading completed, all extensions should be installed (the extension IDs are defined in `.devcontainer.json`)
3. Go to terminal of the container window: `cd store-pwa` then `npm run dev`
4. Open browser on the host: `http://localhost:3000/index.html`

Run in production mode: `npm run build`

## Bring up the CDN server

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-proxy" folder
2. `docker compose exec -it proxy nginx -s reload` to apply nginx changes