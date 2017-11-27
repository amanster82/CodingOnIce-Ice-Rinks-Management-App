package codingonice;

import java.util.ArrayList;
import java.util.Date;
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
        Account acc = AccountService.getInstance().getRepository().findById(id);

        if (acc == null) {
            return new ArrayList<Bill>();
        }

        return acc.getBills();
    }

    public boolean setBillByAccount(int id, double balance, Date issueDate) {

        Account acc = AccountService.getInstance().getAccountById(id);
        if (acc == null) {
            return false;
        }

        Bill bill = new Bill();
        bill.setIssueDate(issueDate);
        bill.setBalance(balance);

        boolean successful = AccountService.getInstance().setBills(acc, bill);
        return successful;
    }

}
