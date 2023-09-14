FROM node:18 AS angbuilder

WORKDIR /app

COPY vttp_mini_project_frontend/src src
COPY vttp_mini_project_frontend/angular.json .
COPY vttp_mini_project_frontend/ngsw-config.json .
COPY vttp_mini_project_frontend/package.json .
COPY vttp_mini_project_frontend/package-lock.json .
COPY vttp_mini_project_frontend/tsconfig.app.json .
COPY vttp_mini_project_frontend/tsconfig.json .
COPY vttp_mini_project_frontend/tsconfig.spec.json .

RUN npm i -g @angular/cli
RUN npm ci
RUN ng build



FROM maven:3-eclipse-temurin-17 AS mvnbuilder

WORKDIR /app

COPY vttp_mini_project_server/src src
COPY vttp_mini_project_server/mvnw .
COPY vttp_mini_project_server/pom.xml .
COPY --from=angbuilder /app/dist/vttp_mini_project_frontend /app/src/main/resources/static/

RUN mvn clean package -Dmaven.test.skip=true



FROM eclipse-temurin:17

WORKDIR /app

COPY --from=mvnbuilder /app/target/*.jar app.jar

ENV PORT=8080

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar /app/app.jar 
