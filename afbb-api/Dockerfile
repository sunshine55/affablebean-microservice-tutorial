FROM maven:3.8.5-openjdk-17
ARG WORKSPACE=/afbb-api
ADD . ${WORKSPACE}
WORKDIR ${WORKSPACE}
CMD mvn spring-boot:run