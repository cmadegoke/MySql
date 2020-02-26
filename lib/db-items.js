
const consola = require('consola');
const connection = require('../config/connection');



const createEmp = empDataObj => {
  return new Promise((resolve, reject) => {
    const postQuery = connection.query('INSERT INTO employee SET ?', empDataObj, (err, createEmp) => {
      if (err) {
        consola.error(err);
        reject(err);
        return;
      }
      resolve({ message: 'Employee Created' });
    });
    consola.info(postQuery.sql);
  });
};
const createDept = DeptDataObj => {
    return new Promise((resolve, reject) => {
      const postQuery = connection.query('INSERT INTO department SET ?', DeptDataObj, (err, createDept) => {
        if (err) {
          consola.error(err);
          reject(err);
          return;
        }
        resolve({ message: 'Department Created' });
      });
      consola.info(postQuery.sql);
    });
  };
  const createRole = RoleDataObj => {
    return new Promise((resolve, reject) => {
      const postQuery = connection.query('INSERT INTO role SET ?', RoleDataObj, (err, createRole) => {
        if (err) {
          consola.error(err);
          reject(err);
          return;
        }
        resolve({ message: 'Roles Created' });
      });
      consola.info(postQuery.sql);
    });
  };
  const view_Dept = () => {
    
    return new Promise((resolve, reject) => {
      const getQuery = connection.query('SELECT * FROM department', (err, Data) => {
        if (err) {
          consola.error(err);
          reject(err);
          return;
        }
        resolve(Data);
      });
      console.log(getQuery.sql);
    });
  };
  const view_Role = () => {
    
    return new Promise((resolve, reject) => {
      const getQuery = connection.query('SELECT * FROM role', (err, Data) => {
        if (err) {
          consola.error(err);
          reject(err);
          return;
        }
        resolve(Data);
      });
      console.log(getQuery.sql);
    });
  };



// export functions
module.exports = {

  createEmp,
  createDept,
  createRole,
  view_Dept,
  view_Role,
//   updateBid
};