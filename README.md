# Coding on Ice

A web application for managing ice rinks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

As this is a Java application, the following are required to get the project running.
The [NPM](https://www.npmjs.com/) tool is also required to download web app dependencies.

```
JDK 1.8
Maven 3.0+
NPM 4.0+
```

### Spring

The following will download the dependencies for Spring using Maven.

```
mvn clean install
```

Next the MVN wrapper will be downloaded and configured.

```
mvn -N io.takari:maven:wrapper
```

The project can now be started by using spring boot.

```
./mvnw spring-boot:run
```

The web server will start and be accessible from *http://localhost:8080*
To view the full web app, the project must be set up by following the next React instructions

### React

Navigate to the web app folder *src/main/webapp*

Now use NPM to download project dependencies.

```
npm install
```

One that is complete the web app should be fully accessible by using:

```
npm start
```

This will run the project on *http://localhost:3000* for development with hot module reloading.

## Deployment

The project can be compiled into a single runnable JAR file using the following command.

```
./mvnw clean package
```

The JAR file will be built in the *target* folder and can then be executed directly to run and serve the project.

## Development

The following resources can help aid development.

### Style guides

Style guides can be useful for following best practices and writing maintainable code.

**Java** - [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
**JavaScript** - [Airbnb Style Guide](https://github.com/airbnb/javascript)

## Built With

* [Spring](https://spring.io) - The backend framework
* [Maven](https://maven.apache.org/) -Java dependency management
* [NPM](https://npmjs.org/) - Node.js dependency management
* [React](https://reactjs.org/) - Web app frontend

## Authors

* **Chris Hampu**
* **Aman Bhayani**
* **Andrew Li**
* **Ryan Djeric**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
