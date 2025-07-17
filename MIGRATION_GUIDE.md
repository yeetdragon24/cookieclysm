# Cookieclysm Bundler Migration Guide

## Migration Steps

### 1. Update Entry Point
- Change `cookieclysm.loader.js` to import bundled file instead of LoadScript chain
- Replace multiple LoadScript calls with single script load

### 2. Convert to Modules
```javascript
// Before (multiple files with LoadScript)
LoadScript(path + 'cookieclysm.js', function() {
  LoadScript(path + 'transcensions.js', function() {
    // ... nested callbacks
  });
});

// After (ES6 modules in src/)
// src/main.js (single entry point)
import './cookieclysm.js';
import './transcensions.js';
import './youMinigame.js';
import './sniperGold.js';
// ... other imports

// Import assets (bundled as base64/inline)
import '../cookieclysmStyles.css';
import iconSheet from '../img/iconsheet-c1.0.2.png';
import template from '../template.json';

// Main entry point exports everything
export { C };
```

### 3. Asset Bundling
All assets are now bundled into the single JS file:

```javascript
// CSS - automatically injected as <style> tags
import '../cookieclysmStyles.css';

// Images - converted to base64 data URLs
import iconSheet from '../img/iconsheet-c1.0.2.png';
// iconSheet = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

// JSON - imported as objects
import template from '../template.json';
// template = { buildings: [...] }

// Usage in code
element.style.backgroundImage = `url(${iconSheet})`;
```

### 4. Single Bundle Output
- Webpack outputs one file: `dist/cookieclysm.bundle.js`
- Contains all JS, CSS, images, and JSON
- No external file dependencies

## Testing Migration

1. `npm run build:testing` - builds to dist/ or `npm run serve` (serves at 0.0.0.0:3000) 
2. Load `dist/cookieclysm.bundle.js` instead of multiple files
3. Verify all functionality works with single bundled file

## Release Process

1. `git tag v1.0.x && git push origin v1.0.x`
2. GitHub Action builds and uploads `cookieclysm.bundle.js`
3. Update CDN/hosting to point to new bundled file