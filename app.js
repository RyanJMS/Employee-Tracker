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

        case "View Departments":
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

  function employeeList() {
    let query = `SELECT * FROM employee`;

    connection.query(query, function (err, res) {
      if (err) throw err;

      const employeeList = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${id} ${first_name} ${last_name}`,
      }));
      console.table(res);
    });
  }

  function departmentList() {
    let query = `SELECT * FROM department`;

    connection.query(query, function (err, res) {
      if (err) throw err;

      const despartmentList = res.map(({ id, name }) => ({
        value: id,
        name: `${id} ${name}`,
      }));
      console.table(res);
    });
  }

  function roleList() {
    let query = `SELECT * FROM role`;

    connection.query(query, function (err, res) {
      if (err) throw err;

      const despartmentList = res.map(({ id, title, salary }) => ({
        value: id,
        name: `${id} ${title} ${salary}`,
      }));
      console.table(res);
    });
  }

  function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
      console.table(data);
      main();
    });
  }

  function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
      console.table(data);
      main();
    });
  }

  function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
      console.table(data);
      main();
    });
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "number",
          name: "roleId",
          message: "What is the employee's role id?",
        },
        {
          type: "number",
          name: "managerId",
          message: "What is the Id of the employee's manager?",
        },
      ])
      .then(function (res) {
        connection.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
          [res.firstName, res.lastName, res.roleId, res.managerId],
          function (err, data) {
            if (err) throw err;
            console.table(
              "Employee " + res.firstName + " " + res.lastName + " Added"
            );
            main();
          }
        );
      });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department you are adding?",
        },
      ])
      .then(function (res) {
        connection.query(
          "INSERT INTO department (name) VALUES (?)",
          [res.name],
          function (err, data) {
            if (err) throw err;
            console.table(res.name + " successfully added!");
            main();
          }
        );
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "number",
          name: "department_id",
          message: "What is the department ID?",
        },
      ])
      .then(function (res) {
        connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
          [res.title, res.salary, res.department_id],
          function (err, data) {
            if (err) throw err;
            console.table(res.title + " successfully added!");
            main();
          }
        );
      });
  }

  function updateRole() {
    employeeList();

    inquirer
      .prompt([
        {
          message: "Which employee would you like to update? (First Name)",
          type: "input",
          name: "first_name",
        },
        {
          message: "Please enter the new role ID",
          type: "number",
          name: "role_id",
        },
      ])
      .then(function (response) {
        connection.query(
          "UPDATE employee SET role_id = ? WHERE first_name = ?",
          [response.role_id, response.first_name],
          function (err, data) {
            if (err) throw err;
            console.table(data);
            main();
          }
        );
      });
  }

  function removeEmployee() {
    employeeList();
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Which employee would you like to remove? (by first name)",
        },
      ])
      .then(function (res) {
        let query = `DELETE FROM employee WHERE ?`;

        connection.query(query, { first_name: res.firstName }, function (
          err,
          res
        ) {
          if (err) throw err;
          console.table(res);
          console.log(res.affectedRows + " Deleted");
          main();
        });
      });
  }
  function removeDepartment() {
    departmentList();
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Which department would you like to remove? (by name)",
        },
      ])
      .then(function (res) {
        let query = `DELETE FROM department WHERE ?`;

        connection.query(query, { name: res.departmentName }, function (
          err,
          res
        ) {
          if (err) throw err;
          console.table(res);
          console.log(res.affectedRows + " Deleted");
          main();
        });
      });
  }
  function removeRole() {
    roleList();
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "Which role would you like to remove? (by title)",
        },
      ])
      .then(function (res) {
        let query = `DELETE FROM role WHERE ?`;

        connection.query(query, { title: res.roleName }, function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log(res.affectedRows + " Deleted");
          main();
        });
      });
  }
}
