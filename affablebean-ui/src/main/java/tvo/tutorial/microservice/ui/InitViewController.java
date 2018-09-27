package tvo.tutorial.microservice.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InitViewController {

    @GetMapping("/home")
    public String viewHome() {
        return "index.html";
    }
}
