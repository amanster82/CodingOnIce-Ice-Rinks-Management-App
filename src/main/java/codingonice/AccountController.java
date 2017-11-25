package codingonice;

import codingonice.AccountService;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private final AccountRepository accountRepository;

    @Autowired
    AccountController(AccountRepository repository) {

        this.accountRepository = repository;

        AccountService.createInstance(this.accountRepository);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ArrayList<Account> getAccounts() {
        System.out.print(AccountService.getInstance());

        return AccountService.getInstance().getAccountRepository().findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Account getAccount(@PathVariable("id") Integer id) {
        //do authentication here
        return AccountService.getInstance().getAccountRepository().findById(id);
    }

    public void login(String email, String password) {

    }

//    public void register(...) {
//
//    }

    public void getBills(int id) {

    }

    public void approve(int id) {

    }
}
