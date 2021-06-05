package tvo.tutorial.microservice.afbb.shop.service;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import tvo.tutorial.microservice.afbb.shop.dao.CategoryDAO;
import tvo.tutorial.microservice.afbb.shop.model.Category;

@Service
public class CategoryService {
    private CategoryDAO categoryDAO;

    public CategoryService(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }
    
    public Flux<Category> fetch() {
        return categoryDAO.findAll();
    }
}
