package com.sunshine55.tutorial.afbb.api.dao;

import com.sunshine55.tutorial.afbb.api.model.Category;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDAO extends ReactiveMongoRepository<Category, String> {
}
