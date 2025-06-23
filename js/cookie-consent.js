class CookieConsent {
    constructor() {
        this.cookieName = 'atl_cookie_consent';
        this.cookieExpiry = 365;
        this.cookieTypes = {
            essential: true, // Her zaman aktif
            analytics: false,
            marketing: false,
            preferences: false
        };
        this.init();
    }

    init() {
        if (!this.getCookie(this.cookieName)) {
            this.showBanner();
        }
    }

    showBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-icon">
                    <img src="img/AtlCargo.png" alt="ATL Logo" style="width: 80px; height: auto; border-radius: 100%;">
                </div>
                <div class="cookie-text">
                    <h3>We Value Your Privacy</h3>
                    <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies.</p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn settings-btn">Cookie Settings</button>
                    <button class="cookie-btn accept-btn">Accept All</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        
        setTimeout(() => {
            banner.classList.add('active');
        }, 100);

        banner.querySelector('.accept-btn').addEventListener('click', () => {
            this.acceptAll();
            this.hideBanner(banner);
        });

        banner.querySelector('.settings-btn').addEventListener('click', () => {
            this.showSettings(banner);
        });
    }

    showSettings(banner) {
        const settings = document.createElement('div');
        settings.className = 'cookie-settings';
        settings.innerHTML = `
            <div class="settings-content">
                <div class="settings-header">
                    <h3>Cookie Settings</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="settings-body">
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Essential Cookies</h4>
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                    </div>
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Analytics Cookies</h4>
                            <label class="switch">
                                <input type="checkbox" name="analytics">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <p>These cookies allow us to analyze site traffic to improve user experience.</p>
                    </div>
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Marketing Cookies</h4>
                            <label class="switch">
                                <input type="checkbox" name="marketing">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <p>These cookies are used to deliver personalized advertisements.</p>
                    </div>
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Preference Cookies</h4>
                            <label class="switch">
                                <input type="checkbox" name="preferences">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <p>These cookies remember your preferences for tools found on our website.</p>
                    </div>
                </div>
                <div class="settings-footer">
                    <button class="cookie-btn settings-save">Save Preferences</button>
                </div>
            </div>
        `;

        document.body.appendChild(settings);
        
        setTimeout(() => {
            settings.classList.add('active');
        }, 100);

        // Event Listeners
        settings.querySelector('.close-btn').addEventListener('click', () => {
            this.hideSettings(settings);
        });

        settings.querySelector('.settings-save').addEventListener('click', () => {
            this.savePreferences(settings);
            this.hideSettings(settings);
            this.hideBanner(banner);
        });
    }

    hideSettings(settings) {
        settings.classList.remove('active');
        setTimeout(() => {
            settings.remove();
        }, 500);
    }

    savePreferences(settings) {
        const preferences = {
            essential: true
        };
        
        ['analytics', 'marketing', 'preferences'].forEach(type => {
            preferences[type] = settings.querySelector(`input[name="${type}"]`).checked;
        });

        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
    }

    hideBanner(banner) {
        banner.classList.remove('active');
        setTimeout(() => {
            banner.remove();
        }, 500);
    }

    acceptAll() {
        const allAccepted = {
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        this.setCookie(this.cookieName, JSON.stringify(allAccepted), this.cookieExpiry);
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
} 