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

}
