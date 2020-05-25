
USE employee_db;

INSERT INTO employee
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

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Customer Service"),
    ("Human Resources");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Associate", 50000, 1),
    ("Customer Service Associate", 50000, 2),
    ("Human Resources", 60000, 3);  