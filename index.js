const mysql = require("mysql");
const inquirer = require("inquirer");
const { exit } = require("process");

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
        "View Employees by Role",
        "Add Department",
        "Add Employee",
        "Add New Role",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(({ selection }) => {
      switch (selection) {
        case "View All Employees":
          return viewAll();
          break;
        case "View All Employees by Department":
          return viewEmpByDept();
          break;
        case "View Employee by Role":
          return viewEmpByRole();
          break;
        case "Add Department":
          return addDepartment();
          break;
        case "Add Employee":
          return addEmployee();
          break;
        case "Add New Role":
          return newRole();
          break;
        case "Update Employee Role":
          return updateRole();
          break;
        default:
          console.log("Goodbye");
          connection.end();
      }
    });
}

// function exit() {
//   connection.end();
// }

function viewAll() {
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
  connection.query(`SELECT * FROM department`, (err, data) => {
    departmentArray = data.map((department) => department.name);
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          message: "Which department would you like to view?",
          choices: departmentArray,
        },
      ])
      .then(({ department }) => {
        connection.query(
          `SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHEre name = "${department}";`,
          (err, data) => {
            if (err) throw err;
            console.table(data);
            init();
          }
        );
      });
  });
}

function viewEmpByRole (){
    connection.query(
        `SELECT * FROM role`, (err, data) => {
            const roleArray = data.map(role => role.title)
            inquirer.prompt([
                {
                    name: "viewRole",
                    type: "list",
                    message: "Which role would you like to view?",
                    choices: roleArray
                }
            ]).then(({roleSearch})=>{
                connection.query(
                    `SELECT first_name, last_name,title, salary, name 
                    FROM employee
                    INNER JOIN role ON employee.role_id = role.id
                    INNER JOIN department ON role.department_id = department.id
                    WHERE title = "${roleSearch}";`,
                    (err,data) =>{
                        if(err) throw err
                        console.table(data)
                        init();
                    }
                ) 
            })
        }
    )
}

function addEmployee() {
  connection.query(`SELECT * FROM role`, (err, data) => {
    const rolesArray = data.map((role) => role.title);
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Please enter the employee's first name: ",
        },
        {
          name: "lastName",
          type: "input",
          message: "Please enter the employee's last name: ",
        },
        {
          name: "role",
          type: "list",
          message: "Please enter the employee's role: ",
          choices: rolesArray,
        },
      ])
      .then(({ firstName, lastName, role }) => {
        const selectedRole = data.find(
          (roleObject) => roleObject.title === role
        );
        connection.query(
          `INSERT INTO employee SET ?`,
          [
            {
              first_name: firstName,
              last_name: lastName,
              role_id: selectedRole.id,
            },
          ],
          (err, data) => {
            if (err) throw err;
            viewAll();
            init();
          }
        );
      });
  });
}

function newRole() {
  connection.query(`SELECT * FROM department`, (err, data) => {
    const deptArray = data.map((department) => department.name);
    inquirer
      .prompt([
        {
          name: "departmentInput",
          type: "list",
          message: "To what department does this role belong?",
          choices: deptArray,
        },
        {
          name: "roleName",
          type: "input",
          message: "Please enter role name",
        },
        {
          name: "salary",
          type: "input",
          message: "Please enter salary",
        },
      ])
      .then(({ deptChoice, roleName, salary }) => {
        const inputDepartment = data.find(
          (departmentObject) => departmentObject.name === departmentInput
        );
        console.log(inputDepartment);
        connection.query(
          `INSERT into role SET ?`,
          {
            title: roleName,
            salary: parseInt(salary),
            department_id: inputDepartment.id,
          },
          (err, data) => {
            if (err) throw err;
            console.table(data);
            viewAll();
            init();
          }
        );
      });
  });
}
