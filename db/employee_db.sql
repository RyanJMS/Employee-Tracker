DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee
(
        id INTEGER(100) NOT NULL AUTO_INCREMENT,
        first_name VARCHAR
        (30),
        last_name VARCHAR
        (30),
        role_id INTEGER
        (100),
        manager_id INTEGER
        (100),
        PRIMARY KEY
        (id)
);

CREATE TABLE department
(
        id INTEGER(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR
                (30),
        PRIMARY KEY
                (id)
);

CREATE TABLE role
(
        id INTEGER(100)
                NOT NULL AUTO_INCREMENT,
        title VARCHAR
                        (30) ,
        salary DECIMAL
                        (65),
        department_id INTEGER
                        (100),
        PRIMARY KEY
                        (id)
);
INSERT INTO employee_db.employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Mark", "Coleman", 2, null),
    ("Brock", "Lesnar", 2, null),
    ("Dan", "Gable", 1, null),
    ("Sean", "O'Malley", 1, null),
    ("Valentina", "Schevchenko", 1, null),
    ("Holly", "Holm", 3, null),
    ("Nieky", "Holzken", 1, null),
    ("Michelle", "Waterson", 3, null);

INSERT INTO employee_db.department
    (name)
VALUES
    ("Sales"),
    ("Customer Service"),
    ("Human Resources");

INSERT INTO employee_db.role
    (title, salary, department_id)
VALUES
    ("Sales Associate", 50000, 1),
    ("Customer Service Associate", 50000, 2),
    ("Human Resources", 60000, 3);  