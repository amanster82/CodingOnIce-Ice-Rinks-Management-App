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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    BookingController() {

    }

    // Route for retrieving a list of bookings for a given ice rink by its rink ID
    @RequestMapping(value = "/rink/{id}", method = RequestMethod.GET)
    public List<Booking> getBookingsByRink(@PathVariable("id") int id) {

        Rink rink = RinkService.getInstance().getRepository().findById(id);

        if (rink == null) {
            return new ArrayList<Booking>();
        }

        return rink.getBookings();
    }

    // Route for retrieving the list of bookings for an account
    @RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<Booking>> getBookingsByAccount(@SessionAttribute("account") Integer account,
            @PathVariable("id") int id) {

        ArrayList<Booking> bookings = new ArrayList<Booking>();

        if ((account == 0 || account != id) && !AuthenticationService.getInstance().isAdmin(account)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(bookings);
    }

    /**
     * Described the accepted input parameters than are used to create a booking
     * and their format. For example, startTime must be an ISO 8601 datetime with time zone
     */
    public static class BookingCreateEntity {

        public int rinkId;
        public int length;
        public String name;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "GMT")
        public Date startTime;
    }

    // Route for creating a booking using the parameter object BookingCreateEntity
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Booking> createBooking(@RequestBody BookingCreateEntity booking,
            @SessionAttribute("account") Integer accountId) {

        if (!AuthenticationService.getInstance().isAuthenticated(accountId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Booking newBooking = null;

        // Attempt to create a booking and return the resulting booking object.
        // The exception message will include a message telling why booking creation fails if it does.
        // The message is not yet returned in the response.
        try {
            newBooking = BookingService.getInstance().createNewBooking(booking, accountId);
        } catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.ok(newBooking);
    }

    // Route for cancelling a booking by its given ID. The requests account must be the creator or an admin
    @RequestMapping(value = "/{id}/actions/cancel", method = RequestMethod.POST)
    public ResponseEntity<Boolean> cancelBooking(@PathVariable("id") Integer id,
            @SessionAttribute("account") Integer accountId) {

        if (!AuthenticationService.getInstance().isAuthenticated(accountId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        Booking booking = RinkService.getInstance().getRepository().findBookingById(id);

        if (booking == null || booking.rink == null || booking.account == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }

        booking.account.getBookings().removeIf(b -> {
            return b.getId() == id;
        });

        AccountService.getInstance().getRepository().save(booking.account);

        booking.rink.getBookings().removeIf(b -> {
            return b.getId() == id;
        });

        RinkService.getInstance().getRepository().save(booking.rink);

        return ResponseEntity.ok(true);
    }

}
