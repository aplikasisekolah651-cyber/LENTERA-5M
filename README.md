# LENTERA 5M - SMP Negeri 2 Kasihan

Ekosistem Literasi Digital Interaktif berlandaskan alur 5M (Membaca, Menemukan, Menulis, Menceritakan, Mengapresiasi) dengan integrasi Google Cloud Firebase Firestore.

## 🚀 Panduan Deployment ke GitHub & Vercel

### 1. Ekspor ke GitHub
- Di Google AI Studio, klik menu **Settings (ikon gerigi di kanan atas)**.
- Pilih **Export to GitHub** atau **Download ZIP**.
- Jika menggunakan ZIP:
  ```bash
  git init
  git add .
  git commit -m "Initial commit Lentera 5M"
  git branch -M main
  git remote add origin https://github.com/USERNAME/NAMA_REPO.git
  git push -u origin main
  ```

### 2. Deploy ke Vercel
Proyek ini sudah dilengkapi file konfigurasi `vercel.json`:
- Masuk ke [vercel.com](https://vercel.com)
- Klik **Add New Project** lalu pilih repositori GitHub Anda.
- **Framework Preset**: Vite (terdeteksi otomatis).
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Klik **Deploy**.

### 3. Database Cloud (Google Cloud Firebase Firestore)
Database telah terkonfigurasi otomatis dengan konfigurasi di `firebase-applet-config.json` dan aturan keamanan `firestore.rules`:
- **Project ID**: `gen-lang-client-0840024627`
- **Database**: Cloud Firestore
- **Koleksi**:
  - `journals`: Riwayat membaca harian dan verifikasi guru
  - `reviews`: Portofolio resensi dan karya siswa
  - `students`: Data gamifikasi dan poin literasi
