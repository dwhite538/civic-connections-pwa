// Track if user dismissed the prompt before
let userDismissed = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Only show if user hasn't dismissed before
  if (!userDismissed) {
    setTimeout(() => {
      const installPrompt = document.getElementById('installPrompt');
      installPrompt.style.display = 'block';
      
      // Hide after 15 seconds
      setTimeout(() => {
        if (installPrompt.style.display !== 'none') {
          installPrompt.style.display = 'none';
          userDismissed = true;
        }
      }, 15000);
    }, 30000); // Wait 30 seconds before showing
  }
});

document.getElementById('installBtn').addEventListener('click', () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    userDismissed = (choice.outcome !== 'accepted');
  });
});