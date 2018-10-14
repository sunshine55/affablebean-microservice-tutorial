package tvo.tutorial.microservice.ws.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private CategoryService categoryService;

    @Autowired
    public void setCategoryService(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/fetch")
    public List<Category> fetch() {
        return categoryService.fetch();
    }

    @PostMapping("/bulkUpsert")
    public List<Category> bulkUpsert(@RequestBody List<Category> categories) {
        Set<String> result = new HashSet<>();
        categories.forEach(category -> result.add(categoryService.upsert(category).getId()));
        return result.isEmpty() ? Collections.emptyList() : categoryService.fetch();
    }

    @PostMapping("/bulkDelete")
    public List<Category> bulkDelete(@RequestBody List<Category> categories) {
        categories.forEach(category -> categoryService.delete(category));
        return categoryService.fetch();
    }
}
