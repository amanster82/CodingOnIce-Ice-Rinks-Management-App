package codingonice;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * A Rink entity is a single ice rink managed by this application. A rink can have
 * maintenance state, a series of descriptions, and bookings scheduled at it.
 */
@Entity
@Table(name = "rinks")
public class Rink {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private boolean underMaintenance;

    private String name;

    private String description;
    private String address;
    private String info;
    private int capacity;
    private int startHour;
    private int endHour;

    /**
     * Bookings will have a "rink_id" column as a foreign key reference to this rink.
     * Orphaned Bookings withou a rink should not exist and be removed.
     * All bookings for this rink will be loaded along with the rink.
     */
    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "rink_id")
    private List<Booking> bookings;

    public List<Booking> getBookings() {
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

    public void setMaintenance(boolean value) {
        this.underMaintenance = value;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public String getDescription() {
        return description;
    }

    public String getAddress() {
        return address;
    }

    public String getInfo() {
        return info;
    }

    public int getCapacity() {
        return capacity;
    }

    public int getStartHour() {
        return startHour;
    }

    public int getEndHour() {
        return endHour;
    }
}
