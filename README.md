# Swampcore DJ Presskit 

**🌿 Dark Psychedelic Swamp Psydustrial Tech-Trance**

A professional DJ presskit website featuring immersive swamp atmosphere, dynamic backgrounds, and comprehensive media galleries. Built for **Swampcore**, a Franco-Irish DJ rooted in the Dutch underground and RaveRats collective.

---

## 🚀 Live Demo

**Local Server**: `python3 -m http.server 8000`  
**URL**: [http://localhost:8000](http://localhost:8000)

---

## ✨ Features

### 🎵 **Content Sections**
- **Bio**: Franco-Irish DJ background with RaveRats collective connection
- **Featured Tracks**: 4 tabbed sections (MOP Teaser, Drops Teaser, Hard Psytech, Industrial Psytech)
- **Press Photos**: 6 high-quality DJ images with modal gallery
- **Performance Videos**: 4 live performance recordings
- **Technical Rider**: Simplified equipment requirements

### 🎨 **Visual Design**
- **Dynamic Swamp Background**: Subtle parallax motion with `swamp_1.jpeg`
- **Glass Card UI**: Backdrop blur effects with glowing borders
- **Dark Green Theme**: Immersive swamp color palette
- **Responsive Design**: Mobile-first approach with elegant scaling

### 🎧 **Interactive Features**
- **Ambient Audio**: Swamp soundscape with volume control
- **Modal Image Gallery**: Fullscreen photo viewer with navigation
- **Tab System**: Dynamic content switching for track sections
- **Smooth Animations**: Subtle parallax and hover effects

---

## 📁 Project Structure

```
presskit_v2/
├── index.html              ← Main website
├── styles.css              ← All styling and animations
├── script.js               ← Interactive functionality
├── README.md               ← This file
├── dj_pictures/            ← Press photos
│   ├── swampcore_image_1.jpg
│   ├── swampcore_image_2.jpg
│   ├── swampcore_image_3.jpg
│   ├── swampcore_image_4.jpg
│   ├── swampcore_image_5.jpg
│   └── swampcore_image_6.jpg
├── tone/                   ← Audio & background assets
│   ├── swamp_ambience.mp3
│   ├── swampcore_thumbnail.png
│   ├── swamp_1.jpeg        ← Main background image
│   ├── swamp_2.jpeg
│   ├── swamp_3.jpeg
│   └── swamp_4.jpeg
└── dj_video/               ← Performance videos
    ├── swampcore_drops_teaser_1.mp4
    ├── swampcore_trance_and_dance_1.mp4
    ├── swampcore_mop_teaser_1.mp4
    └── swampcore_mop_teaser_2.mp4
```

---

## 🎨 Design System

### **Color Palette**
```css
--swamp-bg-dark: #0a1a0a;       /* Deep swamp darkness */
--swamp-bg-light: #1a2e1a;     /* Lighter swamp green */
--accent-green: #39ff39;        /* Primary green accent */
--accent-lime: #7fff00;         /* Bright lime highlights */
--accent-blue: #00ffcc;         /* Cyan accents */
--glass-bg: rgba(26, 46, 26, 0.6); /* Glass card background */
```

### **Typography**
- **Primary**: 'Inter' - Clean, modern body text
- **Mono**: 'JetBrains Mono' - Technical elements and links
- **Trippy**: 'Syne Mono' - Headers and special emphasis
- **Creepy**: 'Creepster' - Atmospheric decorative text

### **Motion Design**
- **Subtle Parallax**: 50% reduced motion for contemplative feel
- **Background Animation**: 50s-60s slow cycles for hypnotic effect
- **Hover Effects**: Gentle glowing and scaling transitions

---

## 🌐 Deployment

### **Quick Deploy Options**

#### 1. **GitHub Pages** (Recommended)
```bash
# Initialize repo
git init
git add .
git commit -m "Initial Swampcore presskit"

# Create GitHub repo and push
git remote add origin https://github.com/username/swampcore-presskit.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repo settings
```

#### 2. **Netlify**
- Drag and drop the entire `presskit_v2` folder to netlify.com
- Instant deployment with custom domain support

#### 3. **Vercel**
```bash
npx vercel --prod
```

#### 4. **Traditional Hosting**
- Upload all files to your web server
- Ensure `index.html` is in the root directory
- Configure HTTPS for production

---

## 🎵 Content Management

### **Updating Social Links**
Edit the header connect section in `index.html`:
```html
<a href="mailto:swampcore@proton.me" class="connect-link">✉️</a>
<a href="https://soundcloud.com/swampcore-540164399" class="connect-link">🎵</a>
<a href="https://www.instagram.com/swampcore_music" class="connect-link">📸</a>
```

### **Adding New Photos**
1. Add images to `dj_pictures/` folder
2. Update the photo gallery in `index.html`
3. Images automatically get modal functionality

### **SoundCloud Integration**
Replace iframe `src` attributes with actual SoundCloud embed URLs:
```html
<iframe src="https://w.soundcloud.com/player/?url=YOUR_TRACK_URL&color=%23a855f7&auto_play=false">
</iframe>
```

---

## 🔧 Technical Specifications

### **Performance**
- **Lazy Loading**: Images load as they enter viewport
- **Optimized Animations**: GPU-accelerated transforms
- **Lightweight**: No external frameworks, pure vanilla JS
- **Fast Loading**: Optimized asset delivery

### **Accessibility**
- **Keyboard Navigation**: Full tab accessibility
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Proper focus trapping in modals

### **Browser Support**
- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Graceful Degradation**: Fallbacks for older browsers

---

## 🎧 Audio Features

### **Ambient Swamp Audio**
- **File**: `tone/swamp_ambience.mp3` (12MB)
- **Controls**: Play/pause toggle, volume slider
- **User-Activated**: Respects browser autoplay policies
- **Loop**: Continuous atmospheric soundscape

---

## 🛠️ Development

### **Local Development**
```bash
# Start local server
python3 -m http.server 8000

# Or with Node.js
npx serve .

# View at http://localhost:8000
```

### **Debug Console**
Access debug functions in browser console:
```javascript
SwampcoreDebug.toggleAudio()
SwampcoreDebug.openModal(0)
SwampcoreDebug.switchTab('hard-psytech')
```

---

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px-1199px (Adjusted grid)
- **Mobile**: 320px-767px (Single column)

---

## 🔮 Future Enhancements

- [ ] Contact form integration
- [ ] Newsletter signup
- [ ] Event calendar
- [ ] Music streaming widget
- [ ] Tour dates section
- [ ] Merchandise integration

---

## 📄 License

This presskit is created for **Swampcore** DJ brand. 

**Contact**: swampcore@proton.me  
**Instagram**: @swampcore_music  
**SoundCloud**: soundcloud.com/swampcore-540164399

---

*"Swampcore's music doesn't entertain — it possesses."*

**🌿 Dive into the digital swamp where technology meets primordial chaos 🌿**

