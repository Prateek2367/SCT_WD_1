# SkillCraft Internship - Task 01: Interactive Fixed Navigation Menu

A modern, responsive, and interactive navigation menu designed and built with pure **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript**.

---

## 🌟 Key Features

### 1. Fixed Position Across All Pages
- The navigation menu is pinned to the top of the viewport (`position: fixed; top: 0; left: 0; width: 100%; z-index: 1000`) and remains accessible at all times, no matter how deep the user scrolls.
- Multi-page consistency: Persists seamlessly across [index.html](file:///Users/muthuprateek/Documents/SKILL%20CRAFT%20INTERNSHIP/index.html), [about.html](file:///Users/muthuprateek/Documents/SKILL%20CRAFT%20INTERNSHIP/about.html), [services.html](file:///Users/muthuprateek/Documents/SKILL%20CRAFT%20INTERNSHIP/services.html), and [contact.html](file:///Users/muthuprateek/Documents/SKILL%20CRAFT%20INTERNSHIP/contact.html).

### 2. Dynamic Scroll Transformation
- **Initial (Top) State**: Transparent background, spacious height (`88px`), clean borders, and glowing brand emblem.
- **Scrolled State (`.scrolled`)**: Triggered when scrolling past `50px`. Automatically transitions to:
  - Frosted glassmorphism background (`backdrop-filter: blur(16px)`)
  - Slimmer profile (`68px`)
  - Subtle luminous bottom border
  - Elevated box-shadow for depth
  - Top reading progress bar that smoothly fills from `0%` to `100%` corresponding to scroll depth.
- Optimized performance using `window.requestAnimationFrame` to avoid layout thrashing.

### 3. Rich Hover & Magnetic Indicator Animations
- **Magnetic Sliding Pill**: A background indicator pill dynamically tracks cursor position and smoothly slides under the hovered or active menu link.
- **Hover Transitions**: Menu text changes color, micro-lifts (`translateY(-1px)`), and displays active indicator dots.
- **Dropdown Submenu**: Hovering over the **Services** link reveals a glassmorphic nested menu with custom icons, descriptions, and staggered hover states.

### 4. Live Style Customizer & Theme Switcher
- **Dark / Light Mode**: Integrated toggle persisted in `localStorage`.
- **4 Live Navbar Style Presets**:
  1. *Glassmorphic Frost* (Modern frosted blur)
  2. *Cyber Neon* (Cyan/magenta ambient glow)
  3. *Aurora Glow* (Mesh gradient backdrop)
  4. *Minimalist Clean* (Clean flat contrast)

### 5. Fully Responsive Mobile Navigation
- Animated hamburger toggle (transforms into an 'X').
- Slide-in glassmorphism mobile drawer with staggered navigation items and backdrop overlay.

---

## 🚀 How to Run Locally

You can run this project in any modern browser:

### Option 1: Direct File
Double click or open [index.html](file:///Users/muthuprateek/Documents/SKILL%20CRAFT%20INTERNSHIP/index.html) in your favorite web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server (Recommended)
Run any simple HTTP server in the project directory:
```bash
# Using Python
python3 -m http.server 3000

# Or using Node.js / npx
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
SKILL CRAFT INTERNSHIP/
├── index.html        # Main landing page with full interactive showcase
├── about.html        # Dedicated about page verifying persistent navbar
├── services.html     # Dedicated services page with dropdown anchor links
├── contact.html      # Dedicated contact page with interactive form
├── css/
│   └── style.css     # Complete design system, glassmorphism, responsive styles
├── js/
│   └── main.js       # Scroll handler, magnetic pill, theme/style switcher
└── README.md         # Documentation & guide
```
