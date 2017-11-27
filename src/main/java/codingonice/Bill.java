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
    private boolean paid;
    @ManyToOne
    private Account account;

    public Bill() {

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

    public Date setIssueDate(Date date) {
        this.issueDate = date;
        return this.issueDate;
    }

    public double setBalance(double balance) {
        this.balance = balance;
        return this.balance;
    }

    public boolean getPaid() {
        return paid;
    }

    public boolean setPaid(boolean value) {
        this.paid = value;
        return this.paid;
    }

}
