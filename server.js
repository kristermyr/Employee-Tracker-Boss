
// XWHEN I choose to view all roles
// XTHEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// XWHEN I choose to view all employees
// XTHEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// XWHEN I choose to add a department
// XTHEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// XWHEN I choose to add an employee
// XTHEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// XWHEN I choose to update an employee role
// XTHEN I am prompted to select an employee to update and their new role and this information is updated in the database
const mysql = require('mysql2');
const inquirer = require("inquirer");
require("console.table");
const { createConnection } = require("net");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'carrots',
      database: 'employees_db'
    }, 
    console.log(`Connected to the employee_db database.`),
  );

  const menu = () => {                                //prompts questions asking which employee you would like to add
    inquirer.prompt ({
       
           type: "list",
           message: "What would you like to do?",
           name: "choices",
           choices: 
           ['View All Employees',
           'View All Roles',
           'View All Departments',
           'View Employees By Manager',
           'Add New Employee',
           'Add New Role',
           'Add New Department',
           'Update Employee Role',
           'Delete Employee',
           'Delete Role',
           'Delete Department',
           'Exit Menu',],
       
  })
       .then((answer) => {
        const { choices } = answer;
           if(choices ==="View All Employees"){
            viewEmployees();
           }
           if(choices ==="View All Roles"){
            viewRoles();
           }
           if(choices ==="View All Departments"){
            viewAllDepartments();
           }
           if(choices ==="View Employees By Manager"){
            viewEmployeesByManager();
           }
           if(choices ==="Add New Department"){
            addDepartment();
           }
           if(choices ==="Add New Employee"){
            addEmployee();
           }
           if(choices ==="Update Employee Role"){
            updateEmployee();
           }
           if(choices ==="Add New Role"){
            addRole();
           }
           
       });
   };

//view functions
   const viewEmployees = () =>{
    const query = 'SELECT * FROM employee JOIN role on employee.role_id = role.id JOIN department on role.department_id = department.id;'
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    })
  }

  const viewRoles = () =>{
    const query = 'SELECT * FROM role'
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
         menu();
    })
   
  }

  const viewAllDepartments = () =>{
    const query = 'SELECT * FROM department';
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    })
  }
  
  const viewEmployeesByManager = () =>{
    const query = 'SELECT * FROM employee ORDER BY manager_id';
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    })
  }
  // adding 
  const addRole = () => {                
    inquirer.prompt ([                      //prompts questions
 {
    type: "input",                                              // moves forward with the appropriate questions for the selected class
    message:"What is the name of the role you would like to add?",
    name: "title",
    validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
    },
    {
      type: "input",                                              // moves forward with the appropriate questions for the selected class
      message:"What is the salary of the role you would like to add?",
      name: "salary",
      validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
      },
      {
        type: "input",                                              // moves forward with the appropriate questions for the selected class
        message:"What department does the role belong to?",
        name: "department",
        validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
        }
])
.then((data) => {
  db.query('INSERT INTO role SET ?',
  {
    title: data.title,
    salary:data.salary

  },
),{
  name: data.department,
 

},
console.log(`${data.newrole} has been added as a role!`)
viewRoles();
});

  }
  const addDepartment = () => {                
    inquirer.prompt ([                      //prompts questions
 {
    type: "input",                                              // moves forward with the appropriate questions for the selected class
    message:"What is the name of the department you would like to add?",
    name: "newdepartment",
    validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
    }
])
.then((data) => {
  db.query('INSERT INTO department SET ?',
  {
    name: data.newdepartment,
  }
);
console.log(`${data.newdepartment} has been added as a new department!`)
viewAllDepartments();
});

  }
  

  const updateEmployee = () => {
    
    db.query('SELECT * FROM employee', (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
        });
        db.query('SELECT * FROM role', (err, roles) => {
            if (err) console.log(err);
            roles = roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            });
           
            
            inquirer.prompt([
              {
                  type: 'list',
                  name: 'selectEmployee',
                  message: 'Select the employee you would like to update',
                  choices: employees,
              },
              {
                  type: 'list',
                  name: 'selectRole',
                  message: 'Select the role you would like the employee to have',
                  choices: roles,
              },
          ])
          .then((data) => {
              db.query('UPDATE employee SET ? WHERE ?',
                  [   {
                          role_id: data.selectRole,
                      },
                      {
                          id: data.selectEmployee,
                      },
                  ],
                  function (err) {
                      if (err) throw err;
                  }
              );
              console.log('The employee has been updated!');
              viewEmployees();
          });

             });
          });
          };


    const addEmployee = () => {  
      db.query('SELECT * FROM role', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,

            }
        });
        
        inquirer.prompt ([                      //prompts questions
        {
           type: "input",                                              // moves forward with the appropriate questions for the selected class
           message:"What is the first name of the employee you would like to add?",
           name: "firstname",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
           },
           {
             type: "input",                                              // moves forward with the appropriate questions for the selected class
             message:"What is the last name of the employee you would like to add?",
             name: "lastname",
             validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
             },
             {
               type: "list",                                              // moves forward with the appropriate questions for the selected class
               message:"What is the role of the employee you would like to add?",
               name: "role",
               choices:roles,
               validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
               },
               {
                 type: "list",                                              // moves forward with the appropriate questions for the selected class
                 message:"select a manager id for the new employee?",
                 name: "managerId",
                 choices:[1,2,3,4,5],
                 validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
                 }
       ])
       .then((data) => {
        console.log(data.role);
         db.query('INSERT INTO employee SET ?',
         {
           first_name: data.firstname,
           last_name: data.lastname,
           role_id: data.role,
           manager_id: data.managerId,
       
         },
         (err) => {
          if (err) throw err;

       console.log(`${data.firstname, data.lastname} has been added as a ${data.role}`)
       viewEmployees();
       });
       
      });
    })
      
   
  }
  
  menu();