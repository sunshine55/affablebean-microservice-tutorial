# AffableBean Shop Service

## Prerequisites

maven, openjdk-11, docker, kubectl

## MongoDB

```
cd affablebean-microservice-tutorial/shop

# bring up mongo container for the first time
docker run --name afbb-mongodb -p 27017:27017 -d mongo:4.4.6
docker cp ./src/test/resources/items.json afbb-mongodb:/tmp/items.json
docker exec afbb-mongodb mongoimport -d affablebean -c item --type json --file /tmp/items.json --jsonArray

# OR start if mongo container exists
docker start afbb-mongodb
```

## Build

```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd affablebean-microservice-tutorial/shop
mvn clean package

# (optional) building docker image
docker image build -t afbb/shop shop

mvn spring-boot:run
```