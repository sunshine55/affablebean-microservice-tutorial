# Tutorial

Demonstrate microservice system with docker and docker-compose

Prerequisites: docker, docker-compose, maven, node and npm were installed

## Docker

If using docker-compose then skip these steps and refer to __Docker Compose__ section

#### Compile
```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd affablebean-microservice-tutorial/affablebean-ui
npm run prod
cd ../affablebean-admin
npm run prod
cd ..
mvn clean package
```

#### Build

Build to run locally
```
docker build -t affablebean-proxy:latest affablebean-proxy
docker build -t affablebean-ws:latest affablebean-ws
docker build -t affablebean-ui:latest affablebean-ui
docker build -t affablebean-admin:latest affablebean-admin
```

Build to push to docker hub
```
docker build -t <DOCKER_HUB_ID>/affablebean-proxy affablebean-proxy
docker build -t <DOCKER_HUB_ID>/affablebean-ws affablebean-ws
docker build -t <DOCKER_HUB_ID>/affablebean-ui affablebean-ui
docker build -t <DOCKER_HUB_ID>/affablebean-admin affalbebean-admin
```

#### Run

Verify images: `docker images` (supposed images are built to run locally)

Run containers from the images at localhost:
```
docker network create ms_tutorial
docker run --name mongo_container -p 27017:27017 --network ms_tutorial -d mongo:4.0.1
docker run --name proxy_container -p 2600:2600 --network ms_tutorial -d affablebean-proxy:latest
docker run --name ws_container -p 2602:2601 --network ms_tutorial -d affablebean-ws:latest
docker run --name ui_container -p 2601:2602 --network ms_tutorial -d affablebean-ui:latest
docker run --name admin_container -p 2601:2603 --network ms_tutorial -d affablebean-admin:latest
```

## Docker Compose

Create network: `docker network create ms_tutorial`

Start up Docker Compose: `docker-compose up -d`

## Usage

The instance is running on port 2601 (ui service) and port 2602 (RESTful api) but access via proxy instance port 2600

Using proxy localhost (ref.: affablebean-proxy's application.properties):
* User Interface: access via port 2600, `/ui` context; i.e.: http://localhost:2600/ui
* Admin Interface: access via port 2000 `/admin` context; i.e.: http://localhost:2600/admin
* RESTful api: access via port 2600, `/ws` context; i.e.: http://localhost:2600/ws/category/fetch

Set environment variables for development (Running with IDE or CLI):
* `spring.profiles.active` = `dev`
* `jwt.secret` = <256-bit-secret>