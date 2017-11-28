package codingonice;

import codingonice.RinkRepository;

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
        return this.rinkRepository;
    }

    public Rink save() {
        return null;
    }

    public boolean setMaintenance(int id, boolean value) {
        Rink rink = this.rinkRepository.findById(id);
        if (rink == null) {
            return false;
        }
        rink.setMaintenance(value);
        return this.rinkRepository.save(rink) != null;
    }
}
