// Article Page JavaScript
class ArticlePage {
    constructor() {
        this.currentArticle = null;
        this.relatedArticles = [];
        this.comments = [];
        this.isLiked = false;
        this.isBookmarked = false;
        this.articleId = this.getArticleIdFromUrl();
        
        this.initializeElements();
        this.bindEvents();
        this.loadArticle();
        this.loadThemePreference();
    }

    initializeElements() {
        // Article elements
        this.articleTitle = document.getElementById('articleTitle');
        this.articleCategory = document.getElementById('articleCategory');
        this.articleDate = document.getElementById('articleDate');
        this.articleReadTime = document.getElementById('articleReadTime');
        this.articleAuthor = document.getElementById('articleAuthor');
        this.articleViews = document.getElementById('articleViews');
        this.articleLikes = document.getElementById('articleLikes');
        this.articleComments = document.getElementById('articleComments');
        this.articleContentText = document.getElementById('articleContentText');
        this.articleTags = document.getElementById('articleTags');
        
        // Action buttons
        this.likeBtn = document.getElementById('likeBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.bookmarkBtn = document.getElementById('bookmarkBtn');
        
        // Related articles
        this.relatedArticlesContainer = document.getElementById('relatedArticles');
        
        // Comments
        this.commentInput = document.getElementById('commentInput');
        this.submitComment = document.getElementById('submitComment');
        this.commentsList = document.getElementById('commentsList');
        
        // TOC and navigation
        this.tocSidebar = document.getElementById('tocSidebar');
        this.tocNav = document.getElementById('tocNav');
        this.tocClose = document.getElementById('tocClose');
        
        // Progress and loading
        this.readingProgress = document.getElementById('readingProgress');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.backToTop = document.getElementById('backToTop');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        this.menuToggle = document.getElementById('menuToggle');
    }

    bindEvents() {
        // Article actions
        this.likeBtn.addEventListener('click', () => this.toggleLike());
        this.shareBtn.addEventListener('click', () => this.shareArticle());
        this.bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        
        // Comments
        this.submitComment.addEventListener('click', () => this.submitCommentHandler());
        
        // TOC
        this.tocClose.addEventListener('click', () => this.toggleTOC());
        
        // Navigation
        this.backToTop.addEventListener('click', () => this.scrollToTop());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    getArticleIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }

    async loadArticle() {
        try {
            // Try to get article from session storage first (from home page)
            const articleContext = sessionStorage.getItem('articleContext');
            if (articleContext) {
                const context = JSON.parse(articleContext);
                this.currentArticle = context.article;
                sessionStorage.removeItem('articleContext'); // Clean up
            } else {
                // Fallback: try to find article in articles database
                await this.findArticleInDatabase();
            }
            
            if (this.currentArticle) {
                this.generateArticleContent();
                this.loadRelatedArticles();
                this.loadComments();
                this.generateTableOfContents();
                document.title = `${this.currentArticle.title} - TechBlog`;
                this.hideLoading();
            } else {
                // If no article found, show error
                this.showError('Article not found. Please return to the home page.');
            }
        } catch (error) {
            console.error('Error loading article:', error);
            this.showError('Failed to load article. Please try again.');
        }
    }

    async findArticleInDatabase() {
        // Check if articles database is available
        if (typeof articlesDatabase !== 'undefined') {
            // Search through all categories in articles database
            for (const category in articlesDatabase) {
                const articles = articlesDatabase[category];
                const foundArticle = articles.find(article => article.id === this.articleId);
                if (foundArticle) {
                    this.currentArticle = foundArticle;
                    return;
                }
            }
        }
        
        // If not found in database, create a fallback article
        this.createFallbackArticle();
    }

    createFallbackArticle() {
        // Create a fallback article based on the ID
        const fallbackTemplates = {
            '1': {
                title: 'iOS 18 Development: What\'s New for Developers',
                category: 'Mobile Development',
                content: this.generateMobileArticleContent(),
                tags: ['iOS', 'Mobile Development', 'Apple', 'Swift', 'Privacy', 'Performance']
            },
            '2': {
                title: 'Android 15: Material You Design System Deep Dive',
                category: 'Mobile Development',
                content: this.generateCybersecurityArticleContent(),
                tags: ['Android', 'Material Design', 'UI/UX', 'Kotlin', 'Accessibility']
            },
            '3': {
                title: 'Python 3.12: New Features and Performance Improvements',
                category: 'Programming',
                content: this.generateProgrammingArticleContent(),
                tags: ['Python', 'Python 3.12', 'Performance', 'New Features', 'Programming', 'Development']
            },
            '4': {
                title: 'Large Language Models: Architecture and Applications',
                category: 'Artificial Intelligence',
                content: this.generateAIArticleContent(),
                tags: ['AI', 'LLM', 'Machine Learning', 'Code Generation', 'Software Development', 'Architecture']
            },
            '5': {
                title: 'Next.js 15: App Router and Server Components Deep Dive',
                category: 'Web Development',
                content: this.generateWebDevArticleContent(),
                tags: ['Next.js', 'React', 'App Router', 'Server Components', 'Web Development', 'Performance']
            }
        };

        const template = fallbackTemplates[this.articleId] || fallbackTemplates['1'];
        
        this.currentArticle = {
            id: this.articleId,
            title: template.title,
            category: template.category,
            content: template.content,
            tags: template.tags,
            author: this.getRandomAuthor(),
            publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
            readTime: Math.floor(Math.random() * 15) + 8,
            views: Math.floor(Math.random() * 10000) + 1000,
            likes: Math.floor(Math.random() * 500) + 50,
            comments: Math.floor(Math.random() * 100) + 20
        };
    }

    generateMobileArticleContent() {
        return `
            <h2>Introduction to iOS 18</h2>
            <p>iOS 18 represents a significant leap forward in mobile operating systems, introducing groundbreaking features that will revolutionize how developers create and users interact with mobile applications.</p>
            
            <h2>Enhanced Privacy Controls</h2>
            <p>One of the most notable improvements in iOS 18 is the enhanced privacy framework. Apple has introduced new privacy controls that give users unprecedented control over their data.</p>
            
            <h3>App Privacy Report</h3>
            <p>The new App Privacy Report provides users with detailed insights into how apps access their data, including network activity, location access, and contact information.</p>
            
            <h2>Performance Improvements</h2>
            <p>iOS 18 brings significant performance enhancements that will benefit both developers and users. The new system optimizations result in faster app launches and smoother animations.</p>
            
            <h2>Conclusion</h2>
            <p>iOS 18 represents a significant milestone in mobile development, offering developers new tools and capabilities to create innovative, privacy-focused applications.</p>
        `;
    }

    generateCybersecurityArticleContent() {
        return `
            <h2>Understanding Zero-Day Vulnerabilities</h2>
            <p>Zero-day vulnerabilities represent one of the most critical security challenges facing modern software systems. These vulnerabilities provide attackers with a window of opportunity to exploit systems.</p>
            
            <h2>Detection Strategies</h2>
            <p>While zero-day vulnerabilities are inherently difficult to detect, organizations can implement several strategies to identify potential threats and minimize their impact.</p>
            
            <h3>Behavioral Analysis</h3>
            <p>Advanced security solutions use behavioral analysis to identify anomalous activities that might indicate a zero-day attack.</p>
            
            <h2>Prevention Measures</h2>
            <p>Organizations can implement several measures to reduce their risk exposure and improve their ability to respond to attacks.</p>
            
            <h2>Conclusion</h2>
            <p>Zero-day vulnerabilities represent a significant challenge in cybersecurity, but with proper preparation and response strategies, organizations can minimize their impact.</p>
        `;
    }

    generateProgrammingArticleContent() {
        return `
            <h2>Python 3.12: A Major Release</h2>
            <p>Python 3.12 represents a significant milestone in the Python programming language's evolution, introducing numerous improvements that enhance performance and developer experience.</p>
            
            <h2>Performance Improvements</h2>
            <p>Python 3.12 brings substantial performance enhancements that benefit all Python applications from various optimizations in the CPython interpreter.</p>
            
            <h3>Interpreter Optimizations</h3>
            <p>The CPython interpreter has been optimized for better performance across various workloads including improved memory management and faster function calls.</p>
            
            <h2>Enhanced Error Messages</h2>
            <p>One of the most user-friendly improvements in Python 3.12 is the enhanced error reporting system making debugging easier for developers.</p>
            
            <h2>Conclusion</h2>
            <p>Python 3.12 represents a significant step forward in the Python ecosystem, offering improved performance and better error messages.</p>
        `;
    }

    generateAIArticleContent() {
        return `
            <h2>Understanding Large Language Models</h2>
            <p>Large Language Models (LLMs) represent a revolutionary advancement in artificial intelligence, capable of understanding and generating human-like text across various topics.</p>
            
            <h2>Architecture Fundamentals</h2>
            <p>LLMs are built on the transformer architecture, which uses attention mechanisms to process sequential data enabling sophisticated language understanding.</p>
            
            <h3>Transformer Architecture</h3>
            <p>The transformer architecture consists of encoder and decoder components that process input sequences in parallel rather than sequentially.</p>
            
            <h2>Applications in Software Development</h2>
            <p>LLMs have numerous applications in software development, from code generation and documentation to testing and debugging assistance.</p>
            
            <h2>Conclusion</h2>
            <p>Large Language Models represent a transformative technology that is reshaping how we approach natural language processing and AI applications.</p>
        `;
    }

    generateWebDevArticleContent() {
        return `
            <h2>Next.js 15: Revolutionary Changes</h2>
            <p>Next.js 15 introduces groundbreaking changes that fundamentally alter how developers build React applications with the new App Router and Server Components.</p>
            
            <h2>App Router Architecture</h2>
            <p>The App Router is Next.js 15's most significant feature, introducing a file-system based routing system that simplifies application structure.</p>
            
            <h3>File-System Based Routing</h3>
            <p>With the App Router, routing is determined by the file structure in your app directory making it easier to understand application structure.</p>
            
            <h2>Server Components</h2>
            <p>Server Components represent a fundamental change in how React components are rendered, enabling server-side rendering with improved performance.</p>
            
            <h2>Conclusion</h2>
            <p>Next.js 15 represents a significant evolution in the React ecosystem, offering revolutionary features that improve performance and developer experience.</p>
        `;
    }

    getRandomAuthor() {
        const authors = ['Sarah Chen', 'Alex Rodriguez', 'Emma Thompson', 'Michael Kim', 'Lisa Wang'];
        return authors[Math.floor(Math.random() * authors.length)];
    }

    generateArticleContent() {
        if (!this.currentArticle) return;

        this.articleTitle.textContent = this.currentArticle.title;
        this.articleCategory.textContent = this.currentArticle.category;
        this.articleDate.textContent = this.currentArticle.publishDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        this.articleReadTime.textContent = `${this.currentArticle.readTime} min read`;
        this.articleAuthor.textContent = this.currentArticle.author;
        this.articleViews.textContent = this.currentArticle.views.toLocaleString();
        this.articleLikes.textContent = this.currentArticle.likes.toLocaleString();
        this.articleComments.textContent = this.currentArticle.comments.toLocaleString();

        this.articleContentText.innerHTML = this.currentArticle.content;
        this.articleTags.innerHTML = this.currentArticle.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        document.title = `${this.currentArticle.title} - TechBlog`;
    }

    loadRelatedArticles() {
        const relatedCount = 6;
        this.relatedArticles = [];
        
        for (let i = 0; i < relatedCount; i++) {
            const relatedArticle = {
                id: Math.floor(Math.random() * 1000000) + 1,
                title: `Related Article ${i + 1}: ${this.currentArticle.category} Insights`,
                excerpt: `Discover more about ${this.currentArticle.category.toLowerCase()} and related technologies.`,
                category: this.currentArticle.category,
                author: this.getRandomAuthor(),
                readTime: Math.floor(Math.random() * 15) + 3,
                publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
            };
            this.relatedArticles.push(relatedArticle);
        }

        this.renderRelatedArticles();
    }

    renderRelatedArticles() {
        this.relatedArticlesContainer.innerHTML = this.relatedArticles.map(article => `
            <article class="related-article-card">
                <div class="related-article-content">
                    <span class="related-article-category">${article.category}</span>
                    <h3 class="related-article-title">
                        <a href="article-page.html?id=${article.id}">${article.title}</a>
                    </h3>
                    <p class="related-article-excerpt">${article.excerpt}</p>
                    <div class="related-article-meta">
                        <span class="related-article-author">${article.author}</span>
                        <span class="related-article-date">${article.publishDate.toLocaleDateString()}</span>
                        <span class="related-article-read-time">${article.readTime} min read</span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    loadComments() {
        const sampleComments = [
            {
                id: 1,
                author: 'John Doe',
                content: 'Great article! This really helped me understand the new features.',
                date: new Date(Date.now() - 2 * 60 * 60 * 1000),
                likes: 5
            },
            {
                id: 2,
                author: 'Jane Smith',
                content: 'Very informative. I especially liked the practical examples.',
                date: new Date(Date.now() - 5 * 60 * 60 * 1000),
                likes: 3
            }
        ];

        this.comments = sampleComments;
        this.renderComments();
    }

    renderComments() {
        this.commentsList.innerHTML = this.comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date.toLocaleDateString()}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="comment-like">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes}</span>
                    </button>
                </div>
            </div>
        `).join('');
    }

    generateTableOfContents() {
        const headings = this.articleContentText.querySelectorAll('h2, h3');
        if (headings.length === 0) return;

        const tocItems = Array.from(headings).map((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            return `
                <a href="#${id}" class="toc-item toc-${heading.tagName.toLowerCase()}" data-heading="${id}">
                    ${heading.textContent}
                </a>
            `;
        });

        this.tocNav.innerHTML = tocItems.join('');
    }

    toggleLike() {
        this.isLiked = !this.isLiked;
        this.likeBtn.classList.toggle('liked', this.isLiked);
        
        if (this.isLiked) {
            this.currentArticle.likes++;
            this.articleLikes.textContent = this.currentArticle.likes.toLocaleString();
            this.likeBtn.innerHTML = '<i class="fas fa-heart"></i><span>Liked</span>';
        } else {
            this.currentArticle.likes--;
            this.articleLikes.textContent = this.currentArticle.likes.toLocaleString();
            this.likeBtn.innerHTML = '<i class="fas fa-heart"></i><span>Like Article</span>';
        }
    }

    toggleBookmark() {
        this.isBookmarked = !this.isBookmarked;
        this.bookmarkBtn.classList.toggle('bookmarked', this.isBookmarked);
        
        if (this.isBookmarked) {
            this.bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i><span>Bookmarked</span>';
        } else {
            this.bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i><span>Bookmark</span>';
        }
    }

    shareArticle() {
        if (navigator.share) {
            navigator.share({
                title: this.currentArticle.title,
                text: this.currentArticle.content.substring(0, 100) + '...',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('Link copied to clipboard!', 'success');
            });
        }
    }

    submitCommentHandler() {
        const content = this.commentInput.value.trim();
        if (!content) return;

        const newComment = {
            id: this.comments.length + 1,
            author: 'You',
            content: content,
            date: new Date(),
            likes: 0
        };

        this.comments.unshift(newComment);
        this.renderComments();
        this.commentInput.value = '';
        
        this.currentArticle.comments++;
        this.articleComments.textContent = this.currentArticle.comments.toLocaleString();
        
        this.showNotification('Comment posted successfully!', 'success');
    }

    toggleTOC() {
        this.tocSidebar.classList.toggle('active');
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        this.readingProgress.style.width = scrollPercent + '%';

        if (scrollTop > 300) {
            this.backToTop.classList.add('visible');
        } else {
            this.backToTop.classList.remove('visible');
        }

        this.highlightCurrentTOCItem();
    }

    highlightCurrentTOCItem() {
        const headings = document.querySelectorAll('h2, h3');
        const tocItems = this.tocNav.querySelectorAll('.toc-item');
        
        let currentHeading = null;
        headings.forEach((heading, index) => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                currentHeading = `heading-${index}`;
            }
        });

        tocItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.heading === currentHeading) {
                item.classList.add('active');
            }
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleMobileMenu() {
        document.querySelector('.nav-menu').classList.toggle('active');
    }

    handleKeyboard(e) {
        if (e.key === 'Escape') {
            this.tocSidebar.classList.remove('active');
        }
        
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    this.toggleTOC();
                    break;
                case 'l':
                    e.preventDefault();
                    this.toggleLike();
                    break;
                case 'b':
                    e.preventDefault();
                    this.toggleBookmark();
                    break;
            }
        }
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const icon = this.themeToggle.querySelector('i');
            icon.className = 'fas fa-sun';
        }
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    showNotification(message, type = 'info') {
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

    showError(message) {
        this.showNotification(message, 'error');
    }
}

// Initialize the article page
document.addEventListener('DOMContentLoaded', () => {
    new ArticlePage();
});

