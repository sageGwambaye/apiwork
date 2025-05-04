Here’s an updated version of your README with instructions for the **frontend** (React application) and **load balancer** setup:

---

# APIWork - Student & Subject API

## Overview

APIWork is a RESTful API built using **Spring Boot** and **MySQL**. It provides endpoints to fetch student details and subjects offered in the **Software Engineering** program from Year 1 to Year 4.

## Features

* Retrieve a list of students and their enrolled programs.
* Retrieve a structured list of subjects categorized by academic year.
* Uses **Spring Boot**, **Spring Data JPA**, and **MySQL** as the database.

## Technologies Used

* **Spring Boot** (Backend Framework)
* **Spring Data JPA** (Database Interaction)
* **MySQL** (Database)
* **React** (Frontend Framework)
* **Postman** (API Testing)
* **AWS** (Deployment)
* **Docker** (Containerization)
* **Nginx** or **HAProxy** (Load Balancer)
* **GitHub** (Version Control)

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

* Java 17 or later
* MySQL Database
* Maven
* Node.js and npm (for React)
* Git
* Docker & Docker Compose (for containerization)

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

---

### Backend - Build and Run the Application

```sh
mvn clean install
mvn spring-boot:run
```

### Frontend - React Application

1. **Navigate to the frontend directory** (Assuming you have a separate React project inside the repository):

```sh
cd frontend
```

2. **Install dependencies**:

```sh
npm install
```

3. **Build and run the React app**:

```sh
npm start
```

This will start the frontend application on `http://localhost:3000`.

---

## API Endpoints

### 1. Get All Students

**Endpoint:** `GET /students`

* **Description:** Returns a list of students and their enrolled programs.
* **Response Example:**

```json
[
  { "name": "Juma Hassan", "program": "Software Engineering" },
  { "name": "Neema John", "program": "Computer Science" }
]
```

### 2. Get Subjects by Year

**Endpoint:** `GET /subjects`

* **Description:** Returns subjects categorized by academic year.
* **Response Example:**

```json
{
  "Year 1": ["Introduction to Programming", "Mathematics for Computing"],
  "Year 2": ["Object-Oriented Programming", "Database Systems"],
  "Year 3": ["Software Architecture", "Machine Learning"],
  "Year 4": ["Cloud Computing", "Cyber Security"]
}
```

---

## Testing with Postman

1. Open **Postman**.
2. Use `GET http://localhost:8080/students` to fetch student data.
3. Use `GET http://localhost:8080/subjects` to fetch subjects.

---

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

---

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

---

## Frontend Deployment

1. **Build the React app for production**:

```sh
npm run build
```

This will create a `build/` folder in your React project directory with optimized static files.

2. **Transfer the build files to your EC2 instance**:

```sh
scp -r build/ ubuntu@your-aws-ip:/home/ubuntu/frontend
```

3. **Set up Nginx to serve the frontend**:

Install Nginx on the server:

```sh
sudo apt update
sudo apt install nginx
```

4. **Configure Nginx** to serve the React build files:

```sh
sudo nano /etc/nginx/sites-available/default
```

Replace the existing configuration with:

```nginx
server {
    listen 80;
    server_name your-ec2-public-ip;

    root /home/ubuntu/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

5. **Restart Nginx**:

```sh
sudo systemctl restart nginx
```

Now, your React frontend will be accessible at `http://<your-ec2-public-ip>`.

---

## Load Balancer Setup

To distribute traffic efficiently, we can set up a **load balancer** with **Nginx** or **HAProxy**.

### Using Nginx as a Load Balancer

1. **Install Nginx** on a server:

```sh
sudo apt update
sudo apt install nginx
```

2. **Configure Nginx** as a load balancer:

```sh
sudo nano /etc/nginx/sites-available/load-balancer
```

Example configuration:

```nginx
http {
    upstream backend_servers {
        server backend-server1:8080;
        server backend-server2:8080;
        server backend-server3:8080;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

3. **Enable the Load Balancer Configuration**:

```sh
sudo ln -s /etc/nginx/sites-available/load-balancer /etc/nginx/sites-enabled/
```

4. **Restart Nginx**:

```sh
sudo systemctl restart nginx
```

This configuration will distribute incoming traffic to the three backend servers (Spring Boot applications).


## Bash Scripts Overview

The system includes a set of automation Bash scripts to help with server and API maintenance.

### health\_check.sh

* **Purpose:** Performs a server health check (CPU, memory, disk usage) and logs results.
* **Dependencies:** `top`, `df`, `free`, `uptime`, and `curl`

### backup\_api.sh

* **Purpose:** Backs up the API project folder and the MySQL database.
* **Dependencies:** `tar`, `mysqldump`

### update\_server.sh

* **Purpose:** Updates the Linux system packages and pulls new changes for the API from Git.
* **Dependencies:** `apt`, `git`

### Setup & Execution

1. Give execution permission to each script:

```sh
chmod +x health_check.sh backup_api.sh update_server.sh
```

2. Run a script manually (example):

```sh
./health_check.sh
```

If permission is denied, run it with sudo:

```sh
sudo ./health_check.sh
```

3. Setup automatic execution with crontab:

```sh
crontab -e
```

Then add:

```
0 */6 * * * /home/ubuntu/bash_scripts/health_check.sh
0 2 * * * /home/ubuntu/bash_scripts/backup_api.sh
0 3 */3 * * /home/ubuntu/bash_scripts/update_server.sh
```

---

## Backup Schemes

### 1. FULL BACKUP

* **How it Works:** A complete copy of all data at a specific point in time.
* **Advantages:** Easy to restore.
* **Disadvantages:** Time-consuming, storage-intensive.

### 2. INCREMENTAL BACKUP

* **How it Works:** Saves only the changes since the last backup.
* **Advantages:** Efficient in storage and time.
* **Disadvantages:** Slower to restore.

### 3. DIFFERENTIAL BACKUP

* **How it Works:** Saves all changes since the last full backup.
* **Advantages:** Faster restore than incremental.
* **Disadvantages:** More storage usage over time.

---

**Spring Boot API + MySQL Deployment with Docker Compose on AWS**

---

## Author

**Gehazi Wilbert Gwambaye** - Software Engineering Student

---
