// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const welcomeSection = document.getElementById('welcome');
const mainContent = document.getElementById('main-content');

// ===== FONCTION DE DÉMARRAGE =====
function startExploring() {
    // Animation de transition vers le contenu principal
    welcomeSection.style.transform = 'translateY(-100%)';
    welcomeSection.style.transition = 'transform 0.8s ease-in-out';
    
    setTimeout(() => {
        welcomeSection.style.display = 'none';
        mainContent.style.display = 'block';
        navbar.classList.add('active');
        
        // Déclencher l'animation des premiers éléments visibles
        revealElements();
    }, 800);
}

// ===== GESTION DU SCROLL =====
window.addEventListener('scroll', () => {
    // Afficher/masquer la navbar
    if (window.scrollY > 100) {
        navbar.classList.add('active');
    }
    
    // Révéler les éléments au scroll
    revealElements();
});

// ===== RÉVÉLER LES ÉLÉMENTS AU SCROLL =====
function revealElements() {
    const headers = document.querySelectorAll('.section-header');
    const cards = document.querySelectorAll('.example-card');
    const performanceSections = document.querySelectorAll('.performance-section');
    const applicationsSections = document.querySelectorAll('.applications-section');
    const applicationItems = document.querySelectorAll('.application-item');
    
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    // Animer les en-têtes
    headers.forEach(header => {
        const headerTop = header.getBoundingClientRect().top;
        
        if (headerTop < windowHeight - revealPoint) {
            header.classList.add('visible');
        }
    });
    
    // Animer les cartes avec délai progressif
    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < windowHeight - revealPoint) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100); // Délai de 100ms entre chaque carte
        }
    });
    
    // Animer les sections de performance
    performanceSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
    
    // Animer les sections d'applications
    applicationsSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
    
    // Animer les items d'application individuellement
    applicationItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < windowHeight - revealPoint) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 150); // Délai progressif pour effet cascade
        }
    });
}

// ===== SMOOTH SCROLL POUR LA NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Compensation pour la navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATION DES CARTES AU SURVOL =====
const cards = document.querySelectorAll('.example-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PARALLAX EFFECT SUBTIL =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.section-header');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== ANIMATION DE CHARGEMENT INITIALE =====
window.addEventListener('load', () => {
    // S'assurer que le contenu principal est caché au début
    mainContent.style.display = 'none';
    
    // Animation de la page de bienvenue
    const welcomeContent = document.querySelector('.welcome-content');
    welcomeContent.style.opacity = '0';
    
    setTimeout(() => {
        welcomeContent.style.transition = 'opacity 1s ease-in';
        welcomeContent.style.opacity = '1';
    }, 100);
    
    // Initialiser les radars Chart.js
    initializeRadarCharts();
});

// ===== CRÉATION DES RADARS DE PERFORMANCE =====
function initializeRadarCharts() {
    // Configuration commune pour tous les radars
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                padding: 15,
                titleFont: {
                    size: 15,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14
                },
                cornerRadius: 10,
                displayColors: true,
                borderColor: 'rgba(37, 99, 235, 0.5)',
                borderWidth: 2,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.r + '/10';
                    }
                }
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 10,
                min: 0,
                ticks: {
                    stepSize: 2,
                    font: {
                        size: 12,
                        weight: '600'
                    },
                    backdropColor: 'rgba(255, 255, 255, 0.9)',
                    backdropPadding: 4,
                    color: '#64748b'
                },
                pointLabels: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#1e293b',
                    padding: 10
                },
                grid: {
                    color: 'rgba(37, 99, 235, 0.15)',
                    lineWidth: 2,
                    circular: true
                },
                angleLines: {
                    color: 'rgba(37, 99, 235, 0.2)',
                    lineWidth: 2
                }
            }
        },
        animation: {
            duration: 2500,
            easing: 'easeInOutQuart',
            onProgress: function(animation) {
                // Animation personnalisée pour un effet de "dessin"
                const ctx = animation.chart.ctx;
                ctx.save();
            },
            onComplete: function() {
                // Ajouter un effet de brillance après l'animation
                const chart = this;
                setTimeout(() => {
                    chart.update('none');
                }, 100);
            }
        },
        elements: {
            line: {
                borderWidth: 3,
                borderJoinStyle: 'round'
            },
            point: {
                radius: 6,
                hoverRadius: 9,
                hitRadius: 10,
                borderWidth: 3
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: false
        }
    };

    // Radar Matériaux Métalliques
    const metallicCtx = document.getElementById('metallicRadar');
    if (metallicCtx) {
        new Chart(metallicCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Conductivité', 'Coût', 'Malléabilité', 'Recyclabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [9, 8, 10, 6, 7, 8],
                    backgroundColor: 'rgba(100, 116, 139, 0.25)',
                    borderColor: 'rgba(100, 116, 139, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(100, 116, 139, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(100, 116, 139, 1)',
                    pointHoverBorderWidth: 3
                }]
            },
            options: commonOptions
        });
    }

    // Radar Matériaux Organiques
    const organicCtx = document.getElementById('organicRadar');
    if (organicCtx) {
        new Chart(organicCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Flexibilité', 'Coût', 'Légèreté', 'Biodégradabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [5, 6, 9, 8, 8, 7],
                    backgroundColor: 'rgba(5, 150, 105, 0.25)',
                    borderColor: 'rgba(5, 150, 105, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(5, 150, 105, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(5, 150, 105, 1)',
                    pointHoverBorderWidth: 3
                }]
            },
            options: commonOptions
        });
    }

    // Radar Matériaux Minéraux
    const mineralCtx = document.getElementById('mineralRadar');
    if (mineralCtx) {
        new Chart(mineralCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Résist. Chaleur', 'Coût', 'Dureté', 'Inertie Chimique'],
                datasets: [{
                    label: 'Performance',
                    data: [8, 9, 10, 7, 9, 9],
                    backgroundColor: 'rgba(220, 38, 38, 0.25)',
                    borderColor: 'rgba(220, 38, 38, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(220, 38, 38, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(220, 38, 38, 1)',
                    pointHoverBorderWidth: 3
                }]
            },
            options: commonOptions
        });
    }

    // Radar Matériaux Composites
    const compositeCtx = document.getElementById('compositeRadar');
    if (compositeCtx) {
        new Chart(compositeCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Légèreté', 'Coût', 'Polyvalence', 'Performance'],
                datasets: [{
                    label: 'Performance',
                    data: [10, 9, 10, 4, 9, 10],
                    backgroundColor: 'rgba(234, 88, 12, 0.25)',
                    borderColor: 'rgba(234, 88, 12, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(234, 88, 12, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(234, 88, 12, 1)',
                    pointHoverBorderWidth: 3
                }]
            },
            options: commonOptions
        });
    }
    
    // Ajouter des animations de hover personnalisées aux conteneurs radar
    addRadarHoverEffects();
}

