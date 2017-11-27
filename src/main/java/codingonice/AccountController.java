package codingonice;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

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
    AccountController(AccountRepository repository, PasswordEncoder passwordEncoder) {

        this.accountRepository = repository;
        this.passwordEncoder = passwordEncoder;
        AccountService.createInstance(this.accountRepository, this.passwordEncoder);
        AuthenticationService.createInstance(this.passwordEncoder);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ArrayList<Account> getAccounts() {

        return AccountService.getInstance().getRepository().findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Account getAccount(@PathVariable("id") Integer id) {
        //do authentication here
        return AccountService.getInstance().getRepository().findById(id);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Boolean> login(@RequestBody AccountLoginEntity params,
            @SessionAttribute("account") Integer account, HttpSession session) {

        if (account != 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        boolean verified = AuthenticationService.getInstance().login(params.email, params.password, session);
        if (verified == false) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.ok(true);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<Boolean> logout(@SessionAttribute("account") Integer account, HttpSession session) {
        
        boolean success = AuthenticationService.getInstance().logout(account, session);

        if (success) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Account> register(@RequestBody AccountCreateEntity account) {
        boolean successful = AuthenticationService.getInstance().register(account.firstName, account.lastName,
                account.email, account.password);
        if (successful) {
            return ResponseEntity.ok(AccountService.getInstance().getAccountByEmail(account.email));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    public void getBills(int id) {

    }

    @RequestMapping(value = "/{id}/actions/approve", method = RequestMethod.POST)
    public ResponseEntity<Boolean> approve(@PathVariable("id") Integer id, @SessionAttribute("account") Integer account) {

        if (!AuthenticationService.getInstance().isAdmin(account)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        boolean successful = AccountService.getInstance().approveAccount(id);
        if (!successful) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(true);
    }
}
