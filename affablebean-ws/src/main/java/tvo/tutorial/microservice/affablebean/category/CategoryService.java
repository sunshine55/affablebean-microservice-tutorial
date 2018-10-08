package tvo.tutorial.microservice.affablebean.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public void setCategoryRepository(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> fetch() {
        return categoryRepository.findAll();
    }

    /**
     * impure function to update or insert
     * @param category updates if category.id exists; insert if category.id is not found or blank
     * @return category with id assigned (insert) and updated fields (update)
     */
    public Category upsert(Category category) {
        if (StringUtils.isEmpty(category.getId())) {
            category.setId(null);
        }
        categoryRepository.save(category);
        return category;
    }

    public void delete(Category category) {
        categoryRepository.delete(category);
    }
}
