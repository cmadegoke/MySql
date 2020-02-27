
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
            console.table(empDataObj)
            resolve({ message: 'Employee Created' });
        });
        // consola.info(postQuery.sql);
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
            console.table(DeptDataObj)
            resolve({ message: 'Department Created' });
        });
        // consola.info(postQuery.sql);
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
            console.table(RoleDataObj)
            return({ message: 'Roles Created' });
        });
        // consola.info(postQuery.sql);
    });
};
const view_Dept = () => {

        return connection.query('SELECT * FROM department', (err, Data) => {
            if (err) {
                consola.error(err);
                reject(err);
                return;
            }
            console.table(Data)
            return(Data);
        });
    
};
const view_Role = () => {

        return connection.query('SELECT * FROM role', (err, Data) => {
            if (err) {
                consola.error(err);
                reject(err);
                return;
            }
            console.table(Data)
            return(Data);
       
    });
};
const view_Emp = () => {

    return connection.query('SELECT * FROM employee', (err, Data) => {
        if (err) {
            consola.error(err);
            reject(err);
            return;
        }
        console.table(Data)
        return Data;
    });

    
};
const Update_Emp = async () => {
    // creates a new "thenable" promise
    let role_id = ""
    let results;
    let newPrompt = {}
    await new Promise((resolve, reject) => {
      const getQuery = connection.query('SELECT * FROM employee', (err, EmpData) => {
        // console.table (EmpData)
        if (err) {
          consola.error(err);
          reject(err);
          return;
        }
        newPrompt = {
            name: "emp",
            type: 'list',
            message: 'Select employee to Update',
            choices: EmpData.map(emp => `${emp.first_name} ${emp.last_name} ${emp.role_id}`)
        }
        results = EmpData;
        resolve(EmpData);
      });
      console.log(getQuery.sql);
    });

    return {newPrompt, results}
  };
  const Update_Emp_Role_Id = (empID, RoleId) => {
    return new Promise((resolve, reject) => {
     const updateQuery = connection.query( 'UPDATE employee SET ? WHERE ?',
        [{ role_id:  RoleId }, { id: empID}],
        (err, updateRes) => {
          if (err) {
            consola.error(err);
            reject(err);
            return;
          }
          console.table (RoleId)
          resolve({ message: 'role successfully updated!' });
        }
      );
  
      consola.info(updateQuery.sql);
      
    });
    
  };


// export functions
module.exports = {

    createEmp,
    createDept,
    createRole,
    view_Dept,
    view_Role,
    view_Emp,
    Update_Emp,
    Update_Emp_Role_Id,
    
};