const inquirer = require("inquirer");
const mysql = require('mysql2');
const { createConnection } = require("net");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Carrots',
      database: 'employees_db'
    },
    console.log(`Connected to the employee_db database.`)
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
            viewEmployees()
           }
       });
   };

//view functions
   const viewEmployees = () =>{
    const query = 'SELECT * FROM employee';
    createConnection.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
    })
    menu();
  }