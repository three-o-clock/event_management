CREATE DATABASE IF NOT EXISTS event_db;
USE event_db;

CREATE TABLE USER (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    department VARCHAR(50),
    year INT,
    role VARCHAR(20),
    password VARCHAR(255)
);

CREATE TABLE EVENT (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100),
    event_type VARCHAR(50),
    description TEXT,
    event_date DATE,
    start_time TIME,
    end_time TIME,
    venue VARCHAR(100),
    seat_limit INT,
    registration_deadline DATE,
    organizer_id INT,
    FOREIGN KEY (organizer_id) REFERENCES USER(user_id)
);

CREATE TABLE REGISTRATION (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_date DATE,
    status VARCHAR(20),
    user_id INT,
    event_id INT,
    FOREIGN KEY (user_id) REFERENCES USER(user_id),
    FOREIGN KEY (event_id) REFERENCES EVENT(event_id),
    UNIQUE (user_id, event_id)
);

CREATE TABLE TEAM (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100),
    team_size INT,
    event_id INT,
    team_leader_id INT,
    FOREIGN KEY (event_id) REFERENCES EVENT(event_id),
    FOREIGN KEY (team_leader_id) REFERENCES USER(user_id)
);

CREATE TABLE TEAM_MEMBER (
    team_member_id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT,
    user_id INT,
    FOREIGN KEY (team_id) REFERENCES TEAM(team_id),
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
);