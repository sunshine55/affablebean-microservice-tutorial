package tvo.tutorial.microservice.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.thymeleaf.util.StringUtils;

@SpringBootApplication
@Controller
public class ApplicationBoot {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationBoot.class, args);
	}

	@GetMapping("/")
	public String viewHome(ModelMap map) {
		map.addAttribute("currentPage", "category");
		return "dashboard.html";
	}

	@GetMapping("/{page}")
	public String getPage(@PathVariable("page") String page, ModelMap map) {
		String currentPage = StringUtils.isEmpty(page) ? "category" : page;
		map.addAttribute("currentPage", currentPage);
		return "dashboard.html";
	}
}
