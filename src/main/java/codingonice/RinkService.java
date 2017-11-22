public class RinkService {

    private RinkRepository rinkRepository;
    private RinkService instance;

    private RinkService() {

    }

    public RinkService getInstance() {
        if (instance == null) {
            instance = new RinkService();
        }
        return instance;
    }
        
    public Rink save() {
        return Rink;
    }
}
