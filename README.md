# apiwork
# APIWork - Student & Subject API

## Overview
APIWork is a RESTful API built using **Spring Boot** and **MySQL**. It provides endpoints to fetch student details and subjects offered in the **Software Engineering** program from Year 1 to Year 4.

## Features
- Retrieve a list of students and their enrolled programs.
- Retrieve a structured list of subjects categorized by academic year.
- Uses **Spring Boot**, **Spring Data JPA**, and **MySQL** as the database.

## Technologies Used
- **Spring Boot** (Backend Framework)
- **Spring Data JPA** (Database Interaction)
- **MySQL** (Database)
- **Postman** (API Testing)
- **AWS** (Deployment)
- **GitHub** (Version Control)

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- Java 17 or later
- MySQL Database
- Maven
- Git

### Clone the Repository
```sh
git clone https://github.com/yourusername/apiwork.git
cd apiwork
```

### Configure Database
Update **`application.properties`** (located in `src/main/resources/`):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apiwork
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Build and Run the Application
```sh
mvn clean install
mvn spring-boot:run
```

## API Endpoints

### 1. Get All Students
**Endpoint:** `GET /students`
- **Description:** Returns a list of students and their enrolled programs.
- **Response Example:**
```json
[
  { "name": "Juma Hassan", "program": "Software Engineering" },
  { "name": "Neema John", "program": "Computer Science" }
]
```

### 2. Get Subjects by Year
**Endpoint:** `GET /subjects`
- **Description:** Returns subjects categorized by academic year.
- **Response Example:**
```json
{
  "Year 1": ["Introduction to Programming", "Mathematics for Computing"],
  "Year 2": ["Object-Oriented Programming", "Database Systems"],
  "Year 3": ["Software Architecture", "Machine Learning"],
  "Year 4": ["Cloud Computing", "Cyber Security"]
}
```

## Testing with Postman
1. Open **Postman**.
2. Use `GET http://localhost:8080/students` to fetch student data.
3. Use `GET http://localhost:8080/subjects` to fetch subjects.

## Version Control with Git
### Initialize Repository
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/apiwork.git
git push -u origin main
```

## Deployment to AWS
1. Launch an **AWS EC2 Ubuntu instance**.
2. Install Java & MySQL on the server.
3. Transfer your JAR file using SCP:
   ```sh
   scp target/apiwork-0.0.1-SNAPSHOT.jar ubuntu@your-aws-ip:/home/ubuntu/
   ```
4. Run the application:
   ```sh
   java -jar apiwork-0.0.1-SNAPSHOT.jar
   ```
5. Configure **Nginx** or **Apache** as a reverse proxy for production.



## Author
Gehazi Wilbert Gwambaye - Software Engineering Student

