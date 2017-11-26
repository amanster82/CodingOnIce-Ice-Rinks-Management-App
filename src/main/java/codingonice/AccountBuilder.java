package codingonice;

import java.util.Date;

public class AccountBuilder {
    private Account account = new Account();

    public AccountBuilder() {

    }

    public Account build() {
        return account;
    }

    public AccountBuilder setName(String firstName, String lastName) {
        account.firstName = firstName;
        account.lastName = lastName;
        return this;
    }

    public AccountBuilder setEmail(String email) {
        account.email = email;
        return this;
    }

    public AccountBuilder setPassword(String password) {
        //authentication
        account.password = password;
        return this;
    }

    public AccountBuilder setApproved(boolean approved) {
        account.isApproved = approved;
        return this;
    }
}
