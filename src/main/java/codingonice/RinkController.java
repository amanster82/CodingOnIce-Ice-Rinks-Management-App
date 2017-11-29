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

    @Autowired
    private final RinkRepository rinkRepository;

    @Autowired
    RinkController(RinkRepository repository) {

        this.rinkRepository = repository;

        RinkService.createInstance(this.rinkRepository);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ArrayList<Rink> getRinks() {

        System.out.print(RinkService.getInstance());

        return RinkService.getInstance().getRepository().findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Rink getRink(@PathVariable("id") Integer id) {

        return RinkService.getInstance().getRepository().findById(id);
    }

    @RequestMapping(value = "/{id}/maintenance", method = RequestMethod.GET)
    public boolean isUnderMaintenance(@PathVariable("id") Integer id) {
        Rink rink = RinkService.getInstance().getRepository().findById(id);
        if (rink == null) {
            return false;
        }
        return rink.getUnderMaintenance();
    }

    @RequestMapping(value = "/{id}/maintenance/actions/start", method = RequestMethod.POST)
    public ResponseEntity<Boolean> startMaintenance(@PathVariable("id") Integer id, @SessionAttribute("account") Integer account) {
        if (account == 0 || AuthenticationService.getInstance().isAdmin(account) == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        RinkService.getInstance().setMaintenance(id, true);

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    @RequestMapping(value = "/{id}/maintenance/actions/stop", method = RequestMethod.POST)
    public ResponseEntity<Boolean> stopMaintenance(@PathVariable("id") Integer id, @SessionAttribute("account") Integer account) {

        if (account == 0 || AuthenticationService.getInstance().isAdmin(account) == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        RinkService.getInstance().setMaintenance(id, false);

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
}
