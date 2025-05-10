document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav__link')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentNode;
            item.classList.toggle('active');
            
            // Close other items
            if (item.classList.contains('active')) {
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Animate numbers in stats
    const animateNumbers = () => {
        const stats = document.querySelectorAll('.stat__number');
        const speed = 200;
        
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const count = +stat.innerText;
            const increment = target / speed;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateNumbers, 1);
            } else {
                stat.innerText = target;
            }
        });
    };
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateNumbers();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.wow').forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const heroBg = document.querySelector('.hero__bg');
        if (heroBg) {
            const scrollPosition = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});
