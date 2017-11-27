package codingonice;

public class BillingService {

    private BillingService instance;

    private BillingService() {
    }

    public BillingService getInstance() {
        if (instance == null) {
            instance = new BillingService();
        }
        return instance;
    }
    
}