package com.sunshine55.tutorial.afbb.api.service;

import com.sunshine55.tutorial.afbb.api.dao.CategoryDAO;
import com.sunshine55.tutorial.afbb.api.model.Category;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

@Service
public class CategoryService {
    private final CategoryDAO categoryDAO;

    public CategoryService(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    public Flux<Category> getAll() {
        return categoryDAO.findAll();
    }
}
