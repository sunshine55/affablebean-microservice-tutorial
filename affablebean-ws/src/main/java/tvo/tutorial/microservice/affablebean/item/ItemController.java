package tvo.tutorial.microservice.affablebean.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/item")
public class ItemController {
    private ItemService itemService;

    @Autowired
    public void setItemService(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/fetch/{categoryId}")
    public List<Item> fetch(@PathVariable String categoryId) {
        return itemService.fetch(categoryId);
    }

    @PostMapping("/bulkUpsert/{categoryId}")
    public List<Item> bulkUpsert(@PathVariable String categoryId, @RequestBody List<Item> items) {
        Set<String> result = new HashSet<>();
        items.forEach(item -> result.add(itemService.upsert(item, categoryId).getId()));
        return result.isEmpty() ? Collections.emptyList() : itemService.fetch(categoryId);
    }

    @PostMapping("/bulkDelete/{categoryId}")
    public List<Item> bulkDelete(@PathVariable String categoryId, @RequestBody List<Item> items) {
        items.forEach(item -> itemService.delete(item));
        return itemService.fetch(categoryId);
    }
}
