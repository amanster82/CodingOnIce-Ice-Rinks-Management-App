package codingonice;

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
        account.setPassword(password);
        return this;
    }
}
