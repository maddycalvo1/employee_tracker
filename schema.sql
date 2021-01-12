-- creating SQL tables

DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

-- employee table
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(25) NOT NULL,
role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY(id)
);

-- role table
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(25) NULL,
salary DECIMAL(15, 2) NULL,
department_id INT NOT NULL,
PRIMARY KEY (ID)
);

-- department table
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(25) NULL,
PRIMARY KEY (ID)
);

-- i don't understand why it's logging in workbench but not in VSCODE