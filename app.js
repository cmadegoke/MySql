const inquirer = require('inquirer');

const connection = require('./Config/connection');

// import functions to work with database
const {createEmp } = require('./lib/db-items');
const {createRole } = require('./lib/db-items');
const {createDept } = require('./lib/db-items');



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
  else {


    connection.end();
  }

  // switch (task) {
  //   case 'Add employees':
  //     addEmployees();
  //     break;
  //   case '':
  //     addDepartment();
  //     break;
  //   default:
  //     break;
  // }
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




// // function to create a new auction item, defined to be async
// const postNewItem = async () => {
//   // get answers out of inquirer prompt
//   const { item_name, item_category, starting_bid } = await inquirer.prompt(createItemQuestions);

//   // create new item
//   const createItemRes = await createItem({ item_name, item_category, starting_bid });

//   console.log(createItemRes);
//   return startAuction();
// };

// async function to bid on an item
// const bidOnItem = async () => {
//   // get all auction items so user can see what's there
//   const items = await getAllItems();

//   // print all of the items
//   console.table(items);

//   // enter bid information and get id and amount back
//   const { item_id, bid_amount } = await inquirer.prompt(bidQuestions);

//   // get item we want to bid on based on id
//   const { id, highest_bid } = items.find(({ id }) => id === parseInt(item_id));

//   // if the current high bid is higher than the users, restart auction
//   if (highest_bid > bid_amount) {
//     console.log('Bid too low, sorry!');
//     return startAuction();
//   }
//   // if new high bidder, update item with new value based on its id
//   const updateBidRes = await updateBid(id, parseFloat(bid_amount).toFixed(2));
//   console.log(updateBidRes.message);

//   return startAuction();
// };

// connect to the db and start up auction
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB');
  startQuestion().catch(e => console.log(e));
});