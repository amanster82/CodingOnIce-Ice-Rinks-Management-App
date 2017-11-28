package codingonice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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

    public boolean setBillByAccount(Account acc, Date issueDate) {

        if (acc == null) {
            return false;
        }

        Bill bill = new Bill();
        bill.setIssueDate(issueDate);

        //Generate a random price for bill
        Random r = new Random();
        double rangeMin = 30.0;
        double rangeMax = 100.0;
        double randomValue = rangeMin + (rangeMax - rangeMin) * r.nextDouble();
        bill.setBalance(randomValue);

        boolean successful = AccountService.getInstance().setBills(acc, bill);
        if (successful) {
            AccountService.getInstance().getRepository().save(acc);
        }
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
