package tvo.tutorial.microservice.ui.store;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/store")
public class InitViewController {

    @GetMapping("/category")
    public String viewCategory() {
        return "category.html";
    }
}
