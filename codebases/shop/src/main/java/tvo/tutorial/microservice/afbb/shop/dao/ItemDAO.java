package tvo.tutorial.microservice.afbb.shop.dao;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import tvo.tutorial.microservice.afbb.shop.model.Item;

@Repository
public interface ItemDAO extends ReactiveMongoRepository<Item, String> {

    Flux<Item> findByCategory(String category);
}
