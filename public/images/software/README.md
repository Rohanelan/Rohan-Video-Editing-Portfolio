# Software Arsenal Custom Logos Directory

Place your custom software logo image files in this directory.

### Supported Formats
- PNG (`.png`) — Recommended for transparent backgrounds
- SVG (`.svg`) — Recommended for vector graphics
- WEBP (`.webp`)
- JPEG / JPG (`.jpg`, `.jpeg`)

### Recommended File Naming
- `premiere.png` (Adobe Premiere Pro)
- `davinci.png` (DaVinci Resolve)
- `aftereffects.png` (Adobe After Effects)
- `capcut.png` (CapCut)
- `filmora.png` (Wondershare Filmora)
- `vn.png` (VN Video Editor)

### How to use in `src/data/softwareLogos.ts`:
Once you save an image in this directory, open `src/data/softwareLogos.ts` and update the corresponding entry:

```typescript
export const SOFTWARE_LOGOS = {
  premierePro: '/images/software/premiere.png',
  davinciResolve: '/images/software/davinci.png',
  afterEffects: '/images/software/aftereffects.png',
  capcut: '/images/software/capcut.png',
  filmora: '/images/software/filmora.png',
  vnEditor: '/images/software/vn.png',
};
```

If you leave an entry as an empty string `''`, the website will automatically display the authentic built-in vector logo.

