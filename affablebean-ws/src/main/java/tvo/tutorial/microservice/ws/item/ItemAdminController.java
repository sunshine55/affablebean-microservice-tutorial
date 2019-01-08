package tvo.tutorial.microservice.ws.item;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/admin/item")
public class ItemAdminController {
    private ItemService itemService;

    @Autowired
    public void setItemService(ItemService itemService) {
        this.itemService = itemService;
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
