package tvo.tutorial.microservice.afbb.shop.service;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import tvo.tutorial.microservice.afbb.shop.dao.ItemDAO;
import tvo.tutorial.microservice.afbb.shop.model.Item;

@Service
public class ItemService {
    private final ItemDAO itemDAO;

    public ItemService(ItemDAO itemDAO) {
        this.itemDAO = itemDAO;
    }

    public Flux<Item> getAllItems() {
        return itemDAO.findAll();
    }

    public Flux<Item> getItemsInCategory(String category) {
        return itemDAO.findByCategory(category);
    }

    public Flux<Item> getItemsInEnergyRange(Integer from, Integer to) {
        return itemDAO
            .findAll()
            .filter(i -> {
                Integer energy = i.getEnergy();
                return energy >= from && energy <= to;
            });
    }
}
