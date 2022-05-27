Table of Contents

- [Overview](#overview)
- [Services](#services)
- [Reference](#reference)
- [Local Development](#local-development)

# Overview

Breakdown [affablebean-spring-tutorial](https://github.com/sunshine55/affablebean-spring-tutorial) app into microservices and containerize them.

Each microservice has diffrent a tech stack.

# Services

* afbb-api
* afbb-db
* afbb-ui

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