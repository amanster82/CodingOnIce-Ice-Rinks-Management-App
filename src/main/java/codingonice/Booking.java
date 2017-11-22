package codingonice;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Rink rink;

    @ManyToOne
    private Account account;

    private Date startTime;

    private int length;

    private Booking() {

    }

    public BookingBuilder builder() {
        // BookingBuilder?
        return null;
    }
}