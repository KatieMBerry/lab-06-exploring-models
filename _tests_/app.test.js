require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const fs = require('fs');
const Customer = require('../lib/models/Customer');


describe('app tests', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    afterAll(() => {
        return pool.end();
    });

    it('creates a customer to the database via POST, and returns it', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                last_name: 'Nucera',
                first_name: 'Marco',
                age: 35,
                email: 'marco@gmail.com'
            });

        expect(response.body).toEqual({
            id: '1',
            last_name: 'Nucera',
            first_name: 'Marco',
            age: 35,
            email: 'marco@gmail.com'
        });
    });

    it('retrieves all customers from the database via GET', async () => {

        const customer1 = await Customer.insert({
            last_name: "Nucera",
            first_name: "Marco",
            age: 35,
            email: "marco@gmail.com"
        });

        const customer2 = await Customer.insert({
            last_name: "Moga",
            first_name: "Misty",
            age: 38,
            email: "misty@gmail.com"
        });

        const customer3 = await Customer.insert({
            last_name: "Gerdin",
            first_name: "Matt",
            age: 40,
            email: "matt@gmail.com"
        });

        const response = await request(app)
            .get('/customers')

        expect(response.body).toEqual([customer1, customer2, customer3]);
    });

    it('retrieves a customer by ID from the database via GET, and returns it', async () => {
        const customer1 = await Customer.insert({
            last_name: "Nucera",
            first_name: "Marco",
            age: 35,
            email: "marco@gmail.com"
        });

        const response = await request(app)
            .get(`/customers/${1}`);

        expect(response.body).toEqual({
            id: '1',
            last_name: 'Nucera',
            first_name: 'Marco',
            age: 35,
            email: 'marco@gmail.com'
        });
    });
});