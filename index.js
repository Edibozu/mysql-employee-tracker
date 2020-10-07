const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Edge@062190",
  database: "employeesDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});

function init() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
      ],
    })
    .then(({ selection }) => {
      if (selection === "View All Employees") {
        viewAll();
      } else if (selection === "View All Employees by Department") {
        viewEmpByDept();
      } else if (selection === "Add Employee") {
        addEmployee();
      } else if (selection === "Remove Employee") {
        removeEmployee();
      } else if (selection === "Update Employee Role") {
        updateRole();
      }
    });
}

function viewAll() {
  console.log("All employees displayed");
  connection.query(
    `SELECT employee.first_name, employee.last_name, role.title, role.salary
        FROM employee
        INNER JOIN role
            ON employee.role_id = role.id
        INNER JOIN department
            ON role.department_id = department.id;`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

function viewEmpByDept() {
    console.log("Employees displayed by their department");
    connection.query("SELECT * FROM department", (err, data) => {
        departmentArray = data.map(department => department.name)
        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "Which department would you like to view?",
                choices: departmentArray
            }
        ]).then(({department}) => {
            connection.query(
                `SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHEre name = "${department}";`,
                (err, data) => {
                    if(err) throw err;
                    console.table(data);
                    init();
                }
            )
        })
    })
}