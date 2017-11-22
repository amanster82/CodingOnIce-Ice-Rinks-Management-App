package codingonice;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "rinks")
public class Rink {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private boolean underMaintenance;
    
    private String name;

    private ArrayList<Booking> bookings;

    @OneToMany
    public ArrayList<Booking> getBookings() {
        return bookings;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean getUnderMaintenance() {
        return underMaintenance;
    }

    public void setBookings(ArrayList<Booking> bookings) {
        this.bookings = bookings;
    }

    private Rink() {
        
    }
}