package com.sunshine55.tutorial.afbb.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunshine55.tutorial.afbb.api.dao.ItemDAO;
import com.sunshine55.tutorial.afbb.api.model.Item;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemDAO itemDAO;

    @GetMapping("/getByCategoryId")
    public Flux<Item> getByCategoryId(@RequestParam String categoryId) {
        return itemDAO.findByCategory_Id(categoryId);
    }

    @PostMapping("/save")
    public Mono<Item> save(@RequestBody Item item) {
        return itemDAO.save(item);
    }

    @PostMapping("/saveAll")
    public Flux<Item> saveAll(@RequestBody List<Item> items) {
        return itemDAO.saveAll(items);
    }
}
