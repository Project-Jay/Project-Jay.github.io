// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all elements to animate
const animElements = document.querySelectorAll(
    '.fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .slide-in-top'
);

// Trigger initial observe for elements right at the top
setTimeout(() => {
    animElements.forEach(el => observer.observe(el));
}, 100);

// Smooth SCroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
            targetElem.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Background Particles Canvas (Simple elegant glow effect)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Deep purple glow
        this.color = `rgba(108, 92, 231, ${Math.random() * 0.3})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(108, 92, 231, 1)';
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(window.innerWidth / 15, 100);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    // Draw some subtle gradient overlay
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    gradient.addColorStop(0, 'rgba(10, 10, 15, 0)');
    gradient.addColorStop(1, 'rgba(10, 10, 15, 0.4)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    requestAnimationFrame(animateParticles);
}

// Initialize Background
window.addEventListener('resize', () => {
    initCanvas();
    initParticles();
});

initCanvas();
initParticles();
animateParticles();
