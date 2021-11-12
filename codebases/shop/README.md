# AffableBean Shop Service

## Prerequisites

maven, openjdk-11, docker, kubectl

## Build

```
git clone https://github.com/sunshine55/affablebean-microservice-tutorial.git
cd affablebean-microservice-tutorial/shop
mvn clean package

# (optional) building docker image
docker image build -t afbb/shop shop

mvn spring-boot:run
```