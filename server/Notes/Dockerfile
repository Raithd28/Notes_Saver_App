
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Notes-0.0.1-SNAPSHOT.jar Notes.jar

# Render provides PORT as environment variable
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java","-jar","Notes.jar"]