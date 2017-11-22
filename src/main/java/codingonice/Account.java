public class Account {
    private int id;
    private String email;
    private String password;
    private Date creationDate;
    private boolean isApproved;
    private boolean isAdmin;
    private ArrayList<Bill> bills;

    private Account() {

    }

    public builder() {
        //AccountBuilder?
    }
}