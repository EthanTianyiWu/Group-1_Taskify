// 1. 终极修复：把 Jest 偷偷删掉的 crypto 对象补回来！
const crypto = require('crypto');
if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = crypto.webcrypto;
}

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Taskify Application Tests', () => {

    // 2. 终极修复：测试结束后，强制断开所有数据库连接
    afterAll(async () => {
        await mongoose.disconnect();
    });

    // --- 下面是提升 85%+ 覆盖率的 5 个测试用例 ---

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

    it('should handle language switch to English', async () => {
        const res = await request(app).get('/?lang=en');
        expect(res.statusCode).toEqual(200);
    });

    it('should redirect unauthenticated users away from dashboard', async () => {
        const res = await request(app).get('/dashboard');
        expect(res.statusCode).toEqual(302);
    });
});