let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(showInstallPrompt, 5000); // Show after 5 sec
});

function showInstallPrompt() {
  if (deferredPrompt) {
    const prompt = document.getElementById('installPrompt');
    prompt.style.display = 'block';
    setTimeout(() => prompt.style.display = 'none', 15000); // Hide after 15 sec
  }
}

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('PWA installed');
      }
      document.getElementById('installPrompt').style.display = 'none';
    });
  }
}