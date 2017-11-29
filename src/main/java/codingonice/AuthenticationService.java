package codingonice;

import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpSession;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AuthenticationService {

    private static AuthenticationService instance;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void createInstance(PasswordEncoder encoder) {
        getInstance().passwordEncoder = encoder;
    }

    public static AuthenticationService getInstance() {
        if (instance == null) {
            instance = new AuthenticationService();
        }
        return instance;
    }

    public boolean login(String email, String password, HttpSession session) {
        Account check = AccountService.getInstance().getRepository().findByEmail(email);

        if (check == null) {
            return false;
        }

        Boolean verify = this.passwordEncoder.matches(password, check.getPassword());

        if (verify) {
            session.setAttribute("account", check.id);
        }

        return verify;
    }

    public boolean logout(Integer accountId, HttpSession session) {

        if (accountId == 0) {
            return false;
        }

        session.setAttribute("account", 0);

        return true;
    }

    public boolean register(String firstName, String lastName, String email, String password) {
        if (firstName == null || lastName == null || email == null || password == null) {
            return false;
        }
        // Check if email already exists
        if (AccountService.getInstance().getRepository().findByEmail(email) != null) {
            return false;
        }

        // Sanitize
        firstName = Jsoup.clean(firstName, Whitelist.simpleText());
        lastName = Jsoup.clean(lastName, Whitelist.simpleText());
        email = Jsoup.clean(email, Whitelist.simpleText());

        return AccountService.getInstance().addAccount(firstName, lastName, email, password);

    }

    public boolean isAuthenticated(Integer accountId) {

        return accountId != 0;
    }

    public boolean isApproved(int id) {
        Account acc = AccountService.getInstance().getRepository().findById(id);
        if (acc == null) {
            return false;
        }

        return acc.getApproved();
    }

    public boolean isAdmin(int id) {

        if (!isAuthenticated(id)) {
            return false;
        }

        Account acc = AccountService.getInstance().getRepository().findById(id);
        if (acc == null) {
            return false;
        }

        return acc.isAdmin();
    }

    public static List<Account> filterAccounts(List<Account> accounts) {

        return accounts.stream().map(acc -> {
            acc.setPassword("");
            return acc;
        }).collect(Collectors.toList());
    }
}
