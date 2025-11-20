// Register Service Worker
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });

            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New content is available, show update notification if needed
                        console.log('New content is available; please refresh.');
                    }
                });
            });

        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

// Initialize service worker
registerServiceWorker();


window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); 
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        event.prompt(); 
        event.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('El usuario aceptó la instalación de PWA');
                installButton.style.display = 'none';
            } else {
                console.log('El usuario descartó la instalación de PWA');
            }
        });
    });
});
