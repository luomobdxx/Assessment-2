// 首页特定功能 - 独立版本
class HomePage {
    constructor() {
        this.eventsContainer = document.getElementById('events-container');
        this.API_BASE_URL = 'http://localhost:3000/api';
        this.init();
    }

    async init() {
        try {
            this.showLoading('Loading events from API...');
            await this.loadEvents();
        } catch (error) {
            this.showError('Failed to load events: ' + error.message);
        }
    }

    async loadEvents() {
        try {
            console.log('🔍 Fetching events from API...');
            
            const response = await fetch(`${this.API_BASE_URL}/events`);
            console.log('📡 Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const events = await response.json();
            console.log('✅ Received events:', events);
            
            this.displayEvents(events);
        } catch (error) {
            console.error('❌ Error loading events:', error);
            throw error;
        }
    }

    displayEvents(events) {
        console.log('🎨 Displaying events:', events);
        
        if (!events || events.length === 0) {
            this.eventsContainer.innerHTML = `
                <div class="no-events">
                    <h3>📅 No Upcoming Events</h3>
                    <p>No events found in the database.</p>
                    <p>Please check:</p>
                    <ul>
                        <li>API server is running on port 3000</li>
                        <li>Database has active events</li>
                        <li>Check browser console for errors</li>
                    </ul>
                </div>
            `;
            return;
        }

        let html = '';
        events.forEach(event => {
            const progressPercentage = event.goal_amount > 0 ? 
                Math.min(100, (event.progress_amount / event.goal_amount) * 100) : 0;
            
            html += `
                <div class="event-card">
                    <div class="event-card-header">
                        <h3>${this.escapeHtml(event.name)}</h3>
                        <span class="event-status ${event.status}">${event.status}</span>
                    </div>
                    
                    <div class="event-card-body">
                        <p class="organization">By: ${this.escapeHtml(event.ngo_name)}</p>
                        <p class="date">📅 ${this.formatDate(event.start_date)}</p>
                        <p class="location">📍 ${this.escapeHtml(event.location)}</p>
                        <p class="purpose">${this.escapeHtml(event.purpose)}</p>
                        
                        <div class="event-card-footer">
                            <div class="ticket-info">
                                <span class="price">$${event.ticket_price} ${event.currency}</span>
                                ${event.ticket_price === 0 ? '<span class="free-badge">FREE</span>' : ''}
                            </div>
                            
                            ${event.goal_amount > 0 ? `
                                <div class="progress-mini">
                                    <div class="progress-bar-mini">
                                        <div class="progress-fill-mini" style="width: ${progressPercentage}%"></div>
                                    </div>
                                    <span class="progress-text-mini">${progressPercentage.toFixed(0)}% funded</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="event-card-actions">
                        <a href="event-details.html?id=${event.event_id}" class="btn-details">View Details</a>
                    </div>
                </div>
            `;
        });
        
        this.eventsContainer.innerHTML = html;
    }

    formatDate(dateString) {
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

    showLoading(message = 'Loading...') {
        this.eventsContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
                <div class="debug-info">
                    <p>API URL: ${this.API_BASE_URL}/events</p>
                    <p>If this takes too long, check if API server is running.</p>
                </div>
            </div>
        `;
    }

    showError(message) {
        this.eventsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ API Connection Error</h3>
                <p>${message}</p>
                <div class="debug-info">
                    <p><strong>Troubleshooting steps:</strong></p>
                    <ol>
                        <li>Ensure API server is running: <code>node server.js</code> in api folder</li>
                        <li>Test API directly: <a href="http://localhost:3000/api/events" target="_blank">http://localhost:3000/api/events</a></li>
                        <li>Check browser console (F12) for detailed errors</li>
                        <li>Verify database connection</li>
                    </ol>
                </div>
                <button onclick="location.reload()" class="btn-secondary">Try Again</button>
            </div>
        `;
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 HomePage initialized');
    new HomePage();
});