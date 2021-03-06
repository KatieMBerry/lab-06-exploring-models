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

    static async find() {
        const { rows } = await pool.query(
            `SELECT * FROM customers
            `);

        return rows.map(row => new Customer(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM customers
            WHERE id=$1
            `,
            [id]
        );
        if (!rows[0]) throw new Error(`No customers by id ${id}.`);
        return new Customer(rows[0]);
    }

    static async update(id, { last_name, first_name, age, email }) {
        const { rows } = await pool.query(
            `UPDATE customers
            SET  last_name=$1,
            first_name=$2,
            age=$3,
            email=$4
            WHERE id=$5
            RETURNING *
            `,
            [last_name, first_name, age, email, id]
        );
        if (!rows[0]) throw new Error(`No customers by id ${id}.`);
        return new Customer(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM customers
            WHERE id=$1
            RETURNING *
            `,
            [id]
        );
        if (!rows[0]) throw new Error(`No customers by id ${id}.`);
        return new Customer(rows[0]);
    }
}
