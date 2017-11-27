package codingonice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface AccountRepository extends JpaRepository<Account, Long> {

    ArrayList<Account> findAll();

    Account findById(int id);

    Account findByEmail(String email);

    ArrayList<Bill> findBillsByAccount(Account account);

    ArrayList<Account> findAllBy
}
