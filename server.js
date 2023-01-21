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
    inquirer.prompt (
       {
           type: "list",
           message: "What would you like to do?",
           name: "choices",
           choices: 
           ['View All Employees',
           'View All Roles',
           'View All Departments',
           'View Employees By Manager',
           'Update Employee Role',
           'Add New Employee',
           'Add New Role',
           'Add New Department',
           'Update Employee Managers',
           'Delete Employee',
           'Delete Role',
           'Delete Department',
           'Exit Menu',],
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}
       })
       .then((answer) => {
           if(answer.selectEmployee ==="View All Employees"){
               addManager();
           }
           if (answer.selectEmployee ==="View All Roles"){
               addEngineer();
           }
           if (answer.selectEmployee ==="View All Departments"){
               addIntern();
           }
           if (answer.selectEmployee ==="View Employees By Manager"){
               console.log(employees)
               writeFileSync(generateMarkdown(employees))
           }
           if (answer.selectEmployee ==="Update Employee Role"){
               console.log(employees)
               writeFileSync(generateMarkdown(employees))
           }
           if (answer.selectEmployee ==="Add New Employee"){
            console.log(employees)
            writeFileSync(generateMarkdown(employees))
            }
        
            if (answer.selectEmployee ==="Add New Role"){
                console.log(employees)
                writeFileSync(generateMarkdown(employees))
            }
            
            if (answer.selectEmployee ==="Add New Department"){
                console.log(employees)
                writeFileSync(generateMarkdown(employees))
            }
            
            if (answer.selectEmployee ==="Update Employee Managers"){
                console.log(employees)
                writeFileSync(generateMarkdown(employees))
            }
            
            if (answer.selectEmployee ==="Delete Employee"){
                console.log(employees)
                writeFileSync(generateMarkdown(employees))
            }
            if (answer.selectEmployee ==="Delete Department"){
                console.log(employees)
                writeFileSync(generateMarkdown(employees))
            }
            if (answer.selectEmployee ==="Exit Menu"){
                console.log(employees)
                writeFileSync(generateMarkdown(employees))
            }
       });
   }


   const viewEmployees = (){
    const query = 'SELECT * FROM employee';
    createConnection.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
    })
    menu();
   }
   
   const employees = [];                           // array of the selected classes
       const addManager = () => {                
           inquirer.prompt ([                      //prompts questions
        {
           type: "input",                                              // moves forward with the appropriate questions for the selected class
           message:"What is the managers name?",
           name: "name",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}   // validates, need an answer to continue
       
       },
       {
           type: "input",
           message:"Please enter the manager's ID.",
           name: "id",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the manager's e-mail address?",
           name: "email",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the manager's Office Number?",
           name: "officeNumber",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       ])
   .then (answers => {
       const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber)       // pushes the new information to the array
       employees.push(manager)
       menu()
   })
};

const addEngineer = () => {                     
   inquirer.prompt ([                                  //promps questions
       {
           type: "input",
           message:"What is the Engineer's name?",
           name: "name",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}
       
       },
       {
           type: "input",
           message:"Please enter the Engineer's ID.",
           name: "id",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the Engineer's e-mail address?",
           name: "email",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the Engineer's Office Number?",
           name: "officeNumber",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the Engineers's github username?",
           name: "github",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       ])
   .then (answers => {
       const engineer = new Engineer (answers.name, answers.id, answers.email, answers.officeNumber)
       employees.push(engineer)  // pushes the new information to the array
       menu()
   })
};
const addIntern = () => {
   inquirer.prompt ([     //prompts questions
       {
           type: "input",
           message:"What is the Intern's name?",
           name: "name",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}
       
       },
       {
           type: "input",
           message:"Please enter the Intern's ID.",
           name: "id",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the Intern's e-mail address?",
           name: "email",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       {
           type: "input",
           message:"What is the Intern's School?",
           name: "school",
           validate:(value) =>{if(value){return true} else {return 'I need an answer to continue'}}

       },
       ])
   .then (answers => {
       const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
       employees.push(intern)  // pushes the new information to the array
       menu()
   })
};

       menu()