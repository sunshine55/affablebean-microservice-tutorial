package com.sunshine55.tutorial.afbb.api.controller;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sunshine55.tutorial.afbb.api.TestUtils;
import com.sunshine55.tutorial.afbb.api.dao.CategoryDAO;
import com.sunshine55.tutorial.afbb.api.model.Category;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {
    @Mock private CategoryDAO categoryDAO;

    @InjectMocks CategoryController categoryController;

    private List<Category> categories;

    @BeforeEach
    public void setup() throws IOException {
        String categoriesJson = IOUtils.toString(
            Objects.requireNonNull(this.getClass().getResourceAsStream("/categories.json")),
            StandardCharsets.UTF_8
        );
        categories = TestUtils.jsonMapper.readValue(
            categoriesJson,
            TestUtils.categoryListType
        );
    }

    @Test
    public void getAll() {
        when(categoryDAO.findAll()).thenReturn(Flux.fromIterable(categories));
        Flux<Category> result = categoryController.getAll();
        StepVerifier
            .create(result.map(Category::getName))
            .expectNext("dairy", "meat")
            .verifyComplete();
    }

    @Test
    public void save() {
        Category category = categories.get(0);
        when(categoryDAO.save(category)).thenReturn(Mono.just(category));
        Mono<Category> result = categoryController.save(category);
        StepVerifier.create(result).expectNext(category).verifyComplete();
    }

    @Test
    public void saveAll() {
        when(categoryDAO.saveAll(categories)).thenReturn(Flux.fromIterable(categories));
        Flux<Category> result = categoryController.saveAll(categories);
        StepVerifier.create(result).expectNext(categories.get(0), categories.get(1)).verifyComplete();
    } 
}
