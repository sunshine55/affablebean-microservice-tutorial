# MongoDB Setup

## Startup

```
# bring up mongo container for the first time
docker run --name afbb-mongodb -p 27017:27017 -d mongo:4.4.6
docker cp ./items.json afbb-mongodb:/tmp/items.json
docker exec afbb-mongodb mongoimport -d affablebean -c item --type json --file /tmp/items.json --jsonArray

# OR start if mongo container exists
docker start afbb-mongodb
```

## TODOs

Setup cluster for MongoDB