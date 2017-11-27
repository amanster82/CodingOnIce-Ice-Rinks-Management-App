package codingonice;

import org.springframework.security.access.method.P;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.LinkedList;
import java.util.List;

public class AccountService {
    private AccountRepository accountRepository;
    private static AccountService instance;

    private static PasswordEncoder passwordEncoders;

    private AccountService(AccountRepository repository) {
        this.accountRepository = repository;
    }

    public static void createInstance(AccountRepository repository, PasswordEncoder passwordEncoder) {
        if (instance == null) {
            instance = new AccountService(repository);
            passwordEncoders = passwordEncoder;
        }
    }

    public Account getAccountByEmail(String email) {
        return this.accountRepository.findByEmail(email);
    }

    public Account getAccountById(Integer id) {
        return this.accountRepository.findById(id);
    }

    public static AccountService getInstance() {
        return instance;
    }

    public AccountRepository getRepository() {
        System.out.print("account repository");
        return accountRepository;
    }

    public boolean addAccount(String firstName, String lastName, String email, String password) {

        Account newAccount = Account.builder().setName(firstName, lastName).setEmail(email)
                .setPassword(passwordEncoders.encode(password)).build();

        return this.accountRepository.save(newAccount) != null;
    }

    public boolean approveAccount(int id) {
        Account acc = AccountService.getInstance().getRepository().findById(id);
        if (acc == null) {
            return false;
        }

        // Account is already approved!
        if (acc.getApproved() == true) {
            return false;
        }

        acc.setApproved(true);
        this.accountRepository.save(acc);
        return true;
    }

    public boolean setBills(Account acc, Bill bill) {
        List<Bill> bills = new LinkedList<Bill>();

        bills = acc.getBills();
        bills = acc.setBill(bill);
        return this.accountRepository.save(acc) != null;

    }

}
