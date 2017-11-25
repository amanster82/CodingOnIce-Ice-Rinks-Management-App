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
    private Integer id;
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

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public void setBills(ArrayList<Bill> bills) {
        this.bills = bills;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
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

    public ArrayList<Bill> getBills() {
        return bills;
    }
}