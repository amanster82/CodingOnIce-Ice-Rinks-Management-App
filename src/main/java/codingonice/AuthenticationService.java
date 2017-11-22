package codingonice;

public class AuthenticationService {

    private AuthenticationService instance;

    public AuthenticationService getInstance() {
        if (instance == null) {
            instance = new AuthenticationService();
        }
        return instance;
    }

    public boolean login(String email, String password) {

        return false;
    }

    // public register(...) {

    // }

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
