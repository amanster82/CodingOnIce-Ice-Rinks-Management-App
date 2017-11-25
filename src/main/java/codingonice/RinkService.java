
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
