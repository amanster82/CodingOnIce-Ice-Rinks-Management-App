package codingonice;

import codingonice.RinkRepository;

public class RinkService {

    // Rink repository for SQL queries
    private RinkRepository rinkRepository;

    // Rink service singleton
    private static RinkService instance;

    private RinkService(RinkRepository repository) {
        this.rinkRepository = repository;
    }

    // Controller will create rink service instance and pass in its repository
    public static void createInstance(RinkRepository repository) {
        if (instance == null) {
            instance = new RinkService(repository);
        }
    }

    // Singleton getter
    public static RinkService getInstance() {
        return instance;
    }

    // Repository getter
    public RinkRepository getRepository() {
        return this.rinkRepository;
    }

    // Update maintenance state for a rink ID to be value and return whether operation was successful
    public boolean setMaintenance(int id, boolean value) {
        Rink rink = this.rinkRepository.findById(id);
        if (rink == null) {
            return false;
        }
        rink.setMaintenance(value);
        return this.rinkRepository.save(rink) != null;
    }
}
