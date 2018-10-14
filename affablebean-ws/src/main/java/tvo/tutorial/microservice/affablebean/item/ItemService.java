package tvo.tutorial.microservice.affablebean.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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

    public Item upsert(Item item, String categoryId) {
        if (StringUtils.isEmpty(item.getId())) {
            item.setId(null);
        }
        item.setCategoryId(categoryId);
        itemRepository.save(item);
        return item;
    }

    public void delete(Item item) {
        itemRepository.delete(item);
    }
}
