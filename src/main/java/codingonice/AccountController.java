package codingonice;

import codingonice.AccountService;

import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private final AccountRepository accountRepository;

    private static class AccountCreateEntity {

        public String firstName;
        public String lastName;
        public String email;
        public String password;
    }

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

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Account> register(@RequestBody AccountCreateEntity account) {

        List<Account> accounts = new LinkedList<Account>();

        if (accountRepository.findAll() != null) {
            accounts = accountRepository.findAll();
        }

        Account newAccount = Account.builder()
            .setName(account.firstName, account.lastName)
            .setEmail(account.email)
            .setPassword(account.password)
            .build();

        accounts.add(newAccount);

        AccountService.getInstance().getAccountRepository().save(accounts);
        return ResponseEntity.ok(newAccount);
    }

    public void getBills(int id) {

    }

    public void approve(int id) {

    }
}
