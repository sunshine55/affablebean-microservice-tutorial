package tvo.tutorial.microservice.affablebean.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
        List<Category> result = new ArrayList<>();
        categories.forEach(category -> result.add(categoryService.upsert(category)));
        return result;
    }
}