// ===== EFFETS DE HOVER PERSONNALISÉS POUR LES RADARS =====
function addRadarHoverEffects() {
    const radarContainers = document.querySelectorAll('.radar-container');
    
    radarContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Effet de suivi de la souris
        container.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            const canvas = this.querySelector('canvas');
            if (canvas) {
                canvas.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            }
        });
        
        container.addEventListener('mouseleave', function() {
            const canvas = this.querySelector('canvas');
            if (canvas) {
                canvas.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    });
}

// ===== DÉTECTION DE L'APPAREIL MOBILE =====
function isMobile() {
    return window.innerWidth <= 768;
}

// ===== ADAPTATION DES ANIMATIONS POUR MOBILE =====
if (isMobile()) {
    // Réduire les animations complexes sur mobile pour améliorer les performances
    document.querySelectorAll('.example-card').forEach(card => {
        card.style.transition = 'all 0.2s ease';
    });
}

// ===== GESTION DU REDIMENSIONNEMENT =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculer les positions au redimensionnement
        revealElements();
    }, 250);
});

// ===== EASTER EGG - DOUBLE CLIC SUR LE LOGO =====
const logo = document.querySelector('.logo-animation');
let clickCount = 0;
let clickTimer = null;

logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);
    } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        clickCount = 0;
        
        // Animation spéciale
        logo.style.animation = 'rotate 0.5s ease-in-out 3';
        
        // Créer des particules colorées
        createParticles();
    }
});

function createParticles() {
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = '50%';
        particle.style.top = '40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 5 + Math.random() * 5;
        
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity + 2; // Gravité
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            
            if (parseFloat(particle.style.opacity) > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ===== INDICATEUR DE PROGRESSION DE SCROLL =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #2563eb, #7c3aed)';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Activer l'indicateur de progression (optionnel)
// createScrollProgress();

// ===== ACCESSIBILITÉ - NAVIGATION AU CLAVIER =====
document.addEventListener('keydown', (e) => {
    // Touche Espace pour démarrer depuis la page de bienvenue
    if (e.code === 'Space' && welcomeSection.style.display !== 'none') {
        e.preventDefault();
        startExploring();
    }
    
    // Touches fléchées pour naviguer entre les sections
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        const sections = ['metallic', 'organic', 'mineral', 'composite'];
        const currentScroll = window.pageYOffset;
        
        let currentSection = 0;
        sections.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element && Math.abs(element.offsetTop - currentScroll) < 100) {
                currentSection = index;
            }
        });
        
        if (e.code === 'ArrowDown' && currentSection < sections.length - 1) {
            document.getElementById(sections[currentSection + 1]).scrollIntoView({ behavior: 'smooth' });
        } else if (e.code === 'ArrowUp' && currentSection > 0) {
            document.getElementById(sections[currentSection - 1]).scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== CONSOLE LOG ARTISTIQUE =====
console.log('%c🎨 Site Les Matériaux', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cCréé par: SOULAYMA DHAHBI & SIRINE ELAARBI', 'color: #7c3aed; font-size: 14px;');
console.log('%cDéveloppé par: Med Aymen Troudi', 'color: #059669; font-size: 14px;');
console.log('%c✨ Merci de visiter notre site!', 'color: #ea580c; font-size: 12px;');

// ===== EFFETS DE PARTICULES POUR LES DOMAINES D'APPLICATION =====
document.addEventListener('DOMContentLoaded', function() {
    const applicationItems = document.querySelectorAll('.application-item');
    
    applicationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            createClickParticles(e.clientX, e.clientY);
            
            // Ajouter un effet de "pulse"
            this.style.animation = 'pulse-click 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
});

function createClickParticles(x, y) {
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c'];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 3;
        const size = 4 + Math.random() * 4;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        function animateParticle() {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity + 0.5; // Gravité
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// ===== ANIMATION PULSE AU CLIC =====
const style = document.createElement('style');
style.textContent = `
    .click-particle {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px currentColor;
    }
    
    @keyframes pulse-click {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
