USE employees_db;

INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'),
       ('Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 95000, 4),
       ('Lead Engineer', 130000, 1),
       ('Salesperson', 65000, 4),
       ('Accountant', 55000, 2),
       ('Lawyer', 150000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tony','Soprano',1,1),
       ('Peter','Parker',3,2),
       ('John','Smeichel',2,1),
       ('Roy','Nistel',4,3),
       ('Mike','Sneider',3,4);
      
