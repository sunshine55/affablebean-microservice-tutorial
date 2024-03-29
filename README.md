Table of Contents

- [Overview](#overview)
- [Services](#services)
- [Reference](#reference)
- [Local Development](#local-development)
  - [Issues](#issues)
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
* It's significantly slow if using Docker Desktop for Windows due to file processing between Windows host and Linux container guests, attempt to cache mounted volumes doesn't improve much (see [Stackoverflow topic](https://stackoverflow.com/questions/49060062/running-webpack-dev-server-in-docker-is-significantly-slower-than-on-local-machi)).
* Workaround: set up workspace in [VirtualBox VM](https://www.virtualbox.org/) with Linux distro (i.e.: [Ubuntu MATE](https://ubuntu-mate.org/)); then install Docker, VSCode...

# Local Development

Prerequisites: Docker, VSCode and Git

## Issues

| Issue                                                                        | Cause                                                                           | Workaround                                                                                                                                                                                                        |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Webpack dev server is significantly slow if using Docker Desktop for Windows | Because delay in file processing between Windows host and Linux container guest | 1. Attempt to cache mounted volumes doesn't improve much (see [Stackoverflow topic](https://stackoverflow.com/questions/49060062/running-webpack-dev-server-in-docker-is-significantly-slower-than-on-local-machi)).<br>2. Set up workspace in [VirtualBox VM](https://www.virtualbox.org/) with Linux distro (i.e.: [Ubuntu MATE](https://ubuntu-mate.org/)); then install Prerequisites |
Unable to start `mongo:latest` container in VirtualBox VM | MongoDB 5+ requires a Sandy Bridge or newer CPU [Stackoverflow topic](https://stackoverflow.com/questions/68392064/error-when-running-mongo-image-docker-entrypoint-sh-line-381) | 1. Get a newer processor<br>2. use an older version of MongoDB<br>3. Wait for MongoDB update the compatability


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