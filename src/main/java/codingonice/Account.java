package codingonice;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected int id;

    protected String firstName;
    protected String lastName;

    //PUBLIC - For authentication to compare with server
    public String password;

    protected String email;
    protected Date creationDate;
    protected boolean isApproved;

    private boolean isAdmin;

    @OneToMany
    private List<Bill> bills;

    protected Account() {

    }

    public static AccountBuilder builder() {
        return new AccountBuilder();
    }

    public String getName() {
        return firstName+' '+lastName;
    }

    public String getEmail() {
        return email;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public List<Bill> getBills() {
        return bills;
    }

    public Integer getId() {
        return id;
    }

}
