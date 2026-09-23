# Boss Gee Furniture - Desktop & Mobile Packaging Guide

This project includes production-ready configurations for:
1. **Windows PC Desktop Application** (Electron + electron-builder)
   - Generates `Boss-Gee-Furniture-Setup.exe` (NSIS Installer)
   - Generates `Boss-Gee-Furniture-Portable.exe` (Standalone portable execution without install)
2. **Android Google Play Store Application** (Capacitor)
   - Generates Android Studio project ready for signed `.aab` / `.apk` upload to Google Play Console.
3. **High-Performance Web Application** (React 19 + Vite 8 + Tailwind CSS 4)

---

## 1. Windows PC Desktop Application

### Scripts configured in `package.json`:
- `npm run electron:dev`: Run Vite + Electron locally in development mode.
- `npm run electron:build`: Compile Vite frontend and package the desktop app.
- `npm run build:win`: Compile and produce the Windows NSIS installer (`Boss-Gee-Furniture-Setup.exe`).

### Windows Installer Features:
- Custom application name: **Boss Gee Furniture**
- Desktop shortcut creation
- Windows Start Menu integration
- Direct offline catalogue caching
- Native integration with Windows dialer / VoIP and WhatsApp Web / Desktop client
- Seamless "Visit Website" launcher

---

## 2. Android (Google Play Store) Packaging

The project includes `capacitor.config.json` sharing the identical branding, catalogue, quote system, and WhatsApp integration.

### Steps to build the Android `.aab` for Google Play:
1. `npm run build`
2. `npx cap add android` (First time)
3. `npx cap sync android`
4. `npx cap open android` (Opens Android Studio to sign and generate Android App Bundle)

---

## 3. Central Configuration Updating

To update phone numbers, live download links, or domain URLs:
Open `src/config/businessConfig.ts`:
- `WEBSITE_URL`: Set your official website domain
- `PC_APP_DOWNLOAD_URL`: Set direct download link for `Boss-Gee-Furniture-Setup.exe`
- `ANDROID_APP_URL`: Set Google Play Store app link
- `PHONE`: Business phone number
- `WHATSAPP`: Business WhatsApp number
