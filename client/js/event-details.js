// 活动详情页面功能 - 独立版本
class EventDetailsPage {
    constructor() {
        this.API_BASE_URL = 'http://localhost:3000/api';
        this.detailsContainer = document.getElementById('event-details');
        this.init();
    }

    async init() {
        try {
            const eventId = this.getEventIdFromURL();
            if (eventId) {
                await this.loadEventDetails(eventId);
                this.setupEventListeners();
            } else {
                this.showError('No event ID specified in URL.');
            }
        } catch (error) {
            console.error('Event details page error:', error);
            this.showError('Failed to load event details: ' + error.message);
        }
    }

    getEventIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async loadEventDetails(eventId) {
        try {
            console.log('🔍 Loading event details for ID:', eventId);
            this.showLoading('Loading event details...');

            const response = await fetch(`${this.API_BASE_URL}/events/${eventId}`);
            console.log('📡 Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const event = await response.json();
            console.log('✅ Event details loaded:', event);

            this.displayEventDetails(event);
        } catch (error) {
            console.error('❌ Error loading event details:', error);
            throw error;
        }
    }

    displayEventDetails(event) {
        console.log('🎨 Displaying event details:', event);

        const progressPercentage = event.goal_amount > 0 ? 
            Math.min(100, (event.progress_amount / event.goal_amount) * 100) : 0;

        const html = `
            <div class="event-header">
                <h1>${this.escapeHtml(event.name)}</h1>
                <p class="organization">Organized by: ${this.escapeHtml(event.ngo_name)}</p>
                <span class="event-status-large ${event.status}">${event.status.toUpperCase()}</span>
            </div>
            
            <div class="event-info-grid">
                <div class="info-card">
                    <h3>📅 Date & Time</h3>
                    <p><strong>Starts:</strong> ${this.formatDate(event.start_date)}</p>
                    ${event.end_date ? `<p><strong>Ends:</strong> ${this.formatDate(event.end_date)}</p>` : ''}
                </div>
                
                <div class="info-card">
                    <h3>📍 Location</h3>
                    <p>${this.escapeHtml(event.location)}</p>
                </div>
                
                <div class="info-card">
                    <h3>🎫 Ticket Information</h3>
                    <p class="ticket-price">$${event.ticket_price} ${event.currency}</p>
                    ${event.ticket_price === 0 ? '<p class="free-badge-large">FREE EVENT</p>' : ''}
                    <p><small>All proceeds go to charity</small></p>
                </div>
            </div>
            
            <div class="event-description">
                <h3>About This Event</h3>
                <p>${this.escapeHtml(event.full_description || event.purpose)}</p>
            </div>
            
            ${event.goal_amount > 0 ? `
                <div class="fundraising-progress">
                    <h3>Fundraising Progress</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <p class="progress-text">
                        $${event.progress_amount} raised of $${event.goal_amount} goal
                        (${progressPercentage.toFixed(1)}%)
                    </p>
                </div>
            ` : ''}
            
            <div class="organization-contact">
                <h3>Contact the Organizer</h3>
                <p><strong>Email:</strong> ${event.contact_email}</p>
                <p><strong>Headquarters:</strong> ${event.hq_location}</p>
            </div>
        `;

        this.detailsContainer.innerHTML = html;
    }

    setupEventListeners() {
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                this.showRegistrationModal();
            });
        }
    }

    showRegistrationModal() {
        alert('This feature is currently under construction.\n\nIn the final version, this would allow users to register for the event and purchase tickets.');
    }

    showLoading(message = 'Loading...') {
        this.detailsContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
                <p>Please wait while we load the event details...</p>
            </div>
        `;
    }

    showError(message) {
        this.detailsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Error Loading Event</h3>
                <p>${message}</p>
                <div class="debug-info">
                    <p><strong>What to do:</strong></p>
                    <ol>
                        <li>Check if the event ID is correct</li>
                        <li>Ensure API server is running</li>
                        <li>Try going back to the <a href="index.html">homepage</a></li>
                        <li>Check browser console for detailed errors</li>
                    </ol>
                </div>
                <div class="action-buttons">
                    <a href="index.html" class="btn-primary">Back to Home</a>
                    <a href="search.html" class="btn-secondary">Search Events</a>
                </div>
            </div>
        `;
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
    console.log('🚀 EventDetailsPage initialized');
    new EventDetailsPage();
});