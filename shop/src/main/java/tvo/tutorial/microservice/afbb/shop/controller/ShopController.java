package tvo.tutorial.microservice.afbb.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import tvo.tutorial.microservice.afbb.shop.model.Item;
import tvo.tutorial.microservice.afbb.shop.service.ItemService;

@RestController
public class ShopController {
    private final ItemService itemService;

    public ShopController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/getAllItems")
    public Flux<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/getItemsInCategory/{category}")
    public Flux<Item> getItemsInCategory(@PathVariable String category) {
        return itemService.getItemsInCategory(category);
    }

    @GetMapping("/getItemsInEnergyRange")
    public Flux<Item> getItemsInEnergyRange(
        @RequestParam Integer from,
        @RequestParam Integer to
    ) {
        return itemService.getItemsInEnergyRange(from, to);
    }
}
