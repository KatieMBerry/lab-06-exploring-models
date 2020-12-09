require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const fs = require('fs');
const Customer = require('../lib/models/Customer')


describe('app tests', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    afterEach(() => {
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
});