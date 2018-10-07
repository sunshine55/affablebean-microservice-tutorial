package tvo.tutorial.microservice.affablebean.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        categoryRepository.save(category);
        return category;
    }
}
