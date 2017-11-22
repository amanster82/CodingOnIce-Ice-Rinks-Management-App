public class BookingService {

    private BookingService instance;

    private BookingService() {

    }

    public BookingService getInstance() {
        if (instance == null) {
            instance = new BookingService();
        }
        return instance;
    }
}