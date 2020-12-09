const pool = require('../utils/pool');

module.exports = class Customer {
    id;
    last_name;
    first_name;
    age;
    email;

    constructor(row) {
        this.id = row.id;
        this.last_name = row.last_name;
        this.first_name = row.first_name;
        this.age = row.age;
        this.email = row.email
    }

    static async insert({ last_name, first_name, age, email }) {
        const { rows } = await pool.query(
            `INSERT INTO customers (last_name, First_name, age, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [last_name, first_name, age, email]
        );
        return new Customer(rows[0]);
    }
}