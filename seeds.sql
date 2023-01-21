USE employees_db;

INSERT INTO deptartment (id, name)
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales'),
       (5, 'Service');



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,'Tony','Soprano',1,1  ),
       (2,'Peter','Parker',3,2),
       (3,"John","Smeichel",2,1),
       (4,"Roy","Nistel" 4,3),
       (5,"Mike","Sneider"5, 4);
      
