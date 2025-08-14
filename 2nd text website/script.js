// Global Variables
let currentPage = 1;
let articlesPerPage = 20;
let currentCategory = 'all';
let currentView = 'grid';
let allArticles = [];
let filteredArticles = [];
let isLoading = false;

// DOM Elements
const articlesGrid = document.getElementById('articlesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const loadingOverlay = document.getElementById('loadingOverlay');
const backToTopBtn = document.getElementById('backToTop');
const categoryBtns = document.querySelectorAll('.category-btn');
const viewToggles = document.querySelectorAll('.view-toggle');
const exploreBtn = document.getElementById('exploreBtn');
const trendingBtn = document.getElementById('trendingBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
const subscribeBtn = document.getElementById('subscribeBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    loadThemePreference();
    showLoading();
    generateArticlesData();
    initializeEventListeners();
    // Initialize filtered articles to show all articles initially
    filteredArticles = [...allArticles];
    loadArticles();
    setTimeout(() => {
        hideLoading();
    }, 2000);
}

// Generate comprehensive articles data with diverse topics
function generateArticlesData() {
    const categories = ['technology', 'programming', 'ai', 'webdev', 'mobile', 'cybersecurity', 'datascience', 'cloud', 'blockchain', 'iot'];
    const authors = [
        'Sarah Chen', 'Alex Rodriguez', 'Emma Thompson', 'Michael Kim', 'Lisa Wang',
        'David Johnson', 'Maria Garcia', 'James Wilson', 'Anna Lee', 'Robert Brown',
        'Jennifer Davis', 'Christopher Miller', 'Amanda Taylor', 'Daniel Anderson',
        'Jessica Martinez', 'Kevin Thompson', 'Rachel White', 'Steven Clark',
        'Emily Chen', 'Marcus Rodriguez', 'Sophia Kim', 'Lucas Wang', 'Isabella Brown'
    ];
    
    // Comprehensive article templates for different categories
    const articleTemplates = {
        mobile: [
            {
                title: 'iOS 18 Development: What\'s New for Developers',
                excerpt: 'Explore the latest iOS 18 features, including enhanced privacy controls, improved performance, and new development APIs that will revolutionize mobile app development.',
                content: 'iOS 18 brings groundbreaking changes for developers, including enhanced privacy controls, improved performance optimization, and new development APIs. Learn how to leverage these features in your next mobile application.',
                tags: ['iOS', 'Mobile Development', 'Apple', 'Swift', 'Privacy']
            },
            {
                title: 'Android 15: Material You Design System Deep Dive',
                excerpt: 'Master the new Material You design system in Android 15, including dynamic color theming, enhanced accessibility features, and improved user experience guidelines.',
                content: 'Android 15 introduces the revolutionary Material You design system, featuring dynamic color theming, enhanced accessibility features, and improved user experience guidelines. This comprehensive guide covers everything developers need to know.',
                tags: ['Android', 'Material Design', 'UI/UX', 'Kotlin', 'Accessibility']
            },
            {
                title: 'React Native vs Flutter: Performance Comparison 2025',
                excerpt: 'Detailed performance analysis of React Native and Flutter frameworks, including benchmarks, real-world case studies, and recommendations for choosing the right framework.',
                content: 'This comprehensive comparison analyzes React Native and Flutter performance in 2025, including detailed benchmarks, real-world case studies, and expert recommendations for choosing the right cross-platform framework.',
                tags: ['React Native', 'Flutter', 'Cross-Platform', 'Performance', 'Mobile']
            },
            {
                title: 'Mobile App Security: Best Practices for 2025',
                excerpt: 'Essential security practices for mobile app development, covering authentication, data encryption, API security, and compliance with latest privacy regulations.',
                content: 'Mobile app security is more critical than ever. This guide covers essential security practices including secure authentication, data encryption, API security, and compliance with the latest privacy regulations like GDPR and CCPA.',
                tags: ['Mobile Security', 'Authentication', 'Encryption', 'Privacy', 'Compliance']
            },
            {
                title: '5G and Mobile App Development: Opportunities and Challenges',
                excerpt: 'How 5G technology is transforming mobile app development, enabling new features like AR/VR, real-time streaming, and IoT integration.',
                content: '5G technology is revolutionizing mobile app development by enabling new features like AR/VR experiences, real-time streaming, and seamless IoT integration. Discover the opportunities and challenges this presents for developers.',
                tags: ['5G', 'Mobile Development', 'AR/VR', 'IoT', 'Real-time']
            }
        ],
        cybersecurity: [
            {
                title: 'Zero-Day Vulnerabilities: Detection and Prevention Strategies',
                excerpt: 'Comprehensive guide to understanding, detecting, and preventing zero-day vulnerabilities in modern software applications and systems.',
                content: 'Zero-day vulnerabilities pose significant threats to modern software systems. This comprehensive guide covers detection methods, prevention strategies, and incident response procedures to protect your applications.',
                tags: ['Cybersecurity', 'Zero-Day', 'Vulnerabilities', 'Detection', 'Prevention']
            },
            {
                title: 'API Security: Protecting Your Digital Assets',
                excerpt: 'Essential API security practices including authentication, authorization, rate limiting, and protection against common attack vectors.',
                content: 'APIs are the backbone of modern applications, making their security crucial. Learn essential practices including secure authentication, proper authorization, rate limiting, and protection against common attack vectors.',
                tags: ['API Security', 'Authentication', 'Authorization', 'Rate Limiting', 'Security']
            },
            {
                title: 'Social Engineering Attacks: Human Factor in Cybersecurity',
                excerpt: 'Understanding social engineering attacks, common techniques, and strategies to train employees and users against these threats.',
                content: 'Social engineering attacks exploit human psychology rather than technical vulnerabilities. Learn about common techniques, real-world examples, and strategies to train employees and users against these sophisticated threats.',
                tags: ['Social Engineering', 'Human Factor', 'Training', 'Awareness', 'Cybersecurity']
            },
            {
                title: 'Blockchain Security: Beyond Cryptocurrency',
                excerpt: 'Exploring blockchain security applications in supply chain management, digital identity, and decentralized systems.',
                content: 'Blockchain technology offers more than just cryptocurrency. Discover its security applications in supply chain management, digital identity verification, and decentralized systems, along with the security challenges and solutions.',
                tags: ['Blockchain', 'Supply Chain', 'Digital Identity', 'Decentralized', 'Security']
            },
            {
                title: 'Cloud Security: Shared Responsibility Model',
                excerpt: 'Understanding the shared responsibility model in cloud security and implementing proper security measures for cloud-based applications.',
                content: 'Cloud security follows a shared responsibility model between providers and customers. Learn how to implement proper security measures for cloud-based applications and understand your responsibilities in this partnership.',
                tags: ['Cloud Security', 'Shared Responsibility', 'AWS', 'Azure', 'GCP']
            }
        ],
        programming: [
            {
                title: 'Python 3.12: New Features and Performance Improvements',
                excerpt: 'Explore the latest Python 3.12 features including improved error messages, performance optimizations, and new language constructs.',
                content: 'Python 3.12 introduces significant improvements including better error messages, performance optimizations, and new language constructs. This guide covers all the new features and how to leverage them in your projects.',
                tags: ['Python', 'Python 3.12', 'Performance', 'New Features', 'Programming']
            },
            {
                title: 'JavaScript ES2025: What\'s Coming Next',
                excerpt: 'Preview of upcoming JavaScript features including decorators, pipeline operator, and improved module system.',
                content: 'JavaScript ES2025 brings exciting new features including decorators, the pipeline operator, and an improved module system. Get ahead of the curve by learning these features before they become standard.',
                tags: ['JavaScript', 'ES2025', 'ES6+', 'Modern JS', 'Web Development']
            },
            {
                title: 'Rust for Web Development: Building Fast and Safe Applications',
                excerpt: 'How to use Rust for web development, including frameworks like Actix-web and integration with modern web technologies.',
                content: 'Rust is revolutionizing web development with its focus on safety and performance. Learn how to build fast and secure web applications using Rust frameworks like Actix-web and integrate with modern web technologies.',
                tags: ['Rust', 'Web Development', 'Actix-web', 'Performance', 'Safety']
            },
            {
                title: 'Go Programming: Building Microservices at Scale',
                excerpt: 'Master Go programming for building scalable microservices, including best practices, testing strategies, and deployment patterns.',
                content: 'Go is ideal for building scalable microservices. This comprehensive guide covers Go programming best practices, testing strategies, deployment patterns, and real-world examples of successful microservice architectures.',
                tags: ['Go', 'Microservices', 'Scalability', 'Testing', 'Deployment']
            },
            {
                title: 'TypeScript 5.0: Advanced Type System Features',
                excerpt: 'Deep dive into TypeScript 5.0 advanced features including template literal types, mapped types, and conditional types.',
                content: 'TypeScript 5.0 introduces powerful advanced type system features. Master template literal types, mapped types, conditional types, and other advanced concepts to write more robust and maintainable code.',
                tags: ['TypeScript', 'Type System', 'Advanced Features', 'Type Safety', 'JavaScript']
            }
        ],
        ai: [
            {
                title: 'Large Language Models: Architecture and Applications',
                excerpt: 'Understanding the architecture of large language models and their practical applications in modern software development.',
                content: 'Large language models are transforming software development. Learn about their architecture, training processes, and practical applications in code generation, documentation, and software testing.',
                tags: ['AI', 'LLM', 'Machine Learning', 'Code Generation', 'Software Development']
            },
            {
                title: 'Computer Vision with PyTorch: From Basics to Advanced',
                excerpt: 'Comprehensive guide to computer vision using PyTorch, including image classification, object detection, and segmentation.',
                content: 'Master computer vision with PyTorch through this comprehensive guide. Learn image classification, object detection, segmentation, and advanced techniques for building intelligent visual applications.',
                tags: ['Computer Vision', 'PyTorch', 'Deep Learning', 'Image Processing', 'AI']
            },
            {
                title: 'Natural Language Processing: Building Chatbots and Assistants',
                excerpt: 'Practical guide to building intelligent chatbots and virtual assistants using modern NLP techniques and frameworks.',
                content: 'Build intelligent chatbots and virtual assistants using modern NLP techniques. This practical guide covers intent recognition, entity extraction, dialogue management, and integration with popular frameworks.',
                tags: ['NLP', 'Chatbots', 'Virtual Assistants', 'Intent Recognition', 'AI']
            },
            {
                title: 'Machine Learning in Production: MLOps Best Practices',
                excerpt: 'Essential MLOps practices for deploying and maintaining machine learning models in production environments.',
                content: 'Deploying machine learning models in production requires robust MLOps practices. Learn about model versioning, monitoring, retraining pipelines, and infrastructure management for successful ML deployments.',
                tags: ['MLOps', 'Machine Learning', 'Production', 'Deployment', 'Monitoring']
            },
            {
                title: 'AI Ethics: Responsible Development and Deployment',
                excerpt: 'Understanding AI ethics, bias detection, fairness, and responsible development practices for AI systems.',
                content: 'AI ethics is crucial for responsible development. Learn about bias detection, fairness metrics, transparency, and responsible deployment practices to ensure your AI systems benefit society ethically.',
                tags: ['AI Ethics', 'Bias Detection', 'Fairness', 'Responsible AI', 'Transparency']
            }
        ],
        webdev: [
            {
                title: 'Next.js 15: App Router and Server Components Deep Dive',
                excerpt: 'Master the new App Router and Server Components in Next.js 15 for building modern, performant web applications.',
                content: 'Next.js 15 introduces revolutionary features with the App Router and Server Components. Learn how to build modern, performant web applications using these cutting-edge technologies.',
                tags: ['Next.js', 'React', 'App Router', 'Server Components', 'Web Development']
            },
            {
                title: 'Web Performance: Core Web Vitals and Optimization',
                excerpt: 'Master Core Web Vitals optimization for better user experience, SEO rankings, and website performance.',
                content: 'Core Web Vitals are crucial for user experience and SEO. Learn optimization techniques for Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) to improve your website performance.',
                tags: ['Web Performance', 'Core Web Vitals', 'SEO', 'Optimization', 'User Experience']
            },
            {
                title: 'Progressive Web Apps: Building the Future of Web',
                excerpt: 'Complete guide to building Progressive Web Apps with offline functionality, push notifications, and app-like experience.',
                content: 'Progressive Web Apps combine the best of web and mobile. Learn to build PWAs with offline functionality, push notifications, and app-like experiences that rival native applications.',
                tags: ['PWA', 'Progressive Web Apps', 'Offline', 'Push Notifications', 'Web Development']
            },
            {
                title: 'CSS Grid and Flexbox: Modern Layout Techniques',
                excerpt: 'Master modern CSS layout techniques using Grid and Flexbox for responsive, flexible web designs.',
                content: 'Modern CSS layout techniques using Grid and Flexbox enable responsive, flexible web designs. Learn advanced layout patterns, responsive design strategies, and best practices for modern web development.',
                tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Responsive Design']
            },
            {
                title: 'Web Accessibility: Building Inclusive Websites',
                excerpt: 'Essential accessibility practices for building websites that work for all users, including those with disabilities.',
                content: 'Web accessibility ensures your websites work for all users. Learn essential practices including semantic HTML, ARIA labels, keyboard navigation, and testing tools to build inclusive web experiences.',
                tags: ['Accessibility', 'WCAG', 'ARIA', 'Semantic HTML', 'Inclusive Design']
            }
        ]
    };

    allArticles = [];
    
    // Generate articles for each category
    Object.keys(articleTemplates).forEach(category => {
        const templates = articleTemplates[category];
        templates.forEach((template, index) => {
            const article = {
                id: allArticles.length + 1,
                title: template.title,
                excerpt: template.excerpt,
                content: template.content,
                author: authors[Math.floor(Math.random() * authors.length)],
                category: category,
                tags: template.tags,
                publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                readTime: Math.floor(Math.random() * 15) + 5,
                views: Math.floor(Math.random() * 10000) + 100,
                likes: Math.floor(Math.random() * 500) + 10,
                comments: Math.floor(Math.random() * 100) + 5,
                featured: Math.random() > 0.8,
                trending: Math.random() > 0.9
            };
            allArticles.push(article);
        });
    });

    // Generate additional random articles to reach target
    const additionalTitles = [
        'The Future of Quantum Computing in Software Development',
        'Edge Computing: Bringing Intelligence Closer to Users',
        'DevOps Automation: CI/CD Pipeline Best Practices',
        'Database Optimization: Performance Tuning Strategies',
        'API Gateway Design: Security and Scalability',
        'Container Orchestration with Kubernetes',
        'Serverless Architecture: Benefits and Trade-offs',
        'GraphQL vs REST: Choosing the Right API Design',
        'WebAssembly: The Future of Web Performance',
        'Micro Frontends: Building Scalable Frontend Architectures',
        'Data Privacy: GDPR Compliance in Modern Applications',
        'Real-time Communication: WebSocket and Server-Sent Events',
        'Testing Strategies: Unit, Integration, and E2E Testing',
        'Code Review Best Practices for Development Teams',
        'Software Architecture Patterns: From Monolith to Microservices',
        'Performance Monitoring: Tools and Techniques',
        'Security Headers: Protecting Your Web Applications',
        'Content Delivery Networks: Optimizing Global Performance',
        'Database Migration Strategies: Zero-Downtime Deployments',
        'API Rate Limiting: Protecting Your Services'
    ];

    for (let i = allArticles.length; i < 1000000; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const title = additionalTitles[Math.floor(Math.random() * additionalTitles.length)] + ` - Part ${Math.floor(i / 20) + 1}`;
        const author = authors[Math.floor(Math.random() * authors.length)];
        const readTime = Math.floor(Math.random() * 15) + 5;
        const views = Math.floor(Math.random() * 10000) + 100;
        const likes = Math.floor(Math.random() * 500) + 10;
        const comments = Math.floor(Math.random() * 100) + 5;
        
        const article = {
            id: i + 1,
            title: title,
            excerpt: `Explore the latest developments in ${category} and discover how they're shaping the future of technology. This comprehensive guide covers everything you need to know about ${category} trends, best practices, and practical applications.`,
            content: `This in-depth article explores the latest developments in ${category} and how they're shaping the future of technology. We'll cover trends, best practices, practical applications, and real-world examples that demonstrate the power and potential of modern ${category} solutions.`,
            author: author,
            category: category,
            tags: [category, 'Technology', 'Development', 'Innovation', 'Best Practices'],
            publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            readTime: readTime,
            views: views,
            likes: likes,
            comments: comments,
            featured: Math.random() > 0.95,
            trending: Math.random() > 0.98
        };
        allArticles.push(article);
    }

    console.log(`Generated ${allArticles.length} articles`);
}

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Initialize event listeners
function initializeEventListeners() {
    loadMoreBtn.addEventListener('click', loadMoreArticles);
    searchBtn.addEventListener('click', openSearch);
    closeSearch.addEventListener('click', closeSearchOverlay);
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchInput.addEventListener('keydown', handleSearchKeydown);
    themeToggle.addEventListener('click', toggleTheme);
    menuToggle.addEventListener('click', toggleMobileMenu);

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => filterByCategory(btn.dataset.category));
    });

    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', () => changeView(toggle.dataset.view));
    });

    exploreBtn.addEventListener('click', () => {
        document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
    });

    trendingBtn.addEventListener('click', () => {
        filterByCategory('trending');
        document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
    });

    subscribeBtn.addEventListener('click', handleNewsletterSubscription);
    backToTopBtn.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveNavLink);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearchOverlay();
        }
    });

    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Loading functions
