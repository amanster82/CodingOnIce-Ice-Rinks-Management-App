package codingonice;

import java.util.ArrayList;

import codingonice.RinkService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequestMapping("/rinks")
public class RinkController {

    @Autowired
    RinkController() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public ArrayList<Rink> getRinks() {

        return RinkService.getInstance().getRepository().findAll();
    }

    public Rink getRink(int id) {

        return null;
    }

    public boolean isUnderMaintenance(int id) {

        return false;
    }

    public void startMaintenance(int id) {

    }

    public void stopMaintenance(int id) {

    }

}
