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

Build to run locally (given working folder is project root `affablebean-microservice-tutorial`)
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

Populate data (given working folder is project root `affablebean-microservice-tutorial`):
```
docker start afbb-mongodb
docker cp ./shop/src/test/resources/items.json afbb-mongodb:/tmp/items.json
docker exec afbb-mongodb mongoimport -d affablebean -c item --type json --file /tmp/items.json --jsonArray
```