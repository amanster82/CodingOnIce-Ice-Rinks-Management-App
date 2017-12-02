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

The Spring API will start and be accessible from *http://localhost:8080*

To view the full web app, the project must be set up by following the next instructions to run the React development server.

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

The following sub sections can help deploy the application to a production server.

### Prerequisites

This project depends on both `MySQL` and `Redis` during production. They will need to be installed independently following specific instructions for your production environment.

### Static web app

The web application can be built for production with the following command:
```
npm run build
```
The production web app files will be in the `web/build` folder. These files are static and can be served by any web server including:

* The Spring API server by placing the files in `src/main/webapp` before compiling
* Nginx by serving a static directory

### Spring APi server

The project can be compiled into a single runnable JAR file using the following command.

```
./mvnw clean package
```

The JAR file will be built in the *target* folder and can then be executed directly to run and serve the project by using `java -jar target/codingonice-0.0.1.jar`.

### Configuration

Configuration for MySQL, Redis, or the application in general can be done by editing the `src/main/resources/application.properties` file and setting configuration there, or using environment variables.

An example of using environment variables for configuration can be seen in the `Dockerfile`.

## Development

The following resources can help aid development.

### React Dev Server

The react dev server can hot reload any saved files and preview the changes. The server can be started with the following command:

```
npm start
```

The development server will listen on `localhost:3000` and serve the web app.

### Style guides

Style guides can be useful for following best practices and writing maintainable code.

**Java** - [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
**JavaScript** - [Airbnb Style Guide](https://github.com/airbnb/javascript)

## Testing

The following commands can generate test results & code coverage reports.

### Frontend

The react application can be tested with:
```
npm run test
```

And code coverage report generated using:

```
node scripts/test.js --env=jsdom --coverage
```

This coverage report will show how much of the application is affected by react tests.

### Backend

It is currently necessary to have MySQL and Redis available prior to running the Spring tests, as Spring will be ran and will attempt to connect to those services during testing.

To run Spring tests, the following Maven command can be used:

```
./mvnw test
```

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
