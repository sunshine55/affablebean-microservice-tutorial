package tvo.tutorial.microservice.affablebean.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    private ItemService itemService;

    @Autowired
    public void setItemService(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/fetch")
    public List<Item> fetch(@RequestParam("categoryId") String categoryId) {
        return itemService.fetch(categoryId);
    }

    @PostMapping("/upsert")
    public String upsert(@RequestBody Item item) {
        return itemService.upsert(item);
    }

    @PostMapping("/bulkUpsert")
    public List<String> bulkUpsert(@RequestBody List<Item> items) {
        List<String> ids = new ArrayList<>();
        items.forEach(item -> ids.add(itemService.upsert(item)));
        return ids;
    }
}
