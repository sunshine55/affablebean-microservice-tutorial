package tvo.tutorial.microservice.afbb.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import tvo.tutorial.microservice.afbb.shop.model.Category;
import tvo.tutorial.microservice.afbb.shop.service.CategoryService;

@RestController
public class CatetoryController {
    private CategoryService categoryService;

    public CatetoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    @GetMapping("/fetch")
    public Flux<Category> fetch() {
        return categoryService.fetch();
    }
}
