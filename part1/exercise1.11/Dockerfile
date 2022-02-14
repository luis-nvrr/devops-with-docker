FROM openjdk:11

EXPOSE 8080

WORKDIR /usr/src/myapp

COPY ./spring-example-project .

RUN ./mvnw package

CMD ["java", "-jar", "./target/docker-example-1.1.3.jar"]
