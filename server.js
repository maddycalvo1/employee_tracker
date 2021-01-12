// Server.js is missing something as it is not working

const { Server } = require("http");
let mysql = require("mysql");

let [ VIEW_ALL_EMPLOYEES,
    VIEW_ALL_ROLE,
    VIEW_ALL_DEPARTMENTS,
    ADD_DEPARTMENT,
    ADD_EMPLOYEE,
    ADD_ROLE,
    UPDATE_EMPLOYEE_INFO] = require('./lib/const');

let  {
    viewAllEmployees,
    viewAllDepartments,
    viewAllRoles,
    addDepartment,
    addEmployee,
    addRole,
    updateRole,
    updateManager
    } = require('./lib/queries');


var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
  
    password: "Longhorn12!",
    database: "employeeTracker_DB"
  });

  connection.connect(async (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    await runPrompt();
    connection.end();
});


async function runPrompt() {
    let answer, employee, role, department, info;

    answer = await promptChoices();
    console.table(answer.name);
 
    switch (answer.name) {

        case VIEW_ALL_DEPARTMENTS:
            await viewAllDepartments(connection);
            await runPrompt();
            break;

        case VIEW_ALL_ROLE:
            await viewAllRoles(connection);
            await runPrompt();
            break;

        case ADD_DEPARTMENT:
            await viewAllDepartments(connection);
            department = await promptAddDepartment();
            addDepartment(connection, department.name);
            await viewAllDepartments(connection);
            await runPrompt();
            break;

        case ADD_EMPLOYEE:
            employee = await promptAddEmployee();
            await viewAllRoles(connection);
            role = await promptAddEmployeeRole();
            addEmployee(connection, employee.first_name , employee.last_name,role.id);
            await viewAllEmployees(connection);
            await runPrompt();
            break;


        case ADD_ROLE:
            await viewAllRoles(connection);
            role = await promptAddRole();
            await viewAllDepartments(connection);
            department = await promptAddRoleDept();
            addRole(connection,role.title,role.salary,department.id)
            await viewAllRoles(connection);
            await runPrompt();
        };
    };
