package tvo.tutorial.microservice.afbb.shop.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;
import tvo.tutorial.microservice.afbb.shop.model.Item;
import tvo.tutorial.microservice.afbb.shop.service.ItemService;

@ExtendWith(MockitoExtension.class)
public class ShopControllerTest {
    @Mock private ItemService itemService;
    
    @InjectMocks private ShopController shopController;

    private Item item;

    @BeforeEach
    public void setup() {
        item = new Item();
        item.setName("testName");
        item.setCategory("testCategory");
    }

    @Test
    public void getAllItems() {
        Mockito.when(itemService.getAllItems()).thenReturn(Flux.just(item));
        Flux<Item> actual = shopController.getAllItems();
        StepVerifier.create(actual).expectNext(item).expectComplete().verify();
    }

    @Test
    public void getItemsInCategory() {
        Mockito.when(itemService.getItemsInCategory("testCategory")).thenReturn(Flux.just(item));
        Flux<Item> actual = shopController.getItemsInCategory("testCategory");
        StepVerifier.create(actual).expectNext(item).expectComplete().verify();
    }

    @Test
    public void getItemsInEnergyRange() {
        Mockito.when(itemService.getItemsInEnergyRange(0, 1)).thenReturn(Flux.just(item));
        Flux<Item> actual = shopController.getItemsInEnergyRange(0, 1);
        StepVerifier.create(actual).expectNext(item).expectComplete().verify();
    }
}
