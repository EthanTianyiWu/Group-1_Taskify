const crypto = require('crypto');
if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = crypto.webcrypto;
}

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

// 💡 重点：使用 agent 可以像浏览器一样保存 Session 和 Cookie
const agent = request.agent(app);

describe('Taskify Full Coverage Tests', () => {

    beforeAll(async () => {
        // 连接到临时的测试数据库
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test_db');
        // 每次测试前清空数据库，防止“邮箱已存在”的报错干扰
        if (mongoose.connection.db) {
            await mongoose.connection.db.dropDatabase();
        }
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    // === 1. 基础页面与语言切换测试 (GET) ===
    it('should return 200 for landing page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });

    it('should return 200 for signup page', async () => {
        const res = await request(app).get('/signup');
        expect(res.statusCode).toEqual(200);
    });

    it('should return 200 for privacy policy', async () => {
        const res = await request(app).get('/privacy-policy');
        expect(res.statusCode).toEqual(200);
    });

    it('should handle language switch to zh and en', async () => {
        await request(app).get('/?lang=zh');
        const res = await request(app).get('/?lang=en');
        expect(res.statusCode).toEqual(200);
    });

    // === 2. 权限拦截测试 (中间件拦截分支) ===
    it('should redirect unauthenticated users away from dashboard', async () => {
        const res = await request(app).get('/dashboard');
        // 未登录用户应该被重定向(302)，而不是直接看到页面(200)
        expect(res.statusCode).toEqual(302);
    });

    // === 3. 注册逻辑全覆盖 (包含错误分支与成功分支) ===
    it('should fail signup with missing fields', async () => {
        const res = await request(app).post('/signup').send({ username: 'test' });
        expect(res.statusCode).not.toEqual(200); // 期望被拦截
    });

    it('should successfully signup a new user', async () => {
        const res = await agent.post('/signup').send({
            username: 'testuser',
            email: 'test@test.com',
            password: 'password123'
        });
        // 注册成功应该触发重定向或正常返回
        expect(res.statusCode).toBeLessThan(400);
    });

    it('should fail signup if email already exists', async () => {
        const res = await request(app).post('/signup').send({
            username: 'testuser2',
            email: 'test@test.com', // 故意使用刚才注册过的邮箱
            password: 'password123'
        });
        expect(res.statusCode).not.toEqual(200); // 期望触发“用户已存在”报错分支
    });

    // === 4. 登录逻辑全覆盖 (包含错误分支与成功分支) ===
    it('should fail login with wrong password', async () => {
        const res = await request(app).post('/login').send({
            email: 'test@test.com',
            password: 'wrongpassword' // 故意输错密码
        });
        expect(res.statusCode).not.toEqual(200); // 期望触发“密码错误”报错分支
    });

    it('should successfully login existing user', async () => {
        // 使用 agent 登录，这样 agent 就会自动拿到 Session Cookie
        const res = await agent.post('/login').send({
            email: 'test@test.com',
            password: 'password123' // 正确密码
        });
        expect(res.statusCode).toBeLessThan(400);
    });

    // === 5. 仪表盘通行测试 (中间件成功分支) ===
    it('should allow access to dashboard for logged in users', async () => {
        // 因为上一步登录成功了，agent 现在携带着合法的身份
        const res = await agent.get('/dashboard');
        expect(res.statusCode).toEqual(200); // 期望成功看到 Dashboard (200)
    });
});