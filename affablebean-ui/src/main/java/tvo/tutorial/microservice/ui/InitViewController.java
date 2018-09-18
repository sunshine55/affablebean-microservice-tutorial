package tvo.tutorial.microservice.ui;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InitViewController {

    @GetMapping("/")
    public String viewHome() {
        return "redirect:/category";
    }

    @GetMapping("/category")
    public String viewCategory(ModelMap modelMap) {
        modelMap.addAttribute("title", "Category");
        modelMap.addAttribute("jsIndex", "category.bundle.js");
        return "category.html";
    }
}
