package codingonice;

import java.util.ArrayList;

import codingonice.RinkService;

import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/rinks")
public class RinkController {

    // The repository for Rinks is created by Spring Boot
    @Autowired
    private final RinkRepository rinkRepository;

    @Autowired
    RinkController(RinkRepository repository) {

        this.rinkRepository = repository;

        RinkService.createInstance(this.rinkRepository);
    }

    // Retrieve the complete list of ice rinks and its properties
    @RequestMapping(method = RequestMethod.GET)
    public ArrayList<Rink> getRinks() {

        return RinkService.getInstance().getRepository().findAll();
    }

    // Route for retrieving a specific rink by its ID. Its bookings will be included
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Rink getRink(@PathVariable("id") Integer id) {

        return RinkService.getInstance().getRepository().findById(id);
    }

    // Retrieve the maintenance state for a given ice rink
    @RequestMapping(value = "/{id}/maintenance", method = RequestMethod.GET)
    public boolean isUnderMaintenance(@PathVariable("id") Integer id) {
        Rink rink = RinkService.getInstance().getRepository().findById(id);
        if (rink == null) {
            return false;
        }
        return rink.getUnderMaintenance();
    }

    // Start maintenance at this rink. Account must be an admin
    @RequestMapping(value = "/{id}/maintenance/actions/start", method = RequestMethod.POST)
    public ResponseEntity<Boolean> startMaintenance(@PathVariable("id") Integer id, @SessionAttribute("account") Integer account) {
        if (account == 0 || AuthenticationService.getInstance().isAdmin(account) == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        RinkService.getInstance().setMaintenance(id, true);

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    // Stop maintenance at this rink. Account must be an admin
    @RequestMapping(value = "/{id}/maintenance/actions/stop", method = RequestMethod.POST)
    public ResponseEntity<Boolean> stopMaintenance(@PathVariable("id") Integer id, @SessionAttribute("account") Integer account) {

        if (account == 0 || AuthenticationService.getInstance().isAdmin(account) == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        RinkService.getInstance().setMaintenance(id, false);

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
}
