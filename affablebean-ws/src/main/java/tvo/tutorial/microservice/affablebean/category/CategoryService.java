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

    public String upsert(Category category) {
        categoryRepository.save(category);
        return category.getId();
    }
}
