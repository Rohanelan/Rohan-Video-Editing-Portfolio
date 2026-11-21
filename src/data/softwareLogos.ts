/**
 * ============================================================================
 * SOFTWARE ARSENAL - LOGO CONFIGURATION
 * ============================================================================
 * 
 * Easily replace or customize any of the 6 software logos displayed in the
 * Software Arsenal section.
 * 
 * Configured with the authentic software logo assets uploaded by the user:
 * 1. Adobe Premiere Pro -> /images/software/premiere.jpg
 * 2. DaVinci Resolve -> /images/software/davinci.png
 * 3. Adobe After Effects -> /images/software/aftereffects.png
 * 4. CapCut -> /images/software/capcut.png
 * 5. Wondershare Filmora -> /images/software/filmora.png
 * 6. VN Video Editor -> /images/software/vn.png
 * ============================================================================
 */

export interface SoftwareLogosConfig {
  premierePro?: string;
  davinciResolve?: string;
  afterEffects?: string;
  capcut?: string;
  filmora?: string;
  vnEditor?: string;
}

export const SOFTWARE_LOGOS: SoftwareLogosConfig = {
  // 1. Adobe Premiere Pro
  premierePro: '/images/software/premiere.png',

  // 2. DaVinci Resolve
  davinciResolve: '/images/software/davinci.png',

  // 3. Adobe After Effects
  afterEffects: '/images/software/aftereffects.png',

  // 4. CapCut (Mobile / Desktop)
  capcut: '/images/software/capcut.png',

  // 5. Wondershare Filmora
  filmora: '/images/software/filmora.png',

  // 6. VN Video Editor
  vnEditor: '/images/software/vn.png',
};

export default SOFTWARE_LOGOS;
