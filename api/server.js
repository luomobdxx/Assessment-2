const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/events');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors()); // 允许所有跨域请求
app.use(express.json());

// 路由
app.use('/api/events', eventRoutes);

// 健康检查端点
app.get('/', (req, res) => {
    res.json({ 
        message: 'Charity Events API is running!',
        endpoints: {
            all_events: 'GET /api/events',
            search: 'GET /api/events/search?location=xxx&date=xxx',
            event_details: 'GET /api/events/1'
        },
        timestamp: new Date().toISOString()
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log('🚀 Charity Events API Server Started!');
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🏠 Homepage: http://localhost:${PORT}/`);
    console.log('\n📝 Available API Endpoints:');
    console.log('   GET /api/events           - Get all events');
    console.log('   GET /api/events/search    - Search events');
    console.log('   GET /api/events/:id       - Get event details');
});