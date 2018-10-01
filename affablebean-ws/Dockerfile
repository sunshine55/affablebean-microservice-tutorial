FROM openjdk:8-jdk-alpine
VOLUME /temp
EXPOSE 2601
ARG JAR_FILE=target/affablebean-ws-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["java","-Dspring.data.mongodb.uri=mongodb://mongo_container:27017/affablebean","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]