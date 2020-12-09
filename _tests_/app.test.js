const request = require('supertest');
const app = require('../lib/app');

describe('app tests', () => {
    it('responds with hello', () => {
        return request(app)
            .get('/customers')
            .then(res => {
                expect(res.text).toEqual('hello')
            });
    });
});