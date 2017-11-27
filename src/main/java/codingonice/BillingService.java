package codingonice;

import java.util.ArrayList;
import java.util.List;

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


    public List<Bill> getBillsByAccount(int id) {
        Account acc = AccountService.getInstance().getAccountRepository().findById(id);
        ArrayList<Bill> bills = AccountService.getInstance().getAccountRepository().findBillsByAccount(acc);

        if (bills != null) {

        }

    }
    
}