function showLoading() {
    loadingOverlay.classList.add('active');
    updateLoadingText();
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function updateLoadingText() {
    const loadingTexts = [
        'Loading amazing content...',
        'Preparing your tech journey...',
        'Setting up the perfect experience...',
        'Almost ready...',
        'Welcome to TechBlog!'
    ];
    const loadingText = document.querySelector('.loading-text');
    let currentIndex = 0;
    const interval = setInterval(() => {
        if (loadingOverlay.classList.contains('active')) {
            loadingText.textContent = loadingTexts[currentIndex];
            currentIndex = (currentIndex + 1) % loadingTexts.length;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

// Load articles with skeleton loading
function loadArticles() {
    if (isLoading) return;
    isLoading = true;
    showSkeletonLoading();

    setTimeout(() => {
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const articlesToShow = filteredArticles.slice(startIndex, endIndex);

        if (currentPage === 1) {
            articlesGrid.innerHTML = '';
            if (articlesToShow.length === 0) {
                articlesGrid.innerHTML = '<p class="no-results">No articles found for this category.</p>';
                loadMoreBtn.style.display = 'none';
                hideSkeletonLoading();
                isLoading = false;
                return;
            }
        }

        articlesToShow.forEach(article => {
            const articleCard = createArticleCard(article);
            articleCard.classList.add('newly-loaded');
            articlesGrid.appendChild(articleCard);
        });

        if (endIndex >= filteredArticles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }

        hideSkeletonLoading();
        isLoading = false;
        animateNewCards('.newly-loaded');
    }, 800);
}

// Skeleton Loading UI
function showSkeletonLoading() {
    const skeletonCards = [];
    for (let i = 0; i < articlesPerPage; i++) {
        skeletonCards.push(createSkeletonCard());
    }
    if (currentPage === 1) {
        articlesGrid.innerHTML = '';
    }
    skeletonCards.forEach(card => {
        articlesGrid.appendChild(card);
    });
}

function hideSkeletonLoading() {
    const skeletonCards = articlesGrid.querySelectorAll('.skeleton-card');
    skeletonCards.forEach(card => card.remove());
}

function createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = `
        <div class="skeleton-image skeleton"></div>
        <div class="skeleton-content">
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-text skeleton"></div>
        </div>
    `;
    return card;
}

// Article Card Creation
function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = `article-card ${currentView === 'list' ? 'list-view' : ''}`;
    card.dataset.category = article.category;
    const date = new Date(article.publishDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });

    card.innerHTML = `
        <img src="https://picsum.photos/800/400?random=${article.id}" alt="${article.title}" class="article-image" loading="lazy">
        <div class="article-content">
            <div class="article-meta">
                <span class="article-category">${article.category}</span>
                <span class="article-date">${date}</span>
                <span class="article-read-time">${article.readTime} min read</span>
            </div>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-footer">
                <div class="article-stats">
                    <span class="stat"><i class="fas fa-eye"></i> ${formatNumber(article.views)}</span>
                    <span class="stat"><i class="fas fa-heart"></i> ${formatNumber(article.likes)}</span>
                    <span class="stat"><i class="fas fa-comment"></i> ${formatNumber(article.comments)}</span>
                </div>
            </div>
        </div>
    `;

    card.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A' || event.target.closest('button, a')) {
            return;
        }
        const articleContext = {
            article,
            currentCategory,
            currentPage,
            scrollPosition: window.scrollY
        };
        sessionStorage.setItem('articleContext', JSON.stringify(articleContext));
        window.location.href = `article-page.html?id=${article.id}`;
    });

    return card;
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Core Functionality
function loadMoreArticles() {
    currentPage++;
    loadArticles();
}

