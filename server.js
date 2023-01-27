require("console.table"); // connects console.table wich makes the output look different
const mysql = require("mysql2"); //connects mysql2
const inquirer = require("inquirer"); // connects inquirer

const { createConnection } = require("net");
const db = mysql.createConnection(
  // connects to db
  {
    host: "localhost",
    user: "root",
    password: "carrots",
    database: "employees_db", //selected database
  },
  console.log(`Connected to the employee_db database.`) // prompt for when connected
);

const menu = () => {
  //prompts list of questions
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choices",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "View Employees By Manager",
        "Add New Employee",
        "Add New Role",
        "Add New Department",
        "Update Employee Role",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "Exit Menu",
      ],
    })
    .then((answer) => {
      // when selecting an option, if it matches run the function
      const { choices } = answer;
      if (choices === "View All Employees") {
        viewEmployees();
      }
      if (choices === "View All Roles") {
        viewRoles();
      }
      if (choices === "View All Departments") {
        viewAllDepartments();
      }
      if (choices === "View Employees By Manager") {
        viewEmployeesByManager();
      }
      if (choices === "Add New Department") {
        addDepartment();
      }
      if (choices === "Add New Employee") {
        addEmployee();
      }
      if (choices === "Update Employee Role") {
        updateEmployee();
      }
      if (choices === "Add New Role") {
        addRole();
      }
      if (choices === "Exit Menu") {
        Exit();
      }
    });
};

//view functions
const viewEmployees = () => {
  const query =
    "SELECT * FROM employee JOIN role on employee.role_id = role.id JOIN department on role.department_id = department.id;";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

const viewRoles = () => {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

const viewAllDepartments = () => {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

const viewEmployeesByManager = () => {
  const query = "SELECT * FROM employee ORDER BY manager_id";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
};
// adding
const addRole = () => {
  inquirer
    .prompt([
      //prompts questions
      {
        type: "input", // moves forward with the appropriate questions for the selected class
        message: "What is the name of the role you would like to add?",
        name: "title",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need an answer to continue";
          }
        }, // validates, need an answer to continue
      },
      {
        type: "input", // moves forward with the appropriate questions for the selected class
        message: "What is the salary of the role you would like to add?",
        name: "salary",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need an answer to continue";
          }
        }, // validates, need an answer to continue
      },
      {
        type: "input", // moves forward with the appropriate questions for the selected class
        message: "What department does the role belong to?",
        name: "department",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need an answer to continue";
          }
        }, // validates, need an answer to continue
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO role SET ?", // inserts role into the table
        {
          title: data.title,
          salary: data.salary,
        }
      );
      console.log(`${data.newrole} has been added as a role!`); // logs that the role has been added
      viewRoles(); // shows the updated role table
    });
};
const addDepartment = () => {
  inquirer
    .prompt([
      //prompts questions
      {
        type: "input", // moves forward with the appropriate questions for the selected class
        message: "What is the name of the department you would like to add?",
        name: "newdepartment",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need an answer to continue";
          }
        }, // validates, need an answer to continue
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO department SET ?", // inserts department into the table
        {
          name: data.newdepartment,
        }
      );
      console.log(`${data.newdepartment} has been added as a new department!`);
      viewAllDepartments(); // shows the updated department table
    });
};

const updateEmployee = () => {
  db.query("SELECT * FROM employee", (err, employees) => {      // takes all employees and runs .map and returns the new names and role
    if (err) console.log(err);
    employees = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "selectEmployee",
            message: "Select the employee you would like to update",
            choices: employees,
          },
          {
            type: "list",
            name: "selectRole",
            message: "Select the role you would like the employee to have",
            choices: roles,
          },
        ])
        .then((data) => {
          db.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
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
          console.log("The employee has been updated!");
          viewEmployees();
        });
    });
  });
};

const addEmployee = () => {
  db.query("SELECT * FROM role", (err, roles) => {
    if (err) console.log(err);
    roles = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    inquirer
      .prompt([
        //prompts questions
        {
          type: "input", // moves forward with the appropriate questions for the selected class
          message:
            "What is the first name of the employee you would like to add?",
          name: "firstname",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "I need an answer to continue";
            }
          }, // validates, need an answer to continue
        },
        {
          type: "input", // moves forward with the appropriate questions for the selected class
          message:
            "What is the last name of the employee you would like to add?",
          name: "lastname",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "I need an answer to continue";
            }
          }, // validates, need an answer to continue
        },
        {
          type: "list", // moves forward with the appropriate questions for the selected class
          message: "What is the role of the employee you would like to add?",
          name: "role",
          choices: roles,
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "I need an answer to continue";
            }
          }, // validates, need an answer to continue
        },
        {
          type: "list", // moves forward with the appropriate questions for the selected class
          message: "select a manager id for the new employee?",
          name: "managerId",
          choices: [1, 2, 3, 4, 5],
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "I need an answer to continue";
            }
          }, // validates, need an answer to continue
        },
      ])
      .then((data) => {
        console.log(data.role);
        db.query(
          "INSERT INTO employee SET ?",  
          {
            first_name: data.firstname,
            last_name: data.lastname,
            role_id: data.role,
            manager_id: data.managerId,
          },
          (err) => {
            if (err) throw err;

            console.log(
              `${(data.firstname, data.lastname)} has been added as a ${
                data.role
              }`
            );
            viewEmployees();
          }
        );
      });
  });
};

menu();   // runs menu
function Exit() {              // allows the user to exit and prompts a goodbye message
  console.log("Thank you , have a great day!");
  db.end();
  process.exit();
}
