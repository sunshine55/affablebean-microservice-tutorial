package tvo.tutorial.microservice.afbb.shop.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;
import tvo.tutorial.microservice.afbb.shop.TestUtils;
import tvo.tutorial.microservice.afbb.shop.dao.ItemDAO;
import tvo.tutorial.microservice.afbb.shop.model.Item;

@ExtendWith(MockitoExtension.class)
public class ItemServiceTest {
    @Mock private ItemDAO itemDAO;
    
    @InjectMocks private ItemService itemService;

    private List<Item> items;

    @BeforeEach
    public void setup() throws IOException {
        String data = IOUtils.toString(
            this.getClass().getResourceAsStream("/items.json"),
            "UTF-8"
        );
        items = TestUtils.jsonMapper.readValue(data, TestUtils.itemListType);
    }

    @Test
    public void getAllItems() {
        Mockito.when(itemDAO.findAll()).thenReturn(Flux.fromIterable(items));
        Flux<Item> actual = itemService.getAllItems();
        StepVerifier.create(actual).expectNextCount(16).expectComplete().verify();
    }

    @Test
    public void getItemsInCategory() {
        List<Item> subItems = items
            .stream()
            .filter(i -> "fruit".equals(i.getCategory()))
            .collect(Collectors.toList());
        Mockito.when(itemDAO.findByCategory("fruit")).thenReturn(Flux.fromIterable(subItems));
        Flux<String> actual = itemService
            .getItemsInCategory("fruit")
            .map(i -> i.getName());
        StepVerifier
            .create(actual)
            .expectNext("apple", "banana", "cantaloupe", "dragonfruit")
            .expectComplete()
            .verify();
    }

    @Test
    public void getItemsInEnergyRange() {
        Mockito.when(itemDAO.findAll()).thenReturn(Flux.fromIterable(items));
        Flux<String> actual = itemService
            .getItemsInEnergyRange(10, 15)
            .map(i -> i.getName());
        StepVerifier
            .create(actual)
            .expectNext("apple", "banana", "chips")
            .expectComplete()
            .verify();
    }
}
