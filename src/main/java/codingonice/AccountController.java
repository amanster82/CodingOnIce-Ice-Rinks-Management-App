package codingonice;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
    public ResponseEntity<List<Account>> getAccounts(@SessionAttribute("account") Integer account) {

        if (account == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        if (AuthenticationService.getInstance().isAdmin(account) == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<Account> accounts = AuthenticationService
                .filterAccounts(AccountService.getInstance().getRepository().findAll());

        return ResponseEntity.status(HttpStatus.OK).body(accounts);
    }

    @RequestMapping(value = "/current", method = RequestMethod.GET)
    public ResponseEntity<Account> getCurrentAccount(@SessionAttribute("account") Integer account) {

        if (account == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Account entity = AccountService.getInstance().getRepository().findById(account);

        entity.setPassword("");

        return ResponseEntity.status(HttpStatus.OK).body(entity);
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
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
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

    @RequestMapping(value = "/{id}/bills", method = RequestMethod.GET)
    public ResponseEntity<List<Bill>> getBillsByAccount(@SessionAttribute("account") Integer account,
            @PathVariable("id") int id) {

        if ((account == 0 || account != id) && !AuthenticationService.getInstance().isAdmin(account)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Account acc = AccountService.getInstance().getAccountById(id);
        return ResponseEntity.ok(acc.getBills());
    }

    @RequestMapping(value = "/{id}/bills/{billId}/actions/pay", method = RequestMethod.POST)
    public ResponseEntity<Boolean> payBillsById(@SessionAttribute("account") Integer account,
            @PathVariable("id") int id, @PathVariable("billId") int billId) {

        //TODO: AUTHENTICATION HERE

        Account acc = AccountService.getInstance().getAccountById(id);
        if (acc == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        boolean successful = BillingService.getInstance().setPaidStatus(acc, billId);
        return ResponseEntity.ok(successful);
    }

    @RequestMapping(value = "/{id}/actions/approve", method = RequestMethod.POST)
    public ResponseEntity<Boolean> approve(@PathVariable("id") Integer id,
            @SessionAttribute("account") Integer account) {

        if (!AuthenticationService.getInstance().isAdmin(account)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        boolean successful = AccountService.getInstance().approveAccount(id);
        if (!successful) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(true);
    }

    @RequestMapping(value = "/unapproved", method = RequestMethod.GET)
    public ResponseEntity<List<Account>> getUnapprovedAccounts(@SessionAttribute("account") Integer account) {

        if (!AuthenticationService.getInstance().isAdmin(account)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<Account> accounts = AuthenticationService
                .filterAccounts(AccountService.getInstance().getRepository().findByIsApproved(false));
        return ResponseEntity.ok(accounts);
    }
}
