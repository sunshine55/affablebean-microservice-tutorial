# Tutorial

Demonstrate microservice system with docker and docker-compose

Prerequisites: docker, maven, openjdk-11

## Docker

#### Compile
```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd affablebean-microservice-tutorial/shop
mvn clean package
```

#### Build

Build to run locally (given current folder is working root `affablebean-microservice-tutorial`)
```
docker build -t afbb/shop shop
```

#### Run

Verify images: `docker images` (given images are built to run locally)

Run containers from the images at localhost:
```
docker network create afbb_ms_tut
docker run --name afbb-mongodb -p 27017:27017 --network afbb_ms_tut -d mongo:latest
docker run --name afbb-shop -p 2600:2600 --network afbb_ms_tut -d afbb/shop:latest
```

## Usage
