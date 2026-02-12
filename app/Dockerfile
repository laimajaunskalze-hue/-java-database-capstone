# 1. posms: Izmanto Maven un JDK 17, lai uzbūvētu aplikāciju
FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 2. posms: Izmanto vieglo JRE 17 aplikācijas darbināšanai
FROM eclipse-temurin:17.0.15_6-jre
WORKDIR /app
# Pārliecinies, ka .jar faila nosaukums sakrīt ar tavu projektu
COPY --from=builder /app/target/back-end-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]