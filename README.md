# Tutorial

Demonstrate microservice system with docker and docker-compose

Prerequisites: docker, maven

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

The instance is running on port 2601 (ui service) and port 2602 (RESTful api) but access via proxy instance port 2600

Using proxy localhost (ref.: affablebean-proxy's application.properties):
* User Interface: access via port 2600, `/ui` context; i.e.: http://localhost:2600/ui
* Admin Interface: access via port 2000 `/admin` context; i.e.: http://localhost:2600/admin
* RESTful api: access via port 2600, `/ws` context; i.e.: http://localhost:2600/ws/category/fetch

Set environment variables for development (Running with IDE or CLI):
* `spring.profiles.active` = `dev`
* `jwt.secret` = <256-bit-secret>