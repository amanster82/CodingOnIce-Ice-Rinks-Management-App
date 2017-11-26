package codingonice;

import codingonice.AccountService;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private final AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static class AccountCreateEntity {

        public String firstName;
        public String lastName;
        public String email;
        public String password;
    }

    private static class AccountLoginEntity {
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

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Account> login(@RequestBody AccountLoginEntity account) {

        Account check = AccountService.getInstance().getAccountRepository().findByEmail(account.email);

        if (check instanceof Account) {
            Boolean verify = passwordEncoder.matches(account.password, check.password);
            if (verify == false) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        return ResponseEntity.ok(check);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Account> register(@RequestBody AccountCreateEntity account) {

        if (account.firstName == null || account.lastName == null || account.email == null || account.password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } else {
            // Check if email exists
            if (AccountService.getInstance().getAccountRepository().findByEmail(account.email) instanceof Account)  {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            // Sanitize
            account.firstName = Jsoup.clean(account.firstName, Whitelist.simpleText());
            account.lastName = Jsoup.clean(account.lastName, Whitelist.simpleText());
            account.email = Jsoup.clean(account.email, Whitelist.simpleText());
        }

        List<Account> accounts = new LinkedList<Account>();

        if (accountRepository.findAll() != null) {
            accounts = accountRepository.findAll();
        }

        Account newAccount = Account.builder()
            .setName(account.firstName, account.lastName)
            .setEmail(account.email)
            .setPassword(passwordEncoder.encode(account.password))
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
