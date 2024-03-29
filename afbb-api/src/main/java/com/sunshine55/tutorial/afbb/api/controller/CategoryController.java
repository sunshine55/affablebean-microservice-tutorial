package com.sunshine55.tutorial.afbb.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunshine55.tutorial.afbb.api.dao.CategoryDAO;
import com.sunshine55.tutorial.afbb.api.model.Category;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryDAO categoryDAO;
    
    @GetMapping("/getAll")
    public Flux<Category> getAll() {
        return categoryDAO.findAll();
    }

    @PostMapping("/save")
    public Mono<Category> save(@RequestBody Category category) {
        return categoryDAO.save(category);
    }

    @PostMapping("/saveAll")
    public Flux<Category> saveAll(@RequestBody List<Category> categories) {
        return categoryDAO.saveAll(categories);
    }
}
