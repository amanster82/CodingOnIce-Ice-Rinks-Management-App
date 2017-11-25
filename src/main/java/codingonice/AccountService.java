package codingonice;

public class AccountService {
    private AccountRepository accountRepository;
    private static AccountService instance;

    private AccountService(AccountRepository repository) {
        this.accountRepository = repository;
    }

    public static void createInstance(AccountRepository repository) {
        if (instance == null) {
            instance = new AccountService(repository);
        }
    }

    public static AccountService getInstance() {
        return instance;
    }

    public AccountRepository getAccountRepository() {
        System.out.print("account repository");
        return accountRepository;
    }
}
