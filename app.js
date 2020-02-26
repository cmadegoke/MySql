const inquirer = require('inquirer');

const connection = require('./Config/connection');

// import functions to work with database
const {createEmp } = require('./lib/db-items');
const {createRole } = require('./lib/db-items');
const {createDept } = require('./lib/db-items');
const {view_Dept } = require('./lib/db-items');
const {view_Role} = require('./lib/db-items');



// import arrays of questions for inquirer prompts
const { startquestions, createAddEmployees,createAddDepartments,createAddRoles} = require('./lib/prompts');

// function to start auction, defined to be async
const startQuestion = async () => {
  // destructure response object out of first prompt, using await means no .then() needed
  const { task } = await inquirer.prompt(startquestions);
  console.log(task)
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
  
};
async function addDepartments() {
  const {Dept} = await inquirer.prompt(createAddDepartments);
  // add to the database here!
  createDept({
    dept_name: Dept,
  })
  
};
async function addRoles() {
  const {Role } = await inquirer.prompt(createAddRoles);
  // add to the database here!
  createRole({
    Title : title,
    Salary : salary,
    DeptID : department_id

  })
};





connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB');
  startQuestion().catch(e => console.log(e));
});