FROM openjdk:11-jre-slim
WORKDIR /afbb
EXPOSE 2600
COPY target/afbb-shop.jar shop.jar
ENTRYPOINT ["java", "-jar", "shop.jar"]