DROP TABLE IF EXISTS employees;

--this is my blueprint for the database
--schema.svg image shows table layout

CREATE TABLE employees (
    id serial PRIMARY KEY,
    name text NOT NULL,
    birthday date NOT NULL,
    salary integer NOT NULL

);

--primary key has a bunch of properties such as: must be unique, cannot be null, gets assigned its own index etc.

