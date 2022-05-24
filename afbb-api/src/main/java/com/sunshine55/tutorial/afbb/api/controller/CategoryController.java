package com.sunshine55.tutorial.afbb.api.controller;

import com.sunshine55.tutorial.afbb.api.model.Category;
import com.sunshine55.tutorial.afbb.api.service.CategoryService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    public Flux<Category> getAll() {
        return categoryService.getAll();
    }
}
