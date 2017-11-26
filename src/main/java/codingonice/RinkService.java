package codingonice; 

import codingonice.RinkRepository; 

public class RinkService { 

   private RinkRepository rinkRepository; 
   private static RinkService instance; 

   private RinkService(RinkRepository repository) { 
       this.rinkRepository = repository; 
   } 

   public static void createInstance(RinkRepository repository) { 
       if (instance == null) { 
           instance = new RinkService(repository); 
       } 
    }

    public static RinkService getInstance() {
        return instance;
    }

    public RinkRepository getRepository() {
        System.out.println("repository");
        return this.rinkRepository;
    }
        
    public Rink save() {
        return null;
    }
}
