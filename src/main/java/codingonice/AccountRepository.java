package codingonice;

import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface AccountRepository extends CrudRepository<Account, Long> {

    public ArrayList<Account> findAll();

    public Account findById(int id);

    //public ArrayList<Bill> findBillsByAccount(Account account);

}