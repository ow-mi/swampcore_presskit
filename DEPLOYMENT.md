# Swampcore DJ Presskit - Deployment Guide

## 🎵 Quick Start

### Local Development

1. **Install Node.js** (version 16 or higher)
2. **Clone or extract** the project files
3. **Open terminal** in the project directory
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open browser** to `http://localhost:3000`

### Alternative Local Server
If you don't have Node.js, you can use Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000`

## 🌐 Production Deployment

### Static Hosting (Recommended)

#### GitHub Pages
1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Go to Settings** → Pages
4. **Select source**: Deploy from branch `main`
5. **Your site** will be available at `https://username.github.io/repository-name`

#### Netlify
1. **Visit** [netlify.com](https://netlify.com)
2. **Drag and drop** your project folder onto Netlify
3. **Your site** will be live with a custom URL
4. **Optional**: Connect to Git for automatic deployments

#### Vercel
1. **Install Vercel CLI**: `npm i -g vercel`
2. **In project directory**: `vercel`
3. **Follow prompts** to deploy
4. **Your site** will be live with automatic HTTPS

### Traditional Web Hosting
1. **Build optimized files** (optional):
   ```bash
   npm run build
   ```
2. **Upload all files** to your web server via FTP/SFTP
3. **Ensure** `index.html` is in the root directory

## 🔧 Build Process

### Development
```bash
npm run dev          # Start dev server with live reload
npm run serve        # Start simple server without auto-open
```

### Production Optimization
```bash
npm run build        # Minify CSS and JavaScript
npm run optimize-images  # Compress images
npm run lint         # Check JavaScript for errors
npm run format       # Format code with Prettier
```

## 📁 File Structure

```
swampcore-presskit/
├── index.html              # Main HTML file
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── package.json            # Node.js dependencies
├── README.md               # Project documentation
├── DEPLOYMENT.md           # This file
├── tone/                   # Audio and background assets
│   ├── swamp_ambience.mp3  # Ambient audio
│   ├── swampcore_thumbnail.png
│   └── *.jpeg/*.png        # Background images
├── dj_pictures/            # Press photos
│   └── *.jpg               # High-res DJ photos
└── dj_video/               # Performance videos
    └── *.mp4               # Video files
```

## ⚡ Performance Optimization

### Before Deployment
1. **Optimize Images**:
   - Use WebP format for better compression
   - Resize images to appropriate dimensions
   - Consider lazy loading for gallery images

2. **Minify Assets**:
   ```bash
   npm run build
   ```

3. **Enable Compression**:
   - Configure GZIP compression on your server
   - Use a CDN for static assets

### Server Configuration

#### Apache (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType audio/mpeg "access plus 1 month"
    ExpiresByType video/mp4 "access plus 1 month"
</IfModule>
```

#### Nginx
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/css text/javascript application/javascript image/svg+xml;

# Cache control
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|mp3|mp4)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔒 Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Content Security Policy**: Consider adding CSP headers
3. **File Permissions**: Ensure proper file permissions on server
4. **Regular Updates**: Keep dependencies updated

## 📊 Analytics & Monitoring

### Google Analytics Setup
1. **Create** a Google Analytics account
2. **Add tracking code** before `</head>` in `index.html`:
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

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check mobile responsiveness

## 🛠️ Troubleshooting

### Common Issues

#### Audio Not Playing
- **Check file path**: Ensure `swamp_ambience.mp3` exists in `tone/` folder
- **Browser policy**: Modern browsers require user interaction before playing audio
- **File format**: Ensure audio is in a supported format (MP3, OGG, WAV)

#### Images Not Loading
- **Check file paths**: Verify image paths in HTML match actual file locations
- **File permissions**: Ensure images are readable by web server
- **File sizes**: Large images may load slowly

#### Modal Not Working
- **JavaScript errors**: Check browser console for errors
- **Missing elements**: Ensure all modal HTML elements exist

#### Responsive Issues
- **Viewport meta tag**: Ensure it's present in HTML head
- **CSS media queries**: Check breakpoints are appropriate
- **Test devices**: Test on various screen sizes

### Debug Mode
Open browser console and type:
```javascript
window.SwampcoreDebug.toggleAudio();  // Test audio
window.SwampcoreDebug.openModal(0);   // Test modal
```

## 📞 Support

If you encounter issues:
1. **Check console** for JavaScript errors
2. **Verify file paths** are correct
3. **Test in different browsers**
4. **Check network requests** in browser dev tools

---

**Built with ❤️ for the swampcore community**
*Where technology meets primordial chaos* 🐊🎵 