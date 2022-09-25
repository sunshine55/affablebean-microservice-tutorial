package com.sunshine55.tutorial.afbb.api.service;

import static org.mockito.Mockito.when;

import com.sunshine55.tutorial.afbb.api.dao.CategoryDAO;
import com.sunshine55.tutorial.afbb.api.model.Category;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock private CategoryDAO categoryDAO;

    @InjectMocks private CategoryService categoryService;

    @Test
    public void test_getAll() {
        Category c1 = new Category();
        Category c2 = new Category();
        Flux<Category> cFlux = Flux.just(c1, c2);
        when(categoryDAO.findAll()).thenReturn(cFlux);
        Flux<Category> actual = categoryService.getAll();
        StepVerifier.create(actual).expectNext(c1, c2).verifyComplete();
    }
}
