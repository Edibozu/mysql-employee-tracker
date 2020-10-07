use employessDB;

INSERT INTO department
    (name)
VALUES("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role
    (title, salary, department_id)
VALUES("Sales Lead", 100000, 1),
    ("Sales Person", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4),
    ("Intern", 30000, 3);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES("John", "Doe", 1),
    ("Mike", "Chan", 2),
    ("Ashley", "Rodriguez", 3),
    ("Kevin", "Tupik", 4),
    ("Malia", "Brown", 5),
    ("Sarah", "Lourd", 6),
    ("Tom", "Allen", 7),
    ("Christian", "Eckenrode", 4);

SELECT employee.first_name, employee.last_name, role.title, role.salary
FROM employee
    INNER JOIN role
    ON employee.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id;

SELECT first_name, last_name, title, salary, name
FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id
WHERE name = "${department}";

SELECT first_name, last_name, title, salary, name
FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
WHERE title = "${roleSearch}";

INSERT INTO employee SET ?;

UPDATE employee SET ? WHERE ? AND ?;