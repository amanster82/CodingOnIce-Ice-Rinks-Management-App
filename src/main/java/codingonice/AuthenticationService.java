package codingonice;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.LinkedList;
import java.util.List;

public class AuthenticationService {

    private static AuthenticationService instance;

    @Autowired
    private static PasswordEncoder passwordEncoder;

    public static AuthenticationService getInstance() {
        if (instance == null) {
            instance = new AuthenticationService();
        }
        return instance;
    }

    public static boolean login(String email, String password) {
        Account check = AccountService.getInstance().getAccountRepository().findByEmail(email);
        Boolean verify = passwordEncoder.matches(password, check.password);
        return verify;
    }

    public boolean register(String firstName, String lastName, String email, String password) {
        if (firstName == null || lastName == null || email == null || password == null) {
         return false;
     }
     // Check if email already exists
        if (AccountService.getInstance().getAccountRepository().findByEmail(email) != null)  {
            return false;
     }

     // Sanitize
     firstName = Jsoup.clean(firstName, Whitelist.simpleText());
     lastName = Jsoup.clean(lastName, Whitelist.simpleText());
     email = Jsoup.clean(email, Whitelist.simpleText());

     return AccountService.getInstance().addAccount(firstName,lastName,email,password);

 }

    public boolean isAuthenticated() {
     return false;
    }

            
    public boolean isApproved(int id) {

        return false;
    }

    public boolean isPrivileged(int id) {
        
        return false;
    }
}
