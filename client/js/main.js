// 通用工具函数和配置
const CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api', // 确保这个URL正确
    DEFAULT_ERROR_MESSAGE: 'Something went wrong. Please try again later.'
};

// 通用工具函数
class CharityEventsApp {
    // 显示加载状态
    static showLoading(element) {
        element.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
    }

    // 显示错误消息
    static showError(element, message = CONFIG.DEFAULT_ERROR_MESSAGE) {
        element.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Oops!</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn-secondary">Try Again</button>
            </div>
        `;
    }

    // 格式化日期
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // 格式化货币
    static formatCurrency(amount, currency = 'AUD') {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // API请求封装
    static async apiCall(endpoint, options = {}) {
        try {
            const url = `${CONFIG.API_BASE_URL}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Call Error:', error);
            throw error;
        }
    }

    // 获取URL参数
    static getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // 设置页面标题
    static setPageTitle(title) {
        document.title = `${title} - CharityEvents`;
    }
}

// 导航高亮当前页面
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// 导出到全局作用域
window.CharityEventsApp = CharityEventsApp;