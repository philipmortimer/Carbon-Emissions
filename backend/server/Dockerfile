FROM maven:3-openjdk-17 as build
COPY src src
COPY pom.xml .
RUN mvn package

FROM openjdk:17

WORKDIR /backend
COPY --from=build target/server-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build src/main/resources src/main/resources
ENTRYPOINT ["java", "-jar", "app.jar"]