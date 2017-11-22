public class AccountRepository {

    private BillingService instance;

    private BillingService billingService() {
        return BillingService;
    }

    public BillingService getInstance() {
        return BillingService;
    }
    
}