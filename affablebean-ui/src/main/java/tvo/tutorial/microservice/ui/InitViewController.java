package tvo.tutorial.microservice.ui;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/store")
public class InitViewController {

    @GetMapping("/category")
    public String viewCategory(ModelMap modelMap) {
        modelMap.addAttribute("title", "Category");
        return "category.html";
    }
}
