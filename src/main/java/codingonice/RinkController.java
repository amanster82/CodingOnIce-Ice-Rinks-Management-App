package codingonice;

import java.util.ArrayList;

import codingonice.RinkService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
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

    public boolean isUnderMaintenance(int id) {

        return false;
    }

    public void startMaintenance(int id) {

    }

    public void stopMaintenance(int id) {

    }

}
