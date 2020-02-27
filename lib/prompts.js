const startquestions = [
    {
        name: 'task',
        message: 'What would you like to do?',
        type: 'list',
        choices: ['Add employees', 'Add roles', 'Add departments', 'View departments', 'View roles', 'View employees', 'Update employee roles']
    }

];

const createAddEmployees = [
    {
        name: 'firstName',
        message: 'What is the First Name?',
        type: 'input',

    },
    {
        name: 'lastName',
        message: 'What is the Last Name?',
        type: 'input',

    },
    {
        name: 'RoleId',
        message: 'What is the Role ID?',
        type: 'list',
        choices: ['200', '300', '400', '500', '600']

    },
    // {
    //     name: 'ManagerId',
    //     message: 'Does the employee report to a Manager?',
    //     type: 'list',
    //     choices: ['Yes', 'No']


    // },
    {
        name: 'ManagerId',
        message: 'what is the Manager ID?',
        type: 'list',
        choices: ['1', '2', '3']

    },

];
const createAddDepartments = [
    {
        name: 'Dept',
        message: 'What Department would you like to add?',
        type: 'input',

    },

];
const createAddRoles = [
    {
        name: 'Title',
        message: 'The Title of the Role to be added',
        type: 'list',
        choices: ['Baker', 'Customer Service Rep', 'Floor Associate','IT Tech','Pharmacist']
    },
    {
        name: 'Salary',
        message: 'What is the salary for the employee?',
        type: 'input',
    
    },
    {
        name: 'DeptID',
        message: 'Select the department ID',
        type: 'list',
        choices: ['00100', '00200', '00300','00400','00500']

    
    },

]
const updateEmpRoleId = [
    {
        name: 'UpdateRole',
        message: 'which employees Role ID would you like to change?',
        type: 'input',


    },

];






module.exports = { startquestions, createAddEmployees ,createAddDepartments,createAddRoles};

