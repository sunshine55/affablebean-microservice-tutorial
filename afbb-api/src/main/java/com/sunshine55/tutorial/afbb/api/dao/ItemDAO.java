package com.sunshine55.tutorial.afbb.api.dao;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.sunshine55.tutorial.afbb.api.model.Item;

import reactor.core.publisher.Flux;


public interface ItemDAO extends ReactiveMongoRepository<Item, String> {

    Flux<Item> findByCategory_Id(String category_Id);
}
