package codingonice;

import java.util.ArrayList;
import java.util.List;

public class BillingService {

    private static BillingService instance;

    public static BillingService getInstance() {
        if (instance == null) {
            instance = new BillingService();
        }
        return instance;
    }


    public List<Bill> getBillsByAccount(int id) {
        return null;
    }
    
}
