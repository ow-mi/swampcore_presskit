// Swampcore DJ Presskit - Interactive Features
(function() {
    'use strict';

    // DOM elements
    const audioControls = document.getElementById('audioControls');
    const audioToggle = document.getElementById('audioToggle');
    const audioPanel = document.getElementById('audioPanel');
    const ambientAudio = document.getElementById('ambientAudio');
    const volumeSlider = document.getElementById('volumeSlider');
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalCounter = document.getElementById('modalCounter');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const trackEmbedPlaceholders = document.querySelectorAll('.track-embed-placeholder');

    // State management
    let isAudioPlaying = false;
    let currentModalImageIndex = 0;
    let modalImages = [];

    // Initialize the application
    function init() {
        setupAudioControls();
        setupModal();
        setupTabs();
        setupTrackEmbeds();
        setupAnimations();
        setupKeyboardNavigation();
        setupIntersectionObserver();
        setupSoundCloudErrorHandling();
        setupDownloadButtons();
        
        // Prevent layout shifts by showing content only when ready
        document.body.classList.add('loaded');
        
        console.log('🎵 Swampcore Presskit initialized - dive into the digital swamp...');
    }

    // Audio Controls Functionality
    function setupAudioControls() {
        if (!ambientAudio || !audioToggle) return;

        // Set initial volume
        ambientAudio.volume = volumeSlider.value / 100;

        // Audio toggle button
        audioToggle.addEventListener('click', toggleAudio);

        // Volume slider
        volumeSlider.addEventListener('input', (e) => {
            ambientAudio.volume = e.target.value / 100;
        });

        // Audio events
        ambientAudio.addEventListener('loadstart', () => {
            console.log('🎵 Loading swamp ambience...');
        });

        ambientAudio.addEventListener('canplaythrough', () => {
            console.log('🎵 Swamp ambience ready to play');
        });

        ambientAudio.addEventListener('error', (e) => {
            console.error('🚫 Audio loading error:', e);
            audioToggle.style.opacity = '0.5';
        });
    }

    function toggleAudio() {
        if (isAudioPlaying) {
            ambientAudio.pause();
            audioToggle.innerHTML = '<span class="audio-icon">🎵</span>';
            audioToggle.classList.remove('playing');
            isAudioPlaying = false;
        } else {
            // Check if audio context is suspended (common browser restriction)
            const playPromise = ambientAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audioToggle.innerHTML = '<span class="audio-icon">⏸️</span>';
                    audioToggle.classList.add('playing');
                    isAudioPlaying = true;
                }).catch(error => {
                    console.log('🎵 Audio autoplay prevented - user interaction required');
                    showNotification('Click to enable swamp ambience 🎵');
                    
                    // Reset button state
                    audioToggle.innerHTML = '<span class="audio-icon">🎵</span>';
                    audioToggle.classList.remove('playing');
                    isAudioPlaying = false;
                });
            }
        }
    }

    // Modal Functionality
    function setupModal() {
        // Collect all modal images
        modalImages = Array.from(modalTriggers).map(trigger => ({
            src: trigger.dataset.modalImage || trigger.src,
            alt: trigger.alt || 'Swampcore image'
        }));

        // Modal trigger events
        modalTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => openModal(index));
        });

        // Modal controls
        modalClose.addEventListener('click', closeModal);
        modalPrev.addEventListener('click', () => navigateModal(-1));
        modalNext.addEventListener('click', () => navigateModal(1));
        
        // Close modal on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modalOverlay.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateModal(-1);
                    break;
                case 'ArrowRight':
                    navigateModal(1);
                    break;
            }
        });
    }

    function openModal(index) {
        currentModalImageIndex = index;
        updateModalImage();
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        modalClose.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    function navigateModal(direction) {
        currentModalImageIndex += direction;
        
        if (currentModalImageIndex < 0) {
            currentModalImageIndex = modalImages.length - 1;
        } else if (currentModalImageIndex >= modalImages.length) {
            currentModalImageIndex = 0;
        }
        
        updateModalImage();
    }

    function updateModalImage() {
        const image = modalImages[currentModalImageIndex];
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalCounter.textContent = `${currentModalImageIndex + 1} / ${modalImages.length}`;
    }

    // Tab Functionality
    function setupTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                switchTab(targetTab, button);
            });
        });
    }

    function switchTab(targetTab, activeButton) {
        // Remove active classes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active classes
        activeButton.classList.add('active');
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        // Announce to screen readers
        announceToScreenReader(`Switched to ${activeButton.textContent} track`);
    }

    // Track Embed Functionality
    function setupTrackEmbeds() {
        trackEmbedPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => {
                const embedType = placeholder.dataset.embedType;
                const trackId = placeholder.dataset.trackId;
                
                if (embedType === 'soundcloud') {
                    loadSoundCloudEmbed(placeholder, trackId);
                }
            });
        });
    }

    function loadSoundCloudEmbed(placeholder, trackId) {
        // For demo purposes, show a placeholder message
        // In production, you'd integrate with SoundCloud's API
        placeholder.innerHTML = `
            <div class="embed-loading">
                <div class="loading-spinner"></div>
                <p>Loading SoundCloud track...</p>
                <p><em>In production, this would load the actual SoundCloud embed for track: ${trackId}</em></p>
            </div>
        `;

        // Add loading spinner styles
        if (!document.querySelector('#loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                .embed-loading {
                    padding: 2rem;
                    text-align: center;
                    color: var(--accent-green);
                }
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(57, 255, 57, 0.3);
                    border-top: 4px solid var(--accent-green);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Animations and Visual Effects
    function setupAnimations() {
        // Add staggered animation delays to cards
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Background animation controls
        setupBackgroundAnimations();
        
        // Hover effects for links
        setupHoverEffects();
    }

    function setupBackgroundAnimations() {
        const bgSwamp = document.querySelector('.bg-swamp');
        const bgPrimary = document.querySelector('.bg-primary');
        
        // Enhanced parallax effect with single swamp background
        const parallaxHandler = debounce(() => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollProgress = scrolled / (documentHeight - windowHeight);
            
            // Much more subtle parallax speed (50% reduction)
            const swampRate = scrolled * -0.25; // Was -0.5, now half
            
            // Apply subtle transforms to swamp layer
            if (bgSwamp) {
                const rotation = scrollProgress * 3; // Was 6, now half
                const hueShift = Math.sin(scrollProgress * Math.PI * 2) * 15; // Was 25, now reduced
                const scale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.04; // Was 0.08, now half
                
                bgSwamp.style.transform = `translateY(${swampRate}px) rotate(${rotation}deg) scale(${scale})`;
                bgSwamp.style.filter = `hue-rotate(${hueShift}deg) saturate(1.8) contrast(1.2) brightness(${1 + Math.sin(scrollProgress * Math.PI * 2) * 0.08})`; // Was 0.15, now reduced
            }
            
            if (bgPrimary) {
                const primaryScale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.025; // Was 0.05, now half
                const primaryRotation = scrollProgress * 1; // Was 2, now half
                bgPrimary.style.transform = `scale(${primaryScale}) rotate(${primaryRotation}deg)`;
            }
            
        }, 12); // Optimized frequency for better performance
        
        // Add scroll event listener
        window.addEventListener('scroll', parallaxHandler, { passive: true });
        
        // Initialize on load
        parallaxHandler();
        
        // Much more subtle mouse move effect
        document.addEventListener('mousemove', debounce((e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            if (bgSwamp) {
                const intensity = 3; // Was 6, now half
                bgSwamp.style.transform += ` translateX(${mouseX * intensity}px) translateY(${mouseY * (intensity * 0.7)}px)`;
            }
        }, 16)); // 60fps for smooth mouse tracking
        
        // Add window resize handler to recalculate on viewport changes
        window.addEventListener('resize', debounce(parallaxHandler, 100));
    }

    function setupHoverEffects() {
        // Enhanced hover effects for connect links
        const connectLinks = document.querySelectorAll('.link-item');
        connectLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Keyboard Navigation
    function setupKeyboardNavigation() {
        // Tab navigation for custom elements
        const interactiveElements = document.querySelectorAll(
            '.tab-btn, .link-item, .modal-trigger, .audio-toggle'
        );

        interactiveElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }

    // Intersection Observer for scroll animations
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for child elements
                    const children = entry.target.querySelectorAll('.photo-item, .video-item, .link-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animationDelay = `${index * 0.1}s`;
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all glass cards
        document.querySelectorAll('.glass-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Utility Functions
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    function showNotification(message) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '1rem 2rem',
            color: 'var(--accent-green)',
            zIndex: '1001',
            backdropFilter: 'blur(10px)',
            animation: 'slideInUp 0.3s ease-out'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInUp 0.3s ease-out reverse';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Theme Toggle (Future Feature)
    function setupThemeToggle() {
        // Placeholder for theme switching functionality
        // This would toggle between "Night" and "Misty Dawn" themes
        console.log('🎨 Theme toggle ready for implementation');
    }

    // Error Handling
    window.addEventListener('error', (e) => {
        console.error('🚫 Swampcore error:', e.error);
        // Graceful degradation - ensure core functionality still works
    });

    // Error Handling for SoundCloud Widgets
    function setupSoundCloudErrorHandling() {
        // Add error handling for iframe loading
        const soundcloudIframes = document.querySelectorAll('.soundcloud-embed iframe');
        
        soundcloudIframes.forEach((iframe, index) => {
            // Add loading event listener
            iframe.addEventListener('load', () => {
                console.log(`🎵 SoundCloud widget ${index + 1} loaded successfully`);
                // Hide loading indicator
                const container = iframe.closest('.soundcloud-embed');
                if (container) {
                    container.classList.add('loaded');
                }
            });
            
            // Add error event listener
            iframe.addEventListener('error', (e) => {
                console.warn(`⚠️ SoundCloud widget ${index + 1} failed to load:`, e);
                const container = iframe.closest('.soundcloud-embed');
                if (container) {
                    container.classList.add('error');
                    // Add fallback content
                    const fallback = document.createElement('div');
                    fallback.className = 'soundcloud-fallback';
                    fallback.innerHTML = `
                        <div class="fallback-content">
                            <span class="fallback-icon">🎵</span>
                            <p>SoundCloud player temporarily unavailable</p>
                            <a href="${iframe.src.replace('w.soundcloud.com/player/?url=', '').split('&')[0]}" target="_blank" rel="noopener" class="fallback-link">
                                Listen on SoundCloud
                            </a>
                        </div>
                    `;
                    container.appendChild(fallback);
                }
            });
            
            // Set a timeout to catch slow-loading widgets
            setTimeout(() => {
                if (!iframe.closest('.soundcloud-embed').classList.contains('loaded')) {
                    console.log(`⏳ SoundCloud widget ${index + 1} is taking longer to load than expected`);
                }
            }, 5000);
        });
        
        // Improved targeted console error filtering
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        
        // Only suppress very specific SoundCloud errors that we can't control
        const suppressedErrorPatterns = [
            /widget-.*\.js/,
            /IndexSizeError.*getImageData/,
            /Index or size is negative or greater than the allowed amount/,
            /Failed to execute 'getImageData'/,
            /getImageData.*widget/,
            /Source map error.*widget/,
            /ent\/web-sourcemaps/,
            /widget\.sndcdn\.com/,
            /DOMException.*getImageData/,
            /Uncaught DOMException.*Index or size/
        ];
        
        const suppressedWarningPatterns = [
            /AudioContext was prevented from starting automatically/,
            /autoplay.*policy/,
            /AudioContext.*user gesture/,
            /SoundCloud Embed Player/
        ];
        
        console.error = function(...args) {
            const message = args.join(' ');
            // Only suppress if it matches our specific patterns
            if (suppressedErrorPatterns.some(pattern => pattern.test(message))) {
                return; // Suppress only these specific errors
            }
            originalConsoleError.apply(console, args);
        };
        
        console.warn = function(...args) {
            const message = args.join(' ');
            // Only suppress if it matches our specific patterns  
            if (suppressedWarningPatterns.some(pattern => pattern.test(message))) {
                return; // Suppress only these specific warnings
            }
            originalConsoleWarn.apply(console, args);
        };
    }

    // Download Functionality
    function setupDownloadButtons() {
        const downloadPhotosBtn = document.getElementById('downloadPhotos');
        const downloadVideosBtn = document.getElementById('downloadVideos');
        
        if (downloadPhotosBtn) {
            downloadPhotosBtn.addEventListener('click', () => downloadMedia('photos'));
        }
        
        if (downloadVideosBtn) {
            downloadVideosBtn.addEventListener('click', () => downloadMedia('videos'));
        }
    }

    async function downloadMedia(type) {
        const button = document.getElementById(type === 'photos' ? 'downloadPhotos' : 'downloadVideos');
        const originalText = button.querySelector('.download-text').textContent;
        
        // Update button state
        button.disabled = true;
        button.querySelector('.download-text').textContent = 'Preparing...';
        button.querySelector('.download-icon').textContent = '⏳';
        
        try {
            let files = [];
            
            if (type === 'photos') {
                // Get all photo sources
                const photoElements = document.querySelectorAll('.photo-item img');
                files = Array.from(photoElements).map(img => ({
                    url: img.src,
                    filename: img.src.split('/').pop()
                }));
            } else if (type === 'videos') {
                // Get all video sources
                const videoElements = document.querySelectorAll('.performance-video source');
                files = Array.from(videoElements).map(source => ({
                    url: source.src,
                    filename: source.src.split('/').pop()
                }));
            }
            
            if (files.length === 0) {
                throw new Error('No files found to download');
            }
            
            // Update progress
            button.querySelector('.download-text').textContent = 'Downloading...';
            button.querySelector('.download-icon').textContent = '📦';
            
            // Create ZIP file
            if (typeof JSZip !== 'undefined') {
                await createZipDownload(files, `swampcore-${type}.zip`, button);
            } else {
                // Fallback: Download files individually
                await downloadFilesIndividually(files, button);
            }
            
        } catch (error) {
            console.error(`Error downloading ${type}:`, error);
            showNotification(`Error downloading ${type}: ${error.message}`);
            
            // Reset button state
            button.querySelector('.download-text').textContent = 'Error - Try Again';
            button.querySelector('.download-icon').textContent = '❌';
            
            setTimeout(() => {
                button.querySelector('.download-text').textContent = originalText;
                button.querySelector('.download-icon').textContent = '📥';
                button.disabled = false;
            }, 3000);
        }
    }

    async function createZipDownload(files, zipName, button) {
        // This would require JSZip library - for now, let's implement a fallback
        console.log('ZIP functionality would require JSZip library');
        await downloadFilesIndividually(files, button);
    }

    async function downloadFilesIndividually(files, button) {
        const totalFiles = files.length;
        let downloadedCount = 0;
        
        for (const file of files) {
            try {
                // Create download link
                const link = document.createElement('a');
                link.href = file.url;
                link.download = file.filename;
                link.style.display = 'none';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                downloadedCount++;
                
                // Update progress
                const progress = Math.round((downloadedCount / totalFiles) * 100);
                button.querySelector('.download-text').textContent = `Downloading ${progress}%`;
                
                // Small delay between downloads to prevent browser blocking
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } catch (error) {
                console.warn(`Failed to download ${file.filename}:`, error);
            }
        }
        
        // Success state
        button.querySelector('.download-text').textContent = 'Complete!';
        button.querySelector('.download-icon').textContent = '✅';
        
        setTimeout(() => {
            button.querySelector('.download-text').textContent = 'Download';
            button.querySelector('.download-icon').textContent = '📥';
            button.disabled = false;
        }, 2000);
        
        showNotification(`Downloaded ${downloadedCount} files successfully! 🎉`);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Fallback: ensure body becomes visible after 2 seconds max
    setTimeout(() => {
        if (!document.body.classList.contains('loaded')) {
            document.body.classList.add('loaded');
            console.log('🔄 Fallback: Body visibility restored after timeout');
        }
    }, 2000);

    // Expose some functions for debugging
    window.SwampcoreDebug = {
        toggleAudio,
        openModal,
        closeModal,
        switchTab
    };

})(); 