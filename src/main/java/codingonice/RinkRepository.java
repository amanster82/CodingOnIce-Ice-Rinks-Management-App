package codingonice;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RinkRepository extends CrudRepository<Rink, Long> {

    ArrayList<Rink> findAll();

    Rink findById(Integer id);

    // Returns bookings between start and end for a given rink id
    @Query("select b from Rink a, Booking b where a.id = ?1 and b.startTime >= ?2 and b.startTime <= ?3")
    ArrayList<Booking> findBookingsByRinkAndDateInbetween(int rinkId, Date start, Date end);

    @Query("select b from Rink a, Booking b where b.id = ?1")
    Booking findBookingById(int bookingId);
}
