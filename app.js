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
    

    const { emp } = await inquirer.prompt(newPrompt)
    
    const empID = results.filter(e => emp === `${e.first_name} ${e.last_name}`)[0].id;
    
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
    process.exit();
  }
  setTimeout(() => {
    startQuestion()
  }, 1000)
};



async function addEmployees() {
  const { firstName, lastName, RoleId, ManagerId } = await inquirer.prompt(createAddEmployees);
  
  createEmp({
    first_name: firstName,
    last_name: lastName,
    role_id: RoleId,
    manager_id:  ManagerId

  })

};


async function addDepartments() {
  const { Dept } = await inquirer.prompt(createAddDepartments);
  createDept({
    dept_name: Dept,
  })

};


async function addRoles() {
  const { Title, Salary, DeptID } = await inquirer.prompt(createAddRoles);
  createRole({
    title: Title,
    salary: Salary,
    department_id: DeptID
  })

};







connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB');
  startQuestion().catch(e => console.log(e));
});





module.exports = startquestions;