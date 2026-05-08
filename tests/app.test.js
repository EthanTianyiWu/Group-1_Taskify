const request = require('supertest');
const app = require('../src/app'); // 引入你的 app.js

describe('Basic Routes Test', () => {
    it('should return 200 for landing page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
});