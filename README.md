Table of Contents

- [Overview](#overview)
- [Services](#services)
- [Reference](#reference)
- [Local Development](#local-development)

# Overview

Breakdown [affablebean-spring-tutorial](https://github.com/sunshine55/affablebean-spring-tutorial) app into microservices and containerize them.

Each microservice has diffrent a tech stack.

Docker compose in this tutorial only works for localhost development only. In order to demo on cloud:
* afbb-api: pom changes to automate cloud deployment
* afbb-db: media files should be served on CDN
* afbb-gui: env changes to adapt cloud deployment
* afbb-proxy: not recommended for cloud deployment

# Services

* afbb-api: web service
* afbb-db: mongo db, media contents
* afbb-gui: PWA React apps
  - [store](./afbb-gui/store-pwa/README.md): displays products
  - admin (work in progress): manage products
* afbb-proxy: reverse proxy for api and serve static contents built by gui

# Reference

Develop microservices with VSCode:
* Shared development environment with [VSCode devcontainer](https://code.visualstudio.com/docs/remote/create-dev-container)
* Connect multiple [VSCode devcontainers with Docker Compose](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)

# Local Development

Prerequisites: Docker, VSCode and Git
* If `docker compose up -d` first > VSCode: open folder in container > afbb-api
* If using VSCode: open folder in container > afbb-api > this will start all services.
* If using Docker Desktop > Dev environments > clone from this repository and open in VSCode

Tips:
* `Ctrl+Shift+N` to open new window then open folder in container
* `docker compose exec -it proxy nginx -s reload` to apply nginx changes