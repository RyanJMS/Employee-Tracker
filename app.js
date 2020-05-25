const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "!Deadwood1",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id: " + connection.threadId);
  main();
});

function main() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose from the following options",
        name: "main",
        choices: [
          "View Employees",
          "View Departments",
          "View Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Remove Employee",
          "Remove Department",
          "Remove Role",
          "Exit",
        ],
      },
    ])
    .then(function (res) {
      switch (res.main) {
        case "View Employees":
          viewEmployees();
          break;

        case "View Derpartments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Remove Department":
          removeDepartment();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });

  function viewEmployees() {
    let query = `SELECT e.id, e.first_name, r.title, d.name AS department, r.salary
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id`;

    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      main();
    });
  }

  function viewDepartments() {}

  function viewRoles() {}
  function addEmployee() {}
  function addDepartment() {}
  function addRole() {}
  function updateRole() {}
  function removeEmployee() {}
  function removeDepartment() {}
  function removeRole() {}
}
