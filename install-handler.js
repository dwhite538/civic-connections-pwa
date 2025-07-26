// ======================
// PWA Installation Handler
// Supports: Chrome, Firefox, Samsung, iOS
// ======================

// Browser Detection
const isChrome = /Chrome|Edg/.test(navigator.userAgent);
const isFirefox = /Firefox/.test(navigator.userAgent);
const isSamsung = /SamsungBrowser/.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

let deferredPrompt;
let promptShown = false;

// ======================
// 1. Chrome/Edge Auto-Prompt (2s delay)
// ======================
if (!isStandalone && isChrome) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    if (!promptShown) {
      setTimeout(() => {
        showInstallPrompt();
        promptShown = true;
      }, 2000); // 2-second delay
    }
  });
}

// ======================
// 2. Firefox/Samsung Visual Guide
// ======================
if ((isFirefox || isSamsung) && !isStandalone) {
  // Show browser-specific install guidance
  const installGuide = document.createElement('div');
  installGuide.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2E7D32;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    z-index: 9999;
    max-width: 90%;
    animation: pulse 2s infinite;
  `;

  if (isFirefox) {
    installGuide.innerHTML = `
      <p>To install:</p>
      <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
        <span style="font-size:1.5em">⋮</span> 
        <span>→ <b>Install</b></span>
      </div>
    `;
  } else if (isSamsung) {
    installGuide.innerHTML = `
      <p>To install:</p>
      <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
        <span style="font-size:1.5em">⬇️</span>
        <span>→ <b>Add to Home Screen</b></span>
      </div>
    `;
  }

  document.body.appendChild(installGuide);
  
  // Auto-dismiss after 15 seconds
  setTimeout(() => {
    installGuide.style.opacity = '0';
    setTimeout(() => installGuide.remove(), 500);
  }, 15000);
}

// ======================
// 3. iOS Instructions
// ======================
if (isIOS && !isStandalone) {
  const iosGuide = document.createElement('div');
  iosGuide.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: #2E7D32;
    color: white;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    z-index: 9999;
    animation: bounce 2s infinite;
  `;
  iosGuide.innerHTML = `
    <p>Tap <img src="https://cdn-icons-png.flaticon.com/512/61/61020.png" style="height:1em; vertical-align:middle"> 
    → <b>"Add to Home Screen"</b></p>
  `;
  
  document.body.appendChild(iosGuide);
  setTimeout(() => iosGuide.remove(), 10000);
}

// ======================
// Core Functions
// ======================
function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        showInstallSuccess();
      }
    });
  }
}

function showInstallSuccess() {
  const successMsg = document.createElement('div');
  successMsg.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: #2E7D32;
    color: white;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    z-index: 9999;
  `;
  successMsg.textContent = '✅ Installed! Find "Food Finder" in your app drawer.';
  
  document.body.appendChild(successMsg);
  setTimeout(() => {
    successMsg.style.opacity = '0';
    setTimeout(() => successMsg.remove(), 500);
  }, 5000);
}

// ======================
// Animation Styles
// ======================
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(styleEl);