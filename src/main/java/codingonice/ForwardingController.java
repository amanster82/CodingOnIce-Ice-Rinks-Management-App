package codingonice;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ForwardingController {

    @RequestMapping({
      "/login",
      "/register",
      "/rinks"
    })
    public String forward() {
        return "forward:/";
    }
}