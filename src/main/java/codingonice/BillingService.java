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

    public boolean setPaidStatus(Account acc, int billId) {

        Bill bill = acc.getBills().stream().filter(b -> b.getId() == billId).findFirst().get();

        if (bill == null) {
            return false;
        }
        bill.setPaid(true);
        return AccountService.getInstance().getRepository().save(acc) != null;

    }

}
