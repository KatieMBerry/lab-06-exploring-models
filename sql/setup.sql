DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    age INTEGER,
    email TEXT
);