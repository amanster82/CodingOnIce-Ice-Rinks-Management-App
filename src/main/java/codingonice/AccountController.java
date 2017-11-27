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
import codingonice.AuthenticationService;

import javax.xml.ws.Response;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private static PasswordEncoder passwordEncoder;

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
    AccountController(AccountRepository repository, PasswordEncoder passwordEncoder) {

        this.accountRepository = repository;
        this.passwordEncoder = passwordEncoder;
        AccountService.createInstance(this.accountRepository, this.passwordEncoder);
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
    public ResponseEntity<Boolean> login(@RequestBody AccountLoginEntity account) {
        Boolean verified = AuthenticationService.login(account.email,account.password);
        if (!verified) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

        return ResponseEntity.ok(true);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Account> register(@RequestBody AccountCreateEntity account) {
        boolean successful = AuthenticationService.getInstance().register(account.firstName,account.lastName,account.email,account.password);
        if (successful) {
            return ResponseEntity.ok(AccountService.getInstance().getAccountByEmail(account.email));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    public void getBills(int id) {

    }

    @RequestMapping(value = "/{id}/actions/approve", method = RequestMethod.POST)
    public ResponseEntity<Boolean> approve(@PathVariable("id") Integer id) {
        boolean successful = AccountService.getInstance().approveAccount(id);
        if (!successful) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(true);
    }
}
