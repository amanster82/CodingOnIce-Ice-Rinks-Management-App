package codingonice;

import java.util.ArrayList;
import org.springframework.data.repository.CrudRepository;

public interface RinkRepository extends CrudRepository<Rink, Long> {

    public ArrayList<Rink> findAll();

    public Rink findById(Integer id);
}