// Wine Tasting Landing Page - Interactive Card Swiper
class WineTastingSwiper {
    constructor() {
        this.currentCard = 1;
        this.totalCards = 9;
        this.isTransitioning = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateMainContainer();
        this.hideSwipeIndicator();
    }
    
    setupEventListeners() {
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
        
        // Mouse events for desktop
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY > 0) {
                this.nextCard();
            } else {
                this.previousCard();
            }
        }, { passive: false });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousCard();
                    break;
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextCard();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToCard(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToCard(this.totalCards);
                    break;
            }
        });
        
        // Click events for CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.handleCTAClick();
            });
        }
    }
    
    handleSwipe() {
        if (this.isTransitioning) return;
        
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe up - next card
                this.nextCard();
            } else {
                // Swipe down - previous card
                this.previousCard();
            }
        }
    }
    
    nextCard() {
        if (this.currentCard < this.totalCards && !this.isTransitioning) {
            this.transitionToCard(this.currentCard + 1);
        }
    }
    
    previousCard() {
        if (this.currentCard > 1 && !this.isTransitioning) {
            this.transitionToCard(this.currentCard - 1);
        }
    }
    
    goToCard(cardNumber) {
        if (cardNumber >= 1 && cardNumber <= this.totalCards && !this.isTransitioning) {
            this.transitionToCard(cardNumber);
        }
    }
    
    transitionToCard(newCard) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Remove active class from current card
        const currentCardElement = document.querySelector(`[data-card="${this.currentCard}"]`);
        if (currentCardElement) {
            currentCardElement.classList.remove('active');
        }
        
        // Add active class to new card
        const newCardElement = document.querySelector(`[data-card="${newCard}"]`);
        if (newCardElement) {
            newCardElement.classList.add('active');
        }
        
        // Update current card
        this.currentCard = newCard;
        
        // Update main container data attribute
        this.updateMainContainer();
        
        // Hide/show swipe indicator
        this.hideSwipeIndicator();
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1200);
        
        // Add haptic feedback on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    updateMainContainer() {
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.setAttribute('data-current-card', this.currentCard);
        }
    }
    
    hideSwipeIndicator() {
        const swipeIndicator = document.querySelector('.swipe-indicator');
        if (swipeIndicator) {
            if (this.currentCard === 1) {
                swipeIndicator.style.opacity = '0.7';
            } else {
                swipeIndicator.style.opacity = '0';
            }
        }
    }
    
    handleCTAClick() {
        // Add click animation
        const button = document.querySelector('.cta-button');
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        }
        
        // Here you can add your booking logic
        // For now, we'll just show an alert
        alert('Booking functionality will be implemented here!\n\nThis could link to:\n- A booking form\n- Contact information\n- External booking system\n- Calendar integration');
        
        // Add haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 50, 50]);
        }
    }
    
    // Public methods for external control
    getCurrentCard() {
        return this.currentCard;
    }
    
    getTotalCards() {
        return this.totalCards;
    }
    
    // Method to add custom card content
    updateCardContent(cardNumber, content) {
        const card = document.querySelector(`[data-card="${cardNumber}"]`);
        if (card) {
            const cardContent = card.querySelector('.card-content');
            if (cardContent) {
                cardContent.innerHTML = content;
            }
        }
    }
}

// Initialize the swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new WineTastingSwiper();
    
    // Make swiper globally accessible for debugging
    window.wineTastingSwiper = swiper;
    
    // Add some console info
    console.log('🍷 Wine Tasting Landing Page Loaded!');
    console.log('📱 Swipe up/down or use arrow keys to navigate');
    console.log('⌨️  Keyboard shortcuts: ↑↓ arrows, Space, Home, End');
    console.log('🎯 Current card:', swiper.getCurrentCard());
});

// Add some additional utility functions
const WineTastingUtils = {
    // Function to update contact information
    updateContactInfo: function(email, phone, location) {
        const contactItems = document.querySelectorAll('.contact-item');
        if (contactItems.length >= 3) {
            contactItems[0].querySelector('.contact-text').textContent = `Email: ${email}`;
            contactItems[1].querySelector('.contact-text').textContent = `Phone: ${phone}`;
            contactItems[2].querySelector('.contact-text').textContent = `Location: ${location}`;
        }
    },
    
    // Function to add social media links
    addSocialLinks: function(socialLinks) {
        const contactContainer = document.querySelector('.contact-container');
        if (contactContainer && socialLinks) {
            const socialContainer = document.createElement('div');
            socialContainer.className = 'social-container';
            socialContainer.style.marginTop = '20px';
            socialContainer.style.display = 'flex';
            socialContainer.style.justifyContent = 'center';
            socialContainer.style.gap = '15px';
            
            Object.entries(socialLinks).forEach(([platform, url]) => {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.style.color = '#d4af37';
                link.style.fontSize = '1.5rem';
                link.style.textDecoration = 'none';
                link.style.transition = 'transform 0.3s ease';
                
                // Add platform-specific icons
                const icons = {
                    instagram: '📷',
                    facebook: '📘',
                    twitter: '🐦',
                    linkedin: '💼',
                    youtube: '📺'
                };
                
                link.innerHTML = icons[platform.toLowerCase()] || '🔗';
                
                link.addEventListener('mouseenter', () => {
                    link.style.transform = 'scale(1.2)';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.transform = 'scale(1)';
                });
                
                socialContainer.appendChild(link);
            });
            
            contactContainer.appendChild(socialContainer);
        }
    },
    
    // Function to add a logo
    addLogo: function(logoUrl, altText = 'Benally Logo') {
        const brandName = document.querySelector('.brand-name');
        if (brandName && logoUrl) {
            const logo = document.createElement('img');
            logo.src = logoUrl;
            logo.alt = altText;
            logo.style.maxHeight = '60px';
            logo.style.marginBottom = '10px';
            logo.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))';
            
            brandName.parentNode.insertBefore(logo, brandName);
        }
    }
};

// Make utils globally accessible
window.WineTastingUtils = WineTastingUtils;
