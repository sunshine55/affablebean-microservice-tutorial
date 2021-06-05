package tvo.tutorial.microservice.afbb.shop.service;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;
import tvo.tutorial.microservice.afbb.shop.dao.CategoryDAO;
import tvo.tutorial.microservice.afbb.shop.model.Category;
import tvo.tutorial.microservice.afbb.shop.model.Item;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock private CategoryDAO categoryDAO;

    @InjectMocks private CategoryService categoryService;

    @Test
    public void fetch() {
        List<Item> items = new ArrayList<>();
        Item item = new Item();
        item.setName("testItem");
        item.setPrice(10);
        items.add(item);
        List<Category> categories = new ArrayList<>();
        Category category = new Category();
        category.setName("testCategory");
        category.setItems(items);
        categories.add(category);
        Mockito.when(categoryDAO.findAll()).thenReturn(Flux.fromIterable(categories));
        Flux<Category> actual = categoryService.fetch();
        StepVerifier.create(actual).expectNext(category).expectComplete().verify();
    }
}
