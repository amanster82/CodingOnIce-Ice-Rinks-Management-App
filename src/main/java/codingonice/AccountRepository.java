package codingonice;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface AccountRepository extends CrudRepository<Account, Long> {

    ArrayList<Account> findAll();

    Account findById(int id);

    Account findByEmail(String email);
    //ArrayList<Bill> findBillsByAccount(Account account);

}