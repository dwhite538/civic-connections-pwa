// Wait for DOM to load before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  const installPrompt = document.getElementById('installPrompt');
  const installBtn = document.getElementById('installBtn');
  
  let deferredPrompt;
  let userDismissed = false;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    if (!userDismissed && installPrompt) {
      setTimeout(() => {
        installPrompt.style.display = 'block';
        setTimeout(() => {
          if (installPrompt.style.display !== 'none') {
            installPrompt.style.display = 'none';
            userDismissed = true;
          }
        }, 15000);
      }, 30000);
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
          userDismissed = (choice.outcome !== 'accepted');
          if (installPrompt) installPrompt.style.display = 'none';
        });
      }
    });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully!');
});