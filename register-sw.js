if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/civil-connections-pwa/sw.js', { 
      scope: '/civil-connections-pwa/' 
    })
    .then(reg => console.log('SW registered for scope:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
  });
}