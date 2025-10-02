// 搜索页面功能 - 独立版本
class SearchPage {
    constructor() {
        this.API_BASE_URL = 'http://localhost:3000/api';
        this.resultsContainer = document.getElementById('search-results');
        this.init();
    }

    async init() {
        try {
            this.setupEventListeners();
            this.showPlaceholder();
        } catch (error) {
            console.error('Search page initialization error:', error);
        }
    }

    setupEventListeners() {
        const searchForm = document.getElementById('search-form');
        const clearBtn = document.getElementById('clear-btn');

        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleSearch();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }
    }

    async handleSearch() {
        try {
            const formData = new FormData(document.getElementById('search-form'));
            const location = formData.get('location');
            const date = formData.get('date');
            const category = formData.get('category');

            console.log('🔍 Searching events with criteria:', { location, date, category });

            this.showLoading('Searching events...');
            await this.performSearch({ location, date, category });
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Search failed: ' + error.message);
        }
    }

    async performSearch(criteria) {
        try {
            const params = new URLSearchParams();
            
            if (criteria.location) params.append('location', criteria.location);
            if (criteria.date) params.append('date', criteria.date);
            if (criteria.category) params.append('category', criteria.category);

            const url = `${this.API_BASE_URL}/events/search?${params.toString()}`;
            console.log('📡 Search URL:', url);

            const response = await fetch(url);
            console.log('📡 Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const events = await response.json();
            console.log('✅ Search results:', events);

            this.displaySearchResults(events);
        } catch (error) {
            console.error('❌ Search failed:', error);
            throw error;
        }
    }

    displaySearchResults(events) {
        console.log('🎨 Displaying search results:', events);

        if (!events || events.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>🔍 No Events Found</h3>
                    <p>No events match your search criteria.</p>
                    <p>Try adjusting your filters or search terms.</p>
                    <button onclick="searchPage.clearFilters()" class="btn-secondary">Clear Filters</button>
                </div>
            `;
            return;
        }

        let html = '';
        events.forEach(event => {
            const progressPercentage = event.goal_amount > 0 ? 
                Math.min(100, (event.progress_amount / event.goal_amount) * 100) : 0;

            html += `
                <div class="search-result-item">
                    <div class="result-header">
                        <h4>${this.escapeHtml(event.name)}</h4>
                        <span class="event-status ${event.status}">${event.status}</span>
                    </div>
                    <p class="organization"><strong>Organization:</strong> ${this.escapeHtml(event.ngo_name)}</p>
                    <p class="date"><strong>Date:</strong> ${this.formatDate(event.start_date)}</p>
                    <p class="location"><strong>Location:</strong> ${this.escapeHtml(event.location)}</p>
                    <p class="purpose"><strong>Purpose:</strong> ${this.escapeHtml(event.purpose)}</p>
                    
                    <div class="result-footer">
                        <div class="ticket-info">
                            <span class="price">$${event.ticket_price} ${event.currency}</span>
                            ${event.ticket_price === 0 ? '<span class="free-badge">FREE</span>' : ''}
                        </div>
                        
                        ${event.goal_amount > 0 ? `
                            <div class="progress-info">
                                <span class="progress-text">${progressPercentage.toFixed(0)}% funded</span>
                            </div>
                        ` : ''}
                        
                        <a href="event-details.html?id=${event.event_id}" class="btn-view">View Event Details</a>
                    </div>
                </div>
            `;
        });

        this.resultsContainer.innerHTML = html;
    }

    clearFilters() {
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.reset();
        }
        this.showPlaceholder();
        console.log('🧹 Filters cleared');
    }

    showPlaceholder() {
        this.resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <h3>🔍 Search for Charity Events</h3>
                <p>Enter your search criteria above to find charity events that match your interests.</p>
                <div class="search-tips">
                    <p><strong>Search Tips:</strong></p>
                    <ul>
                        <li>Search by location (city, region, or venue)</li>
                        <li>Filter by specific date</li>
                        <li>Combine multiple criteria for precise results</li>
                    </ul>
                </div>
            </div>
        `;
    }

    showLoading(message = 'Searching...') {
        this.resultsContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
                <p>Please wait while we search for events...</p>
            </div>
        `;
    }

    showError(message) {
        this.resultsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Search Error</h3>
                <p>${message}</p>
                <div class="debug-info">
                    <p><strong>Possible solutions:</strong></p>
                    <ol>
                        <li>Check if API server is running on port 3000</li>
                        <li>Verify your internet connection</li>
                        <li>Try simpler search terms</li>
                        <li>Check browser console for detailed errors</li>
                    </ol>
                </div>
                <button onclick="searchPage.clearFilters()" class="btn-secondary">Clear and Try Again</button>
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

// 全局变量，让HTML可以访问
let searchPage;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SearchPage initialized');
    searchPage = new SearchPage();
});