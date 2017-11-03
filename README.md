# Coding on Ice

A web application for managing ice rinks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

As this is a Java application, the following are required to get the project running.

```
JDK 1.8
Maven 3.0+
```

### Running

The following will download the dependencies using Maven.

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

The project will be accessible from *http://localhost:8080*

## Deployment

The project can be compiled into a single runnable JAR file using the following command.

```
./mvnw clean package
```

The JAR file will be built in the *target* folder and can then be executed directly to run and serve the project.

## Development

The following resources can help aid development.

### Style guide

This project was started in mind using the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html) and will loosely follow it.

## Built With

* [Spring](https://spring.io) - The backend framework
* [Polymer](https://www.polymer-project.org/) - The frontend framework
* [Maven](https://maven.apache.org/) - Dependency management

## Authors

* **Chris Hampu**
* **Aman Bhayani**
* **Andrew Li**
* **Ryan Djeric**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
