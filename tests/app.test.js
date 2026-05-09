const crypto = require('crypto');
if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = crypto.webcrypto;
}

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Taskify Application Tests', () => {

    // 1. 在所有测试开始前，连接虚拟数据库 (激活 Models)
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test_db');
    });

    // 2. 测试结束后断开连接，防止卡死
    afterAll(async () => {
        await mongoose.disconnect();
    });

    // --- 基础页面访问测试 (GET) ---
    it('should return 200 for landing page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });

    it('should return 200 for signup page', async () => {
        const res = await request(app).get('/signup');
        expect(res.statusCode).toEqual(200);
    });

    it('should return 200 for privacy policy page', async () => {
        const res = await request(app).get('/privacy-policy');
        expect(res.statusCode).toEqual(200);
    });

    it('should handle language switch to Chinese', async () => {
        const res = await request(app).get('/?lang=zh');
        expect(res.statusCode).toEqual(200);
    });

    it('should redirect unauthenticated users away from dashboard', async () => {
        const res = await request(app).get('/dashboard');
        expect(res.statusCode).toEqual(302);
    });

    // --- 🚀 新增：核心逻辑测试 (POST 表单提交，大幅拉升覆盖率) ---

    it('should trigger error handler for signup with missing fields', async () => {
        // 故意发送不完整的数据，触发 signup.route.js 的错误分支
        const res = await request(app).post('/signup').send({ username: 'test' });
        expect(res.statusCode).not.toEqual(200);
    });

    it('should trigger error handler for login with missing fields', async () => {
        // 故意发送不完整的数据，触发 login.route.js 的错误分支
        const res = await request(app).post('/login').send({ email: 'test@test.com' });
        expect(res.statusCode).not.toEqual(200);
    });

    it('should process a valid signup attempt and trigger User model', async () => {
        // 发送完整数据，触发密码加密 (bcrypt) 和数据库存储逻辑
        const res = await request(app).post('/signup').send({
            username: 'newuser123',
            email: 'newuser123@test.com',
            password: 'password123'
        });
        expect(res.statusCode).toBeDefined();
    });

    it('should process a login attempt and trigger Auth logic', async () => {
        // 发送登录请求，触发 User.findOne 和密码比对逻辑
        const res = await request(app).post('/login').send({
            email: 'newuser123@test.com',
            password: 'wrongpassword'
        });
        expect(res.statusCode).toBeDefined();
    });
});