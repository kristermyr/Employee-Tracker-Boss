const mysql = require('mysql2');
const inquirer = require("inquirer");
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
           
       });
   };

//view functions
   const viewEmployees = () =>{
    const query = 'SELECT * FROM employee';
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    })
  }

  const viewRoles = () =>{
    const query = 'SELECT * FROM role';
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
  
  menu();