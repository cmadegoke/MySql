const inquirer = require('inquirer');


const connection = require('./Config/connection');

// import functions to work with database
const { createEmp } = require('./lib/db-items');
const { createRole } = require('./lib/db-items');
const { createDept } = require('./lib/db-items');
const { view_Dept } = require('./lib/db-items');
const { view_Role } = require('./lib/db-items');
const { view_Emp } = require('./lib/db-items');
const { Update_Emp } = require('./lib/db-items');
const { Update_Emp_Role_Id } = require('./lib/db-items');






// import arrays of questions for inquirer prompts
const { startquestions, createAddEmployees, createAddDepartments, createAddRoles } = require('./lib/prompts');

// function to start auction, defined to be async
const startQuestion = async () => {
  // destructure response object out of first prompt, using await means no .then() needed
  const { task } = await inquirer.prompt(startquestions);
  // console.log(task)
  // depending on the answer, do an action
  if (task === 'Add employees') {
    await addEmployees();

  } else if (task === 'Add departments') {
    await addDepartments();

  }
  else if (task === 'Add roles') {
    await addRoles();
  }
  else if (task === 'View departments') {
    await view_Dept();

  }
  else if (task === 'View roles') {
    await view_Role();

  }
  else if (task === 'View employees') {
    await view_Emp();


  }
  else if (task === 'Update employee roles') {
    const { newPrompt, results } = await Update_Emp();
    console.log(results)

    const { emp } = await inquirer.prompt(newPrompt)
    
    const empID = results.filter(e => emp === `${e.first_name} ${e.last_name} ${e.role_id}`)[0].id;
    
    const { RoleId } =  await inquirer.prompt([
      {
        name: 'RoleId',
        message: 'What is the New  Role ID?',
        type: 'list',
        choices: ['200', '300', '400', '500', '600']
      }
    ]);

    Update_Emp_Role_Id(empID,RoleId)
    view_Emp()


  }
  else {


    connection.end();
  }

};

async function addEmployees() {
  const { firstName, lastName } = await inquirer.prompt(createAddEmployees);
  // add to the database here!
  createEmp({
    first_name: firstName,
    last_name: lastName
  })
  console.log(createAddEmployees);

};
async function addDepartments() {
  const { Dept } = await inquirer.prompt(createAddDepartments);
  // add to the database here!
  createDept({
    dept_name: Dept,
  })
  console.log(createAddDepartments);

};
async function addRoles() {
  const { title, salary, department_id } = await inquirer.prompt(createAddRoles);
  // add to the database here!
  createRole({
    Title: title,
    Salary: salary,
    DeptID: department_id
  })

  console.log(createAddRoles);
};






connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB');
  startQuestion().catch(e => console.log(e));
});