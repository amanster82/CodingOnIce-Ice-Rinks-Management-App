package codingonice;

import codingonice.RinkRepository;

public class RinkService {

    private RinkRepository rinkRepository;
    private static RinkService instance;

    private RinkService() {

        this.rinkRepository = new RinkRepository();
    }

    public static RinkService getInstance() {
        if (instance == null) {
            instance = new RinkService();
        }
        return instance;
    }

    public RinkRepository getRepository() {
        return this.rinkRepository;
    }
        
    public Rink save() {
        return null;
    }
}
