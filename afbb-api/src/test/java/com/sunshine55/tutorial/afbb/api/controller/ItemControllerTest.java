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
import com.sunshine55.tutorial.afbb.api.dao.ItemDAO;
import com.sunshine55.tutorial.afbb.api.model.Item;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@ExtendWith(MockitoExtension.class)
public class ItemControllerTest {
    @Mock private ItemDAO itemDAO;

    @InjectMocks ItemController itemController;

    private List<Item> items;

    @BeforeEach
    public void setup() throws IOException {
        String itemsJson = IOUtils.toString(
            Objects.requireNonNull(this.getClass().getResourceAsStream("/items.json")),
            StandardCharsets.UTF_8
        );
        items = TestUtils.jsonMapper.readValue(
            itemsJson,
            TestUtils.itemListType
        );
    }

    @Test
    public void getByCategoryId() {
        when(itemDAO.findByCategory_Id("64a0f8e1e61f5e5164e88bb5"))
            .thenReturn(Flux.just(items.get(0), items.get(1)));
        Flux<Item> result = itemController.getByCategoryId("64a0f8e1e61f5e5164e88bb5");
        StepVerifier
            .create(result.map(Item::getName))
            .expectNext("milk", "cheese")
            .verifyComplete();
    }

    @Test
    public void save() {
        Item item = items.get(0);
        when(itemDAO.save(item)).thenReturn(Mono.just(item));
        Mono<Item> result = itemController.save(item);
        StepVerifier.create(result).expectNext(item).verifyComplete();
    }

    @Test
    public void saveAll() {
        when(itemDAO.saveAll(items)).thenReturn(Flux.fromIterable(items));
        Flux<Item> result = itemController.saveAll(items);
        StepVerifier
            .create(result.map(Item::getName))
            .expectNext("milk", "cheese", "patties", "ham")
            .verifyComplete();
    } 
}
