# Tutorial

Demonstrate microservice system with Docker and Kubernetes

**Prerequisites**: maven, openjdk-11, docker, kubectl, multipass (ubuntu)

## Docker

Given working folder is project root `affablebean-microservice-tutorial`

```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd affablebean-microservice-tutorial/shop
mvn clean package

# (optional) building docker image
docker image build -t afbb/shop shop

# bring up mongo container for the first time
docker run --name afbb-mongodb -p 27017:27017 -d mongo:4.4.6
docker cp ./shop/src/test/resources/items.json afbb-mongodb:/tmp/items.json
docker exec afbb-mongodb mongoimport -d affablebean -c item --type json --file /tmp/items.json --jsonArray

# OR start if mongo container exists
docker start afbb-mongodb

mvn spring-boot:run
```

## Kubernetes

Given working folder is project root `affablebean-microservice-tutorial`
