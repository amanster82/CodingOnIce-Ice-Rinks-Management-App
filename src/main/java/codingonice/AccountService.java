package codingonice;

public class AccountService {
    private AccountRepository accountRepository;
    private AccountService instance;

    private AccountService() {

    }

    public AccountService getInstance() {
        if (instance == null) {
            instance = new AccountService();
        }
        return instance;
    }
    
}
