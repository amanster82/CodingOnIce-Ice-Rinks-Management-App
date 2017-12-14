# Marking Guide   28 / 40

# Interim Marks 21/25

# Product Requirements 5/5
This is about meeting the requirements identified in the problem statement.

# Product Quality 4/5
This is about the content of the pitch.

- there was one small bug

# Technical Briefing 8/10
This is about the content of the technical portion of the pitch

- no deployment script was used.
- the google maps integration which I think would have worked was a plus.
- your team was well-versed in the UI and were able to explain design choices.

# Presentation "Pitch" Marks 4/5
This is about the professionalism and presentation of your pitch and tech brief.

- the slides are ok, but just start with a rehearsed script and do a demo.
- you handled display issues well
- the design seemed to adapt ok

# Code and Design Quality 8/15
Note that you have until Friday before the code quality gets marked.

## BCH Score: 7/10
## Comments
### Install
- Setup isn't working. Returns errors when running the spring application:
    ```
    [ERROR] Failed to execute goal org.springframework.boot:spring-boot-maven-plugin:1.5.8.RELEASE:run (default-cli) on project codingonice: An exception occurred while running. null: InvocationTargetException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaAutoConfiguration.class]: Invocation of init method failed; nested exception is javax.persistence.PersistenceException: [PersistenceUnit: default] Unable to build Hibernate SessionFactory: Unable to open JDBC connection for schema management target: Communications link failure
    ```
### Design
- You are operating within the parameters of the Spring MVC architecture, so there's little wiggle-room for anything else.
- You seem to be using the builder pattern.
- I would caution against using that many components in your app. You're using Spring for the backend, and node for the frontend. Too many components that do too much magic in the background. I assume that's probably why the application didn't start.
### Code Quality and BCH
- Some of your javascript files are too long.
- Running Checkstyle on your java code yields 498 errors.
- A lot of your java files have formatting issues.
- Some of your classes utilize only one object instances, which style dictates should be defined as ```final```.
### Models
- Your models are simplistic, possibly because of the builder pattern. Have you considered adding model-centric logic (i.e. validation)?
### Tests
- You don't seem to have any tests implemented. Just a generic ```ApplicationTest.java``` class that doesn't really do much.
### Docs
- I find your lack of javadoc disturbing.
### Overall
You're doing pretty well in terms of implementation. The design is solid, but you have too many frameworks working at the same time. You have a serious problem with maintainability though. No javadoc and no tests make this a maintenance nightmare.

# Bonus 6.25/12.5 (project: 5%)
I can't tell what you guys were doing with Docker but something was going on. Also made some effort to deploy to a custom URL, and actually used a licence. So a half bonus.

# Other comments
