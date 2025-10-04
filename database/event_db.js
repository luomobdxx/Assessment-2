const mysql = require('mysql2');

// 创建数据库连接（简化版，确保能连接）
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // 如果没密码就留空，有密码就填写
    database: 'charityevents_db'
});

// 测试连接
connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed: ' + err.message);
        return;
    }
    console.log('✅ Connected to MySQL database as id ' + connection.threadId);
});

// 导出连接
module.exports = connection;