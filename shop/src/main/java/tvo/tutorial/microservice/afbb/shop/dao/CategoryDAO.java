package tvo.tutorial.microservice.afbb.shop.dao;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import tvo.tutorial.microservice.afbb.shop.model.Category;

@Repository
public interface CategoryDAO extends ReactiveMongoRepository<Category, String> {
}
