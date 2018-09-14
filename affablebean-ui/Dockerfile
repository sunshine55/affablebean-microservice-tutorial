FROM openjdk:8-jdk-alpine
VOLUME /temp
EXPOSE 2605
ARG JAR_FILE=target/affablebean-ui-1.0.0-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]