package codingonice;

import java.util.Date;

public class Booking {
    private int id;
    private Rink rink;
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