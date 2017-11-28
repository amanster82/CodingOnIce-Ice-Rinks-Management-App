FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
ADD ${JAR_FILE} app.jar
CMD java -Djava.security.egd=file:/dev/./urandom -Dmaven.test.skip=true -jar /app.jar \
 --spring.datasource.url=${CLEARDB_MYSQL_URL} \
 --spring.datasource.username=${CLEARDB_MYSQL_USER} \
 --spring.datasource.password=${CLEARDB_MYSQL_PASS} \
 --spring.redis.host=${REDIS_URL} \
 --spring.redis.port=${REDIS_PORT} \
 --spring.redis.password=${REDIS_PASSWORD} \
 --spring.port=${PORT}

