# Tutorial

Demonstrate microservice system with docker and docker-compose

Prerequisites: docker and docker-compose were installed

## Docker

If using docker-compose then skip these steps and refer to __Docker Compose__ section

#### Compile
```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd microservice-tutorial
mvn clean install
```

#### Build
Build to run locally
```
docker build -t affablebean-ws:latest affablebean-ws
```

Build to push to docker hub
```
docker build -t <DOCKER_HUB_ID>/affablebean-ws affablebean-ws
```

#### Run
Verify images: `docker images` (supposed images are built to run locally)

Run containers from the images at localhost:
```
docker network create ms_tutorial
docker run --name mongo_container -p 27017:27017 --network ms_tutorial -d mongo:4.0.1
docker run --name ws_container -p 2604:2604 --network ms_tutorial -d affablebean-ws:latest
```

## Docker Compose

Create network: `docker network create ms_tutorial`

Start up Docker Compose: `docker-compose up -d`