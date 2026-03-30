
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
# Build context is repo root, copy from server/Notes
COPY server/Notes/pom.xml ./
COPY server/Notes/src ./src
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/Notes-0.0.1-SNAPSHOT.jar Notes.jar

# Render provides PORT as environment variable
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java","-jar","Notes.jar"]