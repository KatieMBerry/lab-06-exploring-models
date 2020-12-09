const pool = require('../utils/pool');

module.export = class Customer {
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
            `INSERT INTO customers`
        )
    }
}