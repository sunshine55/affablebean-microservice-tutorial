package tvo.tutorial.microservice.affablebean.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private ItemRepository itemRepository;

    @Autowired
    public void setItemRepository(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> fetch(String categoryId) {
        return itemRepository.findByCategoryId(categoryId);
    }

    public String upsert(Item item) {
        itemRepository.save(item);
        return item.getId();
    }
}