function filterByCategory(category) {
    currentCategory = category;
    currentPage = 1;

    categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    if (category === 'all') {
        filteredArticles = [...allArticles];
    } else if (category === 'trending') {
        filteredArticles = allArticles.filter(article => article.trending);
    } else {
        filteredArticles = allArticles.filter(article => article.category === category);
    }

    loadArticles();
    document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
}

function changeView(view) {
    currentView = view;
    viewToggles.forEach(toggle => {
        toggle.classList.toggle('active', toggle.dataset.view === view);
    });
    articlesGrid.querySelectorAll('.article-card').forEach(card => {
        card.classList.toggle('list-view', view === 'list');
    });
}

// Search Functionality
function openSearch() {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
    document.body.style.overflow = 'hidden';
}

function closeSearchOverlay() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    document.body.style.overflow = '';
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 1) {
        searchResults.innerHTML = '';
        return;
    }
    const results = allArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
    ).slice(0, 10);
    displaySearchResults(results);
}

function handleSearchKeydown(e) {
    if (e.key === 'Enter' && searchResults.children.length > 0) {
        const firstResult = searchResults.querySelector('.search-result-item');
        if (firstResult) {
            const articleId = parseInt(firstResult.dataset.articleId);
            const article = allArticles.find(a => a.id === articleId);
            if (article) {
                showArticleDetails(article);
                closeSearchOverlay();
            }
        }
    }
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No articles found</p>';
        return;
    }
    results.forEach(article => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.dataset.articleId = article.id;
        resultItem.innerHTML = `
            <img src="https://picsum.photos/80/80?random=${article.id}" alt="${article.title}" class="result-image">
            <div class="result-content">
                <h4>${article.title}</h4>
                <p>${article.excerpt.substring(0, 100)}...</p>
                <span class="result-meta">${article.category}</span>
            </div>
        `;
        resultItem.addEventListener('click', () => {
            closeSearchOverlay();
            setTimeout(() => showArticleDetails(article), 300);
        });
        searchResults.appendChild(resultItem);
    });
}

