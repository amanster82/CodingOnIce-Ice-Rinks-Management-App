package codingonice;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    BookingController() {

    }

    @RequestMapping(value = "/rink/{id}", method = RequestMethod.GET)
    public List<Booking> getBookingsByRink(@PathVariable("id") int id) {

        Rink rink = RinkService.getInstance().getRepository().findById(id);

        if (rink == null) {
            return new ArrayList<Booking>();
        }

        return rink.getBookings();
    }

    @RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
    public List<Booking> getBookingsByAccount(@PathVariable("id") int id) {

        return new ArrayList<Booking>();
    }

    /**
     * Described the accepted input parameters than are used to create a booking
     * and their format. For example, startTime must be an ISO 8601 datetime with time zone
     */
    private static class BookingCreateEntity {

        public int rinkId;
        public int accountId;
        public int length;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "GMT")
        public Date startTime;
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Booking createBooking(@RequestBody BookingCreateEntity booking) {

        Rink rink = RinkService.getInstance().getRepository().findById(booking.rinkId);

        if (rink == null) {
            return null;
        }

        Booking newBooking = Booking.builder()
            .setLength(booking.length)
            .setRink(rink)
            .setStartTime(booking.startTime)
            .build();

        List<Booking> bookings = new LinkedList<Booking>();

        if (rink.getBookings() != null) {
            bookings = rink.getBookings();
        }

        bookings.add(newBooking);

        rink.setBookings(bookings);

        RinkService.getInstance().getRepository().save(rink);

        return newBooking;
    }

    public void cancelBooking(int id) {

    }

}