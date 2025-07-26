// Cross-browser install handler
let deferredPrompt;
let promptShown = false;

// Browser Detection
const isChrome = /Chrome|Edg/.test(navigator.userAgent);
const isFirefox = /Firefox/.test(navigator.userAgent);
const isSamsung = /SamsungBrowser/.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// Auto-show prompt for Chrome/Edge
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  if (!promptShown && isChrome) {
    setTimeout(() => {
      showInstallPrompt();
      promptShown = true;
    }, 2000); // 2-second delay
  }
});

// Show browser-specific install guide
function showInstallGuide() {
  if (isIOS) {
    alert("1. Tap the Share icon (📤)\n2. Select 'Add to Home Screen'");
  } 
  else if (isFirefox) {
    alert("1. Tap the menu (⋮)\n2. Choose 'Install'");
  } 
  else if (isSamsung) {
    alert("1. Tap the download icon (⬇️)\n2. Select 'Add to Home Screen'");
  }
  else if (deferredPrompt) {
    showInstallPrompt();
  }
}

// Chrome/Edge install flow
function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        showPostInstallTip();
      }
    });
  }
}

// Post-install helper
function showPostInstallTip() {
  const tip = document.createElement('div');
  tip.innerHTML = `
    <div style="position:fixed; bottom:20px; left:20px; right:20px; background:#2E7D32; color:white; padding:12px; border-radius:8px; text-align:center; z-index:9999;">
      ✅ Installed! Look for <b>Food Finder</b> in your app drawer.
    </div>
  `;
  document.body.appendChild(tip);
  setTimeout(() => tip.remove(), 5000);
}

// Initialize universal button for non-Chrome mobile browsers
if ((isFirefox || isSamsung) && !window.matchMedia('(display-mode: standalone)').matches) {
  const installBtn = document.getElementById('universal-install');
  const browserIcon = document.getElementById('browser-icon');
  
  if (isFirefox) {
    browserIcon.textContent = '🦊';
    document.getElementById('install-text').textContent = 'Install via Firefox';
  } 
  else if (isSamsung) {
    browserIcon.textContent = '⬇️';
    document.getElementById('install-text').textContent = 'Install via Samsung';
  }
  
  installBtn.style.display = 'block';
}