// Theme Management
function loadThemePreference() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') setLightTheme();
    else setDarkTheme();
}

function setLightTheme() {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
}

function setDarkTheme() {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
}

function toggleTheme() {
    document.body.classList.contains('light-theme') ? setDarkTheme() : setLightTheme();
}

// UI Interactions
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

function handleNewsletterSubscription() {
    const email = newsletterEmail.value.trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Thank you for subscribing!', 'success');
        newsletterEmail.value = '';
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    backToTopBtn.classList.toggle('visible', scrollTop > 300);
    document.querySelector('.header').classList.toggle('scrolled', scrollTop > 100);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (link && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

function animateNewCards(selector = '.article-card') {
    articlesGrid.querySelectorAll(selector).forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.remove('newly-loaded');
        }, index * 100);
    });
}

// Article Modal (from search)
function showArticleDetails(article) {
    const modal = document.createElement('div');
    modal.className = 'article-modal';
    const date = new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <img src="https://picsum.photos/800/400?random=${article.id}" alt="${article.title}" class="modal-image">
                <div class="modal-body">
                    <div class="modal-meta">
                        <span class="modal-category">${article.category}</span>
                        <span class="modal-date">${date}</span>
                        <span class="modal-read-time">${article.readTime} min read</span>
                    </div>
                    <h1 class="modal-title">${article.title}</h1>
                    <div class="modal-content-text">
                        <p>${article.excerpt}</p>
                        <p>${article.content.substring(0, 200)}...</p>
                        <h2>Key Takeaways</h2>
                        <ul>
                            ${article.tags.map(tag => `<li>${tag}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-actions">
                         <button class="btn btn-primary" onclick="window.location.href='article-page.html?id=${article.id}'">
                            <i class="fas fa-book-open"></i>
                            <span>Read Full Article</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => modal.classList.add('active'));

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    });
}

// Inject Additional CSS
document.addEventListener('DOMContentLoaded', () => {
    const additionalStyles = `
    .article-modal {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 3000;
        display: flex; align-items: center; justify-content: center;
        padding: var(--spacing-md); opacity: 0; visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .article-modal.active { opacity: 1; visibility: visible; }
    .modal-overlay {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: var(--bg-overlay); backdrop-filter: blur(10px);
    }
    .modal-content {
        position: relative; background: var(--bg-secondary);
        border-radius: var(--radius-lg); max-width: 800px; width: 100%;
        max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-xl);
        transform: scale(0.95); opacity: 0;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    }
    .article-modal.active .modal-content { transform: scale(1); opacity: 1; }
    .modal-close {
        position: absolute; top: var(--spacing-md); right: var(--spacing-md);
        background: var(--bg-overlay); border: none; color: var(--text-primary);
        width: 40px; height: 40px; border-radius: 50%; cursor: pointer; z-index: 10;
        transition: all var(--transition-normal); display: flex; align-items: center; justify-content: center;
    }
    .modal-close:hover { background: var(--accent-primary); transform: scale(1.1); }
    .modal-image { width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
    .modal-body { padding: var(--spacing-lg); }
    .modal-meta { display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md); font-size: 0.9rem; color: var(--text-muted); flex-wrap: wrap; }
    .modal-category { background: var(--accent-primary); color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 500; text-transform: uppercase; }
    .modal-title { font-size: 2rem; margin-bottom: var(--spacing-md); line-height: 1.3; color: var(--text-primary); }
    .modal-content-text { line-height: 1.8; margin-bottom: var(--spacing-lg); color: var(--text-secondary); }
    .modal-content-text h2 { margin: var(--spacing-lg) 0 var(--spacing-md); color: var(--accent-primary); font-size: 1.5rem; }
    .modal-content-text ul { margin: var(--spacing-md) 0; padding-left: var(--spacing-lg); }
    .modal-content-text li { margin-bottom: var(--spacing-xs); }
    .modal-actions { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; justify-content: center; }
    .notification {
        position: fixed; bottom: var(--spacing-lg); left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--bg-card); color: var(--text-primary);
        padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-md);
        box-shadow: var(--shadow-md); opacity: 0; visibility: hidden;
        transition: all 0.3s ease-out; z-index: 4000;
    }
    .notification.show { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
    .notification-success { background: var(--accent-success); color: white; }
    .notification-error { background: var(--accent-secondary); color: white; }
    @media (max-width: 768px) {
        .modal-content { max-width: 95%; margin: var(--spacing-md); }
        .modal-title { font-size: 1.5rem; }
    }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = additionalStyles;
    document.head.appendChild(styleSheet);
});