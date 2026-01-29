// Pricing V2 - High Conversion JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sticky CTA Bar
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.pricing-hero-v2');

    if (stickyCta && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 100) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }

    // ROI Calculator
    const hoursInput = document.getElementById('hoursInput');
    const costInput = document.getElementById('costInput');
    const hoursOutput = document.getElementById('hoursOutput');
    const costOutput = document.getElementById('costOutput');
    const timeSaved = document.getElementById('timeSaved');
    const monthlySavings = document.getElementById('monthlySavings');
    const annualSavings = document.getElementById('annualSavings');

    function calculateROI() {
        const hours = parseInt(hoursInput.value);
        const cost = parseInt(costInput.value);

        // 70% time savings
        const savedHours = Math.round(hours * 0.7);
        const monthly = savedHours * cost;
        const annual = monthly * 12;

        hoursOutput.textContent = `${hours} hours`;
        costOutput.textContent = `€${cost}/hour`;
        timeSaved.textContent = `${savedHours} hours`;
        monthlySavings.textContent = `€${monthly.toLocaleString()}`;
        annualSavings.textContent = `€${annual.toLocaleString()}`;
    }

    if (hoursInput && costInput) {
        hoursInput.addEventListener('input', calculateROI);
        costInput.addEventListener('input', calculateROI);
        calculateROI(); // Initial calculation
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const stickyHeight = stickyCta && stickyCta.classList.contains('visible') ? 60 : 0;
                const targetPosition = target.offsetTop - navHeight - stickyHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(demoForm);
            const data = Object.fromEntries(formData.entries());

            // Show success message (in production, send to CRM)
            const btn = demoForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Request sent!
            `;
            btn.disabled = true;
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';

            setTimeout(() => {
                alert('Demo request received! Our team will contact you within 2 hours.');
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                btn.style.borderColor = '';
                demoForm.reset();
            }, 1500);
        });
    }

    // Animate numbers on scroll
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animate metrics
                const metrics = entry.target.querySelectorAll('.metric-value');
                metrics.forEach(metric => {
                    const text = metric.textContent;
                    if (text.includes('%')) {
                        const num = parseInt(text);
                        metric.textContent = '0%';
                        setTimeout(() => {
                            animateValue(metric, 0, num, 1000);
                            setTimeout(() => {
                                metric.textContent = num + '%';
                            }, 1000);
                        }, 200);
                    }
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('.case-study-card, .feature-item, .review-card').forEach(el => {
        observer.observe(el);
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .case-study-card, .feature-item, .review-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .case-study-card.animate-in, .feature-item.animate-in, .review-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .feature-item:nth-child(2) { transition-delay: 0.1s; }
    .feature-item:nth-child(3) { transition-delay: 0.2s; }
    .feature-item:nth-child(4) { transition-delay: 0.3s; }
    .feature-item:nth-child(5) { transition-delay: 0.4s; }
    .feature-item:nth-child(6) { transition-delay: 0.5s; }

    .review-card:nth-child(2) { transition-delay: 0.1s; }
    .review-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);
