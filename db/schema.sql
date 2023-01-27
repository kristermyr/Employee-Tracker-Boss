DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;             -- Database created

USE employees_db;

CREATE TABLE department (           --Department table
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role (     -- Role table
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id),       -- foreign key that references to department id
  PRIMARY KEY(id)
);

CREATE TABLE employee (      --Employee Table
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY(manager_id) REFERENCES role(id), -- foreign key that references to role id
  PRIMARY KEY(id)
);


