package codingonice;

import java.util.Date;
import java.util.ArrayList;

public class Account {
    private int id;
    private String email;
    private String password;
    private Date creationDate;
    private boolean isApproved;
    private boolean isAdmin;
    private ArrayList<Bill> bills;

    private Account() {

    }

    public AccountBuilder builder() {
        //AccountBuilder?
        return null;
    }
}