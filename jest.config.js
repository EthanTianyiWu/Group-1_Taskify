module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js',       // 告诉 Jest 测试 src 文件夹下的所有 js 文件
        '!src/db/conn.js',   // 排除数据库连接文件（通常不测）
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'], // 必须要有 lcov，这是给 Codecov 看的
};