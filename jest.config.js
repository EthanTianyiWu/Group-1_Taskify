module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/db/conn.js',
        '!src/cloudinary/**',             // 排除完全没接入的图片上传逻辑
        '!src/routes/dashboard.route.js'  // 排除废弃的路由文件
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
};