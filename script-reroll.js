// リセマラページ専用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    initFaqAccordion();
    
    // Ranking Tabs
    initRankingTabs();
    
    // Reroll Calculator
    initRerollCalculator();
});

// FAQ Accordion機能
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // 現在のアクティブ状態を確認
            const isActive = faqItem.classList.contains('active');
            
            // すべてのFAQアイテムを閉じる
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
                item.querySelector('.faq-toggle').textContent = '+';
            });
            
            // クリックされたアイテムが閉じていた場合は開く
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '−';
            }
        });
    });
}

// ランキングタブ切り替え機能
function initRankingTabs() {
    const rankingTabs = document.querySelectorAll('.ranking-tab');
    const rankingContents = document.querySelectorAll('.ranking-content');
    
    rankingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // すべてのタブから active クラスを削除
            rankingTabs.forEach(t => t.classList.remove('active'));
            
            // クリックされたタブに active クラスを追加
            this.classList.add('active');
            
            // 対応するコンテンツを表示
            const position = this.getAttribute('data-position');
            
            // すべてのコンテンツを非表示
            rankingContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 選択されたポジションのコンテンツを表示
            const selectedContent = document.getElementById(`${position}-ranking`);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        });
    });
}

// リセマラ計算機機能
function initRerollCalculator() {
    const targetProbabilityInput = document.getElementById('targetProbability');
    const attemptCountInput = document.getElementById('attemptCount');
    const successRateSpan = document.getElementById('successRate');
    const expectedAttemptsSpan = document.getElementById('expectedAttempts');
    
    function updateCalculator() {
        if (!targetProbabilityInput || !attemptCountInput) return;
        
        const probability = parseFloat(targetProbabilityInput.value) / 100;
        const attempts = parseInt(attemptCountInput.value);
        
        if (isNaN(probability) || isNaN(attempts) || probability <= 0 || probability > 1 || attempts <= 0) {
            return;
        }
        
        // 成功確率の計算 (1-(1-p)^n)
        const successRate = (1 - Math.pow(1 - probability, attempts)) * 100;
        
        // 期待試行回数 (1/p)
        const expectedAttempts = Math.round(1 / probability);
        
        successRateSpan.textContent = successRate.toFixed(1);
        expectedAttemptsSpan.textContent = expectedAttempts;
    }
    
    if (targetProbabilityInput && attemptCountInput) {
        targetProbabilityInput.addEventListener('input', updateCalculator);
        attemptCountInput.addEventListener('input', updateCalculator);
        updateCalculator(); // 初期計算
    }
}

// スムーズスクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // URLにハッシュを追加（履歴に残す）
            history.pushState(null, null, targetId);
        }
    });
});

// ページ読み込み時にURLハッシュがある場合、該当要素にスクロール
window.addEventListener('load', function() {
    if (location.hash) {
        const targetElement = document.querySelector(location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// リセマラ適正度の更新（実際のアプリでは、サーバーからデータを取得するなどの実装が必要）
function updateRerollSuitability() {
    // 現在の日付を取得
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    
    // 仮の適正度計算（実際のアプリでは、イベント情報やガチャ情報に基づいて計算）
    let suitability = 40; // デフォルト値
    

    
    // 最大100%に制限
    suitability = Math.min(suitability, 100);
    
    // メーターを更新
    const meterFill = document.querySelector('.meter-fill');
    const meterValue = document.querySelector('.meter-value');
    
    if (meterFill && meterValue) {
        meterFill.style.width = `${suitability}%`;
        meterValue.textContent = `${suitability}%`;
        
        // 適正度に応じてメーターの色を変更
        if (suitability >= 80) {
            meterFill.style.background = 'linear-gradient(90deg, #28a745, #7fba00)';
            meterValue.style.color = '#28a745';
        } else if (suitability >= 50) {
            meterFill.style.background = 'linear-gradient(90deg, #ffc107, #ffda44)';
            meterValue.style.color = '#ffc107';
        } else {
            meterFill.style.background = 'linear-gradient(90deg, #dc3545, #ff6b6b)';
            meterValue.style.color = '#dc3545';
        }
    }
}

// ページ読み込み時にリセマラ適正度を更新
window.addEventListener('load', updateRerollSuitability);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('.nav-mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // Implement search functionality here
                // For now, just show an alert
                alert(`検索: "${query}"`);
                // In a real implementation, you would redirect to a search results page
                // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});

// Gacha Calculator
document.addEventListener('DOMContentLoaded', function() {
    const gachaCountInput = document.getElementById('gachaCount');
    const totalEnergySpan = document.getElementById('totalEnergy');
    const expectedSSpan = document.getElementById('expectedS');

    if (gachaCountInput && totalEnergySpan && expectedSSpan) {
        function updateCalculator() {
            const count = parseInt(gachaCountInput.value) || 0;
            const energyPer10 = 2500;
            const energyPerSingle = 250;
            
            let totalEnergy;
            if (count >= 10) {
                const tens = Math.floor(count / 10);
                const singles = count % 10;
                totalEnergy = (tens * energyPer10) + (singles * energyPerSingle);
            } else {
                totalEnergy = count * energyPerSingle;
            }
            
            const expectedS = (count * 0.05).toFixed(1);
            
            totalEnergySpan.textContent = totalEnergy.toLocaleString();
            expectedSSpan.textContent = expectedS;
        }

        gachaCountInput.addEventListener('input', updateCalculator);
        updateCalculator(); // Initial calculation
    }
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #007bff;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Newsletter Subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const email = this.querySelector('input[type="email"]').value;
                
                // Simulate API call
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '登録中...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('ニュースレターの登録が完了しました！');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
});

// Local Storage for User Preferences
const UserPreferences = {
    save: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    },
    
    load: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage not available');
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }
};

// Dark Mode Toggle (if implemented)
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        const isDarkMode = UserPreferences.load('darkMode', false);
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                UserPreferences.save('darkMode', true);
            } else {
                document.body.classList.remove('dark-mode');
                UserPreferences.save('darkMode', false);
            }
        });
    }
});

// Analytics (placeholder for Google Analytics or similar)
function trackEvent(category, action, label = '') {
    // Placeholder for analytics tracking
    console.log('Track Event:', { category, action, label });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: category,
    //         event_label: label
    //     });
    // }
}

// Track clicks on important elements
document.addEventListener('DOMContentLoaded', function() {
    // Track navigation clicks
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Navigation', 'Click', this.textContent.trim());
        });
    });
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Button', 'Click', this.textContent.trim());
        });
    });
    
    // Track external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('External Link', 'Click', this.href);
        });
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Performance Monitoring
document.addEventListener('DOMContentLoaded', function() {
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track performance
        trackEvent('Performance', 'Page Load Time', Math.round(loadTime).toString());
    });
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Utility Functions
const Utils = {
    // Debounce function for search and other inputs
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Format dates
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ja-JP', options);
    },
    
    // Truncate text
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
};

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('プロスピA攻略サイト initialized');
});
