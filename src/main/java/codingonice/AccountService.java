package codingonice;

import org.springframework.security.crypto.password.PasswordEncoder;

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

    public static AccountService getInstance() {
        return instance;
    }

    public AccountRepository getAccountRepository() {
        System.out.print("account repository");
        return accountRepository;
    }

    public boolean addAccount(String firstName, String lastName, String email, String password) {

        Account newAccount = Account.builder().setName(firstName, lastName).setEmail(email)
                .setPassword(passwordEncoders.encode(password)).build();

        return this.accountRepository.save(newAccount) != null;
    }

    public boolean approveAccount(int id) {
        Account acc = AccountService.getInstance().getAccountRepository().findById(id);
        if (acc == null) {
            return false;
        }

        acc.setApproved(true);
        this.accountRepository.save(acc);
        return acc.getApproved();
    }

}
