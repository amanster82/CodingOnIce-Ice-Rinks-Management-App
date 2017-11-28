package codingonice;

import com.fasterxml.jackson.annotation.JsonFormat;


import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
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

    @RequestMapping(value = "/rink/{id}", method = RequestMethod.GET)
    public List<Booking> getBookingsByRink(@PathVariable("id") int id) {

        Rink rink = RinkService.getInstance().getRepository().findById(id);

        if (rink == null) {
            return new ArrayList<Booking>();
        }

        return rink.getBookings();
    }

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
    private static class BookingCreateEntity {

        public int rinkId;
        public int length;
        public String name;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "GMT")
        public Date startTime;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Booking> createBooking(@RequestBody BookingCreateEntity booking,
            @SessionAttribute("account") Integer accountId) {

        if (!AuthenticationService.getInstance().isAuthenticated(accountId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String name = Jsoup.clean(booking.name, Whitelist.simpleText());
        //lastName = Jsoup.clean(lastName, Whitelist.simpleText());

        if (name == "" || name.length() > 64 || booking.length < 1 || booking.length > 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Account account = AccountService.getInstance().getAccountById(accountId);

        if (account == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Rink rink = RinkService.getInstance().getRepository().findById(booking.rinkId);

        if (rink == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Date endTime = (Date) booking.startTime.clone();
        endTime.setHours(booking.startTime.getHours() + booking.length);

        List<Booking> conflictedBookings = RinkService.getInstance().getRepository()
                .findBookingsByRinkAndDateInbetween(rink.getId(), booking.startTime, endTime);

        if (conflictedBookings.size() > 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        List<Booking> bookings = new LinkedList<Booking>();

        if (rink.getBookings() != null) {
            bookings = rink.getBookings();
        }

        Booking newBooking = Booking.builder().setLength(booking.length).setRink(rink).setStartTime(booking.startTime)
                .setName(name).build();

        bookings.add(newBooking);

        rink.setBookings(bookings);

        RinkService.getInstance().getRepository().save(rink);

        //Create billing
        Date now = new Date();
        BillingService.getInstance().setBillByAccount(account, now);
        return ResponseEntity.ok(newBooking);
    }

    @RequestMapping(value = "/{id}/cancel", method = RequestMethod.POST)
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
