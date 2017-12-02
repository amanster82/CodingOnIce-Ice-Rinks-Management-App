package codingonice;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "accounts", uniqueConstraints = { @UniqueConstraint(columnNames = "email") })
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected int id;

    protected String firstName;
    protected String lastName;

    //PUBLIC - For authentication to compare with server
    private String password;

    @Column(name = "email", unique = true)
    protected String email;
    protected Date creationDate;
    protected boolean isApproved;

    private boolean isAdmin;

    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private List<Bill> bills;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "account_id")
    private List<Booking> bookings;

    protected Account() {

    }

    public static AccountBuilder builder() {
        return new AccountBuilder();
    }

    public String getName() {
        return firstName + ' ' + lastName;
    }

    public String getEmail() {
        return email;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public boolean getApproved() {
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

    public String getPassword() {
        return password;
    }

    public String setPassword(String password) {
        this.password = password;
        return password;
    }

    public boolean setApproved(boolean value) {
        this.isApproved = value;
        return this.isApproved;
    }

    public List<Booking> getBookings() {
        return this.bookings;
    }

    public List<Bill> setBill(Bill bill) {
        this.bills.add(bill);
        return this.bills;
    }

}
