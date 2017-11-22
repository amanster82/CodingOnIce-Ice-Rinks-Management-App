package codingonice;

import java.util.Date;
import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
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