package codingonice;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    protected Rink rink;

    @ManyToOne
    protected Account account;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "GMT")
    protected Date startTime;

    protected int length;

    protected String name;

    protected Booking() {

    }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public int getId() {
        return id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public int getLength() {
        return length;
    }

    public String getName() {
        return name;
    }
}
