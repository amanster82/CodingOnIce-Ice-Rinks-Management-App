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
