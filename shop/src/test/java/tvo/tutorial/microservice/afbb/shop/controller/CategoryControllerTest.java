package tvo.tutorial.microservice.afbb.shop.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;
import tvo.tutorial.microservice.afbb.shop.model.Category;
import tvo.tutorial.microservice.afbb.shop.service.CategoryService;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {
    @Mock private CategoryService categoryService;
    
    @InjectMocks private CatetoryController catetoryController;

    @Test
    public void fetch() {
        Category category = new Category();
        Mockito.when(categoryService.fetch()).thenReturn(Flux.just(category));
        Flux<Category> actual = catetoryController.fetch();
        StepVerifier.create(actual).expectNext(category).expectComplete().verify();
    }
}
