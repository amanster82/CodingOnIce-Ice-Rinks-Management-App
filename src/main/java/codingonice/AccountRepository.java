package codingonice;

import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface AccountRepository extends CrudRepository<Account, Long> {

    ArrayList<Account> findAll();

    Account findById(int id);

    //ArrayList<Bill> findBillsByAccount(Account account);

//    Account save();
}