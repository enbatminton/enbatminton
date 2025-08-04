// Pixel Interactions for Enbatminton

// Global variables
let currentStoryPanel = 1;
let totalStoryPanels = 3;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pixel interactions loaded');
    initializeAnimations();
    setupEventListeners();
});

// Initialize animations
function initializeAnimations() {
    // Add floating shuttlecock animations
    const shuttlecocks = document.querySelectorAll('.floating-shuttlecock');
    shuttlecocks.forEach((shuttlecock, index) => {
        shuttlecock.style.animationDelay = `${index * 2}s`;
    });

    // Add character animations
    const characters = document.querySelectorAll('.character');
    characters.forEach((character, index) => {
        character.style.animationDelay = `${index * 0.5}s`;
    });
}

// Setup event listeners
function setupEventListeners() {
    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.pixel-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to cards
    const cards = document.querySelectorAll('.community-card, .join-card, .contact-method');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
}

// Scroll to community section
function scrollToCommunity() {
    console.log('Scrolling to community...');
    const communitySection = document.getElementById('community');
    communitySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Scroll to FAQ section
function scrollToFAQ() {
    console.log('Scrolling to FAQ...');
    const faqSection = document.getElementById('faq');
    faqSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Show specific story panel
function showStoryPanel(panelNumber) {
    // Hide all panels
    for (let i = 1; i <= totalStoryPanels; i++) {
        const panel = document.getElementById(`storyPanel${i}`);
        if (panel) {
            panel.classList.add('hidden');
        }
    }
    
    // Show target panel
    const targetPanel = document.getElementById(`storyPanel${panelNumber}`);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
        currentStoryPanel = panelNumber;
        
        // Add entrance animation
        targetPanel.style.opacity = '0';
        targetPanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetPanel.style.transition = 'all 0.5s ease-out';
            targetPanel.style.opacity = '1';
            targetPanel.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Next story panel
function nextStory() {
    if (currentStoryPanel < totalStoryPanels) {
        showStoryPanel(currentStoryPanel + 1);
    }
}

// Previous story panel
function previousStory() {
    if (currentStoryPanel > 1) {
        showStoryPanel(currentStoryPanel - 1);
    }
}

// Show feature based on choice
function showFeature(featureType) {
    console.log(`Showing feature: ${featureType}`);
    
    if (featureType === 'beginner') {
        // Show beginner-friendly content
        const storyText = document.querySelector('#storyPanel2 .story-text');
        if (storyText) {
            storyText.innerHTML = `
                バドミントン未経験の方も安心して参加できます。<br>
                経験豊富なメンバーが丁寧にサポートします。
            `;
        }
    } else if (featureType === 'experienced') {
        // Show experienced player content
        const storyText = document.querySelector('#storyPanel2 .story-text');
        if (storyText) {
            storyText.innerHTML = `
                経験者の方も大歓迎です。<br>
                レベルに応じたゲームを楽しめます。<br>
                <strong>上達のためのアドバイスも提供します！</strong>
            `;
        }
    }
    
    // Continue to next panel after a short delay
    setTimeout(() => {
        nextStory();
    }, 2000);
}

// Show community section (legacy function for compatibility)
function showCommunity() {
    scrollToCommunity();
}

// Close modal (legacy function for compatibility)
function closeModal() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Add parallax effect to floating elements
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shuttlecock');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Add character interaction
function addCharacterInteraction() {
    const mainCharacter = document.getElementById('mainCharacter');
    if (mainCharacter) {
        mainCharacter.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }
}

// Add sound effects (optional)
function addSoundEffects() {
    const buttons = document.querySelectorAll('.pixel-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create a simple beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Add keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                if (currentStoryPanel < totalStoryPanels) {
                    nextStory();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (currentStoryPanel > 1) {
                    previousStory();
                }
                break;
            case 'Escape':
                closeModal();
                break;
        }
    });
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.community-card, .join-card, .contact-method, .story-panel');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
        observer.observe(element);
    });
}

// Initialize additional features
window.addEventListener('load', function() {
    addParallaxEffect();
    addCharacterInteraction();
    addKeyboardNavigation();
    addScrollAnimations();
    
    // Optional: Add sound effects (uncomment if desired)
    // addSoundEffects();
});

// Add touch support for mobile
function addTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next story
                if (currentStoryPanel < totalStoryPanels) {
                    nextStory();
                }
            } else {
                // Swipe right - previous story
                if (currentStoryPanel > 1) {
                    previousStory();
                }
            }
        }
    }
}

// Initialize touch support
addTouchSupport(); 