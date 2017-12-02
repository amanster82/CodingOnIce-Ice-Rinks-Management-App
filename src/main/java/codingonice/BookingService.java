package codingonice;

import java.util.Date;
import java.util.List;
import java.util.LinkedList;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

public class BookingService {

    // Singleton instance
    private static BookingService instance;

    private BookingService() {
    }

    // Retrieve booking instance
    public static BookingService getInstance() {
        if (instance == null) {
            instance = new BookingService();
        }
        return instance;
    }

    // Handle the creation for a new booking using given params. Exception is thrown upon failure.
    public Booking createNewBooking(BookingController.BookingCreateEntity params, Integer accountId) throws Exception {
        String name = Jsoup.clean(params.name, Whitelist.simpleText());
        
        if (name == "" || name.length() > 64 || params.length < 1 || params.length > 3) {
            throw new Exception("Name or booking length are invalid");
        }

        Account account = AccountService.getInstance().getAccountById(accountId);

        if (account == null) {
            throw new Exception("Account does not exist");
        }

        //Check if account is approved - only approved accounts can book (or admin)
        if (!account.getApproved() && !AuthenticationService.getInstance().isAdmin(accountId)) {
            throw new Exception("Account is not approved yet for creating bookings");
        }

        Rink rink = RinkService.getInstance().getRepository().findById(params.rinkId);

        if (rink == null) {
            throw new Exception("Not a valid rink");
        }

        if (rink.getUnderMaintenance() == true) {
            throw new Exception("Rink is currently under maintenance");
        }

        Date endTime = (Date) params.startTime.clone();
        endTime.setHours(params.startTime.getHours() + params.length);

        List<Booking> conflictedBookings = RinkService.getInstance().getRepository()
                .findBookingsByRinkAndDateInbetween(params.rinkId, params.startTime, endTime);

        for (Booking var : conflictedBookings) {
            if (var.getId() == params.rinkId) {
                throw new Exception("Start time and length conflict with another booking");
            }
        }

        List<Booking> bookings = new LinkedList<Booking>();

        if (rink.getBookings() != null) {
            bookings = rink.getBookings();
        }

        Booking newBooking = Booking.builder().setLength(params.length).setRink(rink).setStartTime(params.startTime)
                .setName(name).setAccount(account).build();

        bookings.add(newBooking);

        rink.setBookings(bookings);

        RinkService.getInstance().getRepository().save(rink);

        //Create billing
        Date now = new Date();
        BillingService.getInstance().setBillByAccount(account, now);

        return newBooking;
    }
}
