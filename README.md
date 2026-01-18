# 🦄 CleanNow

A mood-driven chore assistant PWA with magical unicorn vibes ✨

## Features

### 🌈 Mood-Based Suggestions
- Select your current energy level (1-5)
- Get personalized chore suggestions matched to how you're feeling
- Low energy? Get simpler tasks. Feeling hyper? Tackle the big ones!

### ⏱️ Day Progress Tracking
- Visual progress bar showing your day completion
- Customizable day start/end times in profile (default: 8am - 11pm)
- Task timing dots show optimal times to complete suggested chores

### 📊 Score Dashboard
- **This Week**: Track weekly task completion (goal: 10/week)
- **Today's Goal**: Daily target (goal: 3/day)
- **All Time**: Total tasks completed
- **Streak Counter**: Days in a row with completed tasks

### 🎨 4 Beautiful Themes
1. **🦄 Unicorn** (default) - Pink/purple/cyan gradients with sparkles
2. **🌸 Garden** - Fresh greens with flower animations
3. **🪔 Warm Lamps** - Cozy amber/orange glow
4. **☕ Cozy Sunday** - Warm browns with soft cream accents

### ⏰ Smart Chore Timing
Each chore shows suggested best time based on energy required:
- Low energy tasks → Evening or anytime
- Medium energy → Morning or afternoon
- High energy → Morning (when fresh!)

### ✅ Task Management
- Start tasks with a timer
- Mark complete with celebration animations
- View history with redo/delete options
- Focus mode to concentrate on one chore

### � Default Catalog
The app comes pre-loaded with these smart suggestions:
- **Daily**: Dishes, Garbage
- **Every few days**: Laundry, Folding, Workstation
- **Weekly**: Sheets, Bathroom, Floors, Organizing, Bills
- **Relaxation**: Reading, Painting, Dancing, Self-Care

### �🔄 Auto-Update
- Detects new versions automatically
- Beautiful update notification banner
- One-tap update with seamless reload

### 📱 PWA Features
- Install on home screen
- Works offline
- Native app feel
- Service worker caching

## Tech Stack

- **HTML5** / **CSS3** / **Vanilla JavaScript**
- **PWA** - Service Worker, Web App Manifest
- **Local Storage** - Persistent state
- **No dependencies** - Pure web technologies

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/vikram-sra/cleanNow.git
   ```

2. Serve locally (any static server works):
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

3. Open in browser and install as PWA

## Customization

### Add Custom Chores
1. Open Profile (👤 button)
2. Scroll to "My Chores"
3. Tap "+ Add"
4. Choose emoji, name, priority, and energy level

### Add Hobbies
Break suggestions use your hobby list for relaxation ideas.

### Adjust Day Schedule
Set your preferred day start/end times in Profile → "⏰ My Day Schedule"

## File Structure

```
CleanNow/
├── index.html      # Main HTML structure
├── styles.css      # All styling and themes
├── app.js          # Application logic
├── sw.js           # Service worker for PWA
├── manifest.json   # PWA manifest
└── icons/          # App icons
    ├── icon-192.png
    └── icon-512.png
```

## License

MIT

---

Made with 💖 and ✨ unicorn magic
