Table of Contents

- [Overview](#overview)
- [Services](#services)
- [Reference](#reference)
- [Local Development](#local-development)
  - [Create the Swarm](#create-the-swarm)
  - [Bring up the API](#bring-up-the-api)
  - [Bring up the GUIs](#bring-up-the-guis)
    - [Front Store](#front-store)
    - [Admin Page](#admin-page)
  - [Bring up the CDN server](#bring-up-the-cdn-server)

# Overview

Breakdown [affablebean-spring-tutorial](https://github.com/sunshine55/affablebean-spring-tutorial) app into microservices and containerize them.

Each microservice has diffrent a tech stack.

Docker compose in this tutorial only works for localhost development only. In order to demo on cloud:
* afbb-api: pom changes to automate cloud deployment
* afbb-db: media files should be served on CDN, at localhost development it should be mounted as part of `afbb-cdn`
* afbb-gui: env changes to adapt cloud deployment
* afbb-cdn: not recommended for cloud deployment, use at localhost development as static content service

# Services

* afbb-api: web service
* afbb-db: mongo db scripts, media contents
* afbb-gui: PWA React apps
  - admin (work in progress): manage products
  - [store](./afbb-gui/store-pwa/README.md): displays products
* afbb-cdn: serve static contents for other services

# Reference

Develop microservices with VSCode:
* Shared development environment with [VSCode devcontainer](https://code.visualstudio.com/docs/remote/create-dev-container)
* Connect multiple [VSCode devcontainers with Docker Compose](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)

# Local Development

Prerequisites: Docker, VSCode and Git

## Create the Swarm

Bring up all containers:
* First time startup: `docker compose up -d` (create/recreate containers, which will download/reinstall vscode extensions for each container; hence, take a while)
* Next times: `docker compose start`

There are 3 containers orderly created: "afbb-db", "afbb-api" and "afbb-gui" which share the docker-compose network

## Bring up the API

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-api" folder
2. Wait for container window loading completed, all extensions should be installed (the extension IDs are defined in `.devcontainer.json`)
3. Select "Spring Boot Dashboard" and Run/Debug service
4. At local host, use browser or any HTTP client tool to test APIs, i.e.: `http://localhost:8080/category/getAll`

Run with CLI command: `mvn spring-boot:run`

## Bring up the GUIs

### Front Store

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-gui-store" folder
2. Wait for container window loading completed, all extensions should be installed (the extension IDs are defined in `.devcontainer.json`)
3. Go to terminal of the container window: `npm run dev`
4. Open browser on the host: `http://localhost:3001/index.html`

Run in production mode: `npm run build`

### Admin Page

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-gui-admin" folder
2. Wait for container window loading completed, all extensions should be installed (the extension IDs are defined in `.devcontainer.json`)
3. Go to terminal of the container window: `npm run dev`
4. Open browser on the host: `http://localhost:3000/index.html`

Run in production mode: `npm run build`

## Bring up the CDN server

1. `Ctrl+Shift+N` > `Ctrl+Shift+P` > "Dev Containers: Open Folder in Container..." > select path to "afbb-cdn" folder
2. Wait for container window loading completed, all extensions should be installed (the extension IDs are defined in `.devcontainer.json`)
3. `docker compose exec -it cdn nginx -s reload` or `nginx -s reload` (if inside container) to reload nginx when making changes
4. Open browser on the host to check a sample static content, i.e.: `http://localhost:8000/media/categories/bakery.jpg`