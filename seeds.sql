USE employees_db;

INSERT INTO deptartment (id, name)
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales'),
       (5, 'Service');

INSERT INTO role (id,title,salary,department_id)
VALUES (1, 'Software Engineer', 95000,1)
       (2, 'Lead Engineer', 130000, 1)
       (3, 'Salesperson', 65000, 4)
       (4, 'Accountant' 55000, 2)
       (5, 'Lawyer', 150000,3)


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,'Tony','Soprano',1,1  ),
       (2,'Peter','Parker',3,2),
       (3,'John","Smeichel',2,1),
       (4,'Roy","Nistel' 4,3),
       (5,"Mike","Sneider"5, 4);
      
