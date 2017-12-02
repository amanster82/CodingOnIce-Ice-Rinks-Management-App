package codingonice;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ForwardingController {

    // Used to forward requests to these common page routes to the index route to serve the raw index.html file
    @RequestMapping({ "/login", "/register", "/rinks", "/calendar", "/info", "/profile" })
    public String forward() {
        return "forward:/";
    }
}
