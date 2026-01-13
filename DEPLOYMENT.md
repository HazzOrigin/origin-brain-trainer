# Deployment Guide - Origin Brain Trainer

This guide covers various deployment options for the Origin Brain Trainer.

## 📦 Quick Start

The simplest way to run Origin Brain Trainer locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/origin-brain-trainer.git
cd origin-brain-trainer

# Open in browser (any of these methods work)
open index.html                    # macOS
start index.html                   # Windows
xdg-open index.html               # Linux

# Or use a local server
python3 -m http.server 8000       # Python 3
# Then visit http://localhost:8000
```

## 🌐 GitHub Pages

Deploy for free on GitHub Pages:

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/origin-brain-trainer.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"
   - Your site will be live at: `https://yourusername.github.io/origin-brain-trainer/`

## ☁️ Netlify

Deploy with continuous deployment:

1. **Via Git:**
   ```bash
   # Push your code to GitHub, GitLab, or Bitbucket
   git push origin main
   ```
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings: Leave empty (no build needed)
   - Publish directory: Leave as root
   - Deploy!

2. **Via Drag & Drop:**
   - Go to [netlify.com/drop](https://app.netlify.com/drop)
   - Drag the entire `origin-brain-trainer` folder
   - Your site is live instantly!

## ▲ Vercel

Deploy with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd origin-brain-trainer
vercel

# Follow the prompts, and your site will be live!
```

Or use the Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Click "Deploy"

## 🚀 AWS S3 + CloudFront

For production-grade hosting:

1. **Create S3 Bucket:**
   ```bash
   aws s3 mb s3://origin-brain-trainer
   aws s3 website s3://origin-brain-trainer --index-document index.html
   ```

2. **Upload Files:**
   ```bash
   aws s3 sync . s3://origin-brain-trainer --exclude ".git/*"
   ```

3. **Configure CloudFront:**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Enable HTTPS
   - Configure custom domain (optional)

## 🐳 Docker

Run in a container:

1. **Create Dockerfile:**
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t origin-brain-trainer .
   docker run -p 8080:80 origin-brain-trainer
   # Visit http://localhost:8080
   ```

## 🔧 Server Configuration

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/origin-brain-trainer;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable CORS if needed
    add_header Access-Control-Allow-Origin *;
}
```

### Apache

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/origin-brain-trainer
    
    <Directory /var/www/origin-brain-trainer>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Enable CORS if needed
    Header set Access-Control-Allow-Origin "*"
</VirtualHost>
```

## 🔐 HTTPS Configuration

Always use HTTPS in production. Free options:

### Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is configured automatically
```

### Cloudflare

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Always Use HTTPS"
4. Free SSL/TLS certificate is automatic

## 🌍 Custom Domain

1. **Purchase domain** (Namecheap, GoDaddy, Google Domains, etc.)

2. **Configure DNS:**
   - For GitHub Pages:
     ```
     A     @    185.199.108.153
     A     @    185.199.109.153
     A     @    185.199.110.153
     A     @    185.199.111.153
     CNAME www  yourusername.github.io
     ```

   - For Netlify/Vercel:
     - Follow their custom domain setup wizard
     - Usually just a CNAME record

## 📊 Monitoring

Add analytics (optional):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: .
```

## 🛡️ Security Considerations

1. **CORS Configuration:**
   - Configure your MCP server to accept requests from your domain
   - Don't use wildcard CORS in production

2. **Content Security Policy:**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;">
   ```

3. **Rate Limiting:**
   - Implement rate limiting on your MCP server
   - Prevent abuse and DoS attacks

## 📝 Environment-Specific Configuration

For different environments (dev/staging/prod), you can create config files:

```javascript
// config.js
const config = {
  development: {
    mcpServerUrl: 'http://localhost:3000/upload'
  },
  production: {
    mcpServerUrl: 'https://api.yourdomain.com/upload'
  }
};

const env = window.location.hostname === 'localhost' ? 'development' : 'production';
export default config[env];
```

## 🚨 Troubleshooting

**CORS Errors:**
- Ensure your MCP server has proper CORS headers
- Check browser console for specific error messages

**File Upload Fails:**
- Verify MCP server URL is correct
- Check server logs for errors
- Ensure server accepts multipart/form-data

**Styling Issues:**
- Clear browser cache
- Check console for CSS loading errors
- Verify font CDN (Google Fonts) is accessible

## 📞 Support

For deployment issues, please open an issue on GitHub or check our documentation.

---

Made with 🧠 by Origin Brain Trainer Team
