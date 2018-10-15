package tvo.tutorial.microservice.admin;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.thymeleaf.util.StringUtils;

@Controller
public class InitialViewController {

    @GetMapping("/")
    public String login() {
        return "login.html";
    }

    @GetMapping("/{page}")
    public String getPage(@PathVariable("page") String page, ModelMap map, Authentication auth) {
        if (auth != null && auth.isAuthenticated()) {
            String currentPage = StringUtils.isEmpty(page) ? "category" : page;
            map.addAttribute("currentPage", currentPage);
            return "dashboard.html";
        }
        return "login.html";
    }
}
