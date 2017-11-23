package codingonice;

import java.util.Date;

public class BookingBuilder {

    private Booking booking = new Booking();

    public BookingBuilder() {

    }

    public Booking build() {

        return booking;
    }

    public BookingBuilder setStartTime(Date date) {
        booking.startTime = date;
        return this;
    }

    public BookingBuilder setLength(int length) {
        booking.length = length;
        return this;
    }

    public BookingBuilder setRink(Rink rink) {
        booking.rink = rink;
        return this;
    }

    public BookingBuilder setAccount(Account account) {
        booking.account = account;
        return this;
    }
}
