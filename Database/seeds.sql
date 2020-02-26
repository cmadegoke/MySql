USE employee_db;


INSERT INTO department
(dept_name)
VALUES 
 ('Bakery'),
 ('Customer Service'),
 ('Clothing'),
 ('Electronics'),
 ('Pharmacy');
 



INSERT INTO role
(title, salary, department_id)
VALUES 
 ('Baker',1000,00100),
 ('Customer Service Rep',2000,00200),
 ('Floor Associate',2500,00300),
 ('IT Tech',3500,00400),
 ('Pharmacist',4000,00500);



 INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('James','Bond','1','1'),
('John','Snow' ,'2','2'),
('Arya','Stark','3','1'),
('Tony','Stark','4','2'),
('Sansa','Stark','1','1');