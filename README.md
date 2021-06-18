# Tutorial

Demonstrate microservice system with Docker and Kubernetes

**Prerequisites**: docker, maven, openjdk-11, minikube, kubectl

## Docker

Given working folder is project root `affablebean-microservice-tutorial`

### Compile
```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd affablebean-microservice-tutorial/shop
mvn clean package
```

**Note**: run project without building docker image (given mongodb image was downloaded)
```
docker start afbb-mongodb
mvn spring-boot:run
```

### Build

```
docker image build -t afbb/shop shop
```

### Run

Verify images: `docker image ls` (given images are built to run locally)

Run containers from the images at localhost:
```
docker network create afbb_ms_tut
docker run --name afbb-mongodb -p 27017:27017 --network afbb_ms_tut -d mongo:4.4.6
docker run --name afbb-shop -p 2600:2600 --network afbb_ms_tut -e SPRING_PROFILE=docker -d afbb/shop
```

### Data Seeding

```
docker start afbb-mongodb
docker cp ./shop/src/test/resources/items.json afbb-mongodb:/tmp/items.json
docker exec afbb-mongodb mongoimport -d affablebean -c item --type json --file /tmp/items.json --jsonArray
```

## Kubernetes

Given working folder is project root `affablebean-microservice-tutorial`

### Run

```
minikube start
kubectl apply -f ./mongodb/k8s.yml
```

**Note**: check for pods ready and running

```
kubectl get pod
kubectl get pod --watch
kubectl get service
kubectl get all
```

### Data Seeding

```
kubectl cp ./shop/src/test/resources/items.json afbb-mongodb-deployment-<pod_id>:/tmp/items.json
kubectl exec afbb-mongodb-deployment-<pod_id> -- mongoimport -d affablebean -c item --type json --file /tmp/items.json --jsonArray
```