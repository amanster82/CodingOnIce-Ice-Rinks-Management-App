package codingonice;

import codingonice.RinkRepository;
import java.util.ArrayList;

import codingonice.RinkService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
public class RinkService {

    private RinkRepository rinkRepository;
    private static RinkService instance;

    private RinkService(RinkRepository repository) {
        this.rinkRepository = repository;
    }

    public static void createInstance(RinkRepository repository) {
        if (instance == null) {
            instance = new RinkService(repository);
        }
    }

    public static RinkService getInstance() {
        return instance;
    }

    public RinkRepository getRepository() {
        System.out.println("repository");
        return this.rinkRepository;
    }
        
    public Rink save() {
        return null;
    }
}
