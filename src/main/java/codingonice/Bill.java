package codingonice;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private double balance;
    private Date issueDate;

    @ManyToOne
    private Account account;

    private Bill() {

    }

    public int getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public Date getIssueDate() {
        return issueDate;
    }
}
