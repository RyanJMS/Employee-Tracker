DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee
(
        id INTEGER(100) NOT NULL,
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
        id INTEGER(11) NOT NULL,
        name VARCHAR
                (30),
        PRIMARY KEY
                (id)
);

CREATE TABLE role
(
        id INTEGER(100)
                NOT NULL,
        title VARCHAR
                        (30) ,
        salary DECIMAL
                        (65),
        department_id INTEGER
                        (100),
        PRIMARY KEY
                        (id)
);
