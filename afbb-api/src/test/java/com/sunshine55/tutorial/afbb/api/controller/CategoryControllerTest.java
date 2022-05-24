package com.sunshine55.tutorial.afbb.api.controller;

import static org.mockito.Mockito.when;

import com.sunshine55.tutorial.afbb.api.model.Category;
import com.sunshine55.tutorial.afbb.api.service.CategoryService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {
    @Mock private CategoryService categoryService;

    @InjectMocks private CategoryController categoryController;

    @Test
    public void test_getAll() {
        Category c1 = new Category();
        Category c2 = new Category();
        Flux<Category> cFlux = Flux.just(c1, c2);
        when(categoryService.getAll()).thenReturn(cFlux);
        Flux<Category> actual = categoryController.getAll();
        StepVerifier.create(actual).expectNext(c1).expectNext(c2).verifyComplete();
    }
}
