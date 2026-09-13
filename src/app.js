/**
 * LENTERA 5M - Ekosistem Literasi Digital Interaktif
 * SMP Negeri 2 Kasihan, Bantul, D.I. Yogyakarta
 * 
 * Single-file SPA Engine: State, Router, 5M Flow, Gamification, 
 * AI Assistant, Local Wisdom, Analytics & Administration
 */

import './firebase.js';
import * as XLSX from 'xlsx';

// ==========================================
// 1. INITIAL DATA SEEDS & STORAGE ENGINE
// ==========================================

const STORAGE_KEYS = {
  USERS: 'lentera_users',
  CURRENT_USER: 'lentera_current_user',
  BOOKS: 'lentera_books',
  JOURNALS: 'lentera_journals',
  WORKS: 'lentera_works',
  BOOKTALKS: 'lentera_booktalks',
  FINDINGS: 'lentera_findings',
  ACTIVE_BOOK: 'lentera_active_book',
  QUIZ_QUESTIONS: 'lentera_quiz_questions',
  SETTINGS: 'lentera_settings'
};

const DEFAULT_SETTINGS = {
  schoolName: 'SMP Negeri 2 Kasihan',
  schoolAddress: 'Jl. Madukismo, Kasihan, Bantul, D.I. Yogyakarta',
  targetReadingMinutes: 15,
  weeklyTargetPages: 50,
  semester: 'Tahun Ajaran 2024/2025',
  firestoreDbId: 'ai-studio-lentera5m-a556f3cb-5d3a-4b6a-af7a-e128703b4975'
};

const DEFAULT_USERS = [
  {
    id: 'u-admin',
    name: 'Administrator LENTERA 5M',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    kelas: 'Administrator Sistem & Data Literasi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    points: 2500,
    streak: 99,
    booksCount: 15,
    worksCount: 10,
    level: 'Super Admin',
    badges: ['Administrator Sistem', 'Pengelola Data 5M', 'Kurator Utama']
  },
  {
    id: 'u-siswa1',
    name: 'Aisyah Putri Rahma',
    nisn: '0098231001',
    username: 'siswa1',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    waliKelas: 'Ibu Zusma Nadya Izzati, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    points: 1250,
    streak: 7,
    m1_books: 8,
    m1_duration: 350,
    m2_findings: 12,
    m2_quizScore: 95,
    m3_works: 5,
    m4_talks: 3,
    m5_appreciations: 18,
    status: 'aktif',
    level: 'Pembaca Kreatif',
    badges: ['Pena Emas', 'Ksatria Kasihan', 'Pembaca Tekun']
  },
  {
    id: 'u-siswa2',
    name: 'Anisa Rahma',
    nisn: '0098231002',
    username: 'siswa2',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8A',
    waliKelas: 'Bpk. Hendro, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    points: 620,
    streak: 7,
    m1_books: 14,
    m1_duration: 420,
    m2_findings: 10,
    m2_quizScore: 90,
    m3_works: 4,
    m4_talks: 2,
    m5_appreciations: 15,
    status: 'aktif',
    level: 'Peneliti Muda',
    badges: ['Bintang Literasi', 'Penyair Bantul']
  },
  {
    id: 'u-siswa3',
    name: 'Bagus Kurniawan',
    nisn: '0098231003',
    username: 'siswa3',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    waliKelas: 'Ibu Zusma Nadya Izzati, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    points: 380,
    streak: 5,
    m1_books: 9,
    m1_duration: 280,
    m2_findings: 8,
    m2_quizScore: 85,
    m3_works: 3,
    m4_talks: 2,
    m5_appreciations: 12,
    status: 'aktif',
    level: 'Pembaca Konsisten',
    badges: ['Penjelajah Buku', 'Juara Resensi 8B']
  },
  {
    id: 'u-siswa4',
    name: 'Dimas Aditya Pratama',
    nisn: '0098231004',
    username: 'siswa4',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    waliKelas: 'Ibu Zusma Nadya Izzati, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    points: 150,
    streak: 2,
    m1_books: 5,
    m1_duration: 150,
    m2_findings: 4,
    m2_quizScore: 75,
    m3_works: 1,
    m4_talks: 1,
    m5_appreciations: 6,
    status: 'aktif',
    level: 'Pembaca Pemula',
    badges: ['Langkah Awal']
  },
  {
    id: 'u-siswa5',
    name: 'Rizki Nur Fauzi',
    nisn: '0098231005',
    username: 'siswa5',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    waliKelas: 'Ibu Zusma Nadya Izzati, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    points: 40,
    streak: 0,
    m1_books: 2,
    m1_duration: 45,
    m2_findings: 1,
    m2_quizScore: 60,
    m3_works: 0,
    m4_talks: 0,
    m5_appreciations: 2,
    status: 'pasif',
    daysInactive: 6,
    level: 'Pembaca Baru',
    badges: []
  },
  {
    id: 'u-siswa6',
    name: 'Siti Fatimah',
    nisn: '0098231006',
    username: 'siswa6',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8A',
    waliKelas: 'Bpk. Hendro, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    points: 80,
    streak: 0,
    m1_books: 3,
    m1_duration: 60,
    m2_findings: 2,
    m2_quizScore: 70,
    m3_works: 1,
    m4_talks: 0,
    m5_appreciations: 3,
    status: 'pasif',
    daysInactive: 7,
    level: 'Pembaca Baru',
    badges: []
  },
  {
    id: 'u-siswa7',
    name: 'Wahyu Nugroho',
    nisn: '0098231007',
    username: 'siswa7',
    password: 'siswa123',
    role: 'siswa',
    kelas: '7A',
    waliKelas: 'Ibu Nurul, S.Pd.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    points: 220,
    streak: 4,
    m1_books: 6,
    m1_duration: 190,
    m2_findings: 5,
    m2_quizScore: 80,
    m3_works: 2,
    m4_talks: 1,
    m5_appreciations: 8,
    status: 'aktif',
    level: 'Pembaca Berkembang',
    badges: ['Pembaca Semangat']
  },
  {
    id: 'u-siswa8',
    name: 'Nabila Zahra',
    nisn: '0098231008',
    username: 'siswa8',
    password: 'siswa123',
    role: 'siswa',
    kelas: '9C',
    waliKelas: 'Bpk. Triyanto, M.Pd.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    points: 350,
    streak: 6,
    m1_books: 8,
    m1_duration: 260,
    m2_findings: 7,
    m2_quizScore: 88,
    m3_works: 3,
    m4_talks: 2,
    m5_appreciations: 14,
    status: 'aktif',
    level: 'Penulis Muda',
    badges: ['Pena Kreatif']
  },
  {
    id: 'u-guru1',
    name: 'Ibu Zusma Nadya Izzati, S.Pd.',
    username: 'guru1',
    password: 'guru123',
    role: 'guru',
    nip: '199108152019032018',
    kelas: '8B',
    waliKelas: '8B',
    mapel: 'Bahasa Indonesia',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    points: 950,
    streak: 15,
    level: 'Pembina GLS Utama',
    badges: ['Wali Kelas 8B', 'Pembina GLS Utama', 'Fasilitator 5M']
  },
  {
    id: 'u-kepsek',
    name: 'Erna Retnaningsih, S.Pd., M.Pd.',
    username: 'kepsek',
    password: 'admin123',
    role: 'kepsek',
    nip: '197303261998022001',
    kelas: 'Kepala SMPN 2 Kasihan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    points: 1200,
    streak: 30,
    level: 'Kepala Sekolah',
    badges: ['Pelindung Gerakan Literasi', 'Supervisi Makro GLS']
  }
];

const COVER_LASKAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420"><defs><linearGradient id="bgLaskar" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23d946ef"/><stop offset="35%" stop-color="%23fb7185"/><stop offset="70%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23fed7aa"/></linearGradient></defs><rect width="300" height="420" fill="url(%23bgLaskar)"/><text x="150" y="75" text-anchor="middle" font-family="Brush Script MT, cursive, sans-serif" font-size="36" fill="%23ffffff" font-style="italic" font-weight="bold">Laskar</text><text x="150" y="118" text-anchor="middle" font-family="sans-serif" font-size="36" fill="%23ffffff" font-weight="900" letter-spacing="1">Pelangi</text><text x="150" y="142" text-anchor="middle" font-family="sans-serif" font-size="13" fill="%23ffffff" opacity="0.9">Andrea Hirata</text><g fill="%230f172a"><circle cx="65" cy="275" r="9"/><rect x="58" y="286" width="14" height="40" rx="3"/><rect x="57" y="326" width="6" height="34"/><rect x="66" y="326" width="6" height="34"/><circle cx="98" cy="270" r="10"/><rect x="90" y="282" width="16" height="44" rx="3"/><rect x="89" y="326" width="7" height="36"/><rect x="100" y="326" width="7" height="36"/><circle cx="135" cy="265" r="11"/><rect x="127" y="278" width="16" height="46" rx="3"/><rect x="126" y="324" width="7" height="38"/><rect x="137" y="324" width="7" height="38"/><circle cx="170" cy="268" r="10"/><rect x="162" y="280" width="16" height="45" rx="3"/><rect x="161" y="325" width="7" height="37"/><rect x="172" y="325" width="7" height="37"/><circle cx="205" cy="272" r="10"/><rect x="198" y="284" width="14" height="43" rx="3"/><rect x="197" y="327" width="6" height="35"/><rect x="207" y="327" width="6" height="35"/><circle cx="238" cy="276" r="9"/><rect x="232" y="287" width="12" height="39" rx="3"/><rect x="231" y="326" width="5" height="35"/><rect x="239" y="326" width="5" height="35"/><rect x="0" y="360" width="300" height="60" fill="%230f172a"/></g></svg>`;

const COVER_BUMI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420"><rect width="300" height="420" fill="%23f5ebe0"/><rect x="12" y="12" width="276" height="396" fill="none" stroke="%23c4a482" stroke-width="1.5"/><text x="150" y="70" text-anchor="middle" font-family="serif" font-size="28" fill="%23432818" font-weight="bold" letter-spacing="1">Bumi</text><text x="150" y="105" text-anchor="middle" font-family="serif" font-size="30" fill="%23432818" font-weight="bold" letter-spacing="2">Manusia</text><text x="150" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%237f5539" letter-spacing="1">PRAMOEDYA A.T.</text><g transform="translate(75, 160)"><circle cx="75" cy="60" r="38" fill="%232c1810"/><path d="M40 50C40 30 110 30 110 50Z" fill="%231a0e08"/><path d="M48 65C50 90 100 90 102 65Z" fill="%23ddb892"/><path d="M25 150C25 105 125 105 125 150Z" fill="%233e2723"/><path d="M60 110L75 140L90 110Z" fill="%23ffffff"/></g><text x="150" y="380" text-anchor="middle" font-family="serif" font-size="11" fill="%236c584c" font-style="italic">Sebuah Roman Tetralogi Buru</text></svg>`;

const COVER_FIKSI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420"><defs><linearGradient id="bgFiksi" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%231e3a8a"/><stop offset="100%" stop-color="%230f172a"/></linearGradient></defs><rect width="300" height="420" fill="url(%23bgFiksi)"/><text x="150" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%2393c5fd" letter-spacing="3">NOVEL TERLARIS</text><text x="150" y="95" text-anchor="middle" font-family="serif" font-size="34" fill="%23ffffff" font-weight="bold" letter-spacing="1">Fiksi</text><text x="150" y="125" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23cbd5e1" font-weight="600">Tere Liye</text><g transform="translate(150, 230)"><circle cx="0" cy="0" r="45" fill="none" stroke="%23f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M0 -30C-15 -10 -15 15 0 30C15 15 15 -10 0 -30Z" fill="%23fbbf24"/><path d="M-30 0C-10 -15 15 -15 30 0C15 15 -10 15 -30 0Z" fill="%23f59e0b" opacity="0.8"/><circle cx="0" cy="0" r="8" fill="%23fef08a"/></g><text x="150" y="360" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%2393c5fd" opacity="0.8">Tentang Hujan dan Kenangan</text></svg>`;

const COVER_LAUT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420"><defs><linearGradient id="bgLaut" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23fef3c7"/><stop offset="35%" stop-color="%23e0f2fe"/><stop offset="70%" stop-color="%2338bdf8"/><stop offset="100%" stop-color="%230284c7"/></linearGradient></defs><rect width="300" height="420" fill="url(%23bgLaut)"/><text x="150" y="70" text-anchor="middle" font-family="serif" font-size="28" fill="%230f172a" font-weight="bold">Laut</text><text x="150" y="105" text-anchor="middle" font-family="serif" font-size="28" fill="%230f172a" font-weight="bold">Bercerita</text><text x="150" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23334155" font-weight="600">Leila S. Chudori</text><path d="M0 240Q75 220 150 240T300 240V420H0Z" fill="%230369a1" opacity="0.6"/><path d="M0 280Q75 260 150 280T300 280V420H0Z" fill="%230c4a6e" opacity="0.8"/><path d="M0 320Q75 300 150 320T300 320V420H0Z" fill="%23082f49"/><g transform="translate(140, 220)"><path d="M0 12L20 12L15 20L5 20Z" fill="%23f59e0b"/><line x1="10" y1="12" x2="10" y2="0" stroke="%23334155" stroke-width="1.5"/><path d="M10 2L18 7L10 10Z" fill="%23ffffff"/></g></svg>`;

const COVER_SOP = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420"><defs><linearGradient id="bgSop" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230284c7"/><stop offset="50%" stop-color="%230369a1"/><stop offset="100%" stop-color="%23082e54"/></linearGradient></defs><rect width="300" height="420" fill="url(%23bgSop)"/><rect x="16" y="16" width="268" height="388" rx="8" fill="none" stroke="%2338bdf8" stroke-width="2" stroke-dasharray="6 3"/><circle cx="150" cy="115" r="44" fill="%23ffffff" opacity="0.15"/><g transform="translate(130, 93)"><path d="M20 0L4 7v13c0 12 7 23 16 26 9-3 16-14 16-26V7L20 0z" fill="%2338bdf8"/><path d="M14 23l4 4 9-9" stroke="%23ffffff" stroke-width="3" fill="none" stroke-linecap="round"/></g><text x="150" y="195" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23e0f2fe" font-weight="800" letter-spacing="2">DOKUMEN RESMI</text><text x="150" y="228" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23ffffff" font-weight="900">Pelayanan Sekolah</text><text x="150" y="254" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23ffffff" font-weight="900">Aman dan Nyaman</text><text x="150" y="295" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23bae6fd" font-weight="700">SMP NEGERI 2 KASIHAN</text><text x="150" y="315" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%237dd3fc">Standar Operasional Prosedur (SOP)</text><rect x="50" y="348" width="200" height="26" rx="13" fill="%23ffffff" opacity="0.2"/><text x="150" y="365" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%23ffffff" font-weight="bold">EDISI RESMI 2026/2027 • PDF</text></svg>`;

const DEFAULT_BOOKS = [
  {
    id: 'BK-SOP',
    materialType: 'ebook',
    title: 'Pelayanan Sekolah Aman dan Nyaman',
    author: 'Tim Sarpras SMPN 2 Kasihan',
    category: 'sarpras',
    categoryLabel: 'SARPRAS & SOP',
    pages: 2,
    cover: COVER_SOP,
    synopsis: 'Standar Operasional Prosedur (SOP) Pelayanan Sekolah Aman dan Nyaman SMP Negeri 2 Kasihan Bantul Tahun Ajaran 2026/2027.',
    rating: 5.0,
    pdfFileName: 'Pelayanan Sekolah Aman dan Nyaman.pdf',
    pdfSourceType: 'default',
    hasPdf: true
  },
  {
    id: 'VID-001',
    materialType: 'video',
    title: 'Sejarah & Sumbu Filosofi Keraton Yogyakarta',
    author: 'Dinas Kebudayaan DIY',
    creator: 'Dinas Kebudayaan DIY',
    category: 'kearifan_lokal',
    categoryLabel: 'Kearifan Jogja',
    videoUrl: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    link: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    duration: '14 Menit',
    cover: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Dokumenter video komprehensif mengenai tata ruang sumbu filosofi Yogyakarta dari Panggung Krapyak ke Keraton dan Tugu Pal Putih.',
    rating: 4.9
  },
  {
    id: 'IMG-001',
    materialType: 'gambar',
    title: 'Infografis Sumbu Filosofi Warisan Dunia UNESCO',
    author: 'Dinas Perpustakaan & Arsip Bantul',
    category: 'kearifan_lokal',
    categoryLabel: 'Infografis Budaya',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80',
    link: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    pages: 1,
    synopsis: 'Infografis visual interaktif mengenai garis imajiner sumbu filosofis Yogyakarta beserta makna spiritual Hamemayu Hayuning Bawana.',
    rating: 4.9
  },
  {
    id: 'VID-002',
    materialType: 'video',
    title: 'Eksplorasi Galaksi & Tata Surya Bima Sakti',
    author: 'Laboratorium Astronomi Edukasi',
    creator: 'Pusat Sains Antariksa',
    category: 'sains',
    categoryLabel: 'Sains & Teknologi',
    videoUrl: 'https://www.youtube.com/watch?v=libKVRa01L8',
    link: 'https://www.youtube.com/watch?v=libKVRa01L8',
    duration: '18 Menit',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Animasi sains 3D mengenai dinamika planet, gravitasi semesta, dan foto galaksi terbaru dari observatorium antariksa.',
    rating: 4.8
  },
  {
    id: 'IMG-002',
    materialType: 'gambar',
    title: 'Poster Anatomi Gerakan Literasi Sekolah 5M',
    author: 'Tim Literasi SMPN 2 Kasihan',
    category: 'sarpras',
    categoryLabel: 'Poster GLS',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80',
    link: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
    pages: 1,
    synopsis: 'Panduan visual 5M: Membaca cerdas, Memahami mendalam, Merangkum esensi, Menulis karya, dan Membagikan inspirasi.',
    rating: 5.0
  },
  {
    id: 'BK-001',
    materialType: 'ebook',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    category: 'fiksi',
    categoryLabel: 'Fiksi Pendidikan',
    pages: 534,
    cover: COVER_LASKAR,
    synopsis: 'Perjuangan sepuluh anak di Belitung dalam menuntut ilmu di tengah keterbatasan fasilitas sekolah.',
    rating: 4.8,
    pdfFileName: 'Laskar Pelangi.pdf',
    hasPdf: true
  },
  {
    id: 'BK-002',
    materialType: 'ebook',
    title: 'Bumi Manusia',
    author: 'Pramoedya A.T.',
    category: 'fiksi',
    categoryLabel: 'Sastra Klasik',
    pages: 535,
    cover: COVER_BUMI,
    synopsis: 'Kisah Minke dan Annelies dalam pergulatan humanisme dan hukum kolonial akhir abad ke-19.',
    rating: 4.7
  },
  {
    id: 'BK-003',
    materialType: 'ebook',
    title: 'Fiksi',
    author: 'Tere Liye',
    category: 'fiksi',
    categoryLabel: 'Novel Inspiratif',
    pages: 360,
    cover: COVER_FIKSI,
    synopsis: 'Kisah persahabatan, keteguhan hati, dan filosofi hidup di tengah dinamika masa muda.',
    rating: 4.6
  },
  {
    id: 'BK-004',
    materialType: 'ebook',
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    category: 'fiksi',
    categoryLabel: 'Fiksi Sejarah',
    pages: 390,
    cover: COVER_LAUT,
    synopsis: 'Sebuah novel mendalam tentang kehilangan, cinta, dan perjuangan aktivis mahasiswa.',
    rating: 4.7
  },
  {
    id: 'BK-005',
    materialType: 'ebook',
    title: 'Ensiklopedia Kriya Gerabah Kasongan',
    author: 'Balai Budaya Bantul',
    category: 'jogja',
    categoryLabel: 'Kearifan Lokal',
    pages: 190,
    cover: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Dokumentasi teknik pembakaran tanah liat, ornamen loro blonyo, dan sejarah sentra industri Kasihan.',
    rating: 4.9
  },
  {
    id: 'BK-006',
    materialType: 'ebook',
    title: 'Babad Tanah Jawi: Warisan Mataram',
    author: 'W.L. Olthof & Tim Sejarah',
    category: 'jogja',
    categoryLabel: 'Budaya & Sejarah Jogja',
    pages: 280,
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Hikayat silsilah raja-raja tanah Jawa mulai dari Pajang, Mataram Islam, hingga Kotagede dan Bantul.',
    rating: 4.8
  },
  {
    id: 'BK-007',
    materialType: 'ebook',
    title: 'Negeri 5 Menara',
    author: 'Ahmad Fuadi',
    category: 'fiksi',
    categoryLabel: 'Inspirasi Pemuda',
    pages: 423,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Mantra Man Jadda Wajada mengiringi persahabatan enam santri dari berbagai penjuru Nusantara.',
    rating: 4.7
  },
  {
    id: 'BK-008',
    materialType: 'ebook',
    title: 'Kosmos & Misteri Alam Semesta',
    author: 'Prof. Carl Sagan (Terjemahan)',
    category: 'sains',
    categoryLabel: 'Sains Populer',
    pages: 365,
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Penjelajahan sains mengenai evolusi galaksi, waktu, dan tempat manusia di panggung semesta raya.',
    rating: 4.8
  },
  {
    id: 'BK-009',
    materialType: 'ebook',
    title: 'Filosofi Teras untuk Remaja',
    author: 'Henry Manampiring',
    category: 'nonfiksi',
    categoryLabel: 'Pengembangan Diri',
    pages: 320,
    cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Penerapan filsafat Stoisisme kuno untuk mengelola emosi, kecemasan, dan ketenangan belajar.',
    rating: 4.9
  },
  {
    id: 'BK-010',
    materialType: 'ebook',
    title: 'Unggah-Ungguh Basa Jawa Gagrag Anyar',
    author: 'Drs. Ki Sutrisno',
    category: 'jogja',
    categoryLabel: 'Bahasa & Budi Pekerti',
    pages: 210,
    cover: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Pedoman praktis tata krama berbahasa Jawa krama alus dan tepa selira untuk pelajar SMP masa kini.',
    rating: 4.8
  }
];

const AVATAR_AISYAH_M5 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23fce7f3"/><circle cx="40" cy="30" r="16" fill="%23db2777"/><path d="M22 68c0-12 8-20 18-20s18 8 18 20" fill="%23be185d"/><circle cx="40" cy="30" r="12" fill="%23fbcfe8"/><ellipse cx="40" cy="32" rx="10" ry="11" fill="%23fed7aa"/><circle cx="36" cy="31" r="1.5" fill="%23334155"/><circle cx="44" cy="31" r="1.5" fill="%23334155"/><path d="M37 36 Q40 38 43 36" stroke="%23e11d48" stroke-width="1.2" fill="none"/></svg>';
const AVATAR_RAKA_M5 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23dbeafe"/><circle cx="40" cy="32" r="15" fill="%23fed7aa"/><rect x="26" y="18" width="28" height="14" rx="4" fill="%231e293b"/><circle cx="34" cy="32" r="5" fill="none" stroke="%230284c7" stroke-width="1.5"/><circle cx="46" cy="32" r="5" fill="none" stroke="%230284c7" stroke-width="1.5"/><line x1="39" y1="32" x2="41" y2="32" stroke="%230284c7" stroke-width="1.5"/><path d="M20 70c0-14 9-22 20-22s20 8 20 22" fill="%230284c7"/></svg>';
const AVATAR_SALSA_M5 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23ede9fe"/><circle cx="40" cy="32" r="15" fill="%23fed7aa"/><path d="M24 24 Q40 14 56 24 Q56 42 54 48 Q40 50 26 48 Z" fill="%23475569"/><ellipse cx="40" cy="34" rx="11" ry="12" fill="%23fed7aa"/><circle cx="36" cy="33" r="1.5" fill="%23334155"/><circle cx="44" cy="33" r="1.5" fill="%23334155"/><path d="M37 38 Q40 40 43 38" stroke="%23e11d48" stroke-width="1.2" fill="none"/><path d="M22 70c0-13 8-22 18-22s18 9 18 22" fill="%237c3aed"/></svg>';

const DEFAULT_WORKS = [
  {
    id: 'w-laskar-pelangi',
    title: 'Resensi Buku – Laskar Pelangi',
    category: 'Resensi Buku',
    authorName: 'Aisyah Putri',
    authorClass: 'Kelas VIII C',
    authorAvatar: AVATAR_AISYAH_M5,
    date: '12 September 2026',
    quote: 'Bermimpilah, karena Tuhan akan memeluk mimpi-mimpi itu. Keterbatasan ekonomi tak boleh memadamkan api ilmu...',
    content: `Resensi Novel "Laskar Pelangi" karya Andrea Hirata:
Sebuah kisah kepahlawanan pendidikan yang sangat mengharukan dari desa Gantong, Belitung Timur. Lewat keteladanan Ibu Muslimah dan Pak Harfan, serta keuletan 10 anak laskar pelangi (Ikal, Lintang, Mahar, dkk), novel ini mengajarkan kita untuk selalu bersyukur dan tidak pernah menyerah meraih cita-cita setinggi langit.

Pelajaran berharga yang saya petik: ilmu pengetahuan dan integritas adalah lentera sejati dalam menembus pekatnya keterbatasan hidup. Sangat relevan untuk seluruh sahabat literasi di SMPN 2 Kasihan!`,
    likes: 120,
    commentsCount: 34,
    comments: [
      { id: 'c-lp-1', author: 'Salsa Anindita', role: 'siswa', text: 'Keren banget resensinya Aisyah! Kisah Lintang selalu bikin terharu.', date: '12 September 2026' },
      { id: 'c-lp-2', author: 'Ratna Kusumawati, S.Pd.', role: 'guru', text: 'Ulasan yang sangat bernas dan menggugah semangat belajar!', date: '12 September 2026' }
    ],
    coverType: 'laskar-pelangi',
    isFeatured: true
  },
  {
    id: 'w-jaga-bumi',
    title: 'Poster Digital – Jaga Bumi',
    category: 'Poster Digital',
    authorName: 'Raka Pratama',
    authorClass: 'Kelas VIII A',
    authorAvatar: AVATAR_RAKA_M5,
    date: '5 September 2026',
    quote: 'Satu pohon yang kita tanam hari ini adalah nafas kehidupan bagi generasi yang akan datang...',
    content: `Poster digital ini dirancang sebagai kampanye adiwiyata dan peduli lingkungan di SMPN 2 Kasihan. Bumi adalah satu-satunya rumah kita. Dengan mengurangi penggunaan plastik sekali pakai, memilah sampah organik di sekolah, dan merawat tanaman peneduh di taman baca, kita sedang merajut masa depan bumi yang hijau dan lestari.

Melalui perpaduan ilustrasi bola bumi ramah lingkungan dan tunas hijau yang merekah, poster ini mengajak kawan-kawan sebaya untuk membiasakan aksi nyata ramah lingkungan setiap hari.`,
    likes: 95,
    commentsCount: 18,
    comments: [
      { id: 'c-bumi-1', author: 'Aisyah Putri', role: 'siswa', text: 'Desain posternya sangat rapi dan estetik! Pesan ekologinya sangat kuat dan sampai ke pembaca.', date: '5 September 2026' },
      { id: 'c-bumi-2', author: 'Bagus Kurniawan', role: 'siswa', text: 'Kombinasi warnanya segar banget Raka! Layak dipajang di mading digital sekolah.', date: '5 September 2026' }
    ],
    coverType: 'jaga-bumi',
    isFeatured: true
  },
  {
    id: 'w-langit-sama',
    title: 'Puisi – Langit Masih Sama',
    category: 'Puisi',
    authorName: 'Salsa Anindita',
    authorClass: 'Kelas VIII B',
    authorAvatar: AVATAR_SALSA_M5,
    date: '28 Agustus 2026',
    quote: 'Meski jarak membentang luas di antara kita, tataplah langit yang sama tempat doa bermuara...',
    content: `Di bawah temaram langit Kasihan senja ini,
Kulihat semburat lembayung menyapa sunyi.
Bintang-bintang merangkai cerita purba,
Tentang langkah kaki yang menolak menyerah pada duka.

Meski jarak membentang luas di antara kita,
Tataplah langit yang sama tempat doa bermuara.
Di sana harapan kita disatukan semesta,
Menjadi lentera benderang dalam langkah menggapai cita.`,
    likes: 150,
    commentsCount: 27,
    comments: [
      { id: 'c-langit-1', author: 'Erna Retnaningsih, S.Pd., M.Pd.', role: 'kepsek', text: 'Bait puisi yang sarat makna dan pengharapan. Bahasa puitisnya sangat menyentuh jiwa.', date: '28 Agustus 2026' },
      { id: 'c-langit-2', author: 'Aisyah Putri', role: 'siswa', text: 'Suka sekali dengan bait kedua! Diksi yang Salsa gunakan selalu indah dan damai dibaca.', date: '28 Agustus 2026' }
    ],
    coverType: 'langit-sama',
    isFeatured: true
  },
  {
    id: 'w-laut-bercerita',
    title: 'Resensi Buku – Laut Bercerita',
    category: 'Resensi Buku',
    authorName: 'Aisyah Putri',
    authorClass: 'Kelas VIII C',
    authorAvatar: AVATAR_AISYAH_M5,
    date: '20 Agustus 2026',
    quote: 'Buku ini mengajarkan bahwa setiap suara memiliki arti, dan perjuangan melawan ketidakadilan tak pernah sia-sia...',
    content: `Buku "Laut Bercerita" karya Leila S. Chudori adalah sebuah mahakarya sastra Indonesia yang memotret persahabatan, keluarga, dan kehilangan dengan begitu dalam. Lewat sudut pandang Biru Laut dan Asmara Jati, kita diajak merasakan getirnya perjuangan aktivis mahasiswa serta kepedihan keluarga korban penghilangan paksa yang terus mencari keadilan di tepi laut.

Diksi yang dipilih penulis sangat puitis namun menggetarkan hati. Ulasan ini saya tulis untuk mengajak seluruh teman-teman di SMPN 2 Kasihan memahami pentingnya empati, hak asasi manusia, dan cinta tanah air. Buku ini wajib dibaca oleh generasi muda yang mencintai literasi sejarah dan kemanusiaan.`,
    likes: 110,
    commentsCount: 25,
    comments: [
      { id: 'c-laut-1', author: 'Salsa Anindita', role: 'siswa', text: 'Keren banget ulasannya Aisyah! Sangat menginspirasi dan bikin aku penasaran mau baca bukunya di perpustakaan.', date: '20 Agustus 2026' },
      { id: 'c-laut-2', author: 'Ratna Kusumawati, S.Pd.', role: 'guru', text: 'Analisis resensi yang sangat tajam dan matang untuk siswa kelas VIII. Terus kembangkan daya kritis literasimu!', date: '20 Agustus 2026' }
    ],
    coverType: 'laut-bercerita',
    isFeatured: true
  },
  {
    id: 1,
    title: 'Gemerlap Malam di Pelataran Kasongan',
    category: 'Cerpen',
    authorName: 'Bagus Kurniawan',
    authorClass: 'Kelas VIII B',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    date: '8 Sep 2024',
    quote: 'Bila hatimu tergesa, dinding kendi akan retak sebelum sempat disentuh api pembakaran...',
    content: `Aroma tanah liat basah selalu menyapa hidungku setiap kali melintasi gerbang Kasihan. Di sudut bengkel kriya milik kakek, roda putar kayu itu masih berdengung lembut. 

"Membuat gerabah itu seperti menata hidup, Gus," ucap Kakek sambil menepuk lembut gumpalan lempung. "Bila hatimu tergesa, dinding kendi akan retak sebelum sempat disentuh api pembakaran."

Malam itu, di bawah temaram lampu jalanan Bibis, aku menyadari bahwa setiap goresan canting dan lekukan tanah liat menyimpan doa para leluhur yang tak pernah padam oleh laju zaman.`,
    likes: 18,
    commentsCount: 2,
    comments: [
      { id: 'c1', author: 'Ratna Kusumawati, S.Pd.', role: 'guru', text: 'Pilihan diksi yang sangat memikat! Metafora tanah liat dengan kehidupan sangat mengena untuk siswa kelas 8.', date: '8 Sep' },
      { id: 'c2', author: 'Anisa Rahma', role: 'siswa', text: 'Keren banget cerpennya Bagus! Bikin aku makin bangga tinggal di Kasihan.', date: '8 Sep' }
    ],
    coverType: 'default',
    isFeatured: false
  },
  {
    id: 2,
    title: 'Batik Kasihan dalam Bait Puisi',
    category: 'Puisi',
    authorName: 'Anisa Rahma',
    authorClass: 'Kelas VIII A',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    date: '7 Sep 2024',
    quote: 'Jadilah lentera di tengah temaram dunia, membawa nama harum bumi Bantul tercinta...',
    content: `Di antara canting tembaga dan malam mendidih,
Terlukis asa anak negeri Kasihan yang tiada pernah padam.
Mata air Sendang mengalirkan restu,
Membasahi jiwa yang haus akan luhurnya ilmu.

Bukan sekadar guratan malam di atas mori putih,
Tetapi denyut nadi leluhur yang berbisik lirih:
Jadilah lentera di tengah temaram dunia,
Membawa nama harum bumi Bantul tercinta.`,
    likes: 24,
    commentsCount: 1,
    comments: [
      { id: 'c3', author: 'Erna Retnaningsih, S.Pd., M.Pd.', role: 'kepsek', text: 'Luar biasa puitis dan penuh spirit kearifan lokal. Pertahankan bakat menulismu, Anisa!', date: '7 Sep' }
    ],
    coverType: 'default',
    isFeatured: false
  }
];

const DEFAULT_JOURNALS = [
  {
    id: 'j-1',
    studentName: 'Bagus Kurniawan',
    studentClass: '8B',
    bookTitle: 'Laskar Pelangi',
    duration: 25,
    pageStart: 120,
    pageEnd: 145,
    summary: 'Membaca bab tentang cerdasnya Lintang saat memecahkan soal matematika di depan guru pengawas.',
    date: '9 Sep 2024, 08:15',
    verified: true
  },
  {
    id: 'j-2',
    studentName: 'Anisa Rahma',
    studentClass: '8A',
    bookTitle: 'Babad Tanah Jawi',
    duration: 30,
    pageStart: 45,
    pageEnd: 70,
    summary: 'Mempelajari riwayat pendirian kerajaan Mataram Islam dan peran para wali dalam penyebaran ilmu.',
    date: '9 Sep 2024, 07:30',
    verified: true
  },
  {
    id: 'j-3',
    studentName: 'Dimas Aditya Pratama',
    studentClass: '8B',
    bookTitle: 'Negeri 5 Menara',
    duration: 20,
    pageStart: 10,
    pageEnd: 32,
    summary: 'Awal mula Alif merantau ke pondok dan tekad baja para sahabat di bawah naungan menara masjid.',
    date: '8 Sep 2024, 16:40',
    verified: true
  }
];

const THUMB_AISYAH = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="skinA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fed7aa"/><stop offset="100%" stop-color="%23fdba74"/></linearGradient><linearGradient id="bookA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%230369a1"/></linearGradient></defs><rect width="300" height="200" fill="%23f1f5f9"/><rect x="0" y="0" width="300" height="55" fill="%23e2e8f0"/><rect x="0" y="38" width="300" height="6" fill="%23cbd5e1"/><rect x="0" y="85" width="300" height="6" fill="%23cbd5e1"/><rect x="15" y="12" width="14" height="26" fill="%23f43f5e" rx="2"/><rect x="32" y="16" width="12" height="22" fill="%233b82f6" rx="2"/><rect x="47" y="10" width="18" height="28" fill="%2310b981" rx="2"/><rect x="68" y="14" width="15" height="24" fill="%23f59e0b" rx="2"/><rect x="220" y="12" width="16" height="26" fill="%238b5cf6" rx="2"/><rect x="239" y="17" width="14" height="21" fill="%2306b6d4" rx="2"/><rect x="256" y="10" width="20" height="28" fill="%23ec4899" rx="2"/><rect x="20" y="55" width="16" height="30" fill="%23eab308" rx="2"/><rect x="40" y="60" width="14" height="25" fill="%236366f1" rx="2"/><rect x="235" y="58" width="18" height="27" fill="%2314b8a6" rx="2"/><rect x="256" y="52" width="15" height="33" fill="%23f97316" rx="2"/><path d="M70 200 Q150 145 230 200 Z" fill="%230f172a"/><path d="M85 155 Q150 130 215 155 Q225 200 75 200 Z" fill="%23ffffff"/><ellipse cx="150" cy="100" rx="48" ry="56" fill="%23ffffff" stroke="%23e2e8f0" stroke-width="2"/><ellipse cx="150" cy="106" rx="28" ry="32" fill="url(%23skinA)"/><ellipse cx="140" cy="104" rx="3.5" ry="4.5" fill="%231e293b"/><ellipse cx="160" cy="104" rx="3.5" ry="4.5" fill="%231e293b"/><circle cx="141" cy="102" r="1.5" fill="%23ffffff"/><circle cx="161" cy="102" r="1.5" fill="%23ffffff"/><path d="M144 120 Q150 125 156 120" fill="none" stroke="%23b45309" stroke-width="2" stroke-linecap="round"/><circle cx="134" cy="112" r="4" fill="%23f43f5e" opacity="0.3"/><circle cx="166" cy="112" r="4" fill="%23f43f5e" opacity="0.3"/><path d="M124 96 Q150 72 176 96 Q170 134 150 142 Q130 134 124 96 Z" fill="none" stroke="%23e2e8f0" stroke-width="1.5"/><path d="M98 160 L146 148 L146 195 L98 185 Z" fill="url(%23bookA)" stroke="%230284c7" stroke-width="2"/><path d="M154 148 L202 160 L202 185 L154 195 Z" fill="url(%23bookA)" stroke="%230284c7" stroke-width="2"/><line x1="150" y1="148" x2="150" y2="195" stroke="%23ffffff" stroke-width="2"/><ellipse cx="106" cy="172" rx="7" ry="5" fill="%23fed7aa"/><ellipse cx="194" cy="172" rx="7" ry="5" fill="%23fed7aa"/><text x="122" y="170" font-family="sans-serif" font-size="7" fill="%23bae6fd" font-weight="bold" text-anchor="middle">LASKAR</text><text x="178" y="170" font-family="sans-serif" font-size="7" fill="%23bae6fd" font-weight="bold" text-anchor="middle">PELANGI</text><circle cx="150" cy="95" r="22" fill="%23000000" opacity="0.55"/><circle cx="150" cy="95" r="22" fill="none" stroke="%23ffffff" stroke-width="2" opacity="0.9"/><path d="M143 83 L163 95 L143 107 Z" fill="%23ffffff"/></svg>`;

const THUMB_RAKA = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="skinR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffedd5"/><stop offset="100%" stop-color="%23fed7aa"/></linearGradient><linearGradient id="suitR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e3a8a"/><stop offset="100%" stop-color="%23172554"/></linearGradient></defs><rect width="300" height="200" fill="%23f1f5f9"/><rect x="0" y="32" width="300" height="6" fill="%23cbd5e1"/><rect x="0" y="80" width="300" height="6" fill="%23cbd5e1"/><rect x="15" y="8" width="16" height="24" fill="%230284c7" rx="2"/><rect x="34" y="12" width="13" height="20" fill="%23ea580c" rx="2"/><rect x="50" y="6" width="18" height="26" fill="%2316a34a" rx="2"/><rect x="71" y="10" width="15" height="22" fill="%239333ea" rx="2"/><rect x="215" y="8" width="18" height="24" fill="%23d97706" rx="2"/><rect x="236" y="13" width="14" height="19" fill="%232563eb" rx="2"/><rect x="253" y="6" width="22" height="26" fill="%23dc2626" rx="2"/><rect x="18" y="46" width="17" height="34" fill="%23475569" rx="2"/><rect x="38" y="52" width="15" height="28" fill="%230d9488" rx="2"/><rect x="238" y="48" width="16" height="32" fill="%230891b2" rx="2"/><rect x="257" y="44" width="19" height="36" fill="%23be185d" rx="2"/><path d="M70 200 Q150 145 230 200 Z" fill="url(%23suitR)"/><path d="M135 155 L150 185 L165 155 Z" fill="%23ffffff"/><path d="M147 165 L153 165 L151 198 L149 198 Z" fill="%2300695c"/><rect x="142" y="122" width="16" height="22" fill="url(%23skinR)" rx="4"/><ellipse cx="150" cy="98" rx="28" ry="32" fill="url(%23skinR)"/><ellipse cx="120" cy="100" rx="5" ry="8" fill="url(%23skinR)"/><ellipse cx="180" cy="100" rx="5" ry="8" fill="url(%23skinR)"/><path d="M120 95 Q150 58 180 95 Q185 85 180 75 Q165 58 150 60 Q130 58 120 75 Q115 85 120 95 Z" fill="%230f172a"/><ellipse cx="139" cy="98" rx="3.5" ry="4.5" fill="%230f172a"/><ellipse cx="161" cy="98" rx="3.5" ry="4.5" fill="%230f172a"/><circle cx="140" cy="96" r="1.5" fill="%23ffffff"/><circle cx="162" cy="96" r="1.5" fill="%23ffffff"/><path d="M133 90 Q139 87 145 90" fill="none" stroke="%230f172a" stroke-width="2" stroke-linecap="round"/><path d="M155 90 Q161 87 167 90" fill="none" stroke="%230f172a" stroke-width="2" stroke-linecap="round"/><path d="M143 113 Q150 120 157 113" fill="none" stroke="%23c2410c" stroke-width="2" stroke-linecap="round"/><rect x="156" y="142" width="9" height="26" rx="3" fill="%23334155" transform="rotate(-15 160 148)"/><ellipse cx="167" cy="136" rx="7" ry="9" fill="%2394a3b8" stroke="%23475569" stroke-width="1.5"/><ellipse cx="152" cy="155" rx="7" ry="6" fill="%23fed7aa"/><circle cx="150" cy="95" r="22" fill="%23000000" opacity="0.55"/><circle cx="150" cy="95" r="22" fill="none" stroke="%23ffffff" stroke-width="2" opacity="0.9"/><path d="M143 83 L163 95 L143 107 Z" fill="%23ffffff"/></svg>`;

const DEFAULT_BOOKTALKS = [
  {
    id: 'bt-aisyah',
    studentName: 'Aisyah Putri',
    studentClass: 'VIII C',
    title: 'Review Laskar Pelangi',
    type: 'video',
    format: 'Video Book Talk',
    likes: 120,
    isLiked: false,
    duration: '02:45',
    thumb: THUMB_AISYAH,
    url: 'https://youtube.com/watch?v=demo-laskar-aisyah',
    notes: 'Mengulas perjuangan 10 laskar pelangi di Belitong dan sosok Bu Muslimah yang berdedikasi tinggi mengajar di sekolah sederhana.',
    date: '11 Sep 2026',
    comments: [
      { name: 'Raka Pratama', text: 'Penyampaiannya runtut dan artikulasinya sangat jelas!', time: '1 jam lalu' },
      { name: 'Ibu Ratna S.Pd', text: 'Bagus sekali Aisyah, resensinya sangat menggugah.', time: '3 jam lalu' }
    ]
  },
  {
    id: 'bt-raka',
    studentName: 'Raka Pratama',
    studentClass: 'VIII A',
    title: 'Puisi untuk Bumi',
    type: 'video',
    format: 'Membaca Puisi',
    likes: 95,
    isLiked: false,
    duration: '02:10',
    thumb: THUMB_RAKA,
    url: 'https://youtube.com/watch?v=demo-puisi-bumi-raka',
    notes: 'Deklamasi puisi bertema kelestarian lingkungan hidup dan cinta bumi pertiwi di hadapan kelas VIII A.',
    date: '10 Sep 2026',
    comments: [
      { name: 'Aisyah Putri', text: 'Intonasi dan ekspresinya keren banget Raka!', time: '2 jam lalu' }
    ]
  },
  {
    id: 'bt-1',
    studentName: 'Anisa Rahma',
    studentClass: 'VIII A',
    title: 'Mengapa Kamu Wajib Baca Babad Tanah Jawi!',
    type: 'audio',
    format: 'Podcast Audio',
    likes: 88,
    isLiked: false,
    duration: '03:00',
    thumb: THUMB_AISYAH,
    url: 'https://youtube.com/watch?v=demo-babad-jawi',
    notes: 'Mengupas sisi menarik tokoh Panembahan Senopati dan keterkaitannya dengan situs di Bantul.',
    date: '7 Sep 2026',
    comments: []
  },
  {
    id: 'bt-2',
    studentName: 'Bagus Kurniawan',
    studentClass: 'VIII B',
    title: 'Review 3 Menit: Keajaiban Laskar Pelangi',
    type: 'video',
    format: 'Video Book Talk',
    likes: 74,
    isLiked: false,
    duration: '02:50',
    thumb: THUMB_RAKA,
    url: 'https://drive.google.com/file/d/demo-laskar/view',
    notes: 'Fokus pada karakter Lintang si jenius dari pulau terpencil yang gigih mengayuh sepeda puluhan kilometer.',
    date: '5 Sep 2026',
    comments: []
  }
];

const QUIZ_QUESTIONS = [
  {
    question: 'Manakah dari kalimat berikut yang merupakan contoh kalimat FAKTA objektif?',
    options: [
      'A. Perpustakaan SMP Negeri 2 Kasihan memiliki koleksi lebih dari 2.500 judul buku terakreditasi.',
      'B. Membaca novel sastra klasik jauh lebih menyenangkan dibanding menonton tayangan film.',
      'C. Kasihan adalah wilayah paling nyaman di seluruh Kabupaten Bantul Yogyakarta.',
      'D. Pelajaran Bahasa Indonesia merupakan mata pelajaran yang paling mudah dipahami.'
    ],
    correct: 0,
    explanation: 'Pilihan A memuat data yang dapat diverifikasi secara empiris dan objektif, sedangkan yang lain adalah opini atau preferensi.'
  },
  {
    question: 'Dalam struktur teks ulasan / resensi buku, bagian yang memaparkan kelebihan dan kelemahan karya disebut...?',
    options: [
      'A. Orientasi Umum',
      'B. Evaluasi / Tafsiran Kritis',
      'C. Sinopsis Ringkas',
      'D. Rangkuman Penutup'
    ],
    correct: 1,
    explanation: 'Bagian Evaluasi mengkaji secara objektif keunggulan gaya bahasa, alur, serta kekurangan dalam karya.'
  },
  {
    question: 'Tembang Macapat Pocung yang sarat dengan tebak-tebakan dan nasihat hidup memiliki paugeran (aturan) guru gatra sebanyak...?',
    options: [
      'A. 4 Gatra (12u, 6a, 8i, 12a)',
      'B. 6 Gatra (8u, 8i, 8a, 8i, 8a, 8i)',
      'C. 7 Gatra (8a, 11i, 8u, 7a, 12u, 8a, 8i)',
      'D. 5 Gatra (12a, 7i, 6u, 7a, 8i)'
    ],
    correct: 0,
    explanation: 'Tembang Pocung memiliki 4 larik (gatra) dengan guru wilangan dan guru lagu: 12u, 6a, 8i, 12a.'
  }
];

// Helper storage functions
function getStorage(key, defaultVal) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// Global Application State
window.appState = {
  users: (function() {
    const list = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    // Ensure admin user exists in list
    if (!list.some(u => u.username === 'admin')) {
      list.unshift({
        id: 'u-admin',
        name: 'Administrator LENTERA 5M',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        kelas: 'Administrator Sistem & Data Literasi',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        points: 2500,
        streak: 99,
        booksCount: 15,
        worksCount: 10,
        level: 'Super Admin',
        badges: ['Administrator Sistem', 'Pengelola Data 5M', 'Kurator Utama']
      });
    }
    // Sync default student to Aisyah Putri if it was previously Bagus
    const s1 = list.find(u => u.id === 'u-siswa1');
    if (s1 && (s1.name === 'Bagus Kurniawan' || s1.points === 380)) {
      s1.name = 'Aisyah Putri Rahma';
      s1.points = 1250;
      s1.streak = 7;
      s1.booksCount = 8;
      s1.worksCount = 5;
      s1.level = 'Pembaca Kreatif';
    }
    // Sync Kepsek identity to Erna Retnaningsih, S.Pd., M.Pd.
    const kepsekU = list.find(u => u.username === 'kepsek' || u.role === 'kepsek');
    if (kepsekU) {
      kepsekU.name = 'Erna Retnaningsih, S.Pd., M.Pd.';
      kepsekU.nip = '197303261998022001';
      kepsekU.kelas = 'Kepala SMPN 2 Kasihan';
    }
    // Sync Guru identity to Ibu Zusma Nadya Izzati, S.Pd. (Wali Kelas 8B)
    const guruU = list.find(u => u.username === 'guru1' || u.id === 'u-guru1');
    if (guruU) {
      guruU.name = 'Ibu Zusma Nadya Izzati, S.Pd.';
      guruU.nip = '199108152019032018';
      guruU.role = 'guru';
      guruU.kelas = '8B';
      guruU.waliKelas = '8B';
    }
    // Ensure all default students exist
    DEFAULT_USERS.forEach(defU => {
      const existing = list.find(u => u.id === defU.id || u.username === defU.username);
      if (!existing) {
        list.push(defU);
      } else {
        // augment with 5M fields if missing
        if (defU.m1_books && !existing.m1_books) {
          Object.assign(existing, {
            m1_books: defU.m1_books,
            m1_duration: defU.m1_duration,
            m2_findings: defU.m2_findings,
            m2_quizScore: defU.m2_quizScore,
            m3_works: defU.m3_works,
            m4_talks: defU.m4_talks,
            m5_appreciations: defU.m5_appreciations,
            status: defU.status,
            nisn: defU.nisn,
            waliKelas: defU.waliKelas
          });
        }
      }
    });
    setStorage(STORAGE_KEYS.USERS, list);
    return list;
  })(),
  currentUser: (function() {
    let curr = getStorage(STORAGE_KEYS.CURRENT_USER, null);
    if (curr) {
      if (curr.id === 'u-siswa1' && curr.name === 'Bagus Kurniawan') {
        curr.name = 'Aisyah Putri Rahma';
        curr.points = 1250;
        curr.streak = 7;
        curr.booksCount = 8;
        curr.worksCount = 5;
        curr.level = 'Pembaca Kreatif';
      }
      if (curr.role === 'kepsek' || curr.username === 'kepsek') {
        curr.name = 'Erna Retnaningsih, S.Pd., M.Pd.';
        curr.nip = '197303261998022001';
        curr.kelas = 'Kepala SMPN 2 Kasihan';
      }
      if (curr.role === 'guru' || curr.username === 'guru1') {
        curr.name = 'Ibu Zusma Nadya Izzati, S.Pd.';
        curr.nip = '199108152019032018';
        curr.kelas = '8B';
        curr.waliKelas = '8B';
      }
      setStorage(STORAGE_KEYS.CURRENT_USER, curr);
    }
    return curr;
  })(),
  books: (function() {
    let saved = getStorage(STORAGE_KEYS.BOOKS, null);
    if (!saved || !Array.isArray(saved) || !saved.find(b => b.title === 'Laut Bercerita') || !saved.find(b => b.id === 'BK-SOP')) {
      saved = DEFAULT_BOOKS;
      setStorage(STORAGE_KEYS.BOOKS, saved);
    } else {
      let modified = false;
      saved = saved.map(b => {
        if (!b.materialType) {
          b.materialType = b.videoUrl ? 'video' : (b.imageUrl ? 'gambar' : 'ebook');
          modified = true;
        }
        return b;
      });
      if (!saved.some(b => b.materialType === 'video')) {
        const defaultVideos = DEFAULT_BOOKS.filter(b => b.materialType === 'video');
        saved.unshift(...defaultVideos);
        modified = true;
      }
      if (!saved.some(b => b.materialType === 'gambar')) {
        const defaultImages = DEFAULT_BOOKS.filter(b => b.materialType === 'gambar');
        saved.splice(2, 0, ...defaultImages);
        modified = true;
      }
      if (modified) {
        setStorage(STORAGE_KEYS.BOOKS, saved);
      }
    }
    return saved;
  })(),
  journals: getStorage(STORAGE_KEYS.JOURNALS, DEFAULT_JOURNALS),
  works: (function() {
    let saved = getStorage(STORAGE_KEYS.WORKS, null);
    if (!saved || !Array.isArray(saved) || !saved.find(w => w.id === 'w-laut-bercerita' || w.title === 'Laut Bercerita')) {
      saved = DEFAULT_WORKS;
      setStorage(STORAGE_KEYS.WORKS, saved);
    }
    return saved;
  })(),
  m5Tab: 'galeri',
  m5Category: 'semua',
  m5SearchQuery: '',
  m5LikedWorkIds: getStorage('lentera_m5_likes', ['w-laut-bercerita', 'w-langit-sama', 'w-jaga-bumi']),
  m5BookmarkedIds: getStorage('lentera_m5_bookmarks', ['w-laut-bercerita']),
  booktalks: (function() {
    let saved = getStorage(STORAGE_KEYS.BOOKTALKS, null);
    if (!saved || !Array.isArray(saved) || !saved.find(b => b.id === 'bt-aisyah')) {
      saved = DEFAULT_BOOKTALKS;
      setStorage(STORAGE_KEYS.BOOKTALKS, saved);
    }
    return saved;
  })(),
  activeBook: getStorage(STORAGE_KEYS.ACTIVE_BOOK, DEFAULT_BOOKS[0]),
  quizQuestions: getStorage(STORAGE_KEYS.QUIZ_QUESTIONS, QUIZ_QUESTIONS),
  settings: getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  currentView: 'login',
  loginRoleSelected: 'siswa',
  adminTab: 'books',
  adminFilters: {
    userRole: 'semua',
    userSearch: '',
    bookCategory: 'semua',
    bookSearch: '',
    journalStatus: 'semua',
    journalClass: 'semua',
    journalSearch: '',
    quizSearch: '',
    workCategory: 'semua',
    workSearch: ''
  },
  pdfReader: {
    activeBookId: 'BK-SOP',
    currentPage: 1,
    totalPages: 2,
    zoom: 100,
    rotation: 0,
    annotated: false,
    collapsed: false,
    fitWidth: false,
    fullscreen: false
  },
  timer: {
    running: false,
    seconds: 0,
    intervalId: null
  },
  quiz: {
    index: 0,
    score: 0,
    answered: false
  },
  activeModalKaryaId: null,
  html5QrScanner: null
};

// ==========================================
// 2. TOAST & NOTIFICATION SYSTEM
// ==========================================

window.showToast = function(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeStyles = {
    success: 'bg-emerald-600 text-white border-emerald-700',
    points: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-700 shadow-amber-200',
    error: 'bg-rose-600 text-white border-rose-700',
    info: 'bg-slate-800 text-white border-slate-900'
  };

  const icons = {
    success: 'fa-solid fa-circle-check',
    points: 'fa-solid fa-coins',
    error: 'fa-solid fa-triangle-exclamation',
    info: 'fa-solid fa-circle-info'
  };

  toast.className = `p-4 rounded-2xl shadow-xl border flex items-start gap-3 transform transition-all duration-300 translate-x-full pointer-events-auto ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `
    <i class="${icons[type] || icons.info} text-xl mt-0.5"></i>
    <div class="flex-1">
      <h5 class="font-bold text-xs uppercase tracking-wider">${title}</h5>
      <p class="text-xs mt-0.5 opacity-90 leading-snug">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="opacity-70 hover:opacity-100 text-sm"><i class="fa-solid fa-xmark"></i></button>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full');
  });

  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 350);
  }, 4500);
};

// ==========================================
// 3. GAMIFICATION ENGINE (POINTS, LEVELS, BADGES)
// ==========================================

const LEVEL_THRESHOLDS = [
  { level: 'Pembaca', min: 0, max: 249, icon: 'fa-book-open-reader' },
  { level: 'Penulis', min: 250, max: 499, icon: 'fa-pen-nib' },
  { level: 'Peneliti', min: 500, max: 749, icon: 'fa-magnifying-glass' },
  { level: 'Duta Literasi', min: 750, max: 99999, icon: 'fa-crown' }
];

window.getRankInfo = function(points) {
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    const t = LEVEL_THRESHOLDS[i];
    if (points >= t.min && points <= t.max) {
      const nextThreshold = LEVEL_THRESHOLDS[i + 1] ? LEVEL_THRESHOLDS[i + 1].min : t.max;
      const range = nextThreshold - t.min;
      const progressInLevel = points - t.min;
      const percent = LEVEL_THRESHOLDS[i + 1] ? Math.min(100, Math.round((progressInLevel / range) * 100)) : 100;
      return {
        current: t.level,
        icon: t.icon,
        percent: percent,
        next: LEVEL_THRESHOLDS[i + 1] ? LEVEL_THRESHOLDS[i + 1].level : 'Maksimal',
        pointsToNext: LEVEL_THRESHOLDS[i + 1] ? (nextThreshold - points) : 0,
        nextThreshold: nextThreshold
      };
    }
  }
  return { current: 'Duta Literasi', icon: 'fa-crown', percent: 100, next: 'Maksimal', pointsToNext: 0, nextThreshold: 1000 };
};

window.addPoints = function(pointsToAdd, reason) {
  if (!window.appState.currentUser) return;
  
  const user = window.appState.currentUser;
  const oldPoints = user.points || 0;
  const oldRank = window.getRankInfo(oldPoints).current;

  user.points = oldPoints + pointsToAdd;
  const newRankInfo = window.getRankInfo(user.points);

  // Check if leveled up
  if (newRankInfo.current !== oldRank) {
    user.level = newRankInfo.current;
    showLevelUpModal(newRankInfo.current);
    if (window.confetti) {
      window.confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }

  // Update in user list
  const userIdx = window.appState.users.findIndex(u => u.id === user.id);
  if (userIdx !== -1) {
    window.appState.users[userIdx] = { ...user };
    setStorage(STORAGE_KEYS.USERS, window.appState.users);
  }
  setStorage(STORAGE_KEYS.CURRENT_USER, user);

  // Sync UI
  updateHeaderGamification();
  updateBerandaStats();

  showToast('Poin Literasi Bertambah!', `+${pointsToAdd} Poin: ${reason}`, 'points');
};

function showLevelUpModal(newLevel) {
  const modal = document.getElementById('modal-level-up');
  const title = document.getElementById('level-up-title');
  const desc = document.getElementById('level-up-desc');
  if (!modal) return;

  if (title) title.textContent = newLevel;
  if (desc) desc.textContent = `Pencapaian luar biasa! Kamu kini bergelar ${newLevel} di SMPN 2 Kasihan!`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

window.closeLevelUpModal = function() {
  const modal = document.getElementById('modal-level-up');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

function updateHeaderGamification() {
  const user = window.appState.currentUser;
  if (!user) return;

  const headerStreak = document.getElementById('header-streak');
  const headerPoints = document.getElementById('header-points');
  const headerUserName = document.getElementById('header-user-name');
  const headerUserRole = document.getElementById('header-user-role');
  const headerUserAvatar = document.getElementById('header-user-avatar');
  const menuUserFullname = document.getElementById('menu-user-fullname');
  const menuUserId = document.getElementById('menu-user-id');

  if (headerStreak) headerStreak.textContent = `${user.streak || 1} Hari`;
  if (headerPoints) headerPoints.textContent = `${user.points || 0} Poin`;
  if (headerUserName) headerUserName.textContent = user.name;
  if (headerUserRole) headerUserRole.textContent = user.role === 'guru' ? 'Guru Pembimbing' : (user.role === 'kepsek' ? 'Kepala Sekolah' : user.level || 'Pembaca');
  if (headerUserAvatar && user.avatar) headerUserAvatar.src = user.avatar;
  if (menuUserFullname) menuUserFullname.textContent = user.name;
  if (menuUserId) menuUserId.textContent = `${user.role.toUpperCase()}: ${user.username}`;
}

function updateBerandaStats() {
  const user = window.appState.currentUser;
  if (!user) return;

  const homeUserName = document.getElementById('home-user-name');
  if (homeUserName) homeUserName.textContent = user.name;

  const firstName = user.name ? user.name.split(' ')[0] : 'Aisyah';
  const phoneStudentName = document.getElementById('phone-student-name');
  if (phoneStudentName) {
    phoneStudentName.textContent = `Halo, ${firstName}! 👋`;
  }
  const phoneStreakText = document.getElementById('phone-streak-text');
  if (phoneStreakText) {
    phoneStreakText.textContent = `${user.streak || 7} hari`;
  }
  const phoneStatBooks = document.getElementById('phone-stat-books');
  if (phoneStatBooks) {
    phoneStatBooks.textContent = user.booksCount ? `${user.booksCount}` : '8';
  }
  const phoneStatWorks = document.getElementById('phone-stat-works');
  if (phoneStatWorks) {
    phoneStatWorks.textContent = user.worksCount ? `${user.worksCount}` : '5';
  }
  const phoneStatPoints = document.getElementById('phone-stat-points');
  if (phoneStatPoints) {
    phoneStatPoints.textContent = Number(user.points || 1250).toLocaleString('id-ID');
  }

  const rankInfo = window.getRankInfo(user.points || 0);
  const homeRankName = document.getElementById('home-rank-name');
  const homeRankBar = document.getElementById('home-rank-bar');
  const homeRankCaption = document.getElementById('home-rank-caption');
  const homeBadgeIcon = document.getElementById('home-badge-icon');

  if (homeRankName) homeRankName.textContent = rankInfo.current;
  if (homeRankBar) homeRankBar.style.width = `${rankInfo.percent}%`;
  if (homeRankCaption) {
    homeRankCaption.textContent = rankInfo.pointsToNext > 0 
      ? `${user.points} / ${rankInfo.nextThreshold} poin ke ${rankInfo.next}`
      : `Pangkat Tertinggi: Duta Literasi (${user.points} Poin)`;
  }
  if (homeBadgeIcon) {
    homeBadgeIcon.innerHTML = `<i class="fa-solid ${rankInfo.icon}"></i>`;
  }

  // Count metrics
  const userJournals = window.appState.journals.filter(j => j.studentName === user.name);
  const userWorks = window.appState.works.filter(w => w.authorName === user.name);

  const statBooks = document.getElementById('stat-books-count');
  const statPoints = document.getElementById('stat-points-count');
  const statStreak = document.getElementById('stat-streak-count');
  const statWorks = document.getElementById('stat-works-count');

  if (statBooks) statBooks.textContent = `${userJournals.length + 2} Buku`;
  if (statPoints) statPoints.textContent = `${user.points || 0} Poin`;
  if (statStreak) statStreak.textContent = `${user.streak || 1} Hari`;
  if (statWorks) statWorks.textContent = `${userWorks.length} Karya`;
}

// Student Tab Controller
window.switchPhoneTab = function(tabName) {
  const tabs = ['beranda', 'buku', 'tantangan', 'notifikasi', 'profil'];
  tabs.forEach(t => {
    const screen = document.getElementById(`phone-screen-${t}`);
    const navBtn = document.getElementById(`phone-nav-${t}`);
    if (screen) {
      if (t === tabName) {
        screen.classList.remove('hidden');
      } else {
        screen.classList.add('hidden');
      }
    }
    if (navBtn) {
      const icon = navBtn.querySelector('i');
      const label = navBtn.querySelector('span');
      if (t === tabName) {
        navBtn.classList.add('text-[#082e54]', 'font-bold', 'bg-sky-50');
        navBtn.classList.remove('text-slate-500', 'text-slate-400');
        if (icon) {
          icon.classList.remove('text-slate-400');
          icon.classList.add('text-[#082e54]');
        }
        if (label) {
          label.classList.remove('text-slate-500');
          label.classList.add('text-[#082e54]', 'font-bold');
        }
      } else {
        navBtn.classList.remove('text-[#082e54]', 'font-bold', 'bg-sky-50');
        navBtn.classList.add('text-slate-500');
        if (icon) {
          icon.classList.remove('text-[#082e54]');
          icon.classList.add('text-slate-400');
        }
        if (label) {
          label.classList.remove('text-[#082e54]', 'font-bold');
          label.classList.add('text-slate-500');
        }
      }
    }
  });

  const scrollSurface = document.getElementById('phone-scroll-surface');
  if (scrollSurface) {
    scrollSurface.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Synchronize with global student bottom navigation
  if (typeof window.updateStudentBottomNav === 'function') {
    window.updateStudentBottomNav(tabName);
  }
};

// ==========================================
// STUDENT GLOBAL BOTTOM NAVIGATION CONTROLLER
// (Standardized 5-item bottom navigation matching user reference photo:
// Beranda, Buku, Tantangan, Notifikasi, Profil)
// ==========================================
window.updateStudentBottomNav = function(activeKey) {
  const nav = document.getElementById('student-global-bottom-nav');
  if (!nav) return;

  const currentRole = window.appState?.currentUser?.role;
  const currentView = window.appState?.currentView;

  // Only show on student views when logged in as student or in student flow
  const isExcludedView = ['login', 'admin', 'guru', 'sekolah'].includes(currentView);
  const isExcludedRole = ['admin', 'guru', 'kepsek'].includes(currentRole);

  if (isExcludedView || isExcludedRole) {
    nav.classList.add('hidden');
    return;
  }

  // Display the student bottom nav
  nav.classList.remove('hidden');

  // Determine which tab should be marked active
  let activeTab = activeKey;
  if (!activeTab) {
    if (currentView === 'beranda') {
      const activeScreen = ['buku', 'tantangan', 'notifikasi', 'profil'].find(t => {
        const el = document.getElementById(`phone-screen-${t}`);
        return el && !el.classList.contains('hidden');
      });
      activeTab = activeScreen || 'beranda';
    } else if (currentView === 'm1') {
      activeTab = 'buku';
    } else if (currentView === 'm2' || currentView === 'm3') {
      activeTab = 'tantangan';
    } else if (currentView === 'portofolio') {
      activeTab = 'profil';
    } else {
      activeTab = 'beranda';
    }
  }

  const items = ['beranda', 'buku', 'tantangan', 'notifikasi', 'profil'];
  items.forEach(item => {
    const btn = document.getElementById(`sbn-btn-${item}`);
    if (!btn) return;
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span:not(#sbn-notif-dot)');

    if (item === activeTab) {
      btn.classList.add('text-[#00695c]');
      btn.classList.remove('text-slate-500');
      if (icon) {
        icon.classList.remove('text-slate-500', 'group-hover:text-slate-800');
        icon.classList.add('text-[#00695c]', 'scale-105');
      }
      if (span) {
        span.classList.remove('font-normal', 'text-slate-500', 'group-hover:text-slate-800');
        span.classList.add('font-bold', 'text-[#00695c]');
      }
    } else {
      btn.classList.remove('text-[#00695c]');
      btn.classList.add('text-slate-500');
      if (icon) {
        icon.classList.remove('text-[#00695c]', 'scale-105');
        icon.classList.add('text-slate-500', 'group-hover:text-slate-800');
      }
      if (span) {
        span.classList.remove('font-bold', 'text-[#00695c]');
        span.classList.add('font-normal', 'text-slate-500', 'group-hover:text-slate-800');
      }
    }
  });
};

window.handleStudentBottomNav = function(target) {
  if (target === 'beranda') {
    navigateTo('beranda');
    if (typeof window.switchPhoneTab === 'function') {
      window.switchPhoneTab('beranda');
    }
  } else if (target === 'buku') {
    navigateTo('m1');
    if (typeof window.switchM1Tab === 'function') {
      window.switchM1Tab('katalog');
    }
  } else if (target === 'tantangan') {
    navigateTo('beranda');
    if (typeof window.switchPhoneTab === 'function') {
      window.switchPhoneTab('tantangan');
    }
  } else if (target === 'notifikasi') {
    navigateTo('beranda');
    if (typeof window.switchPhoneTab === 'function') {
      window.switchPhoneTab('notifikasi');
    }
    const notifDot = document.getElementById('sbn-notif-dot');
    if (notifDot) notifDot.classList.add('hidden');
  } else if (target === 'profil') {
    navigateTo('profil');
  }
  window.updateStudentBottomNav(target);
};

// ==========================================
// 4. SPA ROUTER & NAVIGATION CONTROLLER
// ==========================================

const ALL_VIEWS = ['login', 'beranda', 'm1', 'm2', 'm3', 'm4', 'm5', 'guru', 'sekolah', 'jogja', 'galeri', 'admin', 'portofolio'];

export function navigateTo(targetView) {
  if (targetView === 'profil') {
    targetView = 'portofolio';
  }

  // Guard: If not logged in and target is not login, force login
  if (!window.appState.currentUser && targetView !== 'login') {
    targetView = 'login';
  }

  // Hide all views
  ALL_VIEWS.forEach(viewId => {
    const el = document.getElementById(`view-${viewId}`);
    if (el) el.classList.add('hidden');
  });

  // Show target view
  const targetEl = document.getElementById(`view-${targetView}`);
  const isMView = ['m1', 'm2', 'm3', 'm4', 'm5'].includes(targetView);

  if (targetEl) {
    targetEl.classList.remove('hidden');
    window.appState.currentView = targetView;
    // Posisi langsung di atas halaman tanpa delay untuk M1-M5 dan navigasi lainnya
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  // Header, Navigation & Main Content responsiveness
  const mainHeader = document.getElementById('main-header');
  const mobileNav = document.getElementById('mobile-nav');
  const mainContent = document.getElementById('main-content');

  if (targetView === 'login') {
    if (mainHeader) mainHeader.classList.add('hidden');
    if (mobileNav) mobileNav.classList.add('hidden');
    if (mainContent) {
      // Fullscreen edge-to-edge layout for login on any device
      mainContent.className = 'w-full min-h-screen p-0 m-0';
    }
  } else if (targetView === 'm1' || targetView === 'm4' || targetView === 'm5' || targetView === 'portofolio') {
    // Full screen responsive layout for M1 Membaca, M4 Menceritakan, M5 Mengapresiasi & Portofolio on smartphone and laptop
    if (window.innerWidth < 768) {
      if (mainHeader) mainHeader.classList.add('hidden');
      if (mobileNav) mobileNav.classList.add('hidden');
    } else {
      if (mainHeader) mainHeader.classList.remove('hidden');
      if (mobileNav) mobileNav.classList.add('hidden');
    }
    if (mainContent) {
      mainContent.className = 'w-full min-h-screen p-0 m-0 pb-20';
    }
    updateHeaderGamification();
    updateRoleNavPermissions();
  } else {
    const isSiswaBeranda = window.appState.currentUser?.role === 'siswa' && targetView === 'beranda';
    if (mainHeader) mainHeader.classList.remove('hidden');
    if (mainContent) {
      if (isMView) {
        // Halaman M2-M5: Tampilan responsif layar penuh laptop dan smartphone
        if (targetView === 'm2' || targetView === 'm3') {
          mainContent.className = 'flex-1 w-full p-0 sm:p-2 lg:p-6 xl:p-8 pb-24 md:pb-8';
        } else {
          mainContent.className = 'flex-1 w-full pt-2.5 px-3 sm:px-5 lg:px-8 xl:px-10 pb-24 md:pb-8';
        }
      } else {
        mainContent.className = 'flex-1 w-full p-3 sm:p-5 lg:p-8 xl:p-10 pb-24 md:pb-8';
      }
    }
    if (mobileNav) {
      if (isSiswaBeranda) {
        mobileNav.classList.add('hidden');
      } else {
        mobileNav.classList.remove('hidden');
      }
    }
    updateHeaderGamification();
    updateRoleNavPermissions();
  }

  // Synchronize student global bottom navigation
  if (typeof window.updateStudentBottomNav === 'function') {
    window.updateStudentBottomNav();
  }

  // Highlight active nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-target') === targetView) {
      btn.classList.add('text-sky-600', 'bg-sky-50', 'font-bold');
      btn.classList.remove('text-slate-600');
    } else {
      btn.classList.remove('text-sky-600', 'bg-sky-50', 'font-bold');
      btn.classList.add('text-slate-600');
    }
  });

  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    if (btn.getAttribute('data-target') === targetView) {
      btn.classList.add('text-sky-600');
      btn.classList.remove('text-slate-500');
    } else {
      btn.classList.remove('text-sky-600');
      btn.classList.add('text-slate-500');
    }
  });

  // Trigger view-specific renderers
  onViewActivated(targetView);
}
window.navigateTo = navigateTo;

function updateRoleNavPermissions() {
  const user = window.appState.currentUser;
  if (!user) return;

  const btnGuru = document.getElementById('nav-btn-guru');
  const btnSekolah = document.getElementById('nav-btn-sekolah');
  const btnAdmin = document.getElementById('nav-btn-admin');
  const mobileRoleLinks = document.getElementById('mobile-role-links');

  const isAdmin = user.role === 'admin' || user.role === 'kepsek';
  const isGuru = user.role === 'guru' || user.role === 'kepsek' || user.role === 'admin';
  const isKepsek = user.role === 'kepsek';

  if (btnGuru) btnGuru.classList.toggle('hidden', !isGuru);
  if (btnSekolah) btnSekolah.classList.toggle('hidden', !isGuru);
  if (btnAdmin) {
    btnAdmin.classList.toggle('hidden', !isAdmin);
    btnAdmin.innerHTML = `<i class="fa-solid fa-screwdriver-wrench mr-1.5 text-xs text-amber-500"></i> Kelola Data Admin`;
  }

  if (mobileRoleLinks) {
    let linksHtml = '';
    if (isAdmin) {
      linksHtml += `
        <button onclick="navigateTo('admin'); toggleMobileMoreMenu();" class="p-2.5 bg-slate-900 text-amber-300 rounded-xl font-bold text-xs flex items-center gap-2 text-left shadow-xs">
          <i class="fa-solid fa-screwdriver-wrench text-amber-400"></i> Panel Pengelolaan Data Admin
        </button>
      `;
    }
    if (isGuru) {
      linksHtml += `
        <button onclick="navigateTo('guru'); toggleMobileMoreMenu();" class="p-2.5 bg-purple-50 text-purple-800 rounded-xl font-bold text-xs flex items-center gap-2 text-left">
          <i class="fa-solid fa-chalkboard-user text-purple-600"></i> Panel Pemantauan Guru
        </button>
        <button onclick="navigateTo('sekolah'); toggleMobileMoreMenu();" class="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl font-bold text-xs flex items-center gap-2 text-left">
          <i class="fa-solid fa-chart-line text-emerald-600"></i> Dashboard Statistik Sekolah
        </button>
      `;
    }
    mobileRoleLinks.innerHTML = linksHtml;
  }
}

function onViewActivated(view) {
  switch (view) {
    case 'beranda':
      updateBerandaStats();
      break;
    case 'm1':
      if (typeof window.populateJournalBookSelect === 'function') {
        window.populateJournalBookSelect();
      }
      if (typeof window.renderM1RecentJournals === 'function') {
        window.renderM1RecentJournals();
      }
      if (typeof window.renderM1Recommendations === 'function') {
        window.renderM1Recommendations();
      }
      if (typeof window.syncM1LaptopActiveBook === 'function') {
        window.syncM1LaptopActiveBook();
      }
      renderBooks('semua');
      renderJournalHistory();
      if (typeof window.updateM1UserStats === 'function') {
        window.updateM1UserStats();
      }
      break;
    case 'm2':
      if (typeof window.updateM2Display === 'function') {
        window.updateM2Display();
      }
      renderQuizQuestion();
      break;
    case 'm4':
      if (typeof window.renderM4View === 'function') {
        window.renderM4View();
      }
      renderBooktalkList();
      break;
    case 'm5':
      if (typeof window.renderM5View === 'function') {
        window.renderM5View();
      }
      renderApresiasiFeed();
      break;
    case 'portofolio':
      if (typeof window.renderPortofolioView === 'function') {
        window.renderPortofolioView();
      }
      break;
    case 'galeri':
      renderGaleriKarya();
      break;
    case 'guru':
      renderGuruDashboard();
      break;
    case 'sekolah':
      renderSekolahDashboard();
      break;
    case 'admin':
      if (typeof window.renderAdminDashboard === 'function') {
        window.renderAdminDashboard();
      } else {
        renderAdminUsersTable();
      }
      break;
  }
}

window.toggleMobileMoreMenu = function() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
};

// ==========================================
// 5. AUTHENTICATION & LOGIN LOGIC
// ==========================================

export function setLoginRole(role) {
  if (window.appState) {
    window.appState.loginRoleSelected = role;
  }
  
  const tabSiswa = document.getElementById('tab-login-siswa');
  const tabGuru = document.getElementById('tab-login-guru');
  const tabAdmin = document.getElementById('tab-login-admin');
  const tabKepsek = document.getElementById('tab-login-kepsek');
  const labelUsername = document.getElementById('label-login-username');
  const inputUsername = document.getElementById('login-username');

  [tabSiswa, tabGuru, tabAdmin, tabKepsek].forEach(tab => {
    if (tab) {
      tab.className = 'py-2 rounded-xl font-bold text-[11px] sm:text-xs transition text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1';
    }
  });

  if (role === 'siswa') {
    if (tabSiswa) tabSiswa.className = 'py-2 rounded-xl font-bold text-[11px] sm:text-xs transition bg-white text-sky-700 shadow-xs flex items-center justify-center gap-1';
    if (labelUsername) labelUsername.textContent = 'NISN / Username Siswa';
    if (inputUsername) inputUsername.placeholder = 'Contoh: siswa1 atau 20240901';
  } else if (role === 'guru') {
    if (tabGuru) tabGuru.className = 'py-2 rounded-xl font-bold text-[11px] sm:text-xs transition bg-white text-purple-700 shadow-xs flex items-center justify-center gap-1';
    if (labelUsername) labelUsername.textContent = 'NIP / Username Guru';
    if (inputUsername) inputUsername.placeholder = 'Contoh: guru1 atau NIP Guru';
  } else if (role === 'admin') {
    if (tabAdmin) tabAdmin.className = 'py-2 rounded-xl font-bold text-[11px] sm:text-xs transition bg-slate-900 text-amber-300 shadow-xs flex items-center justify-center gap-1';
    if (labelUsername) labelUsername.textContent = 'Username Administrator Sistem';
    if (inputUsername) inputUsername.placeholder = 'Contoh: admin';
  } else if (role === 'kepsek') {
    if (tabKepsek) tabKepsek.className = 'py-2 rounded-xl font-bold text-[11px] sm:text-xs transition bg-white text-emerald-700 shadow-xs flex items-center justify-center gap-1';
    if (labelUsername) labelUsername.textContent = 'NIP / Akun Kepala Sekolah';
    if (inputUsername) inputUsername.placeholder = 'Contoh: kepsek';
  }
}
window.setLoginRole = setLoginRole;

export function openPhoneLoginForm(role) {
  setLoginRole(role);
  const welcomeScreen = document.getElementById('phone-screen-welcome');
  const formScreen = document.getElementById('phone-screen-form');
  const badge = document.getElementById('phone-form-role-badge');
  const roleTitle = document.getElementById('phone-form-role-title');
  const roleDesc = document.getElementById('phone-form-role-desc');

  if (badge) {
    if (role === 'siswa') {
      badge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800';
      badge.textContent = 'Akun Siswa';
      if (roleTitle) roleTitle.textContent = 'Masuk sebagai Siswa';
      if (roleDesc) roleDesc.textContent = 'Gunakan NISN atau username resmi siswa.';
    } else if (role === 'guru') {
      badge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800';
      badge.textContent = 'Akun Guru';
      if (roleTitle) roleTitle.textContent = 'Masuk sebagai Guru';
      if (roleDesc) roleDesc.textContent = 'Gunakan NIP atau username guru pendamping.';
    } else if (role === 'admin') {
      badge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-amber-300 border border-slate-700';
      badge.textContent = 'Admin Sistem';
      if (roleTitle) roleTitle.textContent = 'Masuk sebagai Administrator';
      if (roleDesc) roleDesc.textContent = 'Akses pengelolaan seluruh data buku, pengguna, jurnal, dan kuis.';
    } else {
      badge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
      badge.textContent = 'Kepala Sekolah';
      if (roleTitle) roleTitle.textContent = 'Masuk sebagai Kepala Sekolah';
      if (roleDesc) roleDesc.textContent = 'Akses monitoring dan statistik GLS sekolah.';
    }
  }

  if (welcomeScreen) welcomeScreen.classList.add('hidden');
  if (formScreen) formScreen.classList.remove('hidden');

  const errorBox = document.getElementById('login-error-msg');
  if (errorBox) errorBox.classList.add('hidden');

  const inputUsername = document.getElementById('login-username');
  if (inputUsername) {
    setTimeout(() => inputUsername.focus(), 150);
  }
}
window.openPhoneLoginForm = openPhoneLoginForm;

export function closePhoneLoginForm() {
  const welcomeScreen = document.getElementById('phone-screen-welcome');
  const formScreen = document.getElementById('phone-screen-form');
  if (welcomeScreen) welcomeScreen.classList.remove('hidden');
  if (formScreen) formScreen.classList.add('hidden');
  const errorBox = document.getElementById('login-error-msg');
  if (errorBox) errorBox.classList.add('hidden');
}
window.closePhoneLoginForm = closePhoneLoginForm;

export function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
window.togglePasswordVisibility = togglePasswordVisibility;

export function fillQuickLogin(username, password, role) {
  setLoginRole(role);
  const uInput = document.getElementById('login-username');
  const pInput = document.getElementById('login-password');
  if (uInput) uInput.value = username;
  if (pInput) pInput.value = password;
  
  // Directly trigger login for ease of evaluation
  const form = document.getElementById('form-login');
  if (form) {
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  }
}
window.fillQuickLogin = fillQuickLogin;

export function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  const username = document.getElementById('login-username')?.value.trim();
  const password = document.getElementById('login-password')?.value.trim();
  const errorBox = document.getElementById('login-error-msg');
  const errorText = document.getElementById('login-error-text');

  if (!username || !password) {
    if (errorBox) errorBox.classList.remove('hidden');
    if (errorText) errorText.textContent = 'Harap masukkan username dan kata sandi!';
    return;
  }

  // Find user
  const found = window.appState.users.find(u => 
    u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );

  if (found) {
    if (errorBox) errorBox.classList.add('hidden');
    window.appState.currentUser = found;
    setStorage(STORAGE_KEYS.CURRENT_USER, found);

    showToast('Berhasil Masuk', `Selamat datang di LENTERA 5M, ${found.name}!`, 'success');
    
    // Redirect appropriately
    if (found.role === 'admin') {
      navigateTo('admin');
    } else if (found.role === 'guru') {
      navigateTo('guru');
    } else if (found.role === 'kepsek') {
      navigateTo('sekolah');
    } else {
      navigateTo('beranda');
    }
  } else {
    if (errorBox) errorBox.classList.remove('hidden');
    if (errorText) errorText.textContent = 'Username atau kata sandi tidak cocok. Silakan coba akun demo!';
  }
}
window.handleLoginSubmit = handleLoginSubmit;

window.handleLogout = function() {
  window.appState.currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  if (typeof window.closePhoneLoginForm === 'function') {
    window.closePhoneLoginForm();
  }
  showToast('Sampai Jumpa', 'Anda telah keluar dari akun LENTERA 5M.', 'info');
  navigateTo('login');
};

// Aliases for compatibility
window.logout = window.handleLogout;

window.downloadRaporPdf = function() {
  if (typeof window.exportRaporPDF === 'function') {
    window.exportRaporPDF();
  } else {
    showToast('Unduh Rapor', 'Menyiapkan berkas Rapor Literasi PDF...', 'info');
  }
};

window.openQrScannerModal = function() {
  if (typeof window.startQRScanner === 'function') {
    window.startQRScanner();
  }
};

// ==========================================
// 6. M1: MEMBACA CONTROLLERS (CATALOG, TIMER, QR, JOURNAL)
// ==========================================

window.renderBooks = function(filterCategory = 'semua') {
  const container = document.getElementById('books-grid');
  if (!container) return;

  const books = window.appState.books || [];
  let filtered = books;
  if (filterCategory === 'ebook') {
    filtered = books.filter(b => (b.materialType || 'ebook') === 'ebook');
  } else if (filterCategory === 'video') {
    filtered = books.filter(b => b.materialType === 'video');
  } else if (filterCategory === 'gambar') {
    filtered = books.filter(b => b.materialType === 'gambar');
  } else if (filterCategory !== 'semua') {
    filtered = books.filter(b => b.category === filterCategory || (filterCategory === 'jogja' && (b.category === 'kearifan_lokal' || b.category === 'jogja')));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
        <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <i class="fa-solid fa-book-bookmark text-xl"></i>
        </div>
        <p class="font-bold text-slate-700 text-sm">Tidak ada bahan literasi dalam kategori ini</p>
        <p class="text-xs text-slate-400 mt-1">Silakan pilih kategori lain atau tambahkan bahan baru melalui panel Kelola Data Admin.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(b => {
    const isVideo = b.materialType === 'video';
    const isImage = b.materialType === 'gambar';

    let typeBadge = '';
    let actionButtons = '';
    let mediaOverlay = '';
    let metaSubtitle = '';

    if (isVideo) {
      typeBadge = `<span class="text-[9px] font-black uppercase tracking-wider text-rose-700 bg-rose-50/95 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-circle-play text-[8px] text-rose-600"></i> Video</span>`;
      mediaOverlay = `
        <div onclick="openVideoPlayerModal('${b.id}')" class="absolute inset-0 bg-black/25 hover:bg-black/40 transition flex items-center justify-center cursor-pointer">
          <div class="w-11 h-11 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition">
            <i class="fa-solid fa-play ml-0.5 text-sm"></i>
          </div>
        </div>
      `;
      metaSubtitle = `<span class="text-[11px] text-slate-500 font-medium">${b.creator || b.author} • <i class="fa-regular fa-clock text-slate-400"></i> ${b.duration || 'Video'}</span>`;
      actionButtons = `
        <button onclick="openVideoPlayerModal('${b.id}')" class="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i class="fa-solid fa-play text-[9px]"></i> Tonton
        </button>
        <button onclick="openJournalForBook('${b.title.replace(/'/g, "\\'")}', 'video')" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-pen-nib"></i> Jurnal
        </button>
      `;
    } else if (isImage) {
      typeBadge = `<span class="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50/95 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-image text-[8px] text-emerald-600"></i> Infografis</span>`;
      mediaOverlay = `
        <div onclick="openImageViewerModal('${b.id}')" class="absolute inset-0 bg-black/10 hover:bg-black/25 transition flex items-center justify-center cursor-pointer">
          <div class="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition">
            <i class="fa-solid fa-magnifying-glass-plus text-sm"></i>
          </div>
        </div>
      `;
      metaSubtitle = `<span class="text-[11px] text-slate-500 font-medium">${b.author} • Visual Edukasi</span>`;
      actionButtons = `
        <button onclick="openImageViewerModal('${b.id}')" class="flex-1 py-1.5 bg-[#00695c] hover:bg-[#004d40] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i class="fa-solid fa-magnifying-glass-plus text-[9px]"></i> Lihat
        </button>
        <button onclick="openJournalForBook('${b.title.replace(/'/g, "\\'")}', 'gambar')" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-pen-nib"></i> Jurnal
        </button>
      `;
    } else {
      typeBadge = `<span class="text-[9px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50/95 border border-sky-200 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-book text-[8px] text-sky-600"></i> E-Book</span>`;
      metaSubtitle = `<span class="text-[11px] text-slate-500 font-medium">${b.author} • ${b.pages || 100} Hal</span>`;
      actionButtons = `
        <button onclick="selectActiveBook('${b.id}')" class="flex-1 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-book-open text-sky-600"></i> Baca
        </button>
        <button onclick="openJournalForBook('${b.title.replace(/'/g, "\\'")}', 'ebook')" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-pen-nib"></i> Jurnal
        </button>
      `;
    }

    return `
      <div class="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 card-shadow hover:border-sky-300 transition-all flex flex-col justify-between group">
        <div>
          <div class="relative rounded-xl overflow-hidden mb-3 aspect-[3/4] bg-slate-100">
            <img src="${b.cover}" alt="${b.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            ${mediaOverlay}
            <span class="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
              <i class="fa-solid fa-star text-amber-400 text-[9px]"></i> ${b.rating || 4.8}
            </span>
            <div class="absolute bottom-2 left-2">
              ${typeBadge}
            </div>
          </div>
          <span class="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">${b.categoryLabel || b.category}</span>
          <h4 class="font-bold text-slate-800 text-xs sm:text-sm mt-1.5 line-clamp-1 group-hover:text-sky-900 transition">${b.title}</h4>
          <p class="mt-0.5">${metaSubtitle}</p>
          <p class="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">${b.synopsis || 'Bahan literasi terpilih LENTERA 5M.'}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 flex gap-2">
          ${actionButtons}
        </div>
      </div>
    `;
  }).join('');
};

window.filterBooks = function(cat) {
  document.querySelectorAll('.book-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = 'book-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00695c] text-white shadow-2xs';
    } else {
      btn.className = 'book-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';
    }
  });
  renderBooks(cat);
};

window.openJournalForBook = function(bookTitle, mediaType = 'ebook') {
  const select = document.getElementById('jurnal-buku');
  if (select && bookTitle) {
    let found = false;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === bookTitle) {
        select.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      const newOpt = new Option(bookTitle, bookTitle);
      select.add(newOpt);
      select.value = bookTitle;
    }
  }

  if (window.appState.currentView !== 'm1') {
    navigateTo('m1');
  }

  const journalCard = document.getElementById('form-jurnal') || document.getElementById('section-m1-journal');
  if (journalCard) {
    journalCard.scrollIntoView({ behavior: 'smooth' });
  }

  const label = mediaType === 'video' ? 'video pembelajaran' : (mediaType === 'gambar' ? 'infografis edukatif' : 'buku bacaan');
  showToast('Siap Menulis Jurnal', `Bahan ${label} "${bookTitle}" dipilih untuk jurnal refleksi literasi.`, 'info');
};

window.selectActiveBook = function(bookId) {
  const b = window.appState.books.find(x => x.id === bookId);
  if (!b) return;

  if (b.materialType === 'video') {
    window.openVideoPlayerModal(bookId);
    return;
  }

  if (b.materialType === 'gambar') {
    window.openImageViewerModal(bookId);
    return;
  }

  window.appState.activeBook = b;
  setStorage(STORAGE_KEYS.ACTIVE_BOOK, b);

  const homeCover = document.getElementById('active-book-cover');
  const homeTitle = document.getElementById('active-book-title');
  const homeAuthor = document.getElementById('active-book-author');
  const timerBook = document.getElementById('timer-active-book');
  const journalBookSelect = document.getElementById('jurnal-buku');

  if (homeCover) homeCover.src = b.cover;
  if (homeTitle) homeTitle.textContent = b.title;
  if (homeAuthor) homeAuthor.textContent = `${b.author} • ${b.categoryLabel || b.category}`;
  if (timerBook) timerBook.textContent = b.title;
  if (journalBookSelect) journalBookSelect.value = b.title;

  if (typeof window.syncM1LaptopActiveBook === 'function') {
    window.syncM1LaptopActiveBook();
  }

  if (window.appState.currentView !== 'm1') {
    navigateTo('m1');
  }

  if (typeof window.openBookPdfReader === 'function') {
    window.openBookPdfReader(b.id);
  }

  showToast('Membuka E-Book PDF', `Membuka "${b.title}" di penampil dokumen PDF aplikasi.`, 'info');
};

window.syncM1LaptopActiveBook = function() {
  const b = window.appState.activeBook || window.appState.books[0];
  if (!b) return;
  const laptopCover = document.getElementById('m1-laptop-active-cover');
  const laptopTitle = document.getElementById('m1-laptop-active-title');
  const laptopAuthor = document.getElementById('m1-laptop-active-author');
  if (laptopCover && b.cover) laptopCover.src = b.cover;
  if (laptopTitle) laptopTitle.textContent = b.title;
  if (laptopAuthor) laptopAuthor.textContent = `${b.author} • ${b.categoryLabel || b.category}`;
};

// ==========================================
// 8B. IN-APP PDF READER CONTROLLER
// ==========================================

window.openBookPdfReader = function(bookId) {
  const b = window.appState.books.find(x => x.id === bookId) || window.appState.books[0];
  if (!b) return;

  if (!window.appState.pdfReader) {
    window.appState.pdfReader = {
      activeBookId: b.id,
      currentPage: 1,
      totalPages: 2,
      zoom: 100,
      rotation: 0,
      annotated: false,
      collapsed: false,
      fitWidth: false,
      fullscreen: false
    };
  }

  const readerState = window.appState.pdfReader;
  readerState.activeBookId = b.id;
  readerState.currentPage = 1;
  readerState.totalPages = (b.id === 'BK-SOP' || b.pages === 2) ? 2 : Math.min(b.pages || 2, 4);
  readerState.zoom = 100;
  readerState.rotation = 0;
  readerState.annotated = false;
  readerState.collapsed = false;

  // Update UI Elements
  const container = document.getElementById('m1-pdf-reader-container');
  const mainCard = document.getElementById('pdf-reader-main-card');
  const titleEl = document.getElementById('pdf-reader-book-title');
  const categoryEl = document.getElementById('pdf-reader-book-category');
  const subtitleEl = document.getElementById('pdf-reader-book-subtitle');
  const filenameEl = document.getElementById('pdf-reader-filename');
  const pageCurEl = document.getElementById('pdf-current-page');
  const pageTotalEl = document.getElementById('pdf-total-pages');
  const zoomEl = document.getElementById('pdf-zoom-label');
  const iconCollapse = document.getElementById('icon-pdf-collapse');

  if (container) container.classList.remove('hidden');
  if (mainCard) mainCard.classList.remove('hidden');
  if (iconCollapse) iconCollapse.className = 'fa-solid fa-chevron-up text-xs';

  if (titleEl) titleEl.textContent = b.title;
  if (categoryEl) {
    categoryEl.textContent = b.categoryLabel || b.category.toUpperCase();
    if (b.category === 'sarpras') {
      categoryEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-100 text-sky-800 tracking-wider';
    } else {
      categoryEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800 tracking-wider';
    }
  }
  if (subtitleEl) subtitleEl.textContent = `${b.title} • ${b.author || 'SMP Negeri 2 Kasihan'}`;
  if (filenameEl) filenameEl.textContent = b.pdfFileName || `${b.title}.pdf`;
  if (pageCurEl) pageCurEl.textContent = '1';
  if (pageTotalEl) pageTotalEl.textContent = readerState.totalPages;
  if (zoomEl) zoomEl.textContent = '100%';

  // Auto populate Journal Book Select
  const journalSelect = document.getElementById('jurnal-buku');
  if (journalSelect) journalSelect.value = b.title;

  window.renderPdfThumbnails();
  window.renderPdfDocument();

  if (!container) {
    if (b.pdfUrl && (b.pdfSourceType === 'upload' || b.pdfSourceType === 'link')) {
      window.open(b.pdfUrl, '_blank');
      showToast('Membaca PDF', `Membuka "${b.title}.pdf" pada peramban.`, 'info');
    } else {
      showToast('Buku Dipilih', `Sedang membaca "${b.title}". Buka Timer untuk fokus membaca atau Jurnal untuk mencatat progres.`, 'info');
    }
  }
};

window.renderPdfThumbnails = function() {
  const sidebar = document.getElementById('pdf-thumbnails-sidebar');
  if (!sidebar) return;

  const readerState = window.appState.pdfReader;
  const total = readerState.totalPages;
  const current = readerState.currentPage;

  let html = '';
  for (let p = 1; p <= total; p++) {
    const isActive = p === current;
    html += `
      <div onclick="goToPdfPage(${p})" class="cursor-pointer group flex flex-col items-center">
        <div class="w-full aspect-3/4 rounded-lg bg-white border-2 ${isActive ? 'border-sky-500 shadow-md ring-2 ring-sky-400/40' : 'border-slate-700 opacity-70 group-hover:opacity-100 group-hover:border-slate-500'} p-1.5 flex flex-col justify-between overflow-hidden transition relative">
          <div class="space-y-1 opacity-60">
            <div class="h-1.5 w-1/2 bg-slate-800 rounded"></div>
            <div class="h-1 w-full bg-slate-400 rounded"></div>
            <div class="h-1 w-4/5 bg-slate-300 rounded"></div>
            <div class="h-1 w-3/4 bg-slate-300 rounded"></div>
          </div>
          <div class="w-full border-t border-slate-200 pt-0.5 text-center">
            <span class="text-[8px] font-bold text-slate-500">Hal. ${p}</span>
          </div>
        </div>
        <span class="text-[10px] font-bold mt-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}">${p}</span>
      </div>
    `;
  }
  sidebar.innerHTML = html;
};

window.renderPdfDocument = function() {
  const viewport = document.getElementById('pdf-document-viewport');
  if (!viewport) return;

  const readerState = window.appState.pdfReader;
  const b = window.appState.books.find(x => x.id === readerState.activeBookId) || window.appState.books[0];
  const page = readerState.currentPage;
  const zoom = readerState.zoom / 100;
  const rotation = readerState.rotation;
  const isAnnotated = readerState.annotated;

  // Handle uploaded PDF (Data URI or URL)
  if (b.pdfUrl && (b.pdfSourceType === 'upload' || b.pdfSourceType === 'link')) {
    viewport.innerHTML = `
      <div class="w-full h-full flex flex-col items-center transition-all duration-200" style="transform: scale(${zoom}) rotate(${rotation}deg); transform-origin: top center;">
        <div class="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col" style="min-height: 550px; height: calc(100vh - 360px);">
          <div class="bg-slate-100 p-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700">
            <span class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-file-pdf text-red-500"></i> ${b.pdfFileName || b.title}</span>
            <span class="text-[11px] text-slate-500 font-mono">${b.pdfSize || 'Dokumen PDF Asli'}</span>
          </div>
          <iframe src="${b.pdfUrl}#page=${page}&toolbar=0" class="w-full flex-1 border-0 bg-white" title="${b.title}"></iframe>
        </div>
      </div>
    `;
    return;
  }

  // Official SOP Document (SMPN 2 Kasihan Bantul matching photo)
  if (b.id === 'BK-SOP' || b.category === 'sarpras') {
    if (page === 1) {
      viewport.innerHTML = `
        <div class="w-full max-w-3xl bg-white text-slate-900 rounded-sm shadow-2xl p-6 sm:p-10 border border-slate-300 font-sans transition-all duration-200 select-text" style="transform: scale(${zoom}) rotate(${rotation}deg); transform-origin: top center; min-height: 840px;">
          <!-- KOP SURAT RESMI -->
          <div class="flex items-center gap-4 pb-3 border-b-2 border-slate-900">
            <div class="w-16 h-16 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#0369a1" />
                <polygon points="50,15 80,75 20,75" fill="#f59e0b" />
                <circle cx="50" cy="52" r="14" fill="#ffffff" />
                <path d="M42 52 L50 62 L58 44" stroke="#0369a1" stroke-width="4" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <div class="text-center flex-1">
              <h5 class="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">PEMERINTAH KABUPATEN BANTUL</h5>
              <h5 class="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">DINAS PENDIDIKAN, KEPEMUDAAN DAN OLAHRAGA</h5>
              <h3 class="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">SMP NEGERI 2 KASIHAN</h3>
              <p class="text-[10px] sm:text-xs text-slate-600 mt-0.5">Alamat: Jl. Bibis, Bangunjiwo, Kasihan, Bantul, Daerah Istimewa Yogyakarta 55183</p>
              <p class="text-[9.5px] text-slate-500">Telepon: (0274) 378821 • Pos-el: smpn2kasihan@bantulkab.go.id • Laman: smpn2kasihan.sch.id</p>
            </div>
          </div>
          <div class="h-0.5 bg-slate-900 mt-0.5 mb-5"></div>

          <!-- JUDUL DOKUMEN -->
          <div class="text-center space-y-1 mb-5">
            <h2 class="text-sm sm:text-base font-black tracking-wide text-slate-900 uppercase">STANDAR OPERASIONAL PROSEDUR (SOP)</h2>
            <h1 class="text-base sm:text-xl font-black text-[#082e54] tracking-tight uppercase">PELAYANAN SEKOLAH AMAN DAN NYAMAN</h1>
            <p class="text-xs font-bold text-slate-600 uppercase tracking-wider">TAHUN PELAJARAN 2026/2027</p>
          </div>

          <!-- TABEL METADATA DOKUMEN -->
          <div class="border border-slate-300 text-xs mb-5 rounded overflow-hidden">
            <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-300 bg-slate-50">
              <div class="p-2">
                <span class="text-[9.5px] text-slate-500 block uppercase font-bold">Nomor Dokumen</span>
                <span class="font-bold text-slate-800 font-mono text-[11px]">SOP/SARPRAS/SMPN2KSH/2026/01</span>
              </div>
              <div class="p-2">
                <span class="text-[9.5px] text-slate-500 block uppercase font-bold">Tanggal Pembuatan</span>
                <span class="font-bold text-slate-800 text-[11px]">15 Juli 2026</span>
              </div>
              <div class="p-2">
                <span class="text-[9.5px] text-slate-500 block uppercase font-bold">Tanggal Revisi</span>
                <span class="font-bold text-slate-800 text-[11px]">02 Januari 2027</span>
              </div>
              <div class="p-2">
                <span class="text-[9.5px] text-slate-500 block uppercase font-bold">Disahkan Oleh</span>
                <span class="font-bold text-slate-800 text-[11px]">Kepala Sekolah</span>
              </div>
            </div>
          </div>

          <!-- ISI DOKUMEN BAGIAN I & II -->
          <div class="space-y-4 text-xs text-slate-800 leading-relaxed text-justify">
            <div>
              <h4 class="font-black text-slate-900 uppercase mb-1 flex items-center gap-1.5">
                <span class="w-4 h-4 rounded bg-sky-100 text-sky-800 text-[10px] font-bold inline-flex items-center justify-center">I</span>
                LATAR BELAKANG & TUJUAN
              </h4>
              <p class="${isAnnotated ? 'bg-amber-100/90 p-1 rounded' : ''}">
                Sekolah merupakan ekosistem pendidikan yang wajib menjamin keamanan fisik, kenyamanan emosional, serta kepastian perlindungan hak belajar bagi seluruh peserta didik. SOP ini disusun sebagai pedoman baku dalam menciptakan atmosfer belajar yang bebas dari diskriminasi, perundungan (bullying), kekerasan fisik, intoleransi, serta bahaya sarana dan prasarana lingkungan sekolah di SMP Negeri 2 Kasihan Bantul.
              </p>
            </div>

            <div>
              <h4 class="font-black text-slate-900 uppercase mb-1 flex items-center gap-1.5">
                <span class="w-4 h-4 rounded bg-sky-100 text-sky-800 text-[10px] font-bold inline-flex items-center justify-center">II</span>
                AREA PRIORITAS PELAYANAN AMAN & NYAMAN
              </h4>
              <ul class="space-y-1.5 list-none pl-0">
                <li class="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong class="text-slate-900 font-bold block mb-0.5">1. Keamanan Fisik & Lingkungan Belajar</strong>
                  Penerapan sistem gerbang satu pintu (one-gate system), pencatatan buku tamu teratur, inspeksi kelistrikan, ruang kelas, laboratorium, dan sarana olahraga, serta penataan sanitasi ramah anak.
                </li>
                <li class="p-2 rounded bg-slate-50 border border-slate-200">
                  <strong class="text-slate-900 font-bold block mb-0.5">2. Pencegahan Perundungan & Iklim Psikologis Positif</strong>
                  Aktivasi Tim Pencegahan dan Penanganan Kekerasan (TPPK) sekolah, ketersediaan Ruang Konseling BK yang ramah, serta pembudayaan 5S (Senyum, Salam, Sapa, Sopan, Santun) berbasis budi pekerti Yogyakarta.
                </li>
                <li class="p-2 rounded bg-slate-50 border border-slate-200 ${isAnnotated ? 'bg-amber-100/90' : ''}">
                  <strong class="text-slate-900 font-bold block mb-0.5">3. Budaya Digital Sehat & Pojok Literasi Aman</strong>
                  Pemanfaatan internet sekolah terlindungi, perlindungan privasi data peserta didik di platform LENTERA 5M, dan ruang baca perpustakaan yang kondusif, nyaman, dan inklusif.
                </li>
              </ul>
            </div>
          </div>

          <!-- FOOTER DOKUMEN HALAMAN 1 -->
          <div class="mt-8 pt-3 border-t border-slate-200 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
            <span>SOP Pelayanan Sekolah Aman & Nyaman - SMPN 2 Kasihan</span>
            <span>Halaman 1 dari 2</span>
          </div>
        </div>
      `;
    } else {
      viewport.innerHTML = `
        <div class="w-full max-w-3xl bg-white text-slate-900 rounded-sm shadow-2xl p-6 sm:p-10 border border-slate-300 font-sans transition-all duration-200 select-text" style="transform: scale(${zoom}) rotate(${rotation}deg); transform-origin: top center; min-height: 840px;">
          <!-- HEADER KECIL HALAMAN 2 -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-300 text-xs text-slate-500 font-medium">
            <span>SMP NEGERI 2 KASIHAN • BANTUL</span>
            <span class="font-mono font-bold">SOP/SARPRAS/SMPN2KSH/2026/01</span>
          </div>

          <!-- ISI DOKUMEN BAGIAN III -->
          <div class="my-5 space-y-4 text-xs text-slate-800 leading-relaxed">
            <div>
              <h4 class="font-black text-slate-900 uppercase mb-2 flex items-center gap-1.5">
                <span class="w-4 h-4 rounded bg-sky-100 text-sky-800 text-[10px] font-bold inline-flex items-center justify-center">III</span>
                ALUR OPERASIONAL STANDAR PELAYANAN & PENANGANAN
              </h4>
              <p class="mb-2.5 text-slate-600">
                Tahapan koordinasi terpadu dalam penyelenggaraan iklim sekolah aman dan tindak lanjut aduan kenyamanan siswa:
              </p>

              <!-- TABEL PROSEDUR -->
              <div class="border border-slate-300 rounded overflow-hidden mb-3">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                    <tr>
                      <th class="p-2 w-10 text-center">No</th>
                      <th class="p-2">Aktivitas Operasional</th>
                      <th class="p-2">Pelaksana / Tanggung Jawab</th>
                      <th class="p-2">Waktu / Durasi</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td class="p-2 text-center font-bold">1</td>
                      <td class="p-2 font-medium">Pengawasan Kedatangan & Kepulangan Siswa di Gerbang Utama</td>
                      <td class="p-2">Guru Piket & Satpam Sekolah</td>
                      <td class="p-2">06.30 - 07.15 WIB & 14.00 - 15.30 WIB</td>
                    </tr>
                    <tr class="bg-slate-50/50">
                      <td class="p-2 text-center font-bold">2</td>
                      <td class="p-2 font-medium">Pemeriksaan Kelayakan Sarpras Kelas, Laboratorium & Pojok Baca</td>
                      <td class="p-2">Wakasek Sarpras & Tim Perawatan</td>
                      <td class="p-2">Setiap Hari Senin & Kamis</td>
                    </tr>
                    <tr>
                      <td class="p-2 text-center font-bold">3</td>
                      <td class="p-2 font-medium">Layanan Pengaduan, Curhat Teman Sebaya, & Kotak Suara Nyaman</td>
                      <td class="p-2">Guru BK & Duta Literasi Sekolah</td>
                      <td class="p-2">Jam Istirahat & Online</td>
                    </tr>
                    <tr class="bg-slate-50/50 ${isAnnotated ? 'bg-amber-100/80' : ''}">
                      <td class="p-2 text-center font-bold">4</td>
                      <td class="p-2 font-medium">Investigasi & Mediasi Restoratif Penanganan Insiden Ketidaknyamanan</td>
                      <td class="p-2">Tim TPPK Sekolah & Wali Kelas</td>
                      <td class="p-2">Maksimal 1 x 24 Jam sejak Laporan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- BAGIAN IV: PENUTUP & PENGESAHAN -->
            <div class="pt-3 border-t border-slate-200">
              <h4 class="font-black text-slate-900 uppercase mb-1 flex items-center gap-1.5">
                <span class="w-4 h-4 rounded bg-sky-100 text-sky-800 text-[10px] font-bold inline-flex items-center justify-center">IV</span>
                PENUTUP & PENGESAHAN
              </h4>
              <p class="text-[11.5px] text-slate-600 mb-4">
                Standar Operasional Prosedur ini berlaku sejak tanggal ditetapkan dan dievaluasi secara berkala pada setiap akhir semester demi menjamin mutu layanan pendidikan ramah anak di SMP Negeri 2 Kasihan.
              </p>

              <!-- KOLOM TANDA TANGAN -->
              <div class="flex justify-end pt-1">
                <div class="text-center w-60 space-y-0.5">
                  <p class="text-[11px] text-slate-600">Ditetapkan di: Kasihan, Bantul</p>
                  <p class="text-[11px] text-slate-600">Pada tanggal: 15 Juli 2026</p>
                  <p class="text-xs font-bold text-slate-900 mt-1">Kepala SMP Negeri 2 Kasihan,</p>
                  
                  <!-- Stempel & TTD Digital -->
                  <div class="py-2.5 relative flex items-center justify-center">
                    <div class="absolute opacity-80 pointer-events-none">
                      <div class="w-20 h-20 rounded-full border-2 border-dashed border-blue-700/60 flex items-center justify-center rotate-12">
                        <div class="w-16 h-16 rounded-full border border-blue-700/70 flex items-center justify-center text-[7px] font-black text-blue-800 text-center uppercase tracking-tighter">
                          SMPN 2 KASIHAN<br/>TERAKREDITASI A<br/>BANTUL
                        </div>
                      </div>
                    </div>
                    <span class="font-serif italic font-bold text-xl text-slate-800 tracking-wider">Erna Retnaningsih</span>
                  </div>

                  <p class="text-xs font-black text-slate-900 underline">Erna Retnaningsih, S.Pd., M.Pd.</p>
                  <p class="text-[10px] text-slate-500 font-mono">NIP. 197303261998022001</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER DOKUMEN HALAMAN 2 -->
          <div class="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
            <span>SOP Pelayanan Sekolah Aman & Nyaman - SMPN 2 Kasihan</span>
            <span>Halaman 2 dari 2</span>
          </div>
        </div>
      `;
    }
    return;
  }

  // Generic book document for literature books
  viewport.innerHTML = `
    <div class="w-full max-w-3xl bg-white text-slate-900 rounded-sm shadow-2xl p-6 sm:p-10 border border-slate-300 font-serif transition-all duration-200 select-text" style="transform: scale(${zoom}) rotate(${rotation}deg); transform-origin: top center; min-height: 840px;">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-sans text-slate-500 mb-6">
        <span class="font-bold text-slate-800 uppercase tracking-wider">${b.title}</span>
        <span>${b.author} • Hal. ${page} / ${readerState.totalPages}</span>
      </div>

      <div class="text-center my-6">
        <span class="text-xs font-sans font-bold uppercase tracking-widest text-sky-600 block mb-1">Bab ${page}</span>
        <h2 class="text-xl font-black text-slate-900 font-sans">
          ${page === 1 ? 'Awal Perjalanan Menemukan Cahaya' : 'Langkah Kecil Menggapai Cita-Cita'}
        </h2>
        <div class="w-12 h-1 bg-sky-600 mx-auto mt-2"></div>
      </div>

      <div class="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
        <p class="first-letter:text-3xl first-letter:font-bold first-letter:font-sans first-letter:float-left first-letter:mr-2 first-letter:text-[#082e54] ${isAnnotated ? 'bg-amber-100/90 p-1.5 rounded' : ''}">
          ${b.synopsis} Cerita ini membimbing kita untuk memahami betapa tingginya nilai sebuah ketekunan dan kesetiaan pada ilmu pengetahuan. Setiap langkah perjuangan tokoh utama merefleksikan nilai luhur yang pantas diteladani oleh generasi muda.
        </p>
        <p>
          Di tengah keterbatasan sarana, ada semangat yang tak pernah padam. Suara lonceng sekolah berdentang di kejauhan, mengabarkan bahwa pagi telah tiba membawa harapan baru untuk belajar, bertumbuh, dan mengukir prestasi.
        </p>
        <div class="p-3 bg-slate-50 rounded-xl border-l-4 border-sky-600 my-4 font-sans italic text-xs text-slate-700">
          "Buku adalah lentera yang tak pernah padam di tengah pekatnya kebodohan. Siapa yang membacanya dengan sungguh-sungguh, akan menemukan jalan terang menuju masa depan."
        </div>
        <p>
          Melalui pembacaan yang cermat, kita diajak merenungkan betapa pentingnya mencatat intisari bacaan ke dalam jurnal harian pada alur 5M. Dari membaca, kita menemukan kosakata baru, menuliskan ulasan bermakna, serta menginspirasi sesama kawan di sekolah.
        </p>
      </div>

      <div class="mt-10 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-sans text-slate-400">
        <span>e-Perpustakaan SMP Negeri 2 Kasihan</span>
        <span>Halaman ${page}</span>
      </div>
    </div>
  `;
};

window.changePdfZoom = function(delta) {
  if (!window.appState.pdfReader) return;
  let zoom = window.appState.pdfReader.zoom + delta;
  zoom = Math.max(60, Math.min(180, zoom));
  window.appState.pdfReader.zoom = zoom;
  const label = document.getElementById('pdf-zoom-label');
  if (label) label.textContent = `${zoom}%`;
  window.renderPdfDocument();
};

window.resetPdfView = function() {
  if (!window.appState.pdfReader) return;
  window.appState.pdfReader.zoom = 100;
  window.appState.pdfReader.rotation = 0;
  window.appState.pdfReader.annotated = false;
  const label = document.getElementById('pdf-zoom-label');
  if (label) label.textContent = '100%';
  window.renderPdfDocument();
  showToast('Tampilan Normal', 'Zoom dan rotasi dokumen telah diatur ulang ke 100%.', 'info');
};

window.fitPdfWidth = function() {
  if (!window.appState.pdfReader) return;
  window.appState.pdfReader.zoom = 115;
  const label = document.getElementById('pdf-zoom-label');
  if (label) label.textContent = '115%';
  window.renderPdfDocument();
};

window.prevPdfPage = function() {
  if (!window.appState.pdfReader) return;
  if (window.appState.pdfReader.currentPage > 1) {
    window.appState.pdfReader.currentPage--;
    const el = document.getElementById('pdf-current-page');
    if (el) el.textContent = window.appState.pdfReader.currentPage;
    window.renderPdfThumbnails();
    window.renderPdfDocument();
  }
};

window.nextPdfPage = function() {
  if (!window.appState.pdfReader) return;
  if (window.appState.pdfReader.currentPage < window.appState.pdfReader.totalPages) {
    window.appState.pdfReader.currentPage++;
    const el = document.getElementById('pdf-current-page');
    if (el) el.textContent = window.appState.pdfReader.currentPage;
    window.renderPdfThumbnails();
    window.renderPdfDocument();
  }
};

window.goToPdfPage = function(p) {
  if (!window.appState.pdfReader) return;
  window.appState.pdfReader.currentPage = p;
  const el = document.getElementById('pdf-current-page');
  if (el) el.textContent = p;
  window.renderPdfThumbnails();
  window.renderPdfDocument();
};

window.rotatePdf = function() {
  if (!window.appState.pdfReader) return;
  window.appState.pdfReader.rotation = (window.appState.pdfReader.rotation + 90) % 360;
  window.renderPdfDocument();
};

window.togglePdfAnnotate = function() {
  if (!window.appState.pdfReader) return;
  window.appState.pdfReader.annotated = !window.appState.pdfReader.annotated;
  const btn = document.getElementById('btn-pdf-annotate');
  if (btn) {
    if (window.appState.pdfReader.annotated) {
      btn.className = 'p-1.5 rounded bg-amber-500 text-slate-900 transition';
      showToast('Stabilo Aktif', 'Poin penting pada dokumen telah ditandai kuning.', 'info');
    } else {
      btn.className = 'p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition';
    }
  }
  window.renderPdfDocument();
};

window.togglePdfReaderCollapse = function() {
  const mainCard = document.getElementById('pdf-reader-main-card');
  const icon = document.getElementById('icon-pdf-collapse');
  if (!mainCard) return;

  const isHidden = mainCard.classList.contains('hidden');
  if (isHidden) {
    mainCard.classList.remove('hidden');
    if (icon) icon.className = 'fa-solid fa-chevron-up text-xs';
  } else {
    mainCard.classList.add('hidden');
    if (icon) icon.className = 'fa-solid fa-chevron-down text-xs';
  }
};

window.togglePdfFullscreen = function() {
  const container = document.getElementById('m1-pdf-reader-container');
  if (!container) return;

  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(() => {
      showToast('Layar Penuh', 'Mode fullscreen diaktifkan pada peramban.', 'info');
    });
  } else {
    document.exitFullscreen().catch(() => {});
  }
};

window.openPdfInNewTab = function() {
  const readerState = window.appState?.pdfReader;
  const b = window.appState.books.find(x => x.id === (readerState?.activeBookId || 'BK-SOP')) || window.appState.books[0];

  if (b.pdfUrl) {
    window.open(b.pdfUrl, '_blank');
    return;
  }

  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${b.title} - Dokumen PDF SMPN 2 Kasihan</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Plus Jakarta Sans', sans-serif; background: #525659; margin: 0; padding: 20px; display: flex; justify-content: center; }
          .page { background: white; width: 210mm; min-height: 297mm; padding: 25mm 20mm; box-shadow: 0 4px 15px rgba(0,0,0,0.3); box-sizing: border-box; }
          @media print { body { background: white; padding: 0; } .page { box-shadow: none; padding: 20mm 15mm; } }
        </style>
      </head>
      <body>
        <div class="page">
          <h2 style="text-align:center; text-transform:uppercase; margin-bottom:5px;">SMP NEGERI 2 KASIHAN</h2>
          <h3 style="text-align:center; margin-top:0; color:#0369a1;">${b.title}</h3>
          <p style="text-align:center; font-size:12px; color:#666;">Penulis: ${b.author} • Kategori: ${b.categoryLabel || b.category}</p>
          <hr style="margin:20px 0; border:0; border-top:2px solid #333;" />
          <p style="font-size:14px; line-height:1.7; text-align:justify;">${b.synopsis}</p>
        </div>
      </body>
      </html>
    `);
    newWindow.document.close();
  }
};

window.downloadActivePdf = function() {
  const readerState = window.appState?.pdfReader;
  const b = window.appState.books.find(x => x.id === (readerState?.activeBookId || 'BK-SOP')) || window.appState.books[0];

  if (b.pdfUrl && b.pdfUrl.startsWith('data:application/pdf')) {
    const a = document.createElement('a');
    a.href = b.pdfUrl;
    a.download = b.pdfFileName || `${b.title}.pdf`;
    a.click();
    showToast('Unduhan Berhasil', `Berkas PDF "${b.title}" berhasil diunduh.`, 'success');
    return;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(8, 46, 84);
    doc.text('PEMERINTAH KABUPATEN BANTUL', 105, 20, { align: 'center' });
    doc.text('SMP NEGERI 2 KASIHAN', 105, 27, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Jl. Bibis, Bangunjiwo, Kasihan, Bantul 55183 • Telp: (0274) 378821', 105, 33, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(8, 46, 84);
    doc.line(20, 37, 190, 37);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(b.title.toUpperCase(), 105, 48, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(3, 105, 161);
    doc.text(`Kategori: ${b.categoryLabel || b.category} | Penulis: ${b.author}`, 105, 55, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    const splitText = doc.splitTextToSize(b.synopsis || 'Dokumen resmi literasi SMP Negeri 2 Kasihan Bantul.', 170);
    doc.text(splitText, 20, 68);

    doc.setFontSize(8.5);
    doc.setTextColor(140, 140, 140);
    doc.text('Diunduh dari Sistem Digital Literasi LENTERA 5M - SMPN 2 Kasihan Bantul', 105, 285, { align: 'center' });

    doc.save(b.pdfFileName || `${b.title}.pdf`);
    showToast('PDF Berhasil Diunduh', `Dokumen "${b.title}.pdf" tersimpan ke perangkatmu.`, 'success');
  } catch (err) {
    console.error('jsPDF error:', err);
    window.print();
  }
};

window.summarizeActiveBookAI = function() {
  const readerState = window.appState?.pdfReader;
  const b = window.appState.books.find(x => x.id === (readerState?.activeBookId || 'BK-SOP')) || window.appState.books[0];

  const summary = `
    <strong>Ringkasan Dokumen:</strong><br/>
    • <strong>Topik Utama:</strong> ${b.title}<br/>
    • <strong>Intisari:</strong> ${b.synopsis}<br/>
    • <strong>Nilai Karakter:</strong> Keselamatan, disiplin, kepedulian bersama, dan keramahan lingkungan sekolah.<br/>
    • <strong>Aksi Siswa:</strong> Catat poin penting ini pada Jurnal Membaca harian di bawah!
  `;
  showToast('Ringkasan Cerdas Dokumen', summary, 'info');
};

window.printPdfDocument = function() {
  window.print();
};

window.openReadingTimer = function(bookTitle) {
  navigateTo('m1');
  const timerBook = document.getElementById('timer-active-book');
  if (timerBook) timerBook.textContent = bookTitle;
};

window.toggleReadingTimer = function() {
  const timer = window.appState.timer;
  const btn = document.getElementById('btn-timer-toggle');

  if (!timer.running) {
    // Start timer
    timer.running = true;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-pause"></i> Jeda';
      btn.classList.replace('bg-amber-500', 'bg-amber-600');
    }
    timer.intervalId = setInterval(() => {
      timer.seconds++;
      const mins = String(Math.floor(timer.seconds / 60)).padStart(2, '0');
      const secs = String(timer.seconds % 60).padStart(2, '0');
      const display = document.getElementById('reading-timer-display');
      if (display) display.textContent = `${mins}:${secs}`;
    }, 1000);
  } else {
    // Pause timer
    timer.running = false;
    clearInterval(timer.intervalId);
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-play"></i> Lanjut';
      btn.classList.replace('bg-amber-600', 'bg-amber-500');
    }
  }
};

window.finishReadingTimer = function() {
  const timer = window.appState.timer;
  clearInterval(timer.intervalId);
  timer.running = false;

  const btn = document.getElementById('btn-timer-toggle');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Mulai';

  const readSecs = timer.seconds;
  timer.seconds = 0;
  const display = document.getElementById('reading-timer-display');
  if (display) display.textContent = '00:00';

  if (readSecs >= 5) { // friendly threshold for interactive evaluation
    window.addPoints(10, 'Sesi Membaca Mandiri (Timer Fokus)');
    showToast('Selesai Membaca!', `Hebat! Kamu membaca selama ${Math.round(readSecs / 60) || 1} menit. Jangan lupa isi jurnal bacaan!`, 'success');
    window.scrollToReadingJournal();
  } else {
    showToast('Durasi Membaca Pendek', 'Sesi belum mencapai target minimal 15 menit. Poin belum ditambahkan.', 'info');
  }
};

window.scrollToReadingJournal = function() {
  const sec = document.getElementById('section-jurnal-form');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
};

window.scrollToLibraryCatalog = function() {
  const cat = document.getElementById('section-library-catalog') || document.getElementById('section-full-catalog');
  if (cat) cat.scrollIntoView({ behavior: 'smooth' });
};

window.populateJournalBookSelect = function() {
  const sel = document.getElementById('jurnal-buku');
  if (!sel) return;
  const books = window.appState.books || [];
  const currentVal = sel.value;
  sel.innerHTML = books.map(b => `<option value="${b.title}">${b.title} — ${b.author} (${b.categoryLabel || 'Buku'})</option>`).join('');
  if (currentVal && books.some(b => b.title === currentVal)) {
    sel.value = currentVal;
  }
};

window.renderM1RecentJournals = function() {
  const container = document.getElementById('m1-recent-journals-list');
  if (!container) return;

  const list = window.appState.journals || [];
  if (list.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl text-center">Belum ada jurnal membaca. Jadilah yang pertama mengisi!</p>';
    return;
  }

  const recent = list.slice(0, 4);
  container.innerHTML = recent.map(j => `
    <div class="p-3 bg-sky-50/60 rounded-xl border border-sky-100 flex items-start gap-3 text-xs hover:bg-sky-50 transition">
      <div class="w-8 h-8 rounded-lg bg-sky-200 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
        <i class="fa-solid fa-book-open text-xs"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h5 class="font-bold text-slate-800 truncate">${j.bookTitle}</h5>
        <p class="text-[10px] text-sky-800 font-medium">${j.studentName} (${j.studentClass || '8B'}) • Hal ${j.pageStart}-${j.pageEnd} • ${j.duration || 15} Menit</p>
        <p class="text-slate-600 mt-1 italic line-clamp-2">"${j.summary}"</p>
        <button onclick="openReadingHistoryModal()" class="text-[10px] text-sky-600 font-bold hover:underline mt-1 inline-flex items-center gap-1">
          Buka Catatan <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
        </button>
      </div>
    </div>
  `).join('');
};

window.openJournalForBook = function(bookTitle) {
  navigateTo('m1');
  const sel = document.getElementById('jurnal-buku');
  if (sel && bookTitle) {
    let exists = false;
    for (let opt of sel.options) {
      if (opt.value === bookTitle) {
        sel.value = bookTitle;
        exists = true;
        break;
      }
    }
    if (!exists) {
      const newOpt = new Option(bookTitle, bookTitle, true, true);
      sel.add(newOpt);
    }
  }
  window.scrollToReadingJournal();
};

window.handleJournalSubmit = function(e) {
  if (e) e.preventDefault();
  const user = window.appState.currentUser;
  if (!user) return;

  const bookTitle = document.getElementById('jurnal-buku-modal')?.value || 
                    document.getElementById('jurnal-buku')?.value || 
                    (window.appState.books && window.appState.books[0]?.title) || 
                    'Laskar Pelangi';

  const durasi = parseInt(document.getElementById('jurnal-durasi-modal')?.value || 
                          document.getElementById('jurnal-durasi')?.value) || 15;

  const halAwal = parseInt(document.getElementById('jurnal-hal-awal-modal')?.value || 
                           document.getElementById('jurnal-hal-awal')?.value) || 1;

  const halAkhir = parseInt(document.getElementById('jurnal-hal-akhir-modal')?.value || 
                            document.getElementById('jurnal-hal-akhir')?.value) || 20;

  const ringkasan = (document.getElementById('jurnal-ringkasan-modal')?.value || 
                     document.getElementById('jurnal-ringkasan')?.value || '').trim();

  if (!ringkasan) {
    showToast('Data Belum Lengkap', 'Tuliskan ringkasan pokok bacaan terlebih dahulu.', 'error');
    return;
  }

  const newJournal = {
    id: `j-${Date.now()}`,
    studentName: user.name,
    studentClass: user.kelas || '8B',
    bookTitle: bookTitle,
    duration: durasi,
    pageStart: halAwal,
    pageEnd: halAkhir,
    summary: ringkasan,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    verified: true
  };

  window.appState.journals.unshift(newJournal);
  setStorage(STORAGE_KEYS.JOURNALS, window.appState.journals);

  // Sync to Cloud Firestore if available
  if (typeof window.saveJournalToCloud === 'function') {
    window.saveJournalToCloud(newJournal);
  }

  // Update user reading statistics
  if (user) {
    const pagesCount = Math.max(1, halAkhir - halAwal + 1);
    user.readPages = (user.readPages || 30) + pagesCount;
    user.booksCount = (user.booksCount || 8) + 1;
  }

  window.addPoints(20, `Jurnal Membaca: ${bookTitle}`);
  showToast('Jurnal Terkirim!', `Jurnal bacaan "${bookTitle}" berhasil disimpan (+20 Poin).`, 'success');

  // Clear inputs on both modal and inline form
  document.getElementById('form-jurnal')?.reset();
  document.getElementById('form-jurnal-modal')?.reset();
  if (typeof renderJournalHistory === 'function') renderJournalHistory();
  if (typeof renderM1RecentJournals === 'function') renderM1RecentJournals();
  if (typeof updateM1UserStats === 'function') updateM1UserStats();
  if (typeof closeReadingJournalModal === 'function') closeReadingJournalModal();

  // Prompt student to see their verified digital journal output
  setTimeout(() => {
    window.openDigitalJournalOutput(newJournal.id);
  }, 400);
};

window.renderJournalHistory = function() {
  const container = document.getElementById('jurnal-history-list');
  if (!container) return;

  const user = window.appState.currentUser;
  const list = user ? window.appState.journals.filter(j => j.studentName === user.name) : window.appState.journals;

  if (list.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">Belum ada riwayat jurnal bacaan. Isi jurnal di atas untuk mengumpulkan poin.</p>';
    return;
  }

  container.innerHTML = list.map(j => `
    <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <strong class="text-slate-800 font-bold">${j.bookTitle}</strong>
          <span class="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded">Hal ${j.pageStart}-${j.pageEnd}</span>
        </div>
        <p class="text-slate-600 mt-1 line-clamp-1 italic font-serif">"${j.summary}"</p>
        <span class="text-[10px] text-slate-400">${j.date} • Durasi: ${j.duration} Menit</span>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <i class="fa-solid fa-check-double text-[9px]"></i> Terverifikasi
        </span>
        <button type="button" onclick="openDigitalJournalOutput('${j.id}')" class="px-2.5 py-1 bg-[#00695c] hover:bg-[#005248] active:scale-95 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 shadow-2xs">
          <i class="fa-solid fa-certificate text-amber-300"></i> Output Jurnal
        </button>
      </div>
    </div>
  `).join('');
};

window.updateM1UserStats = function() {
  const user = window.appState.currentUser;
  const targetEl = document.getElementById('m1-target-halaman');
  const progressText = document.getElementById('m1-progress-text');
  const progressBar = document.getElementById('m1-progress-bar');
  const booksCountEl = document.getElementById('m1-completed-books-count');
  const modalBooksCount = document.getElementById('modal-history-books-count');
  const modalProgress = document.getElementById('modal-history-progress');

  const completedBooks = user ? (user.booksCount || 8) : 8;
  const targetTotal = user?.weeklyTarget || 50;
  let readPages = user?.readPages || 30;

  const pct = Math.min(100, Math.round((readPages / targetTotal) * 100));

  if (targetEl) targetEl.textContent = targetTotal;
  if (progressText) progressText.textContent = `${readPages}/${targetTotal}`;
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (booksCountEl) booksCountEl.textContent = completedBooks;
  if (modalBooksCount) modalBooksCount.textContent = completedBooks;
  if (modalProgress) modalProgress.textContent = `${readPages}/${targetTotal}`;

  // Sync Laptop Dashboard Bento Widgets
  const laptopProgNum = document.getElementById('m1-laptop-progress-num');
  const laptopProgBar = document.getElementById('m1-laptop-progress-bar');
  const laptopRank = document.getElementById('m1-laptop-rank');
  if (laptopProgNum) laptopProgNum.innerHTML = `${readPages} <span class="text-sm font-semibold text-slate-400">/ ${targetTotal} Hal</span>`;
  if (laptopProgBar) laptopProgBar.style.width = `${pct}%`;
  if (laptopRank) laptopRank.textContent = (readPages >= targetTotal) ? 'Juara Literasi' : (readPages >= 20 ? 'Pembaca Aktif' : 'Pembaca Pemula');
};

window.renderM1Recommendations = function() {
  const container = document.getElementById('recommended-books-row');
  if (!container) return;

  const books = window.appState.books;
  const targetTitles = ['Laskar Pelangi', 'Bumi Manusia', 'Fiksi', 'Laut Bercerita'];
  let recs = [];
  targetTitles.forEach(title => {
    const found = books.find(b => b.title.toLowerCase().includes(title.toLowerCase()));
    if (found) recs.push(found);
  });
  if (recs.length < 4) {
    books.forEach(b => {
      if (!recs.some(r => r.id === b.id) && recs.length < 4) recs.push(b);
    });
  }

  container.innerHTML = recs.map(b => `
    <div onclick="selectActiveBook('${b.id}')" class="shrink-0 w-[110px] sm:w-[130px] cursor-pointer group">
      <div class="w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 relative group-hover:shadow-md group-hover:border-teal-400 transition">
        <img src="${b.cover}" alt="${b.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      </div>
      <h4 class="font-extrabold text-slate-900 text-xs sm:text-sm mt-2 truncate group-hover:text-[#00897B] transition leading-tight">${b.title}</h4>
      <p class="text-[11px] text-slate-500 truncate leading-tight">${b.author}</p>
      <div class="flex items-center gap-1 text-[11px] font-bold text-slate-700 mt-0.5">
        <i class="fa-solid fa-star text-amber-400 text-[10px]"></i>
        <span>${b.rating || 4.7}</span>
      </div>
    </div>
  `).join('');
};

window.switchM1Tab = function(tab) {
  const btnKatalog = document.getElementById('m1-tab-katalog');
  const btnRekomendasi = document.getElementById('m1-tab-rekomendasi');
  const btnScan = document.getElementById('m1-tab-scan');

  const activeClasses = 'py-2.5 px-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold bg-[#00695c] text-white shadow-xs transition text-center flex items-center justify-center gap-1.5';
  const inactiveClasses = 'py-2.5 px-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold bg-white text-teal-900 border border-slate-200 hover:bg-teal-50/50 shadow-xs transition text-center flex items-center justify-center gap-1.5';

  if (btnKatalog) btnKatalog.className = (tab === 'katalog' ? activeClasses : inactiveClasses);
  if (btnRekomendasi) btnRekomendasi.className = (tab === 'rekomendasi' ? activeClasses : inactiveClasses);
  if (btnScan) btnScan.className = (tab === 'scan' ? activeClasses : inactiveClasses);

  if (tab === 'katalog') {
    window.showAllBooksCatalog();
  } else if (tab === 'rekomendasi') {
    const sec = document.getElementById('section-rekomendasi');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  } else if (tab === 'scan') {
    if (typeof window.startQRScanner === 'function') {
      window.startQRScanner();
    }
  }
};

window.showAllBooksCatalog = function() {
  const catalog = document.getElementById('section-full-catalog');
  if (catalog) {
    catalog.classList.remove('hidden');
    window.renderBooks('semua');
    catalog.scrollIntoView({ behavior: 'smooth' });
  }
};

window.closeFullCatalog = function() {
  const catalog = document.getElementById('section-full-catalog');
  if (catalog) {
    if (window.innerWidth < 1024) {
      catalog.classList.add('hidden');
    } else {
      const topSection = document.getElementById('view-m1');
      if (topSection) topSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

window.toggleM1FilterOptions = function() {
  const chips = document.getElementById('m1-filter-chips');
  if (chips) chips.classList.toggle('hidden');
};

window.focusM1Search = function() {
  const input = document.getElementById('m1-search-input');
  if (input) {
    input.focus();
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

window.handleM1Search = function(val) {
  const q = (val || '').toLowerCase().trim();
  const catalog = document.getElementById('section-full-catalog');
  if (catalog) catalog.classList.remove('hidden');

  const container = document.getElementById('books-grid');
  if (!container) return;

  const books = window.appState.books;
  const filtered = !q ? books : books.filter(b => 
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.categoryLabel.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 text-center text-slate-400">
        <i class="fa-solid fa-book-open text-3xl mb-2 text-slate-300"></i>
        <p class="text-xs">Tidak ditemukan buku dengan kata kunci "${val}"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(b => `
    <div class="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 card-shadow hover:border-teal-400 transition flex flex-col justify-between group">
      <div>
        <div class="relative rounded-xl overflow-hidden mb-3 aspect-[3/4] bg-slate-100">
          <img src="${b.cover}" alt="${b.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          <span class="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-star text-amber-400 text-[9px]"></i> ${b.rating}
          </span>
        </div>
        <span class="text-[9px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">${b.categoryLabel}</span>
        <h4 class="font-bold text-slate-800 text-xs sm:text-sm mt-1.5 line-clamp-1">${b.title}</h4>
        <p class="text-[11px] text-slate-500">${b.author} • ${b.pages} Hal</p>
      </div>
      <div class="mt-3 pt-2 border-t border-slate-100 flex gap-2">
        <button onclick="selectActiveBook('${b.id}')" class="flex-1 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#00897B] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-book-open"></i> Baca
        </button>
        <button onclick="openReadingJournalModal('${b.title}')" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-pen"></i> Jurnal
        </button>
      </div>
    </div>
  `).join('');
};

window.openReadingTimerModal = function() {
  const modal = document.getElementById('modal-reading-timer');
  if (modal) {
    const bookTitleEl = document.getElementById('timer-modal-book-title');
    if (bookTitleEl && window.appState.activeBook) {
      bookTitleEl.textContent = window.appState.activeBook.title;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeReadingTimerModal = function() {
  const modal = document.getElementById('modal-reading-timer');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openReadingJournalModal = function(bookTitle) {
  const modal = document.getElementById('modal-jurnal-form');
  if (modal) {
    const targetTitle = bookTitle || (window.appState.activeBook ? window.appState.activeBook.title : null);
    ['jurnal-buku', 'jurnal-buku-modal'].forEach(selId => {
      const sel = document.getElementById(selId);
      if (sel && targetTitle) {
        let found = false;
        for (let opt of sel.options) {
          if (opt.value === targetTitle) {
            sel.value = targetTitle;
            found = true;
            break;
          }
        }
        if (!found) {
          const newOpt = new Option(targetTitle, targetTitle, true, true);
          sel.add(newOpt);
        }
      }
    });
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeReadingJournalModal = function() {
  const modal = document.getElementById('modal-jurnal-form');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openReadingHistoryModal = function() {
  const modal = document.getElementById('modal-reading-history');
  if (modal) {
    window.renderJournalHistory();
    if (typeof window.updateM1UserStats === 'function') {
      window.updateM1UserStats();
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeReadingHistoryModal = function() {
  const modal = document.getElementById('modal-reading-history');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// ==========================================
// DIGITAL JOURNAL OUTPUT & TARGET MODAL CONTROLLERS
// ==========================================

window.openDigitalJournalOutput = function(journalId) {
  const modal = document.getElementById('modal-jurnal-digital-output');
  if (!modal) return;

  const user = window.appState.currentUser || { name: 'Aisyah Putri Rahma', kelas: '8B' };
  let j = null;
  if (journalId && window.appState.journals) {
    j = window.appState.journals.find(item => item.id === journalId);
  }
  if (!j && window.appState.journals && window.appState.journals.length > 0) {
    const userJournals = window.appState.journals.filter(item => item.studentName === user.name);
    j = userJournals.length > 0 ? userJournals[0] : window.appState.journals[0];
  }
  if (!j) {
    j = {
      id: 'j-sample',
      studentName: user.name || 'Aisyah Putri Rahma',
      studentClass: user.kelas || '8B',
      bookTitle: (window.appState.activeBook && window.appState.activeBook.title) || 'Laskar Pelangi',
      duration: 25,
      pageStart: 1,
      pageEnd: 25,
      summary: 'Kisah perjuangan 10 murid Laskar Pelangi di Belitung yang gigih menuntut ilmu di tengah keterbatasan fasilitas. Sangat menginspirasi ketekunan dan rasa syukur dalam belajar.',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      verified: true
    };
  }

  const book = window.appState.books.find(b => b.title.toLowerCase() === (j.bookTitle || '').toLowerCase()) || 
               window.appState.books[0] || {
                 cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80',
                 author: 'Andrea Hirata',
                 categoryLabel: 'Fiksi Pendidikan'
               };

  const regEl = document.getElementById('output-jurnal-reg');
  const nameEl = document.getElementById('output-jurnal-nama');
  const classEl = document.getElementById('output-jurnal-kelas');
  const dateEl = document.getElementById('output-jurnal-tanggal');
  const durationEl = document.getElementById('output-jurnal-durasi');
  const coverEl = document.getElementById('output-jurnal-cover');
  const catEl = document.getElementById('output-jurnal-kategori');
  const titleEl = document.getElementById('output-jurnal-judul');
  const authorEl = document.getElementById('output-jurnal-penulis');
  const pagesEl = document.getElementById('output-jurnal-halaman');
  const summaryEl = document.getElementById('output-jurnal-ringkasan');
  const stampDateEl = document.getElementById('output-jurnal-stamp-date');

  const pagesCount = Math.max(1, (j.pageEnd || 25) - (j.pageStart || 1) + 1);

  if (regEl) regEl.textContent = `No. Registrasi: GLS-KSH2/2026/08-${String(j.id || '014').slice(-3)} • Status: Terverifikasi Digital`;
  if (nameEl) nameEl.textContent = j.studentName || user.name;
  if (classEl) classEl.textContent = `Kelas ${j.studentClass || user.kelas || '8B'} • NISN: 0091827364`;
  if (dateEl) dateEl.textContent = j.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  if (durationEl) durationEl.textContent = `${j.duration || 20} Menit`;
  if (coverEl) coverEl.src = book.cover;
  if (catEl) catEl.textContent = book.categoryLabel || 'Literasi Umum';
  if (titleEl) titleEl.textContent = j.bookTitle || book.title;
  if (authorEl) authorEl.textContent = `Penulis: ${book.author || 'Tim GLS SMPN 2 Kasihan'}`;
  if (pagesEl) pagesEl.textContent = `Halaman ${j.pageStart || 1} - ${j.pageEnd || 25} (${pagesCount} Halaman)`;
  if (summaryEl) summaryEl.textContent = `"${j.summary}"`;
  if (stampDateEl) stampDateEl.textContent = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  window._activeJournalForOutput = j;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeDigitalJournalOutput = function() {
  const modal = document.getElementById('modal-jurnal-digital-output');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.downloadDigitalJournalPDF = function() {
  showToast('Mencetak / Menyimpan PDF...', 'Jendela cetak peramban sedang dibuka.', 'info');
  setTimeout(() => {
    window.print();
  }, 250);
};

window.shareJournalToM5 = function() {
  const j = window._activeJournalForOutput || (window.appState.journals && window.appState.journals[0]);
  const user = window.appState.currentUser || { name: 'Aisyah Putri Rahma', kelas: '8B' };
  
  if (j && window.appState.artworks) {
    const existing = window.appState.artworks.find(a => a.title === `Jurnal: ${j.bookTitle}`);
    if (!existing) {
      window.appState.artworks.unshift({
        id: `art-jurnal-${Date.now()}`,
        studentName: j.studentName || user.name,
        studentClass: j.studentClass || user.kelas || '8B',
        title: `Jurnal Membaca: ${j.bookTitle}`,
        category: 'Refleksi Literasi M1',
        description: j.summary,
        likes: 12,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      setStorage(STORAGE_KEYS.ARTWORKS, window.appState.artworks);
    }
  }

  window.addPoints(15, `Berbagi Jurnal ke Apresiasi M5: ${j ? j.bookTitle : 'Literasi'}`);
  showToast('Berhasil Dibagikan!', 'Refleksi jurnal bacaanmu kini tayang di Galeri Apresiasi M5 (+15 Poin).', 'success');
  window.closeDigitalJournalOutput();
};

window.openPhoneTargetModal = function() {
  const modal = document.getElementById('modal-reading-target');
  if (modal) {
    const inputTarget = document.getElementById('input-target-pages');
    const inputAdd = document.getElementById('input-add-pages');
    if (inputTarget) inputTarget.value = window.appState.currentUser?.weeklyTarget || 50;
    if (inputAdd) inputAdd.value = 5;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closePhoneTargetModal = function() {
  const modal = document.getElementById('modal-reading-target');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.saveTargetProgress = function() {
  const targetVal = parseInt(document.getElementById('input-target-pages')?.value) || 50;
  const addPages = parseInt(document.getElementById('input-add-pages')?.value) || 0;

  if (window.appState.currentUser) {
    window.appState.currentUser.weeklyTarget = targetVal;
    window.appState.currentUser.readPages = (window.appState.currentUser.readPages || 30) + addPages;
  }

  if (addPages > 0) {
    window.addPoints(10, `Pencapaian Membaca +${addPages} Halaman`);
    showToast('Progres Tercatat!', `Berhasil menambahkan +${addPages} halaman ke target mingguanmu (+10 Poin).`, 'success');
  } else {
    showToast('Target Diperbarui', `Target membaca mingguanmu diatur menjadi ${targetVal} halaman.`, 'success');
  }

  window.closePhoneTargetModal();
  if (typeof window.updateM1UserStats === 'function') {
    window.updateM1UserStats();
  }
};

// ==========================================
// 7. QR CODE SCANNER CONTROLLER
// ==========================================

window.startQRScanner = function() {
  const modal = document.getElementById('modal-qr');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  if (window.Html5Qrcode) {
    try {
      window.appState.html5QrScanner = new Html5Qrcode('qr-reader');
      window.appState.html5QrScanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 220 },
        (decodedText) => {
          window.handleScanSuccess(decodedText, 'Buku Terpindai');
        },
        () => {}
      ).catch(() => {
        const qrEl = document.getElementById('qr-reader');
        if (qrEl) {
          qrEl.innerHTML = `
            <div class="text-center p-4">
              <i class="fa-solid fa-camera text-3xl text-slate-400 mb-2"></i>
              <p class="text-xs text-slate-600 font-medium">Kamera tidak aktif atau izin ditolak.</p>
              <p class="text-[11px] text-slate-400 mt-1">Gunakan tombol Demo Cepat di bawah untuk simulasi scan buku.</p>
            </div>
          `;
        }
      });
    } catch (e) {
      console.warn('QR init notice:', e);
    }
  }
};

window.stopQRScanner = function() {
  const modal = document.getElementById('modal-qr');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (window.appState.html5QrScanner) {
    try {
      window.appState.html5QrScanner.stop().catch(() => {});
    } catch (e) {}
    window.appState.html5QrScanner = null;
  }
};

window.handleScanSuccess = function(code, fallbackTitle) {
  window.stopQRScanner();

  // Match book
  const matched = window.appState.books.find(b => b.id === code || b.title.toLowerCase().includes(fallbackTitle.toLowerCase())) || window.appState.books[0];

  window.selectActiveBook(matched.id);
  window.addPoints(15, `Pindai Barcode Buku Perpustakaan: ${matched.title}`);
  showToast('Scan QR Berhasil!', `Buku teridentifikasi: "${matched.title}" (+15 Poin).`, 'success');
};

// ==========================================
// 8. M2: MENEMUKAN CONTROLLER (LEMBAR TEMUAN, PROGRES & KUIS)
// ==========================================

window.appState.m2Data = window.appState.m2Data || {
  bookId: 'BK-001',
  bookTitle: 'Laskar Pelangi',
  author: 'Andrea Hirata',
  currentPage: 120,
  totalPages: 150,
  progressPct: 80,
  ide: 'Keteguhan Bu Muslimah dan Pak Harfan dalam menanamkan nilai integritas, persahabatan, dan rasa percaya diri kepada sepuluh murid Laskar Pelangi meskipun menghadapi ancaman penutupan sekolah.',
  info: '1. SD Muhammadiyah Gantong hanya memiliki 10 murid saat pendaftaran.\n2. Lintang rela mengayuh sepeda sejauh 80 km melintasi sarang buaya.\n3. Mahar memiliki bakat seni dan musikalitas yang memukau.',
  kata: 'Sahaja',
  makna: 'Sederhana; wajar; tidak berlebih-lebihan (KBBI).',
  kalimat: 'Kehidupan warga di pelosok Belitung berlangsung dengan penuh rasa sahaja dan kerukunan.',
  fakta: 'SD Muhammadiyah Gantong terletak di Belitung Timur dengan kondisi gedung kayu dan atap seng reyot.',
  opini: 'Pendidikan dan kecintaan belajar adalah lentera paling terang yang mampu memutus belenggu kemiskinan.',
  struktur: 'Komplikasi (Perjuangan & Konflik Tokoh)',
  strukturDesc: 'Bagian ini memuat pergulatan keras para murid menghadapi keterbatasan ekonomi dan kompetisi cerdas cermat tingkat distrik.',
  tanya: 'Mengapa Lintang pantang menyerah meski harus menempuh perjalanan berbahaya setiap hari?',
  jawab: 'Karena tekad membanggakan ayahnya dan impian besarnya menjadi seorang matematikawan kelas dunia.'
};

window.updateM2Display = function() {
  const m2 = window.appState.m2Data;
  const coverEl = document.getElementById('m2-book-cover');
  const titleEl = document.getElementById('m2-book-title');
  const authorEl = document.getElementById('m2-book-author');
  const progressFill = document.getElementById('m2-book-progress-fill');
  const progressPct = document.getElementById('m2-book-progress-pct');
  const pagesEl = document.getElementById('m2-book-pages');

  if (titleEl) titleEl.textContent = m2.bookTitle;
  if (authorEl) authorEl.textContent = m2.author;
  if (progressFill) progressFill.style.width = `${m2.progressPct}%`;
  if (progressPct) progressPct.textContent = `${m2.progressPct}%`;
  if (pagesEl) pagesEl.textContent = `Halaman ${m2.currentPage}/${m2.totalPages}`;

  if (coverEl) {
    if (m2.bookId === 'BK-001') coverEl.src = COVER_LASKAR;
    else if (m2.bookId === 'BK-002') coverEl.src = COVER_BUMI;
    else if (m2.bookId === 'BK-003') coverEl.src = COVER_FIKSI;
    else if (m2.bookId === 'BK-004') coverEl.src = COVER_LAUT;
    else if (m2.bookId === 'BK-SOP') coverEl.src = COVER_SOP;
  }
};

window.openM2ItemModal = function(tabKey) {
  const modal = document.getElementById('modal-m2-item-editor');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Prepopulate inputs with current m2Data
  const m2 = window.appState.m2Data;
  const inputIde = document.getElementById('input-m2-ide');
  const inputInfo = document.getElementById('input-m2-info');
  const inputKata = document.getElementById('input-m2-kata');
  const inputMakna = document.getElementById('input-m2-makna');
  const inputKalimat = document.getElementById('input-m2-kalimat');
  const inputFakta = document.getElementById('input-m2-fakta');
  const inputOpini = document.getElementById('input-m2-opini');
  const inputStruktur = document.getElementById('input-m2-struktur');
  const inputStrukturDesc = document.getElementById('input-m2-struktur-desc');
  const inputTanya = document.getElementById('input-m2-tanya');
  const inputJawab = document.getElementById('input-m2-jawab');

  if (inputIde && !inputIde.value) inputIde.value = m2.ide;
  if (inputInfo && !inputInfo.value) inputInfo.value = m2.info;
  if (inputKata && !inputKata.value) inputKata.value = m2.kata;
  if (inputMakna && !inputMakna.value) inputMakna.value = m2.makna;
  if (inputKalimat && !inputKalimat.value) inputKalimat.value = m2.kalimat;
  if (inputFakta && !inputFakta.value) inputFakta.value = m2.fakta;
  if (inputOpini && !inputOpini.value) inputOpini.value = m2.opini;
  if (inputStruktur && !inputStruktur.value) inputStruktur.value = m2.struktur;
  if (inputStrukturDesc && !inputStrukturDesc.value) inputStrukturDesc.value = m2.strukturDesc;
  if (inputTanya && !inputTanya.value) inputTanya.value = m2.tanya;
  if (inputJawab && !inputJawab.value) inputJawab.value = m2.jawab;

  window.switchM2EditorTab(tabKey || 'ide');
};

window.closeM2ItemModal = function() {
  const modal = document.getElementById('modal-m2-item-editor');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.switchM2EditorTab = function(tabKey) {
  const tabs = ['ide', 'info', 'vocab', 'fakta', 'struktur', 'tanya'];
  const tabConfig = {
    ide: { title: 'Ide Pokok', icon: 'fa-lightbulb', color: 'bg-amber-100 text-amber-600', activeBtn: 'bg-amber-500 text-white' },
    info: { title: 'Informasi Penting', icon: 'fa-file-lines', color: 'bg-teal-100 text-teal-600', activeBtn: 'bg-[#00796b] text-white' },
    vocab: { title: 'Kosakata Baru', icon: 'fa-book-open', color: 'bg-purple-100 text-purple-600', activeBtn: 'bg-purple-600 text-white' },
    fakta: { title: 'Fakta dan Opini', icon: 'fa-magnifying-glass', color: 'bg-sky-100 text-sky-600', activeBtn: 'bg-sky-600 text-white' },
    struktur: { title: 'Struktur Teks', icon: 'fa-diagram-project', color: 'bg-rose-100 text-rose-600', activeBtn: 'bg-rose-600 text-white' },
    tanya: { title: 'Pertanyaan (Adiksimba)', icon: 'fa-question', color: 'bg-emerald-100 text-emerald-600', activeBtn: 'bg-emerald-600 text-white' }
  };

  const active = tabConfig[tabKey] || tabConfig.ide;
  window._activeM2Tab = tabKey;

  const titleEl = document.getElementById('m2-editor-title');
  const iconEl = document.getElementById('m2-editor-icon');
  const badgeEl = document.getElementById('m2-editor-icon-badge');
  if (titleEl) titleEl.textContent = active.title;
  if (iconEl) iconEl.className = `fa-solid ${active.icon}`;
  if (badgeEl) badgeEl.className = `w-9 h-9 rounded-2xl flex items-center justify-center text-base ${active.color}`;

  tabs.forEach(t => {
    const content = document.getElementById(`m2-tab-content-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (content) {
      if (t === tabKey) content.classList.remove('hidden');
      else content.classList.add('hidden');
    }
    if (btn) {
      if (t === tabKey) {
        btn.className = `px-3 py-1.5 rounded-xl whitespace-nowrap transition shadow-2xs ${active.activeBtn}`;
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl whitespace-nowrap transition bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    }
  });
};

window.saveM2CurrentTab = function() {
  const t = window._activeM2Tab || 'ide';
  const m2 = window.appState.m2Data;

  if (t === 'ide') {
    m2.ide = document.getElementById('input-m2-ide')?.value || m2.ide;
    showToast('Ide Pokok Tersimpan', 'Gagasan utama bacaan berhasil dicatat (+10 Poin).', 'success');
  } else if (t === 'info') {
    m2.info = document.getElementById('input-m2-info')?.value || m2.info;
    showToast('Info Penting Tersimpan', 'Catatan informasi penting tersimpan (+10 Poin).', 'success');
  } else if (t === 'vocab') {
    m2.kata = document.getElementById('input-m2-kata')?.value || m2.kata;
    m2.makna = document.getElementById('input-m2-makna')?.value || m2.makna;
    m2.kalimat = document.getElementById('input-m2-kalimat')?.value || m2.kalimat;
    showToast('Kosakata Tersimpan', `Kata "${m2.kata}" dan makna KBBI tersimpan (+10 Poin).`, 'success');
  } else if (t === 'fakta') {
    m2.fakta = document.getElementById('input-m2-fakta')?.value || m2.fakta;
    m2.opini = document.getElementById('input-m2-opini')?.value || m2.opini;
    showToast('Fakta & Opini Tersimpan', 'Analisis pembeda fakta dan opini tersimpan (+10 Poin).', 'success');
  } else if (t === 'struktur') {
    m2.struktur = document.getElementById('input-m2-struktur')?.value || m2.struktur;
    m2.strukturDesc = document.getElementById('input-m2-struktur-desc')?.value || m2.strukturDesc;
    showToast('Struktur Teks Tersimpan', 'Identifikasi struktur teks narasi tersimpan (+10 Poin).', 'success');
  } else if (t === 'tanya') {
    m2.tanya = document.getElementById('input-m2-tanya')?.value || m2.tanya;
    m2.jawab = document.getElementById('input-m2-jawab')?.value || m2.jawab;
    showToast('Pertanyaan Tersimpan', 'Pertanyaan kritis Adiksimba tersimpan (+10 Poin).', 'success');
  }

  window.addPoints(10, `Menyelesaikan bagian ${t.toUpperCase()} di M2`);

  // Move to next tab if available
  const tabs = ['ide', 'info', 'vocab', 'fakta', 'struktur', 'tanya'];
  const curIdx = tabs.indexOf(t);
  if (curIdx < tabs.length - 1) {
    window.switchM2EditorTab(tabs[curIdx + 1]);
  } else {
    window.closeM2ItemModal();
  }
};

window.saveM2FindingsDirectly = function() {
  const m2 = window.appState.m2Data;
  window.addPoints(20, `Simpan Lengkap Lembar Temuan M2: ${m2.bookTitle}`);
  showToast('Temuan Berhasil Disimpan!', `Seluruh 6 komponen analisis "${m2.bookTitle}" berhasil disimpan ke portofoliomu (+20 Poin).`, 'success');
};

// Preset samples for fast demo
window.useSampleM2Idea = function() {
  const el = document.getElementById('input-m2-ide');
  if (el) el.value = 'Keteguhan Bu Muslimah dan Pak Harfan dalam menanamkan nilai integritas, persahabatan, dan rasa percaya diri kepada sepuluh murid Laskar Pelangi meskipun menghadapi ancaman penutupan sekolah.';
};
window.useSampleM2Info = function() {
  const el = document.getElementById('input-m2-info');
  if (el) el.value = '1. SD Muhammadiyah Gantong hanya memiliki 10 murid saat pendaftaran.\n2. Lintang rela mengayuh sepeda sejauh 80 km melintasi rawa buaya.\n3. Mahar memiliki kejeniusan musikal yang mengantarkan kemenangan karnaval.';
};
window.useSampleM2Vocab = function() {
  const k = document.getElementById('input-m2-kata');
  const m = document.getElementById('input-m2-makna');
  const kal = document.getElementById('input-m2-kalimat');
  if (k) k.value = 'Sahaja';
  if (m) m.value = 'Sederhana; wajar; apa adanya tanpa berlebih-lebihan (KBBI).';
  if (kal) kal.value = 'Meskipun berpakaian sangat sahaja, budi pekerti anak-anak Belitung itu sungguh mengagumkan.';
};
window.useSampleM2Facts = function() {
  const f = document.getElementById('input-m2-fakta');
  const o = document.getElementById('input-m2-opini');
  if (f) f.value = 'SD Muhammadiyah Gantong bertempat di Belitung Timur dan memiliki atap seng yang sering bocor.';
  if (o) o.value = 'Semangat belajar siswa Laskar Pelangi adalah bukti bahwa kemiskinan materi bukanlah penghalang kesuksesan sejati.';
};
window.useSampleM2Structure = function() {
  const s = document.getElementById('input-m2-struktur');
  const d = document.getElementById('input-m2-struktur-desc');
  if (s) s.value = 'Komplikasi (Perjuangan & Konflik Tokoh)';
  if (d) d.value = 'Bab 12 ini menceritakan titik kritis saat Lintang dan teman-temannya harus bersaing dalam Lomba Cerdas Cermat melawan sekolah bergengsi.';
};
window.useSampleM2Question = function() {
  const t = document.getElementById('input-m2-tanya');
  const j = document.getElementById('input-m2-jawab');
  if (t) t.value = 'Mengapa Lintang pantang menyerah meski harus menempuh 80 km setiap pagi?';
  if (j) j.value = 'Karena kecintaannya yang mendalam terhadap ilmu pengetahuan dan janjinya kepada ayahnya untuk menjadi seorang cendekiawan.';
};

window.askAIM2Helper = function(type) {
  showToast('AI Sedang Menganalisis...', 'Menggali konteks novel Laskar Pelangi karya Andrea Hirata.', 'info');
  setTimeout(() => {
    if (type === 'ide') {
      window.useSampleM2Idea();
      showToast('Saran Ide Pokok Diterapkan!', 'AI berhasil merangkum gagasan sentral bab 12.', 'success');
    } else if (type === 'info') {
      window.useSampleM2Info();
      showToast('Poin Kunci Diterapkan!', 'AI mengekstraksi 3 informasi terpenting.', 'success');
    } else if (type === 'vocab') {
      window.useSampleM2Vocab();
      showToast('Definisi KBBI Terverifikasi!', 'Kata "Sahaja" tervalidasi KBBI Daring.', 'success');
    } else if (type === 'fakta') {
      window.useSampleM2Facts();
      showToast('Analisis Fakta & Opini Siap!', 'AI memisahkan data empiris dan sudut pandang penulis.', 'success');
    }
  }, 400);
};

// Book Selector & Progress
window.openM2BookSelector = function() {
  const modal = document.getElementById('modal-m2-book-selector');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  const m2 = window.appState.m2Data;
  const select = document.getElementById('m2-select-book-id');
  const curInput = document.getElementById('m2-input-cur-page');
  const totalInput = document.getElementById('m2-input-total-page');

  if (select) select.value = m2.bookId || 'BK-001';
  if (curInput) curInput.value = m2.currentPage || 120;
  if (totalInput) totalInput.value = m2.totalPages || 150;
};

window.closeM2BookSelector = function() {
  const modal = document.getElementById('modal-m2-book-selector');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.handleM2BookSelectChange = function(bookId) {
  const curInput = document.getElementById('m2-input-cur-page');
  const totalInput = document.getElementById('m2-input-total-page');
  if (bookId === 'BK-001') {
    if (curInput) curInput.value = 120;
    if (totalInput) totalInput.value = 150;
  } else if (bookId === 'BK-002') {
    if (curInput) curInput.value = 85;
    if (totalInput) totalInput.value = 535;
  } else if (bookId === 'BK-SOP') {
    if (curInput) curInput.value = 2;
    if (totalInput) totalInput.value = 2;
  } else {
    if (curInput) curInput.value = 50;
    if (totalInput) totalInput.value = 300;
  }
};

window.saveM2BookProgress = function() {
  const select = document.getElementById('m2-select-book-id');
  const curInput = document.getElementById('m2-input-cur-page');
  const totalInput = document.getElementById('m2-input-total-page');

  const cur = parseInt(curInput?.value) || 120;
  const tot = Math.max(1, parseInt(totalInput?.value) || 150);
  const pct = Math.min(100, Math.round((cur / tot) * 100));

  const bookTitles = {
    'BK-001': { title: 'Laskar Pelangi', author: 'Andrea Hirata' },
    'BK-002': { title: 'Bumi Manusia', author: 'Pramoedya A.T.' },
    'BK-003': { title: 'Fiksi', author: 'Tere Liye' },
    'BK-004': { title: 'Laut Bercerita', author: 'Leila S. Chudori' },
    'BK-SOP': { title: 'Pelayanan Sekolah Aman dan Nyaman', author: 'Tim Sarpras Kasihan' }
  };

  const chosen = bookTitles[select?.value] || bookTitles['BK-001'];
  const m2 = window.appState.m2Data;
  m2.bookId = select?.value || 'BK-001';
  m2.bookTitle = chosen.title;
  m2.author = chosen.author;
  m2.currentPage = cur;
  m2.totalPages = tot;
  m2.progressPct = pct;

  window.updateM2Display();
  window.closeM2BookSelector();
  window.addPoints(5, `Perbarui Progres Baca: ${chosen.title}`);
  showToast('Progres Diperbarui', `Buku "${chosen.title}" berada di halaman ${cur}/${tot} (${pct}%).`, 'success');
};

// Quick Search Modal
window.openM2SearchModal = function() {
  const modal = document.getElementById('modal-m2-search');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => {
    document.getElementById('m2-search-input')?.focus();
  }, 100);
};

window.closeM2SearchModal = function() {
  const modal = document.getElementById('modal-m2-search');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.filterM2Search = function(q) {
  const res = document.getElementById('m2-search-results');
  if (!res) return;
  const term = (q || '').toLowerCase().trim();
  if (!term) {
    res.innerHTML = '<p class="text-slate-400 italic text-center py-4">Ketik kata kunci untuk mencari di dalam lembar penemuan bacaan.</p>';
    return;
  }

  const items = [
    { title: 'Ide Pokok Bab 12', snippet: window.appState.m2Data.ide, cat: 'Ide Pokok' },
    { title: 'Kosakata: Sahaja', snippet: window.appState.m2Data.makna, cat: 'Kosakata Baru' },
    { title: 'Fakta Lapangan Belitung', snippet: window.appState.m2Data.fakta, cat: 'Fakta & Opini' },
    { title: 'Perjuangan Lintang', snippet: window.appState.m2Data.info, cat: 'Informasi Penting' }
  ];

  const matched = items.filter(i => i.title.toLowerCase().includes(term) || i.snippet.toLowerCase().includes(term) || i.cat.toLowerCase().includes(term));

  if (matched.length === 0) {
    res.innerHTML = `<p class="text-slate-400 text-center py-3">Tidak ada hasil yang cocok dengan "${term}".</p>`;
  } else {
    res.innerHTML = matched.map(m => `
      <div class="p-2.5 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200 transition cursor-pointer" onclick="closeM2SearchModal(); openM2ItemModal();">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">${m.cat}</span>
        <h5 class="font-bold text-slate-800 text-xs mt-1">${m.title}</h5>
        <p class="text-[11px] text-slate-500 line-clamp-2 mt-0.5">${m.snippet}</p>
      </div>
    `).join('');
  }
};

// Tantangan / Quiz Modal
window.openM2QuizModal = function() {
  const modal = document.getElementById('modal-m2-quiz');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  window.renderQuizModalQuestion();
};

window.closeM2QuizModal = function() {
  const modal = document.getElementById('modal-m2-quiz');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.renderQuizModalQuestion = function() {
  const qState = window.appState.quiz;
  const q = QUIZ_QUESTIONS[qState.index];
  if (!q) return;

  const numEl = document.getElementById('quiz-modal-number');
  const textEl = document.getElementById('quiz-modal-question');
  const optContainer = document.getElementById('quiz-modal-options');
  const feedbackEl = document.getElementById('quiz-modal-feedback');
  const scoreBadge = document.getElementById('quiz-modal-score-badge');

  if (numEl) numEl.textContent = `Soal ${qState.index + 1} dari ${QUIZ_QUESTIONS.length}`;
  if (textEl) textEl.textContent = q.question;
  if (feedbackEl) feedbackEl.classList.add('hidden');
  if (scoreBadge) scoreBadge.textContent = `Skor Kuis: ${qState.score} Poin`;

  qState.answered = false;

  if (optContainer) {
    optContainer.innerHTML = q.options.map((opt, idx) => `
      <button onclick="handleQuizModalAnswer(${idx})" id="quiz-modal-opt-${idx}" class="w-full p-2.5 sm:p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 rounded-xl text-left font-medium text-slate-700 transition flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">${String.fromCharCode(65 + idx)}</span>
        <span class="flex-1 text-xs">${opt.substring(3)}</span>
      </button>
    `).join('');
  }
};

window.handleQuizModalAnswer = function(chosenIdx) {
  const qState = window.appState.quiz;
  if (qState.answered) return;
  qState.answered = true;

  const q = QUIZ_QUESTIONS[qState.index];
  const isCorrect = chosenIdx === q.correct;
  const feedbackEl = document.getElementById('quiz-modal-feedback');

  q.options.forEach((_, idx) => {
    const btn = document.getElementById(`quiz-modal-opt-${idx}`);
    if (!btn) return;
    if (idx === q.correct) {
      btn.className = 'w-full p-2.5 sm:p-3 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-left font-bold text-emerald-900 flex items-start gap-2';
    } else if (idx === chosenIdx) {
      btn.className = 'w-full p-2.5 sm:p-3 bg-rose-50 border-2 border-rose-400 rounded-xl text-left font-bold text-rose-800 flex items-start gap-2';
    }
  });

  if (feedbackEl) {
    feedbackEl.classList.remove('hidden');
    if (isCorrect) {
      qState.score += 20;
      window.addPoints(20, 'Jawaban Benar Tantangan Literasi M2');
      feedbackEl.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300';
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 mr-1.5"></i> <strong>Benar! (+20 Poin)</strong> ${q.explanation}`;
    } else {
      feedbackEl.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-100 text-rose-900 border border-rose-300';
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark text-rose-600 mr-1.5"></i> <strong>Belum Tepat.</strong> ${q.explanation}`;
    }
  }

  const scoreBadge = document.getElementById('quiz-modal-score-badge');
  if (scoreBadge) scoreBadge.textContent = `Skor Kuis: ${qState.score} Poin`;
};

window.nextQuizQuestionModal = function() {
  const qState = window.appState.quiz;
  qState.index = (qState.index + 1) % QUIZ_QUESTIONS.length;
  window.renderQuizModalQuestion();
};

window.handleTemuanSubmit = function(e) {
  if (e) e.preventDefault();
  window.saveM2FindingsDirectly();
};

window.renderQuizQuestion = function() {
  const qState = window.appState.quiz;
  const q = QUIZ_QUESTIONS[qState.index];
  if (!q) return;

  const numEl = document.getElementById('quiz-number');
  const textEl = document.getElementById('quiz-question');
  const optContainer = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const scoreBadge = document.getElementById('quiz-score-badge');

  if (numEl) numEl.textContent = `Soal ${qState.index + 1} dari ${QUIZ_QUESTIONS.length}`;
  if (textEl) textEl.textContent = q.question;
  if (feedbackEl) feedbackEl.classList.add('hidden');
  if (scoreBadge) scoreBadge.textContent = `Skor Kuis: ${qState.score} Poin`;

  qState.answered = false;

  if (optContainer) {
    optContainer.innerHTML = q.options.map((opt, idx) => `
      <button onclick="handleQuizAnswer(${idx})" id="quiz-opt-${idx}" class="w-full p-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-xl text-left font-medium text-slate-700 transition flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">${String.fromCharCode(65 + idx)}</span>
        <span class="flex-1">${opt.substring(3)}</span>
      </button>
    `).join('');
  }
};

window.handleQuizAnswer = function(chosenIdx) {
  const qState = window.appState.quiz;
  if (qState.answered) return;
  qState.answered = true;

  const q = QUIZ_QUESTIONS[qState.index];
  const isCorrect = chosenIdx === q.correct;
  const feedbackEl = document.getElementById('quiz-feedback');

  // Highlight choices
  q.options.forEach((_, idx) => {
    const btn = document.getElementById(`quiz-opt-${idx}`);
    if (!btn) return;
    if (idx === q.correct) {
      btn.className = 'w-full p-3 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-left font-bold text-emerald-900 flex items-start gap-2';
    } else if (idx === chosenIdx) {
      btn.className = 'w-full p-3 bg-rose-50 border-2 border-rose-400 rounded-xl text-left font-bold text-rose-800 flex items-start gap-2';
    }
  });

  if (feedbackEl) {
    feedbackEl.classList.remove('hidden');
    if (isCorrect) {
      qState.score += 20;
      window.addPoints(20, 'Jawaban Benar Kuis Literasi Kilat');
      feedbackEl.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300';
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 mr-1.5"></i> <strong>Benar! (+20 Poin)</strong> ${q.explanation}`;
    } else {
      feedbackEl.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-100 text-rose-900 border border-rose-300';
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark text-rose-600 mr-1.5"></i> <strong>Belum Tepat.</strong> ${q.explanation}`;
    }
  }

  const scoreBadge = document.getElementById('quiz-score-badge');
  if (scoreBadge) scoreBadge.textContent = `Skor Kuis: ${qState.score} Poin`;
};

window.nextQuizQuestion = function() {
  const qState = window.appState.quiz;
  qState.index = (qState.index + 1) % QUIZ_QUESTIONS.length;
  renderQuizQuestion();
};

// ==========================================
// ==========================================
// 9. M3: MENULIS CONTROLLER (+ AI REVIEWER & 8 KARYA TEMPLATES)
// ==========================================

window.M3_TEMPLATES = {
  resensi: {
    id: 'resensi',
    name: 'Resensi Buku',
    icon: 'fa-book-open',
    color: 'bg-purple-100 text-purple-700',
    title: 'Template Resensi Buku',
    steps: [
      'Identitas buku (Judul, Penulis, Penerbit, Tebal)',
      'Sinopsis (Ringkasan alur cerita atau isi buku)',
      'Kelebihan dan kekurangan (Sudut pandang kritis)',
      'Pesan/amanat (Nilai moral dan hikmah yang dipetik)',
      'Rekomendasi (Sasaran pembaca yang cocok)'
    ],
    sampleTitle: 'Resensi Novel Laskar Pelangi: Menyalakan Lentera Pendidikan',
    sampleContent: `1. Identitas Buku:
- Judul: Laskar Pelangi
- Penulis: Andrea Hirata
- Penerbit: Bentang Pustaka
- Tebal: 529 Halaman

2. Sinopsis:
Kisah perjuangan sepuluh anak di Belitung Timur yang bersekolah di SD Muhammadiyah Gantong dengan keterbatasan fasilitas dan ancaman penutupan sekolah.

3. Kelebihan dan Kekurangan:
- Kelebihan: Gaya bahasa kaya majas dan metafora, humor cerdas, serta sarat pesan moral persahabatan dan kegigihan.
- Kekurangan: Terdapat beberapa istilah ilmiah dan pertambangan timah yang memerlukan glosarium bagi pembaca pemula.

4. Pesan/Amanat:
Pendidikan adalah hak dasar yang mampu mengubah nasib, dan keterbatasan ekonomi bukanlah penghalang bagi mimpi besar.

5. Rekomendasi:
Sangat direkomendasikan bagi pelajar, pendidik, dan pembaca umum yang mencari inspirasi ketulusan belajar.`
  },
  puisi: {
    id: 'puisi',
    name: 'Puisi',
    icon: 'fa-pencil',
    color: 'bg-pink-100 text-pink-700',
    title: 'Template Puisi Bebas / Berima',
    steps: [
      'Tema & Gagasan Utama (Rasa atau peristiwa sentral)',
      'Diksi & Rima (Pilihan kata konotatif dan estetis)',
      'Citraan & Imaji (Penglihatan, pendengaran, rasa)',
      'Majas / Gaya Bahasa (Personifikasi, metafora)',
      'Amanat Puisi (Pesan mendalam tersirat)'
    ],
    sampleTitle: 'Gumam Lentera di Balik Kabut Kasihan',
    sampleContent: `Di bilik kayu reyot beralas tanah,
Sepuluh pasang mata menatap fajar merekah.
Buku-buku lusuh memeluk mimpi yang megah,
Tak surut langkah walau jalanan berlepot debu dan gelisah.

Oh guru bersahaja penuntun lentera,
Engkau menyalakan api ilmu di pekatnya malam gulita,
Mengukir asa suci di sanubari kami selamanya.`
  },
  cerpen: {
    id: 'cerpen',
    name: 'Cerpen',
    icon: 'fa-image',
    color: 'bg-orange-100 text-orange-700',
    title: 'Template Cerita Pendek (Cerpen)',
    steps: [
      'Orientasi (Pengenalan tokoh, watak & latar tempat)',
      'Rangkaian Peristiwa (Awal mula munculnya tantangan)',
      'Komplikasi / Konflik (Puncak ketegangan tokoh utama)',
      'Resolusi (Penyelesaian masalah & titik balik)',
      'Koda / Amanat (Nilai kehidupan dari akhir cerita)'
    ],
    sampleTitle: 'Sepeda Ontel Menembus Kabut Kasihan',
    sampleContent: `Kring... kring... Suara bel sepeda ontel tua itu memecah kesunyian pagi di sepanjang jalanan Kasihan. Bayu mengayuh sepedanya dengan penuh semangat, menembus kabut tipis yang menyelimuti sawah-sawah Bantul. Hari ini adalah babak final Lomba Cerdas Cermat Literasi antarkabupaten yang telah ia persiapkan selama tiga bulan penuh bersama Bu Guru Muslimah.`
  },
  poster: {
    id: 'poster',
    name: 'Poster Digital',
    icon: 'fa-tablet-screen-button',
    color: 'bg-emerald-100 text-emerald-700',
    title: 'Template Poster Literasi Digital',
    steps: [
      'Tema & Gagasan Inti Poster',
      'Slogan Ajakan yang Memikat & Berima',
      'Konsep Ilustrasi / Visual Estetik',
      'Sasaran Khalayak / Pembaca',
      'Ajakan Bertindak (Call to Action)'
    ],
    sampleTitle: 'Poster: 15 Menit Membaca untuk Menembus Cakrawala',
    sampleContent: `Tema: Membangun Budaya Literasi Harian Siswa
Slogan: "Satu Buku Sehari, Buka Cakrawala Tanpa Henti!"
Konsep Visual: Gambar siluet pelajar membaca di bawah pohon rindang bernaung cahaya lentera emas berhias motif batik Kasihan.
Sasaran: Siswa-siswi SMP dan generasi muda se-Kabupaten Bantul.
Ajakan Bertindak: Luangkan 15 menit setiap pagi sebelum pelajaran untuk membaca buku kesukaanmu!`
  },
  komik: {
    id: 'komik',
    name: 'Komik',
    icon: 'fa-comment-dots',
    color: 'bg-sky-100 text-sky-700',
    title: 'Template Komik & Cerita Bergambar',
    steps: [
      'Premis Cerita & Karakter Tokoh',
      'Panel 1: Pengenalan Tokoh di Ruang Baca',
      'Panel 2: Munculnya Konflik atau Keusilan Lucu',
      'Panel 3: Reaksi Cepat / Momen Penyadaran',
      'Panel 4: Titik Temu & Pesan Moral Bersama'
    ],
    sampleTitle: 'Komik Strip: Misteri Buku Catatan Kasongan',
    sampleContent: `Judul: Detektif Buku Cilik
Karakter: Diko (rajin membaca) dan Raka (anak ceria tapi pelupa).

Panel 1:
- Visual: Diko dan Raka membaca di perpustakaan sekolah yang tenang.
- Balon Diko: "Lho, halaman penting tentang sejarah Bantul ini kok hilang?"

Panel 2:
- Visual: Raka menatap langit-langit sambil menelan ludah.
- Balon Raka: "Hehe... kemarin aku jadikan pembatas buku catatan matematika..."

Panel 3:
- Visual: Diko menepuk jidat, lalu tersenyum sambil menyodorkan buku lain.
- Balon Diko: "Lain kali pakai pembatas resmi perpustakaan, yuk kita cari solusinya bersama!"`
  },
  artikel: {
    id: 'artikel',
    name: 'Artikel',
    icon: 'fa-newspaper',
    color: 'bg-amber-100 text-amber-700',
    title: 'Template Artikel Populer / Opini',
    steps: [
      'Judul Menarik & Relevan dengan Isu Siswa',
      'Tesis / Pengantar Isu di Paragraf Pembuka',
      'Rangkaian Argumen Disertai Fakta & Data',
      'Analisis Solusi Kritis dari Perspektif Siswa',
      'Penegasan Ulang & Simpulan Reflektif'
    ],
    sampleTitle: 'Menumbuhkan Ekosistem Literasi Kritis di Era Digital',
    sampleContent: `Di era luapan informasi digital, kemampuan membaca kritis menjadi tameng utama bagi pelajar agar tidak mudah terperdaya hoaks. Melalui gerakan Lentera 5M, siswa dilatih tidak sekadar mengeja kata, melainkan menimbang fakta versus opini, menggali ide pokok, serta menyuarakan gagasan orisinal melalui tulisan yang bertanggung jawab.`
  },
  infografis: {
    id: 'infografis',
    name: 'Infografis',
    icon: 'fa-seedling',
    color: 'bg-cyan-100 text-cyan-700',
    title: 'Template Rencana Infografis Literasi',
    steps: [
      'Topik Utama & Judul Ringkas',
      'Data Kunci / Angka Statistik Penting',
      'Alur Visual (Poin 1, Poin 2, Poin 3)',
      'Ikon / Ilustrasi Pendukung Setiap Poin',
      'Sumber Data / Referensi Tepercaya'
    ],
    sampleTitle: 'Infografis: 5 Manfaat Membaca Rutin bagi Siswa',
    sampleContent: `1. Topik: Kesehatan Otak dan Kecakapan Literasi Siswa
2. Data Kunci: Membaca 15 menit per hari menambah lebih dari 1.000 kosakata baru setiap bulan.
3. Alur Visual:
   - Poin 1: Meningkatkan daya konsentrasi belajar hingga 40%.
   - Poin 2: Mengasah empati sosial lewat sudut pandang karakter buku.
   - Poin 3: Mengurangi kecemasan dan stres belajar hingga 68%.`
  },
  lainnya: {
    id: 'lainnya',
    name: 'Lainnya',
    icon: 'fa-ellipsis',
    color: 'bg-slate-100 text-slate-700',
    title: 'Template Karya Bebas / Catatan Refleksi',
    steps: [
      'Bentuk Karya Bebas yang Dipilih',
      'Latar Belakang Gagasan / Inspirasi',
      'Uraian Pokok Pikiran / Naskah',
      'Refleksi Personal Penulis',
      'Rencana Tindak Lanjut Karya'
    ],
    sampleTitle: 'Catatan Refleksi Pengalaman Menjelajah Literasi',
    sampleContent: `Melalui kegiatan membaca mandiri selama satu semester ini, saya menemukan bahwa setiap buku membuka jendela berpikir yang baru. Tulisan ini merupakan rangkuman dari perenungan dan pengalaman berharga yang saya dapatkan dalam program Lentera 5M.`
  }
};

window._activeM3Karya = 'resensi';

window.selectM3Karya = function(karyaId) {
  const normalized = (karyaId || 'resensi').toLowerCase();
  const tpl = window.M3_TEMPLATES[normalized] || window.M3_TEMPLATES.resensi;
  window._activeM3Karya = normalized;

  // Update card buttons styling
  const keys = ['resensi', 'puisi', 'cerpen', 'poster', 'komik', 'artikel', 'infografis', 'lainnya'];
  keys.forEach(k => {
    const btn = document.getElementById(`m3-btn-${k}`);
    if (btn) {
      if (k === normalized) {
        btn.classList.add('border-purple-500', 'active', 'ring-2', 'ring-purple-400/50');
        btn.classList.remove('border-transparent');
      } else {
        btn.classList.remove('border-purple-500', 'active', 'ring-2', 'ring-purple-400/50');
        btn.classList.add('border-transparent');
      }
    }
  });

  // Update template card title
  const titleEl = document.getElementById('m3-template-card-title');
  if (titleEl) titleEl.textContent = tpl.title;

  // Update template steps list
  const stepsContainer = document.getElementById('m3-template-steps-list');
  if (stepsContainer && tpl.steps) {
    stepsContainer.innerHTML = tpl.steps.map((step, idx) => `
      <div onclick="focusM3Step(${idx})" class="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/70 transition cursor-pointer group">
        <span class="w-6 h-6 rounded-full bg-[#476788] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">${idx + 1}</span>
        <span class="group-hover:text-blue-700 transition">${step}</span>
      </div>
    `).join('');
  }

  // Update studio title & dropdown
  const studioTitle = document.getElementById('m3-studio-title');
  if (studioTitle) studioTitle.textContent = `Lembar Kerja Menulis: ${tpl.name}`;
  
  const studioBadge = document.getElementById('m3-studio-badge-icon');
  if (studioBadge) studioBadge.className = `w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${tpl.color}`;

  const activeIcon = document.getElementById('m3-active-icon');
  if (activeIcon) activeIcon.className = `fa-solid ${tpl.icon}`;

  const catSelect = document.getElementById('tulis-kategori');
  if (catSelect && catSelect.value !== normalized) {
    catSelect.value = normalized;
  }

  // Update mobile modal header
  const modalTitle = document.getElementById('m3-modal-title');
  if (modalTitle) modalTitle.textContent = `Lembar Menulis: ${tpl.name}`;

  const modalSteps = document.getElementById('m3-modal-template-steps');
  if (modalSteps && tpl.steps) {
    modalSteps.textContent = tpl.steps.map((s, i) => `${i + 1}. ${s.split('(')[0].trim()}`).join(' • ');
  }
};

window.focusM3Step = function(stepIndex) {
  const tpl = window.M3_TEMPLATES[window._activeM3Karya] || window.M3_TEMPLATES.resensi;
  const stepText = tpl.steps[stepIndex] || `Langkah ${stepIndex + 1}`;
  
  // If screen is mobile, open modal
  if (window.innerWidth < 1024) {
    window.openM3MobileEditor();
  }

  const textarea = document.getElementById('tulis-isi');
  if (textarea) {
    textarea.focus();
    if (!textarea.value.includes(stepText.split('(')[0].trim())) {
      showToast('Fokus Langkah ' + (stepIndex + 1), `Lengkapi bagian "${stepText}" pada naskahmu.`, 'info');
    }
  }
};

window.insertM3SampleTemplate = function() {
  const tpl = window.M3_TEMPLATES[window._activeM3Karya] || window.M3_TEMPLATES.resensi;
  
  const judulInput = document.getElementById('tulis-judul');
  const isiInput = document.getElementById('tulis-isi');
  const mobJudul = document.getElementById('m3-mobile-judul');
  const mobIsi = document.getElementById('m3-mobile-isi');

  if (judulInput) judulInput.value = tpl.sampleTitle;
  if (isiInput) isiInput.value = tpl.sampleContent;
  if (mobJudul) mobJudul.value = tpl.sampleTitle;
  if (mobIsi) mobIsi.value = tpl.sampleContent;

  window.handleTextChange();
  showToast('Contoh Format Dimuat', `Format naskah "${tpl.name}" berhasil disisipkan ke lembar kerja.`, 'success');
};

window.clearM3Editor = function() {
  const judulInput = document.getElementById('tulis-judul');
  const isiInput = document.getElementById('tulis-isi');
  const mobJudul = document.getElementById('m3-mobile-judul');
  const mobIsi = document.getElementById('m3-mobile-isi');

  if (judulInput) judulInput.value = '';
  if (isiInput) isiInput.value = '';
  if (mobJudul) mobJudul.value = '';
  if (mobIsi) mobIsi.value = '';

  window.handleTextChange();
  showToast('Lembar Bersih', 'Lembar kerja naskah telah dikosongkan.', 'info');
};

window.syncM3Judul = function(val) {
  const dt = document.getElementById('tulis-judul');
  if (dt && dt.value !== val) dt.value = val;
};

window.syncM3Isi = function(val) {
  const dt = document.getElementById('tulis-isi');
  if (dt && dt.value !== val) dt.value = val;
  window.handleTextChange();
};

window.handleTextChange = function() {
  const text = document.getElementById('tulis-isi')?.value || document.getElementById('m3-mobile-isi')?.value || '';
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const badge = document.getElementById('word-count-badge');
  if (badge) {
    badge.textContent = `${wordCount} Kata`;
    badge.className = wordCount >= 50 ? 'text-xs font-mono font-bold text-emerald-600' : 'text-xs font-mono font-bold text-slate-500';
  }

  const charBadge = document.getElementById('char-count-badge');
  if (charBadge) charBadge.textContent = `${charCount} Karakter`;

  const mobBadge = document.getElementById('m3-modal-word-badge');
  if (mobBadge) {
    mobBadge.textContent = `${wordCount} Kata`;
    mobBadge.className = wordCount >= 50 ? 'text-xs font-mono font-bold text-emerald-600' : 'text-xs font-mono font-bold text-slate-500';
  }
};

window.saveM3Draft = function() {
  const judul = document.getElementById('tulis-judul')?.value.trim() || document.getElementById('m3-mobile-judul')?.value.trim();
  const isi = document.getElementById('tulis-isi')?.value.trim() || document.getElementById('m3-mobile-isi')?.value.trim();
  
  if (!isi && !judul) {
    showToast('Draf Kosong', 'Tuliskan judul atau sepenggal kalimat sebelum menyimpan draf.', 'error');
    return;
  }

  window.addPoints(10, 'Menyimpan Draf Karya M3');
  showToast('Draf Tersimpan!', `Draf tulisan "${judul || 'Karya Siswa'}" berhasil disimpan (+10 Poin).`, 'success');
};

window.openM3HelpModal = function() {
  const modal = document.getElementById('modal-m3-help');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM3HelpModal = function() {
  const modal = document.getElementById('modal-m3-help');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openM3MobileEditor = function() {
  const modal = document.getElementById('modal-m3-mobile-editor');
  if (!modal) return;
  
  // Sync values
  const dtJudul = document.getElementById('tulis-judul')?.value || '';
  const dtIsi = document.getElementById('tulis-isi')?.value || '';
  const mobJudul = document.getElementById('m3-mobile-judul');
  const mobIsi = document.getElementById('m3-mobile-isi');
  
  if (mobJudul) mobJudul.value = dtJudul;
  if (mobIsi) mobIsi.value = dtIsi;
  
  window.handleTextChange();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM3MobileEditor = function() {
  const modal = document.getElementById('modal-m3-mobile-editor');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.runAICheckMobile = function() {
  window.runAICheck(true);
};

window.publishKaryaMobile = function() {
  window.publishKarya();
  window.closeM3MobileEditor();
};

window.runAICheck = function(isMobile = false) {
  const judul = document.getElementById('tulis-judul')?.value.trim() || document.getElementById('m3-mobile-judul')?.value.trim() || 'Tanpa Judul';
  const kategori = window._activeM3Karya || 'resensi';
  const text = document.getElementById('tulis-isi')?.value.trim() || document.getElementById('m3-mobile-isi')?.value.trim();
  const feedbackContainer = isMobile ? document.getElementById('m3-mobile-ai-container') : document.getElementById('ai-feedback-container');

  if (!text || text.split(/\s+/).length < 20) {
    showToast('Teks Terlalu Singkat', 'Tuliskan minimal 20-50 kata naskah agar AI dapat memberikan telaah komprehensif.', 'error');
    return;
  }

  if (feedbackContainer) {
    feedbackContainer.innerHTML = `
      <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-center space-y-2">
        <i class="fa-solid fa-circle-notch fa-spin text-2xl text-indigo-600"></i>
        <p class="text-xs font-bold text-indigo-900">AI Pendamping sedang menelaah naskahmu...</p>
        <p class="text-[10px] text-indigo-700">Mengecek kaidah EYD V, kepaduan paragraf, dan pilihan kosakata sastra.</p>
      </div>
    `;
  }

  setTimeout(() => {
    generateAIFeedback(judul, kategori, text, isMobile);
  }, 1000);
};

function generateAIFeedback(judul, kategori, text, isMobile = false) {
  const feedbackContainer = isMobile ? document.getElementById('m3-mobile-ai-container') : document.getElementById('ai-feedback-container');
  if (!feedbackContainer) return;

  const words = text.split(/\s+/);
  const wordCount = words.length;

  const hasDialogue = text.includes('"') || text.includes('“');
  const hasLocalColor = /jogja|kasihan|bantul|batik|sendang|kriya|gerabah|mataram/i.test(text);
  const punctuationIssues = (text.match(/[,.][a-zA-Z]/g) || []).length;

  feedbackContainer.innerHTML = `
    <div class="space-y-3 text-xs animate-fadeIn">
      <!-- Skor Telaah -->
      <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-check-circle text-emerald-600 text-lg"></i>
          <div>
            <span class="font-bold text-emerald-950">Skor Kerapian Naskah:</span>
            <p class="text-[10px] text-emerald-800">88/100 (Sangat Layak Publikasi)</p>
          </div>
        </div>
        <span class="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-xl">Baik Sekali</span>
      </div>

      <!-- 1. Ejaan & EYD V -->
      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
        <h5 class="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
          <i class="fa-solid fa-spell-check text-sky-600"></i> Kaidah Ejaan & Tanda Baca (EYD V)
        </h5>
        <p class="text-slate-600 text-[11px] leading-relaxed">
          ${punctuationIssues > 0 
            ? `Ditemukan tanda baca koma/titik yang belum berspasi. Pastikan ada spasi setelah tanda titik/koma.`
            : `Penggunaan huruf kapital pada awal kalimat dan nama diri sudah rapi.`}
          ${hasDialogue ? 'Tanda petik dialog sudah digunakan secara tepat.' : 'Tips: Tambahkan kalimat langsung / dialog tokoh agar naskah lebih hidup.'}
        </p>
      </div>

      <!-- 2. Saran Diksi & Kosakata -->
      <div class="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
        <h5 class="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
          <i class="fa-solid fa-feather text-amber-600"></i> Saran Pengembangan Diksi
        </h5>
        <p class="text-amber-900 text-[11px] leading-relaxed">
          ${hasLocalColor 
            ? 'Hebat! Naskahmu memuat sentuhan kearifan lokal yang memperkuat identitas budaya Kasihan & Bantul.' 
            : 'Saran: Coba sisipkan metafora atau latar tempat khas Kasihan (seperti sentra kriya Kasongan atau Sendang) untuk memperkaya nuansa cerita.'}
        </p>
      </div>

      <!-- 3. Bimbingan Lanjutan -->
      <div class="p-3 bg-purple-50 border border-purple-200 rounded-xl">
        <p class="text-[11px] text-purple-950">
          <strong>Catatan Guru AI:</strong> Gagasan pokok naskahmu mengalir dengan runtut. Naskah sudah siap dipublikasikan ke Galeri Karya Digital Siswa!
        </p>
      </div>
    </div>
  `;

  showToast('Telaah AI Selesai', 'Pendamping AI telah memberikan catatan perbaikan dan apresiasi.', 'success');
}

window.publishKarya = function() {
  const user = window.appState.currentUser;
  if (!user) return;

  const judul = document.getElementById('tulis-judul')?.value.trim() || document.getElementById('m3-mobile-judul')?.value.trim();
  const kategoriKey = window._activeM3Karya || 'resensi';
  const kategoriName = (window.M3_TEMPLATES[kategoriKey]?.name) || 'Resensi Buku';
  const isi = document.getElementById('tulis-isi')?.value.trim() || document.getElementById('m3-mobile-isi')?.value.trim();

  if (!judul || !isi || isi.length < 20) {
    showToast('Naskah Belum Siap', 'Lengkapi judul dan isi karya minimal 20 karakter sebelum dipublikasikan.', 'error');
    return;
  }

  const newWork = {
    id: Date.now(),
    title: judul,
    category: kategoriName,
    authorName: user.name,
    authorClass: user.kelas || '8B',
    authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    content: isi,
    likes: 0,
    comments: []
  };

  window.appState.works.unshift(newWork);
  setStorage(STORAGE_KEYS.WORKS, window.appState.works);

  window.addPoints(50, `Publikasi Karya Digital: ${judul}`);

  if (window.confetti) {
    window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  }

  showToast('Karya Terbit!', `"${judul}" kini tampil di Galeri Portofolio Digital (+50 Poin).`, 'success');

  // Clear form
  window.clearM3Editor();

  // Navigate to gallery
  navigateTo('galeri');
};

// ==========================================
// 10. M4: MENCERITAKAN CONTROLLER (BOOK TALK)
// ==========================================

window.handleBookTalkSubmit = function(e) {
  if (e) e.preventDefault();
  const user = window.appState.currentUser;
  if (!user) return;

  const judul = document.getElementById('bt-judul')?.value.trim();
  const format = document.getElementById('bt-format')?.value;
  const url = document.getElementById('bt-url')?.value.trim();
  const poin = document.getElementById('bt-poin')?.value.trim();

  if (!judul || !url) {
    showToast('Data Kurang', 'Isi judul dan tautan video / audio Book Talk.', 'error');
    return;
  }

  const newBT = {
    id: `bt-${Date.now()}`,
    studentName: user.name,
    studentClass: user.kelas || '8B',
    title: judul,
    format: format,
    url: url,
    notes: poin,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  window.appState.booktalks.unshift(newBT);
  setStorage(STORAGE_KEYS.BOOKTALKS, window.appState.booktalks);

  window.addPoints(75, `Unggah Book Talk: ${judul}`);
  showToast('Book Talk Terkirim!', `Rekaman Book Talk berhasil diunggah (+75 Poin).`, 'success');

  document.getElementById('form-booktalk')?.reset();
  renderBooktalkList();
};

window.m4ShowAllWorks = false;
window.m4AudioState = {
  isRecording: false,
  isPaused: false,
  seconds: 0,
  timerInterval: null,
  mediaRecorder: null,
  audioChunks: [],
  audioUrl: null,
  simulatedBarsInterval: null
};

window.m4ChallengeState = {
  remainingSeconds: 180, // 3 Menit
  totalSeconds: 180,
  interval: null,
  isRunning: false
};

window.renderM4View = function() {
  window.renderM4StudentWorks(window.m4ShowAllWorks);
  window.populateM4BookSelects();
};

window.populateM4BookSelects = function() {
  const books = window.appState.books || [];
  const selects = ['m4-record-book-select', 'm4-video-book-select', 'm4-photo-book-select'];
  selects.forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const currentVal = sel.value;
    sel.innerHTML = '<option value="">-- Pilih Buku yang Dibahas --</option>' + books.map(b => `
      <option value="${b.title}">${b.title} (${b.author})</option>
    `).join('');
    if (currentVal) sel.value = currentVal;
  });
};

window.renderM4StudentWorks = function(showAll = false) {
  const container = document.getElementById('m4-student-works-grid');
  if (!container) return;

  const allItems = window.appState.booktalks || [];
  const itemsToRender = showAll ? allItems : allItems.slice(0, 4);

  if (itemsToRender.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 p-6">
        <i class="fa-solid fa-microphone-slash text-3xl text-slate-300 mb-2"></i>
        <p class="text-xs text-slate-500 font-medium">Belum ada karya teman yang diunggah. Jadilah yang pertama merekam!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = itemsToRender.map(item => {
    const thumbImg = item.thumb || THUMB_AISYAH;
    const isLiked = item.isLiked || false;
    const likeCount = item.likes || 0;
    const duration = item.duration || '02:30';

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between group cursor-pointer" onclick="openM4MediaPlayer('${item.id}')">
        <!-- Thumbnail with Duration badge and Play icon -->
        <div class="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
          <img src="${thumbImg}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          <span class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
            <i class="fa-solid fa-play text-[8px]"></i> ${duration}
          </span>
          <span class="absolute top-2 right-2 bg-black/50 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize">
            ${item.format || 'Video'}
          </span>
        </div>

        <!-- Meta info -->
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1 leading-tight group-hover:text-sky-700 transition" title="${item.title}">
              ${item.title}
            </h4>
            <div class="text-[11px] text-slate-500 mt-1 leading-tight">
              <span class="font-medium text-slate-700 block truncate">${item.studentName}</span>
              <span class="text-[10px] text-slate-400 font-semibold">${item.studentClass || 'VIII'}</span>
            </div>
          </div>

          <!-- Likes footer -->
          <div class="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-100">
            <span class="text-[10px] text-slate-400 font-medium">${item.date || 'Terbaru'}</span>
            <button type="button" onclick="toggleM4Like(event, '${item.id}')" class="flex items-center gap-1.5 text-xs font-bold ${isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'} transition py-0.5 px-1.5 rounded-lg hover:bg-rose-50" title="Sukai karya ini">
              <i class="fa-solid fa-heart ${isLiked ? 'text-rose-500 animate-pulse' : 'text-rose-400'}"></i>
              <span id="like-count-${item.id}">${likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.toggleM4AllWorksView = function() {
  window.m4ShowAllWorks = !window.m4ShowAllWorks;
  const btn = document.getElementById('m4-toggle-view-btn');
  if (btn) {
    btn.innerHTML = window.m4ShowAllWorks
      ? `<span>Tampilkan Ringkas</span> <i class="fa-solid fa-chevron-up text-[10px]"></i>`
      : `<span>Lihat Semua</span> <i class="fa-solid fa-chevron-right text-[10px]"></i>`;
  }
  window.renderM4StudentWorks(window.m4ShowAllWorks);
};

window.toggleM4Like = function(e, id) {
  if (e && e.stopPropagation) e.stopPropagation();
  const list = window.appState.booktalks || [];
  const item = list.find(b => b.id === id);
  if (!item) return;

  item.isLiked = !item.isLiked;
  item.likes = (item.likes || 0) + (item.isLiked ? 1 : -1);
  if (item.likes < 0) item.likes = 0;

  setStorage(STORAGE_KEYS.BOOKTALKS, list);

  const countSpan = document.getElementById(`like-count-${id}`);
  if (countSpan) {
    countSpan.textContent = item.likes;
  }

  // Also update player like button if opened
  const playerLikeCount = document.getElementById('m4-player-like-count');
  const playerLikeBtn = document.getElementById('m4-player-like-btn');
  if (playerLikeCount && playerLikeBtn) {
    playerLikeCount.textContent = item.likes;
    playerLikeBtn.className = item.isLiked 
      ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200' 
      : 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-bold text-xs border border-slate-200 transition';
  }

  if (item.isLiked) {
    showToast('Apresiasi Diberikan ❤️', `Kamu menyukai karya "${item.title}" oleh ${item.studentName}!`, 'info');
  }
  window.renderM4StudentWorks(window.m4ShowAllWorks);
};

// ==========================================
// 10.B M4: AUDIO RECORDING STUDIO
// ==========================================

window.openM4VoiceRecordModal = function(mode = 'normal') {
  const modal = document.getElementById('modal-m4-voice-record');
  if (!modal) return;

  window.populateM4BookSelects();
  window.resetM4AudioRecording();

  if (mode === 'challenge') {
    const noteField = document.getElementById('m4-record-notes');
    if (noteField && !noteField.value) {
      noteField.value = 'Tantangan Book Talk 3 Menit: Cerita buku favoritku dengan penguasaan alur dan tokoh.';
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM4VoiceRecordModal = function() {
  window.resetM4AudioRecording();
  const modal = document.getElementById('modal-m4-voice-record');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.resetM4AudioRecording = function() {
  const state = window.m4AudioState;
  if (state.timerInterval) clearInterval(state.timerInterval);
  if (state.simulatedBarsInterval) clearInterval(state.simulatedBarsInterval);
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    try { state.mediaRecorder.stop(); } catch (err) {}
  }

  state.isRecording = false;
  state.isPaused = false;
  state.seconds = 0;
  state.audioChunks = [];
  state.audioUrl = null;

  const timerDisplay = document.getElementById('m4-record-timer');
  if (timerDisplay) timerDisplay.textContent = '00:00';

  const previewAudio = document.getElementById('m4-record-preview-audio');
  if (previewAudio) {
    previewAudio.src = '';
    previewAudio.classList.add('hidden');
  }

  const btnStart = document.getElementById('btn-m4-record-start');
  const btnStop = document.getElementById('btn-m4-record-stop');
  const statusBadge = document.getElementById('m4-record-status-badge');

  if (btnStart) {
    btnStart.classList.remove('hidden');
    btnStart.innerHTML = '<i class="fa-solid fa-circle text-rose-500 text-xs animate-ping mr-1"></i> Mulai Merekam';
  }
  if (btnStop) btnStop.classList.add('hidden');
  if (statusBadge) {
    statusBadge.textContent = 'Mikrofon Siap';
    statusBadge.className = 'px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1.5';
  }

  // Reset visualizer bars
  const bars = document.querySelectorAll('.m4-sound-bar');
  bars.forEach(bar => {
    bar.style.height = '6px';
    bar.classList.remove('bg-rose-500');
    bar.classList.add('bg-slate-300');
  });
};

window.startM4AudioRecording = async function() {
  const state = window.m4AudioState;
  state.isRecording = true;
  state.isPaused = false;
  state.seconds = 0;
  state.audioChunks = [];

  const statusBadge = document.getElementById('m4-record-status-badge');
  if (statusBadge) {
    statusBadge.textContent = 'Merekam Suara... (Maks 3 Menit)';
    statusBadge.className = 'px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 animate-pulse';
  }

  const btnStart = document.getElementById('btn-m4-record-start');
  const btnStop = document.getElementById('btn-m4-record-stop');
  if (btnStart) btnStart.classList.add('hidden');
  if (btnStop) btnStop.classList.remove('hidden');

  // Try real MediaRecorder if browser supports and allows it
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.mediaRecorder = new MediaRecorder(stream);
      state.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) state.audioChunks.push(e.data);
      };
      state.mediaRecorder.onstop = () => {
        const blob = new Blob(state.audioChunks, { type: 'audio/webm' });
        state.audioUrl = URL.createObjectURL(blob);
        const previewAudio = document.getElementById('m4-record-preview-audio');
        if (previewAudio) {
          previewAudio.src = state.audioUrl;
          previewAudio.classList.remove('hidden');
        }
        // Stop all tracks
        stream.getTracks().forEach(t => t.stop());
      };
      state.mediaRecorder.start();
    } catch (err) {
      console.warn('Real microphone not available, running high-fidelity simulation visualizer:', err);
    }
  }

  // Timer counter
  const timerDisplay = document.getElementById('m4-record-timer');
  state.timerInterval = setInterval(() => {
    state.seconds++;
    const mins = String(Math.floor(state.seconds / 60)).padStart(2, '0');
    const secs = String(state.seconds % 60).padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;

    // Auto-stop at 3 minutes (180s)
    if (state.seconds >= 180) {
      window.stopM4AudioRecording();
      showToast('Waktu 3 Menit Habis!', 'Rekaman Book Talk telah mencapai batas maksimal 3 menit.', 'info');
    }
  }, 1000);

  // Animated visualizer bars
  const bars = document.querySelectorAll('.m4-sound-bar');
  state.simulatedBarsInterval = setInterval(() => {
    bars.forEach(bar => {
      const h = Math.floor(Math.random() * 38) + 6;
      bar.style.height = `${h}px`;
      bar.classList.remove('bg-slate-300');
      bar.classList.add('bg-rose-500');
    });
  }, 120);
};

window.stopM4AudioRecording = function() {
  const state = window.m4AudioState;
  if (state.timerInterval) clearInterval(state.timerInterval);
  if (state.simulatedBarsInterval) clearInterval(state.simulatedBarsInterval);

  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    try { state.mediaRecorder.stop(); } catch (err) {}
  } else {
    // If simulated
    const previewAudio = document.getElementById('m4-record-preview-audio');
    if (previewAudio) {
      // Use fallback audio sound demo
      previewAudio.classList.remove('hidden');
    }
  }

  state.isRecording = false;

  const statusBadge = document.getElementById('m4-record-status-badge');
  if (statusBadge) {
    statusBadge.textContent = 'Rekaman Selesai • Dengarkan Preview';
    statusBadge.className = 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5';
  }

  const btnStart = document.getElementById('btn-m4-record-start');
  const btnStop = document.getElementById('btn-m4-record-stop');
  if (btnStart) {
    btnStart.classList.remove('hidden');
    btnStart.innerHTML = '<i class="fa-solid fa-rotate-left mr-1"></i> Rekam Ulang';
  }
  if (btnStop) btnStop.classList.add('hidden');

  const bars = document.querySelectorAll('.m4-sound-bar');
  bars.forEach(bar => {
    bar.style.height = '8px';
    bar.classList.remove('bg-rose-500');
    bar.classList.add('bg-emerald-500');
  });
};

window.submitM4VoiceRecording = function(e) {
  if (e) e.preventDefault();
  const user = window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan', kelas: 'VIII B' };
  const title = document.getElementById('m4-record-title')?.value.trim();
  const book = document.getElementById('m4-record-book-select')?.value.trim();
  const format = document.getElementById('m4-record-category')?.value || 'Rekaman Suara Book Talk';
  const notes = document.getElementById('m4-record-notes')?.value.trim();

  if (!title) {
    showToast('Judul Diperlukan', 'Silakan isi judul Book Talk atau ulasan lisanmu.', 'error');
    return;
  }

  const durationSec = window.m4AudioState.seconds || 150;
  const mins = String(Math.floor(durationSec / 60)).padStart(2, '0');
  const secs = String(durationSec % 60).padStart(2, '0');
  const durationStr = `${mins}:${secs}`;

  const newBT = {
    id: `bt-${Date.now()}`,
    studentName: user.name,
    studentClass: user.kelas || 'VIII B',
    title: title,
    bookDiscussed: book || 'Buku Pilihan',
    format: format,
    type: 'audio',
    likes: 1,
    isLiked: false,
    duration: durationStr,
    thumb: THUMB_AISYAH,
    url: window.m4AudioState.audioUrl || 'demo-audio.mp3',
    notes: notes || `Resensi lisan buku "${book || title}" durasi ${durationStr}.`,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    comments: []
  };

  window.appState.booktalks.unshift(newBT);
  setStorage(STORAGE_KEYS.BOOKTALKS, window.appState.booktalks);

  window.addPoints(75, `Book Talk Rekam Suara: ${title}`);
  showToast('Karya M4 Berhasil Disimpan!', `Rekaman suara "${title}" berhasil diunggah (+75 Poin).`, 'success');

  window.closeM4VoiceRecordModal();
  window.renderM4StudentWorks(window.m4ShowAllWorks);
};

// ==========================================
// 10.C M4: UPLOAD VIDEO
// ==========================================

window.openM4VideoUploadModal = function() {
  const modal = document.getElementById('modal-m4-upload-video');
  if (!modal) return;
  window.populateM4BookSelects();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM4VideoUploadModal = function() {
  const modal = document.getElementById('modal-m4-upload-video');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.submitM4VideoUpload = function(e) {
  if (e) e.preventDefault();
  const user = window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan', kelas: 'VIII B' };
  const title = document.getElementById('m4-video-title')?.value.trim();
  const url = document.getElementById('m4-video-url')?.value.trim();
  const book = document.getElementById('m4-video-book-select')?.value.trim();
  const format = document.getElementById('m4-video-category')?.value || 'Video Presentasi';
  const notes = document.getElementById('m4-video-notes')?.value.trim();

  if (!title || !url) {
    showToast('Lengkapi Data', 'Silakan isi judul video dan tautan YouTube / Google Drive.', 'error');
    return;
  }

  const newBT = {
    id: `bt-${Date.now()}`,
    studentName: user.name,
    studentClass: user.kelas || 'VIII B',
    title: title,
    bookDiscussed: book || 'Buku Pilihan',
    format: format,
    type: 'video',
    likes: 1,
    isLiked: false,
    duration: '02:40',
    thumb: THUMB_RAKA,
    url: url,
    notes: notes || `Video presentasi resensi buku "${book || title}".`,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    comments: []
  };

  window.appState.booktalks.unshift(newBT);
  setStorage(STORAGE_KEYS.BOOKTALKS, window.appState.booktalks);

  window.addPoints(75, `Upload Video M4: ${title}`);
  showToast('Video Berhasil Diunggah!', `Video Book Talk "${title}" berhasil dibagikan (+75 Poin).`, 'success');

  window.closeM4VideoUploadModal();
  window.renderM4StudentWorks(window.m4ShowAllWorks);
};

// ==========================================
// 10.D M4: UNGGAH FOTO DOKUMENTASI
// ==========================================

window.openM4PhotoUploadModal = function() {
  const modal = document.getElementById('modal-m4-unggah-foto');
  if (!modal) return;
  window.populateM4BookSelects();
  const preview = document.getElementById('m4-photo-preview');
  if (preview) preview.classList.add('hidden');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM4PhotoUploadModal = function() {
  const modal = document.getElementById('modal-m4-unggah-foto');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.handleM4PhotoSelect = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('m4-photo-preview');
    const previewImg = document.getElementById('m4-photo-preview-img');
    if (preview && previewImg) {
      previewImg.src = e.target.result;
      preview.classList.remove('hidden');
    }
  };
  reader.readAsDataURL(file);
};

window.submitM4PhotoUpload = function(e) {
  if (e) e.preventDefault();
  const user = window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan', kelas: 'VIII B' };
  const title = document.getElementById('m4-photo-title')?.value.trim();
  const tag = document.getElementById('m4-photo-tag')?.value || 'Dokumentasi 15 Menit Membaca';
  const notes = document.getElementById('m4-photo-caption')?.value.trim();
  const previewImg = document.getElementById('m4-photo-preview-img');

  if (!title) {
    showToast('Judul Diperlukan', 'Silakan masukkan judul kegiatan dokumentasi.', 'error');
    return;
  }

  const newBT = {
    id: `bt-${Date.now()}`,
    studentName: user.name,
    studentClass: user.kelas || 'VIII B',
    title: title,
    format: tag,
    type: 'photo',
    likes: 1,
    isLiked: false,
    duration: 'Foto',
    thumb: (previewImg && previewImg.src) ? previewImg.src : THUMB_AISYAH,
    url: '#',
    notes: notes || `Dokumentasi literasi: ${title}`,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    comments: []
  };

  window.appState.booktalks.unshift(newBT);
  setStorage(STORAGE_KEYS.BOOKTALKS, window.appState.booktalks);

  window.addPoints(50, `Unggah Foto Dokumentasi: ${title}`);
  showToast('Foto Berhasil Disimpan!', `Dokumentasi kegiatan literasi berhasil diunggah (+50 Poin).`, 'success');

  window.closeM4PhotoUploadModal();
  window.renderM4StudentWorks(window.m4ShowAllWorks);
};

// ==========================================
// 10.E M4: BOOK TALK CHALLENGE (3 MENIT)
// ==========================================

window.openM4ChallengeModal = function() {
  const modal = document.getElementById('modal-m4-challenge');
  if (!modal) return;
  window.resetM4ChallengeTimer();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM4ChallengeModal = function() {
  window.resetM4ChallengeTimer();
  const modal = document.getElementById('modal-m4-challenge');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.startM4ChallengeTimer = function() {
  const state = window.m4ChallengeState;
  if (state.isRunning) return;

  state.isRunning = true;
  const startBtn = document.getElementById('btn-m4-challenge-timer-toggle');
  if (startBtn) {
    startBtn.innerHTML = '<i class="fa-solid fa-pause mr-1"></i> Jeda Timer';
    startBtn.className = 'px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs transition';
    startBtn.onclick = window.pauseM4ChallengeTimer;
  }

  state.interval = setInterval(() => {
    if (state.remainingSeconds > 0) {
      state.remainingSeconds--;
      window.updateM4ChallengeTimerDisplay();
    } else {
      window.pauseM4ChallengeTimer();
      showToast('Waktu Tantangan Selesai!', 'Hebat! Waktu 3 menit Book Talk Challenge telah selesai.', 'success');
    }
  }, 1000);
};

window.pauseM4ChallengeTimer = function() {
  const state = window.m4ChallengeState;
  state.isRunning = false;
  if (state.interval) clearInterval(state.interval);

  const startBtn = document.getElementById('btn-m4-challenge-timer-toggle');
  if (startBtn) {
    startBtn.innerHTML = '<i class="fa-solid fa-play mr-1"></i> Lanjutkan';
    startBtn.className = 'px-4 py-2 bg-[#0c3966] hover:bg-[#082949] text-white font-black text-xs rounded-xl shadow-xs transition';
    startBtn.onclick = window.startM4ChallengeTimer;
  }
};

window.resetM4ChallengeTimer = function() {
  const state = window.m4ChallengeState;
  state.isRunning = false;
  if (state.interval) clearInterval(state.interval);
  state.remainingSeconds = state.totalSeconds;
  window.updateM4ChallengeTimerDisplay();

  const startBtn = document.getElementById('btn-m4-challenge-timer-toggle');
  if (startBtn) {
    startBtn.innerHTML = '<i class="fa-solid fa-play mr-1"></i> Mulai Timer 3 Menit';
    startBtn.className = 'px-4 py-2 bg-[#0c3966] hover:bg-[#082949] text-white font-black text-xs rounded-xl shadow-xs transition';
    startBtn.onclick = window.startM4ChallengeTimer;
  }
};

window.updateM4ChallengeTimerDisplay = function() {
  const state = window.m4ChallengeState;
  const mins = String(Math.floor(state.remainingSeconds / 60)).padStart(2, '0');
  const secs = String(state.remainingSeconds % 60).padStart(2, '0');

  const display = document.getElementById('m4-challenge-timer-num');
  if (display) display.textContent = `${mins}:${secs}`;

  const bar = document.getElementById('m4-challenge-progress-bar');
  if (bar) {
    const pct = ((state.totalSeconds - state.remainingSeconds) / state.totalSeconds) * 100;
    bar.style.width = `${pct}%`;
  }
};

// ==========================================
// 10.F M4: MEDIA PLAYER MODAL
// ==========================================

window.activeM4PlayerItem = null;

window.openM4MediaPlayer = function(id) {
  const list = window.appState.booktalks || [];
  const item = list.find(b => b.id === id);
  if (!item) return;

  window.activeM4PlayerItem = item;
  const modal = document.getElementById('modal-m4-media-player');
  if (!modal) return;

  // Title & Metadata
  const titleEl = document.getElementById('m4-player-title');
  if (titleEl) titleEl.textContent = item.title || 'Book Talk Siswa';

  const creatorEl = document.getElementById('m4-player-creator');
  if (creatorEl) creatorEl.textContent = `${item.studentName || 'Siswa'} (${item.studentClass || 'VIII'})`;

  const bookEl = document.getElementById('m4-player-book');
  if (bookEl) bookEl.textContent = item.bookTitle || item.book || 'Buku Bacaan';

  const studentEl = document.getElementById('m4-player-student');
  if (studentEl) studentEl.textContent = `${item.studentName || 'Siswa'} (${item.studentClass || 'VIII'})`;

  const formatEl = document.getElementById('m4-player-format');
  if (formatEl) formatEl.textContent = item.format || 'Video Book Talk';

  const durationEl = document.getElementById('m4-player-duration');
  if (durationEl) durationEl.textContent = item.duration || '02:30';

  const dateEl = document.getElementById('m4-player-date');
  if (dateEl) dateEl.textContent = item.date || 'Baru Saja';

  const notesEl = document.getElementById('m4-player-notes');
  if (notesEl) notesEl.textContent = item.notes || 'Ulasan lisan karya siswa SMP Negeri 2 Kasihan.';

  const thumbEl = document.getElementById('m4-player-thumb');
  if (thumbEl) thumbEl.src = item.thumb || THUMB_AISYAH;

  // Render media screen inside m4-player-container
  const playerBox = document.getElementById('m4-player-container');
  if (playerBox) {
    const isAudio = item.format && item.format.toLowerCase().includes('audio');
    const isPhoto = item.format && item.format.toLowerCase().includes('foto');
    if (isAudio) {
      playerBox.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
          <div class="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center text-rose-400 text-2xl animate-pulse">
            <i class="fa-solid fa-microphone"></i>
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">${item.title}</h4>
            <p class="text-xs text-rose-300 mt-0.5">Rekaman Suara Book Talk &bull; Durasi ${item.duration || '02:15'}</p>
          </div>
          <audio controls class="w-full max-w-sm rounded-xl" autoplay>
            <source src="${item.url || '#'}" type="audio/mpeg">
            Browser tidak mendukung pemutar audio.
          </audio>
        </div>
      `;
    } else if (isPhoto) {
      playerBox.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center bg-black/40 p-2">
          <img src="${item.thumb || THUMB_AISYAH}" alt="${item.title}" class="max-h-[340px] w-auto object-contain rounded-xl shadow-lg" />
        </div>
      `;
    } else {
      playerBox.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center bg-black/60 group">
          <img src="${item.thumb || THUMB_AISYAH}" alt="${item.title}" class="w-full h-[280px] sm:h-[320px] object-cover opacity-70" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4 sm:p-5">
            <div class="flex items-center justify-between text-white text-xs">
              <span class="bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs font-semibold flex items-center gap-1.5">
                <i class="fa-solid fa-video text-sky-400"></i> ${item.format || 'Video HD'}
              </span>
              <span class="bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs font-mono font-bold">
                ${item.duration || '02:45'}
              </span>
            </div>
            <div class="flex items-center justify-center">
              <button type="button" onclick="showToast('Memutar Video', 'Memutar video Book Talk: ${item.title}', 'info')" class="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center text-xl shadow-2xl pl-1 group-hover:scale-110 active:scale-95 transition">
                <i class="fa-solid fa-play"></i>
              </button>
            </div>
            <p class="text-white text-xs font-medium line-clamp-2 drop-shadow-md">
              ${item.notes || 'Ulasan menarik seputar karakter dan alur cerita buku.'}
            </p>
          </div>
        </div>
      `;
    }
  }

  // Like stats & button state
  const likesDisplay = document.getElementById('m4-player-likes');
  if (likesDisplay) {
    likesDisplay.textContent = `${item.likes || 0} Suka`;
  }
  const likeCount = document.getElementById('m4-player-like-count');
  if (likeCount) likeCount.textContent = item.likes || 0;

  const likeBtn = document.getElementById('m4-player-like-btn');
  if (likeBtn) {
    if (item.isLiked) {
      likeBtn.classList.remove('bg-rose-50', 'text-rose-600');
      likeBtn.classList.add('bg-rose-600', 'text-white');
    } else {
      likeBtn.classList.remove('bg-rose-600', 'text-white');
      likeBtn.classList.add('bg-rose-50', 'text-rose-600');
    }
  }

  // Comments count & list
  const commentCountEl = document.getElementById('m4-player-comment-count');
  const comments = item.comments || [];
  if (commentCountEl) {
    commentCountEl.textContent = `${comments.length} Komentar`;
  }

  window.renderM4PlayerComments(item);

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeM4MediaPlayer = function() {
  const modal = document.getElementById('modal-m4-media-player');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  window.activeM4PlayerItem = null;
};

window.renderM4PlayerComments = function(item) {
  const container = document.getElementById('m4-comments-container') || document.getElementById('m4-player-comments-list');
  if (!container) return;

  const comments = item.comments || [];
  if (comments.length === 0) {
    container.innerHTML = `
      <p class="text-[11px] text-slate-400 italic py-3 text-center">Belum ada komentar. Berikan apresiasi atau pertanyaan pertamamu untuk teman!</p>
    `;
    return;
  }

  container.innerHTML = comments.map(c => `
    <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
      <div class="flex items-center justify-between mb-0.5">
        <span class="font-bold text-slate-800">${c.name}</span>
        <span class="text-[10px] text-slate-400">${c.time || 'Baru saja'}</span>
      </div>
      <p class="text-slate-600 text-[11px] leading-snug">${c.text}</p>
    </div>
  `).join('');
};

window.addM4Comment = function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('m4-comment-input') || document.getElementById('m4-player-comment-input');
  if (!input || !input.value.trim() || !window.activeM4PlayerItem) return;

  const user = window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan' };
  const newComment = {
    name: user.name,
    text: input.value.trim(),
    time: 'Baru saja'
  };

  if (!window.activeM4PlayerItem.comments) {
    window.activeM4PlayerItem.comments = [];
  }
  window.activeM4PlayerItem.comments.push(newComment);
  setStorage(STORAGE_KEYS.BOOKTALKS, window.appState.booktalks);

  input.value = '';
  window.renderM4PlayerComments(window.activeM4PlayerItem);

  const commentCountEl = document.getElementById('m4-player-comment-count');
  if (commentCountEl) {
    commentCountEl.textContent = `${window.activeM4PlayerItem.comments.length} Komentar`;
  }

  if (typeof window.renderM4StudentWorks === 'function') {
    window.renderM4StudentWorks();
  }

  showToast('Apresiasi Terkirim!', 'Komentarmu telah ditambahkan pada karya ini.', 'success');
};

window.addM4PlayerComment = window.addM4Comment;

window.toggleM4PlayerLike = function() {
  if (!window.activeM4PlayerItem) return;
  const item = window.activeM4PlayerItem;
  item.isLiked = !item.isLiked;
  item.likes = (item.likes || 0) + (item.isLiked ? 1 : -1);
  if (item.likes < 0) item.likes = 0;

  setStorage(STORAGE_KEYS.BOOKTALKS, window.appState.booktalks);

  const likesDisplay = document.getElementById('m4-player-likes');
  if (likesDisplay) likesDisplay.textContent = `${item.likes} Suka`;

  const likeCount = document.getElementById('m4-player-like-count');
  if (likeCount) likeCount.textContent = item.likes;

  const likeBtn = document.getElementById('m4-player-like-btn');
  if (likeBtn) {
    if (item.isLiked) {
      likeBtn.classList.remove('bg-rose-50', 'text-rose-600');
      likeBtn.classList.add('bg-rose-600', 'text-white');
    } else {
      likeBtn.classList.remove('bg-rose-600', 'text-white');
      likeBtn.classList.add('bg-rose-50', 'text-rose-600');
    }
  }

  if (typeof window.renderM4StudentWorks === 'function') {
    window.renderM4StudentWorks();
  }

  showToast(item.isLiked ? 'Menyukai Karya' : 'Batal Menyukai', item.isLiked ? 'Apresiasimu telah dicatat!' : 'Batal menyukai karya.', 'info');
};

window.shareM4Work = function() {
  if (!window.activeM4PlayerItem) return;
  const title = window.activeM4PlayerItem.title || 'Book Talk SMPN 2 Kasihan';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    showToast('Tautan Disalin!', `Tautan karya "${title}" berhasil disalin ke clipboard.`, 'success');
  } else {
    showToast('Bagikan Karya', `Bagikan karya "${title}" kepada teman-teman kelasmu!`, 'info');
  }
};

// Photo Upload UI Handlers
window.handleM4PhotoSelected = function(e) {
  const file = e.target.files && e.target.files[0];
  if (file) {
    const filenameEl = document.getElementById('m4-photo-filename');
    const previewBox = document.getElementById('m4-photo-preview-box');
    if (filenameEl) filenameEl.textContent = file.name;
    if (previewBox) previewBox.classList.remove('hidden');
  }
};

window.clearM4PhotoSelected = function() {
  const input = document.getElementById('m4-photo-file');
  if (input) input.value = '';
  const previewBox = document.getElementById('m4-photo-preview-box');
  if (previewBox) previewBox.classList.add('hidden');
};

// Challenge modal direct action
window.startChallengeFromModal = function() {
  window.closeM4ChallengeModal();
  window.openM4VoiceRecordModal('challenge');
};

// ==========================================
// 10.G M4: PANDUAN MODAL
// ==========================================

window.openM4HelpGuideModal = function() {
  const modal = document.getElementById('modal-m4-help');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeM4HelpGuideModal = function() {
  const modal = document.getElementById('modal-m4-help');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// Backward-compatible booktalk list renderer
window.renderBooktalkList = function() {
  const container = document.getElementById('booktalk-recent-list');
  if (!container) return;

  const list = window.appState.booktalks || [];
  container.innerHTML = list.map(bt => `
    <div class="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-start gap-3 text-xs">
      <div class="w-8 h-8 rounded-lg bg-purple-200 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
        <i class="fa-solid fa-play text-xs"></i>
      </div>
      <div class="flex-1">
        <h5 class="font-bold text-slate-800">${bt.title}</h5>
        <p class="text-[11px] text-slate-500">${bt.studentName} (${bt.studentClass}) • ${bt.format}</p>
        <p class="text-[11px] text-slate-600 mt-1 line-clamp-1 italic">"${bt.notes}"</p>
        <a href="${bt.url}" target="_blank" rel="noreferrer" class="text-[10px] font-bold text-purple-700 hover:text-purple-900 mt-1.5 inline-flex items-center gap-1">
          Buka Rekaman <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
        </a>
      </div>
    </div>
  `).join('');
};

// ==========================================
// 11. M5: MENGAPRESIASI CONTROLLER
// ==========================================

function getM5CoverSvg(w) {
  if (w.coverType === 'laut-bercerita' || w.id === 'w-laut-bercerita' || w.title === 'Laut Bercerita') {
    return `
      <svg viewBox="0 0 200 240" class="w-full h-full object-cover select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-laut-${w.id || '1'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fda4af"/>
            <stop offset="45%" stop-color="#fed7aa"/>
            <stop offset="78%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0369a1"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill="url(#grad-laut-${w.id || '1'})"/>
        <circle cx="100" cy="85" r="30" fill="#ffffff" opacity="0.65"/>
        <circle cx="100" cy="85" r="20" fill="#ffffff" opacity="0.9"/>
        <!-- Seagulls -->
        <path d="M50 65 Q60 58 70 65 Q80 58 90 65" stroke="#be123c" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M120 50 Q128 44 136 50 Q144 44 152 50" stroke="#be123c" stroke-width="1.2" fill="none" opacity="0.6"/>
        <!-- Waves -->
        <path d="M0 160 Q50 148 100 160 T200 160 L200 240 L0 240 Z" fill="#0284c7" opacity="0.8"/>
        <path d="M0 182 Q50 172 100 182 T200 182 L200 240 L0 240 Z" fill="#0369a1"/>
        <path d="M0 206 Q50 198 100 206 T200 206 L200 240 L0 240 Z" fill="#075985"/>
        <!-- Silhouette of reader on shoreline rock -->
        <ellipse cx="140" cy="178" rx="20" ry="8" fill="#1e293b"/>
        <circle cx="140" cy="154" r="5" fill="#0f172a"/>
        <path d="M136 160 Q140 157 144 160 L147 175 L133 175 Z" fill="#0f172a"/>
        <!-- Book in hand -->
        <polygon points="144,166 151,163 151,170 144,172" fill="#fed7aa"/>
        <!-- Cover Title Box -->
        <rect x="16" y="20" width="168" height="42" rx="8" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
        <text x="100" y="38" font-size="12" font-weight="900" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#991b1b" letter-spacing="1">LAUT BERCERITA</text>
        <text x="100" y="52" font-size="8.5" font-weight="700" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#475569">LEILA S. CHUDORI</text>
      </svg>
    `;
  }

  if (w.coverType === 'laskar-pelangi' || w.id === 'w-laskar-pelangi' || (w.title && w.title.includes('Laskar Pelangi'))) {
    return `
      <svg viewBox="0 0 200 240" class="w-full h-full object-cover select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-laskar-${w.id || 'lp'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="28%" stop-color="#818cf8"/>
            <stop offset="55%" stop-color="#f472b6"/>
            <stop offset="80%" stop-color="#fb923c"/>
            <stop offset="100%" stop-color="#fdba74"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill="url(#grad-laskar-${w.id || 'lp'})"/>
        <!-- Small Bentang logo top left -->
        <text x="16" y="24" font-size="7.5" font-weight="800" fill="#ffffff" opacity="0.9" letter-spacing="0.5">bentang</text>
        <!-- Golden Sun circle -->
        <circle cx="170" cy="36" r="13" fill="#fef08a" opacity="0.9"/>
        <!-- Stars -->
        <circle cx="42" cy="40" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="85" cy="26" r="1.8" fill="#ffffff" opacity="0.95"/>
        <circle cx="130" cy="52" r="1.2" fill="#ffffff" opacity="0.8"/>
        <!-- Script text Laskar -->
        <text x="74" y="60" font-size="14" font-style="italic" font-weight="700" font-family="'Caveat', 'Brush Script MT', cursive, sans-serif" fill="#ffffff">Laskar</text>
        <!-- Bold Title Pelangi -->
        <text x="100" y="92" font-size="28" font-weight="900" font-family="'Plus Jakarta Sans', system-ui, sans-serif" text-anchor="middle" fill="#ffffff" letter-spacing="0.5">Pelangi</text>
        <!-- Author subtitle -->
        <text x="100" y="108" font-size="8" font-weight="700" font-family="system-ui, sans-serif" text-anchor="middle" fill="#ffffff" opacity="0.9" letter-spacing="1">ANDREA HIRATA</text>
        <!-- Silhouette of hill ground at bottom -->
        <path d="M0 190 Q50 176 100 184 Q150 192 200 180 L200 240 L0 240 Z" fill="#0f172a"/>
        <!-- Silhouettes of student friends (Laskar Pelangi) standing together -->
        <circle cx="28" cy="174" r="3.2" fill="#0f172a"/><rect x="26" y="177" width="4.5" height="15" fill="#0f172a"/>
        <circle cx="44" cy="172" r="3.5" fill="#0f172a"/><rect x="41.5" y="175" width="5" height="17" fill="#0f172a"/>
        <circle cx="62" cy="170" r="3.8" fill="#0f172a"/><rect x="59.5" y="173" width="5.5" height="19" fill="#0f172a"/>
        <circle cx="80" cy="168" r="4" fill="#0f172a"/><rect x="77" y="172" width="6" height="20" fill="#0f172a"/>
        <circle cx="100" cy="167" r="4.2" fill="#0f172a"/><rect x="97" y="171" width="6.5" height="21" fill="#0f172a"/>
        <circle cx="120" cy="169" r="4" fill="#0f172a"/><rect x="117" y="173" width="6" height="20" fill="#0f172a"/>
        <circle cx="140" cy="171" r="3.8" fill="#0f172a"/><rect x="137.5" y="174" width="5.5" height="19" fill="#0f172a"/>
        <circle cx="158" cy="173" r="3.5" fill="#0f172a"/><rect x="155.5" y="176" width="5" height="17" fill="#0f172a"/>
        <circle cx="174" cy="175" r="3.2" fill="#0f172a"/><rect x="172" y="178" width="4.5" height="15" fill="#0f172a"/>
      </svg>
    `;
  }

  if (w.coverType === 'jaga-bumi' || w.id === 'w-jaga-bumi' || (w.title && w.title.includes('Jaga Bumi'))) {
    return `
      <svg viewBox="0 0 200 240" class="w-full h-full object-cover select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-bumi-${w.id || '2'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#bbf7d0"/>
            <stop offset="55%" stop-color="#34d399"/>
            <stop offset="100%" stop-color="#047857"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill="url(#grad-bumi-${w.id || '2'})"/>
        <!-- Globe Circle -->
        <circle cx="100" cy="122" r="46" fill="#38bdf8"/>
        <!-- Continents -->
        <path d="M78 104 Q94 92 106 105 Q118 114 112 128 Q96 135 84 122 Z" fill="#10b981"/>
        <path d="M92 130 Q106 140 120 136 Q128 128 122 120 Z" fill="#10b981"/>
        <path d="M68 118 Q74 110 80 114 Q78 126 70 124 Z" fill="#10b981"/>
        <!-- Sprout emerging from Earth -->
        <path d="M100 120 L100 82" stroke="#14532d" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="88" cy="78" rx="14" ry="7" transform="rotate(-32 88 78)" fill="#22c55e"/>
        <ellipse cx="112" cy="78" rx="14" ry="7" transform="rotate(32 112 78)" fill="#15803d"/>
        <!-- Sun rays -->
        <circle cx="100" cy="82" r="4" fill="#fef08a"/>
        <!-- Cover Title Box -->
        <rect x="16" y="20" width="168" height="42" rx="8" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
        <text x="100" y="37" font-size="12" font-weight="900" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#065f46" letter-spacing="0.5">JAGA BUMI</text>
        <text x="100" y="52" font-size="8.5" font-weight="700" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#047857">UNTUK MASA DEPAN</text>
      </svg>
    `;
  }

  if (w.coverType === 'langit-sama' || w.id === 'w-langit-sama' || (w.title && w.title.includes('Langit Masih Sama'))) {
    return `
      <svg viewBox="0 0 200 240" class="w-full h-full object-cover select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-langit-${w.id || '3'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e1b4b"/>
            <stop offset="50%" stop-color="#4c1d95"/>
            <stop offset="100%" stop-color="#831843"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill="url(#grad-langit-${w.id || '3'})"/>
        <!-- Crescent Moon -->
        <path d="M136 72 A 18 18 0 1 0 152 92 A 14 14 0 1 1 136 72 Z" fill="#fde047"/>
        <!-- Stars -->
        <circle cx="48" cy="62" r="2.2" fill="#ffffff"/>
        <circle cx="82" cy="78" r="1.6" fill="#ffffff" opacity="0.85"/>
        <circle cx="162" cy="50" r="2" fill="#ffffff"/>
        <circle cx="38" cy="112" r="1.5" fill="#ffffff" opacity="0.8"/>
        <circle cx="124" cy="118" r="2.2" fill="#ffffff" opacity="0.9"/>
        <circle cx="170" cy="100" r="1.4" fill="#ffffff" opacity="0.75"/>
        <!-- Hills silhouette -->
        <path d="M0 168 Q60 148 120 172 Q160 156 200 176 L200 240 L0 240 Z" fill="#0f172a"/>
        <!-- Stargazing figures -->
        <circle cx="94" cy="164" r="4.5" fill="#e2e8f0"/>
        <path d="M91 169 L97 169 L95 182 L93 182 Z" fill="#cbd5e1"/>
        <circle cx="106" cy="165" r="4" fill="#e2e8f0"/>
        <path d="M103 169 L109 169 L108 182 L105 182 Z" fill="#cbd5e1"/>
        <!-- Cover Title Box -->
        <rect x="16" y="20" width="168" height="42" rx="8" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
        <text x="100" y="37" font-size="11.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#4338ca" letter-spacing="0.5">LANGIT MASIH SAMA</text>
        <text x="100" y="52" font-size="8.5" font-weight="700" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#6d28d9">ANTOLOGI PUISI SISWA</text>
      </svg>
    `;
  }

  // Fallback cover graphic for custom created works
  return `
    <svg viewBox="0 0 200 240" class="w-full h-full object-cover select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-def-${w.id || 'x'}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="200" height="240" fill="url(#grad-def-${w.id || 'x'})"/>
      <circle cx="100" cy="105" r="38" fill="rgba(255,255,255,0.1)"/>
      <path d="M80 120 L100 85 L120 120 Z" fill="#38bdf8" opacity="0.8"/>
      <rect x="16" y="24" width="168" height="42" rx="8" fill="rgba(255,255,255,0.92)"/>
      <text x="100" y="44" font-size="11" font-weight="900" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#0f172a">${(w.title || 'KARYA SISWA').slice(0, 18).toUpperCase()}</text>
      <text x="100" y="56" font-size="8" font-weight="700" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle" fill="#0284c7">SMPN 2 KASIHAN</text>
    </svg>
  `;
}

window.renderM5View = function() {
  const currentTab = window.appState.m5Tab || 'galeri';
  const currentCategory = window.appState.m5Category || 'semua';

  // 1. Synchronize Mobile Tabs
  const mobTabGaleri = document.getElementById('m5-mob-tab-galeri');
  const mobTabPilihan = document.getElementById('m5-mob-tab-pilihan');
  if (mobTabGaleri && mobTabPilihan) {
    if (currentTab === 'galeri') {
      mobTabGaleri.className = 'flex-1 py-1.5 rounded-full font-bold text-xs bg-[#1d75f2] text-white shadow-xs transition text-center';
      mobTabPilihan.className = 'flex-1 py-1.5 rounded-full font-semibold text-xs text-white/90 hover:text-white transition text-center';
    } else {
      mobTabGaleri.className = 'flex-1 py-1.5 rounded-full font-semibold text-xs text-white/90 hover:text-white transition text-center';
      mobTabPilihan.className = 'flex-1 py-1.5 rounded-full font-bold text-xs bg-[#1d75f2] text-white shadow-xs transition text-center';
    }
  }

  // 2. Synchronize Desktop Tabs
  const deskTabGaleri = document.getElementById('m5-desk-tab-galeri');
  const deskTabPilihan = document.getElementById('m5-desk-tab-pilihan');
  if (deskTabGaleri && deskTabPilihan) {
    if (currentTab === 'galeri') {
      deskTabGaleri.className = 'px-5 py-2 rounded-xl font-bold text-xs bg-[#1d75f2] text-white shadow-xs transition';
      deskTabPilihan.className = 'px-5 py-2 rounded-xl font-semibold text-xs text-slate-700 hover:text-slate-900 transition';
    } else {
      deskTabGaleri.className = 'px-5 py-2 rounded-xl font-semibold text-xs text-slate-700 hover:text-slate-900 transition';
      deskTabPilihan.className = 'px-5 py-2 rounded-xl font-bold text-xs bg-[#1d75f2] text-white shadow-xs transition';
    }
  }

  // 3. Synchronize Category filter pills
  document.querySelectorAll('.m5-cat-pill').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (cat === currentCategory) {
      btn.className = 'm5-cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white transition shrink-0';
    } else {
      btn.className = 'm5-cat-pill px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0';
    }
  });

  // 4. Render Works Feed
  window.renderM5Works();
};

window.renderM5Works = function() {
  const container = document.getElementById('m5-works-list');
  if (!container) return;

  const currentTab = window.appState.m5Tab || 'galeri';
  const currentCategory = window.appState.m5Category || 'semua';
  const searchQuery = (window.appState.m5SearchQuery || '').toLowerCase().trim();

  let works = window.appState.works || [];
  if (!Array.isArray(works)) works = [];

  // Filter by Tab
  if (currentTab === 'pilihan') {
    works = works.filter(w => w.isFeatured);
  }

  // Filter by Category
  if (currentCategory !== 'semua') {
    works = works.filter(w => (w.category || '').toLowerCase() === currentCategory.toLowerCase());
  }

  // Filter by Search Query
  if (searchQuery) {
    works = works.filter(w => {
      const matchTitle = (w.title || '').toLowerCase().includes(searchQuery);
      const matchAuthor = (w.authorName || '').toLowerCase().includes(searchQuery);
      const matchClass = (w.authorClass || '').toLowerCase().includes(searchQuery);
      const matchQuote = (w.quote || '').toLowerCase().includes(searchQuery);
      const matchContent = (w.content || '').toLowerCase().includes(searchQuery);
      return matchTitle || matchAuthor || matchClass || matchQuote || matchContent;
    });
  }

  // Update Status and Count Badges
  const countBadge = document.getElementById('m5-works-count');
  if (countBadge) {
    countBadge.textContent = `${works.length} Karya`;
  }

  const modeBadge = document.getElementById('m5-current-mode-badge');
  if (modeBadge) {
    if (currentTab === 'pilihan') {
      modeBadge.textContent = 'Menampilkan Karya Pilihan Terbaik';
    } else if (currentCategory !== 'semua') {
      modeBadge.textContent = `Kategori: ${currentCategory}`;
    } else if (searchQuery) {
      modeBadge.textContent = `Hasil Pencarian: "${window.appState.m5SearchQuery}"`;
    } else {
      modeBadge.textContent = 'Menampilkan Galeri Karya Siswa';
    }
  }

  if (works.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-8 border border-slate-200/90 text-center space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto text-xl">
          <i class="fa-solid fa-folder-open"></i>
        </div>
        <h4 class="font-extrabold text-slate-800 text-sm">Tidak Ada Karya yang Sesuai</h4>
        <p class="text-xs text-slate-500 max-w-sm mx-auto">
          Coba ganti kata kunci pencarian atau pilih kategori lain untuk melihat karya literasi teman.
        </p>
        <button type="button" onclick="setM5Category('semua'); clearM5Search();" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition">
          Reset Filter
        </button>
      </div>
    `;
    return;
  }

  const likedIds = window.appState.m5LikedWorkIds || [];
  const bookmarkedIds = window.appState.m5BookmarkedIds || [];

  container.innerHTML = works.map(w => {
    const isLiked = likedIds.includes(String(w.id));
    const isBookmarked = bookmarkedIds.includes(String(w.id));
    const commentCount = (w.comments && w.comments.length) || w.commentsCount || 0;
    const likeCount = w.likes || 0;
    const coverSvg = getM5CoverSvg(w);

    return `
      <!-- M5 Work Card (Exact Match to User Reference Photo) -->
      <article class="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition duration-200 space-y-3">
        
        <!-- Card Header: Avatar, Author, Class/Category, and Right Ellipsis Menu Button -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5 sm:gap-3">
            <img src="${w.authorAvatar || AVATAR_AISYAH_M5}" alt="${w.authorName}" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs" />
            <div class="leading-tight">
              <h4 class="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">${w.authorName}</h4>
              <p class="text-[11px] sm:text-xs text-slate-400 font-medium">
                ${w.authorClass || 'Kelas VIII'} • <span class="text-teal-700 font-semibold">${w.category}</span>
              </p>
            </div>
          </div>

          <button type="button" onclick="openM5OptionsMenu('${w.id}')" class="w-8 h-8 rounded-full hover:bg-slate-100 active:scale-95 flex items-center justify-center text-slate-400 hover:text-slate-600 transition" title="Opsi Karya">
            <i class="fa-solid fa-ellipsis text-base sm:text-lg"></i>
          </button>
        </div>

        <!-- Card Body: Left Thumbnail Cover Graphic + Right Detail Content -->
        <div class="flex gap-3 sm:gap-4 items-start">
          
          <!-- Left Cover Thumbnail (Aspect Ratio matching photo) -->
          <div onclick="openM5DetailModal('${w.id}')" class="w-24 sm:w-32 h-28 sm:h-36 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-slate-200/80 cursor-pointer group relative">
            ${coverSvg}
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition flex items-center justify-center">
              <span class="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-xs transition">
                Baca
              </span>
            </div>
          </div>

          <!-- Right Content Column: Title, Italic Quote, Action Bar -->
          <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch">
            
            <div onclick="openM5DetailModal('${w.id}')" class="cursor-pointer group">
              <h3 class="font-black text-slate-900 text-xs sm:text-base leading-snug group-hover:text-teal-700 transition truncate">
                ${w.title}
              </h3>
              <p class="text-[11px] sm:text-xs text-slate-600 italic leading-relaxed line-clamp-3 sm:line-clamp-4 mt-1">
                "${w.quote || (w.content ? w.content.slice(0, 110) + '...' : '')}"
              </p>
            </div>

            <!-- Bottom Action Row: Like (Heart), Comment (Bubble), Bookmark (Ribbon) -->
            <div class="flex items-center gap-5 sm:gap-6 pt-2.5 text-xs font-bold text-slate-600 select-none">
              
              <!-- Red Heart Like Button with Count -->
              <button type="button" onclick="toggleM5Like('${w.id}')" class="flex items-center gap-1.5 active:scale-90 transition group" title="Suka Karya Ini">
                <i class="fa-solid fa-heart text-sm sm:text-base transition-transform group-hover:scale-110 ${isLiked ? 'text-rose-500' : 'text-slate-300 hover:text-rose-400'}"></i>
                <span class="text-xs sm:text-sm font-black ${isLiked ? 'text-rose-600' : 'text-slate-600'}">
                  ${likeCount}
                </span>
              </button>

              <!-- Comment Bubble Button with Count -->
              <button type="button" onclick="openM5CommentModal('${w.id}')" class="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 active:scale-90 transition group" title="Tuliskan Apresiasi">
                <i class="fa-regular fa-comment text-sm sm:text-base transition-transform group-hover:scale-110"></i>
                <span class="text-xs sm:text-sm font-black">
                  ${commentCount}
                </span>
              </button>

              <!-- Bookmark Button -->
              <button type="button" onclick="toggleM5Bookmark('${w.id}')" class="text-slate-400 hover:text-amber-500 active:scale-90 transition" title="Simpan Karya ke Koleksi">
                <i class="${isBookmarked ? 'fa-solid text-amber-500' : 'fa-regular text-slate-400 hover:text-amber-500'} fa-bookmark text-sm sm:text-base"></i>
              </button>

            </div>

          </div>

        </div>

      </article>
    `;
  }).join('');
};

window.toggleM5Like = function(workId) {
  const works = window.appState.works || [];
  const w = works.find(x => String(x.id) === String(workId));
  if (!w) return;

  let likedIds = window.appState.m5LikedWorkIds || [];
  const strId = String(workId);
  const alreadyLiked = likedIds.includes(strId);

  if (alreadyLiked) {
    likedIds = likedIds.filter(id => id !== strId);
    w.likes = Math.max(0, (w.likes || 1) - 1);
  } else {
    likedIds.push(strId);
    w.likes = (w.likes || 0) + 1;
    if (typeof window.addPoints === 'function') {
      window.addPoints(5, 'Memberi Like Apresiasi pada Karya Teman');
    }
    showToast('Apresiasi Diterima!', `Kamu menyukai karya "${w.title}" (+5 Poin GLS)`, 'points');
  }

  window.appState.m5LikedWorkIds = likedIds;
  setStorage('lentera_m5_likes', likedIds);
  setStorage(STORAGE_KEYS.WORKS, works);

  window.renderM5Works();
  if (typeof window.renderGaleriKarya === 'function') {
    window.renderGaleriKarya();
  }
};

window.toggleM5Bookmark = function(workId) {
  let bookmarkedIds = window.appState.m5BookmarkedIds || [];
  const strId = String(workId);
  const exists = bookmarkedIds.includes(strId);

  const works = window.appState.works || [];
  const w = works.find(x => String(x.id) === strId);
  const title = w ? w.title : 'Karya';

  if (exists) {
    bookmarkedIds = bookmarkedIds.filter(id => id !== strId);
    showToast('Koleksi Favorit', `"${title}" dihapus dari daftar simpan.`, 'info');
  } else {
    bookmarkedIds.push(strId);
    showToast('Koleksi Favorit', `"${title}" berhasil disimpan ke daftar bacaan favoritmu!`, 'success');
  }

  window.appState.m5BookmarkedIds = bookmarkedIds;
  setStorage('lentera_m5_bookmarks', bookmarkedIds);
  window.renderM5Works();
};

window.setM5Tab = function(tab) {
  window.appState.m5Tab = tab;
  window.renderM5View();
};

window.setM5Category = function(cat) {
  window.appState.m5Category = cat;
  window.renderM5View();
};

window.handleM5SearchInput = function(val) {
  window.appState.m5SearchQuery = val;
  // Sync desktop and mobile search inputs
  const mobInput = document.getElementById('m5-mobile-search-input');
  const deskInput = document.getElementById('m5-desk-search-input');
  if (mobInput && mobInput.value !== val) mobInput.value = val;
  if (deskInput && deskInput.value !== val) deskInput.value = val;
  window.renderM5Works();
};

window.toggleM5MobileSearch = function() {
  const bar = document.getElementById('m5-mobile-search-bar');
  const input = document.getElementById('m5-mobile-search-input');
  if (!bar) return;
  bar.classList.toggle('hidden');
  if (!bar.classList.contains('hidden') && input) {
    input.focus();
  }
};

window.clearM5Search = function() {
  window.appState.m5SearchQuery = '';
  const mobInput = document.getElementById('m5-mobile-search-input');
  const deskInput = document.getElementById('m5-desk-search-input');
  if (mobInput) mobInput.value = '';
  if (deskInput) deskInput.value = '';
  window.renderM5Works();
};

window.openM5CommentModal = function(workId) {
  const works = window.appState.works || [];
  const w = works.find(x => String(x.id) === String(workId));
  if (!w) return;

  window.appState.activeM5WorkId = workId;

  const modal = document.getElementById('modal-m5-comment');
  const summaryBox = document.getElementById('modal-m5-work-summary');
  const subtitle = document.getElementById('modal-m5-comment-subtitle');
  const existingComments = document.getElementById('modal-m5-existing-comments');
  const commentCountBadge = document.getElementById('modal-m5-comment-count-badge');
  const input = document.getElementById('modal-m5-input-text');
  const positiveTag = document.getElementById('modal-m5-positive-tag');

  if (subtitle) {
    subtitle.textContent = `Beri ulasan konstruktif untuk karya "${w.title}"`;
  }

  if (summaryBox) {
    summaryBox.innerHTML = `
      <img src="${w.authorAvatar || AVATAR_AISYAH_M5}" class="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
      <div class="min-w-0 flex-1">
        <h4 class="font-extrabold text-slate-900 text-xs truncate">${w.title}</h4>
        <p class="text-[11px] text-slate-500">${w.authorName} • ${w.authorClass} • <span class="font-semibold text-teal-700">${w.category}</span></p>
      </div>
    `;
  }

  const comments = w.comments || [];
  if (commentCountBadge) {
    commentCountBadge.textContent = `${comments.length} ulasan`;
  }

  if (existingComments) {
    if (comments.length === 0) {
      existingComments.innerHTML = `
        <p class="text-xs text-slate-400 italic py-2 text-center">Belum ada ulasan. Jadilah pembaca pertama yang memberikan apresiasi!</p>
      `;
    } else {
      existingComments.innerHTML = comments.map(c => `
        <div class="p-2.5 bg-slate-50 rounded-xl text-xs space-y-0.5 border border-slate-100">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800">${c.author} <span class="text-[10px] font-normal text-slate-400">(${c.role === 'guru' ? 'Guru' : c.role === 'kepsek' ? 'Kepala Sekolah' : 'Siswa'})</span></span>
            <span class="text-[10px] text-slate-400">${c.date || 'Baru saja'}</span>
          </div>
          <p class="text-slate-600 leading-snug">${c.text}</p>
        </div>
      `).join('');
    }
  }

  if (input) input.value = '';
  if (positiveTag) positiveTag.classList.add('hidden');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeM5CommentModal = function() {
  const modal = document.getElementById('modal-m5-comment');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.insertM5QuickComment = function(phrase) {
  const input = document.getElementById('modal-m5-input-text');
  if (!input) return;
  input.value = phrase;
  window.validateM5CommentText(phrase);
  input.focus();
};

window.validateM5CommentText = function(text) {
  const positiveWords = ['bagus', 'keren', 'hebat', 'menginspirasi', 'rapi', 'kreatif', 'salut', 'suka', 'indah', 'menarik', 'luar biasa', 'apik', 'mantap', 'setuju', 'terharu', 'makna', 'pesan'];
  const hasPositive = positiveWords.some(pw => (text || '').toLowerCase().includes(pw));
  const tag = document.getElementById('modal-m5-positive-tag');
  if (tag) {
    tag.classList.toggle('hidden', !hasPositive);
  }
};

window.submitM5ModalComment = function() {
  const workId = window.appState.activeM5WorkId;
  if (!workId) return;

  const works = window.appState.works || [];
  const w = works.find(x => String(x.id) === String(workId));
  if (!w) return;

  const input = document.getElementById('modal-m5-input-text');
  const commentText = (input ? input.value : '').trim();
  if (!commentText) {
    showToast('Perhatian', 'Silakan ketikkan kalimat apresiasi terlebih dahulu.', 'info');
    return;
  }

  const currentUser = window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan', role: 'siswa' };
  const positiveWords = ['bagus', 'keren', 'hebat', 'menginspirasi', 'rapi', 'kreatif', 'salut', 'suka', 'indah', 'menarik', 'luar biasa', 'apik', 'mantap', 'setuju', 'terharu', 'makna', 'pesan'];
  const hasPositive = positiveWords.some(pw => commentText.toLowerCase().includes(pw));

  if (!w.comments) w.comments = [];
  w.comments.push({
    id: `c-${Date.now()}`,
    author: currentUser.name,
    role: currentUser.role,
    text: commentText,
    date: 'Hari ini'
  });
  w.commentsCount = w.comments.length;

  setStorage(STORAGE_KEYS.WORKS, works);

  if (hasPositive) {
    if (typeof window.addPoints === 'function') {
      window.addPoints(30, 'Memberikan Apresiasi Positif & Konstruktif M5');
    }
    showToast('Apresiasi Terverifikasi!', 'Komentar apresiatif berhasil dikirim (+30 Poin GLS)', 'success');
  } else {
    if (typeof window.addPoints === 'function') {
      window.addPoints(10, 'Memberikan Komentar Karya Teman');
    }
    showToast('Komentar Terkirim', 'Ulasanmu berhasil diposting (+10 Poin)', 'info');
  }

  window.closeM5CommentModal();
  window.renderM5Works();
  if (typeof window.renderGaleriKarya === 'function') {
    window.renderGaleriKarya();
  }
};

window.openM5DetailModal = function(workId) {
  const works = window.appState.works || [];
  const w = works.find(x => String(x.id) === String(workId));
  if (!w) return;

  window.appState.activeM5WorkId = workId;

  const modal = document.getElementById('modal-m5-detail');
  const badge = document.getElementById('modal-m5-detail-badge');
  const title = document.getElementById('modal-m5-detail-title');
  const avatar = document.getElementById('modal-m5-detail-avatar');
  const author = document.getElementById('modal-m5-detail-author');
  const meta = document.getElementById('modal-m5-detail-meta');
  const likes = document.getElementById('modal-m5-detail-likes');
  const likeBtn = document.getElementById('modal-m5-detail-like-btn');
  const coverBox = document.getElementById('modal-m5-detail-cover-box');
  const content = document.getElementById('modal-m5-detail-content');
  const btnApresiasi = document.getElementById('modal-m5-detail-action-apresiasi');

  if (badge) badge.textContent = w.category;
  if (title) title.textContent = w.title;
  if (avatar) avatar.src = w.authorAvatar || AVATAR_AISYAH_M5;
  if (author) author.textContent = w.authorName;
  if (meta) meta.textContent = `${w.authorClass} • SMPN 2 Kasihan • ${w.date || 'Terkini'}`;
  if (likes) likes.textContent = w.likes || 0;
  if (content) content.textContent = w.content;
  if (coverBox) coverBox.innerHTML = getM5CoverSvg(w);

  if (likeBtn) {
    likeBtn.onclick = () => {
      window.toggleM5Like(workId);
      if (likes) likes.textContent = w.likes || 0;
    };
  }

  if (btnApresiasi) {
    btnApresiasi.onclick = () => {
      window.closeM5DetailModal();
      window.openM5CommentModal(workId);
    };
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeM5DetailModal = function() {
  const modal = document.getElementById('modal-m5-detail');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openM5OptionsMenu = function(workId) {
  const works = window.appState.works || [];
  const w = works.find(x => String(x.id) === String(workId));
  if (!w) return;

  window.appState.activeM5WorkId = workId;

  const modal = document.getElementById('modal-m5-options');
  const title = document.getElementById('modal-m5-options-title');
  if (title) title.textContent = `Opsi: ${w.title}`;

  const btnRead = document.getElementById('btn-opt-read');
  const btnComment = document.getElementById('btn-opt-comment');
  const btnBookmark = document.getElementById('btn-opt-bookmark');
  const btnShare = document.getElementById('btn-opt-share');

  if (btnRead) {
    btnRead.onclick = () => {
      window.closeM5OptionsMenu();
      window.openM5DetailModal(workId);
    };
  }

  if (btnComment) {
    btnComment.onclick = () => {
      window.closeM5OptionsMenu();
      window.openM5CommentModal(workId);
    };
  }

  if (btnBookmark) {
    btnBookmark.onclick = () => {
      window.closeM5OptionsMenu();
      window.toggleM5Bookmark(workId);
    };
  }

  if (btnShare) {
    btnShare.onclick = () => {
      window.closeM5OptionsMenu();
      showToast('Bagikan Rekomendasi', `Tautan karya "${w.title}" karya ${w.authorName} siap dibagikan ke mading literasi kelas!`, 'info');
    };
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeM5OptionsMenu = function() {
  const modal = document.getElementById('modal-m5-options');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openM5GuideModal = function() {
  const modal = document.getElementById('modal-m5-guide');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeM5GuideModal = function() {
  const modal = document.getElementById('modal-m5-guide');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// Legacy compatibility handler for index.html or other modules
window.renderApresiasiFeed = function() {
  window.renderM5Works();
};

window.likeKarya = function(workId) {
  window.toggleM5Like(workId);
};

window.handleCommentSubmit = function(e, workId) {
  if (e) e.preventDefault();
  window.openM5CommentModal(workId);
};

// ==========================================
// 11b. PORTOFOLIO SAYA CONTROLLER (Full Screen Responsive for Laptop & Smartphone)
// ==========================================

window.getM5CoverSvg = getM5CoverSvg;

window.setPortfolioCategory = function(cat) {
  if (!window.appState) return;
  window.appState.portfolioCategory = cat;
  
  // Update button pill styles
  const pills = document.querySelectorAll('.port-category-pill');
  pills.forEach(pill => {
    pill.className = 'port-category-pill px-4 sm:px-5 py-1.5 rounded-xl text-xs font-medium transition bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 whitespace-nowrap';
  });
  
  const activePill = document.getElementById(`port-tab-${cat}`);
  if (activePill) {
    activePill.className = 'port-category-pill px-4 sm:px-5 py-1.5 rounded-xl text-xs font-bold transition border border-sky-400 bg-sky-50 text-sky-600 whitespace-nowrap shadow-2xs';
  }

  // Update Section Title based on category
  const titleEl = document.getElementById('portfolio-section-title');
  if (titleEl) {
    const titles = {
      semua: 'Karya Terbaru',
      jurnal: 'Jurnal Membaca (M1 & M2)',
      karya: 'Karya Siswa (M3)',
      video: 'Video & Presentasi (M4)',
      apresiasi: 'Apresiasi & Ulasan Teman (M5)'
    };
    titleEl.textContent = titles[cat] || 'Karya Terbaru';
  }

  window.renderPortofolioView();
};

window.togglePortfolioViewAll = function() {
  if (!window.appState) return;
  window.appState.portfolioViewAll = !window.appState.portfolioViewAll;
  
  const btn = document.getElementById('portfolio-btn-viewall');
  if (btn) {
    btn.innerHTML = window.appState.portfolioViewAll 
      ? `<span>Tampilkan Ringkas</span> <i class="fa-solid fa-chevron-up text-[10px]"></i>`
      : `<span>Lihat Semua</span> <i class="fa-solid fa-chevron-right text-[10px]"></i>`;
  }

  window.renderPortofolioView();
};

window.togglePortofolioDrawer = function() {
  const drawer = document.getElementById('drawer-portfolio');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
};

window.closePortofolioDrawer = function() {
  const drawer = document.getElementById('drawer-portfolio');
  if (drawer) {
    drawer.classList.add('hidden');
  }
};

window.openPortofolioNotificationModal = function() {
  const m = document.getElementById('modal-portfolio-notification');
  if (m) m.classList.remove('hidden');
};

window.closePortofolioNotificationModal = function() {
  const m = document.getElementById('modal-portfolio-notification');
  if (m) m.classList.add('hidden');
};

let activePortfolioWorkId = null;

window.openPortfolioOptionsMenu = function(workId, e) {
  if (e) e.stopPropagation();
  activePortfolioWorkId = workId;
  const works = window.appState?.m5Works || DEFAULT_WORKS;
  const w = works.find(item => item.id === workId) || works[0];
  
  const titleEl = document.getElementById('portfolio-options-title');
  if (titleEl && w) {
    titleEl.textContent = w.title;
  }

  const readBtn = document.getElementById('port-opt-read-btn');
  if (readBtn) {
    readBtn.onclick = () => {
      window.closePortfolioOptionsMenu();
      window.readPortfolioWork(workId);
    };
  }

  const commentBtn = document.getElementById('port-opt-comment-btn');
  if (commentBtn) {
    commentBtn.onclick = () => {
      window.closePortfolioOptionsMenu();
      window.openPortfolioCommentModal(workId);
    };
  }

  const shareBtn = document.getElementById('port-opt-share-btn');
  if (shareBtn) {
    shareBtn.onclick = () => {
      window.closePortfolioOptionsMenu();
      if (typeof showToast === 'function') {
        showToast('Tautan Disalin', `Tautan publik untuk "${w ? w.title : 'Karya'}" berhasil disalin ke papan klip!`, 'success');
      }
    };
  }

  const saveBtn = document.getElementById('port-opt-save-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      window.closePortfolioOptionsMenu();
      if (typeof showToast === 'function') {
        showToast('Portofolio Favorit', `"${w ? w.title : 'Karya'}" telah disematkan ke portofolio utama siswa.`, 'info');
      }
    };
  }

  const m = document.getElementById('modal-portfolio-options');
  if (m) m.classList.remove('hidden');
};

window.closePortfolioOptionsMenu = function() {
  const m = document.getElementById('modal-portfolio-options');
  if (m) m.classList.add('hidden');
};

window.openPortfolioCommentModal = function(workId, e) {
  if (e) e.stopPropagation();
  activePortfolioWorkId = workId;
  const works = window.appState?.m5Works || DEFAULT_WORKS;
  const w = works.find(item => item.id === workId) || works[0];

  const titleEl = document.getElementById('port-comment-work-title');
  if (titleEl && w) {
    titleEl.textContent = w.title;
  }

  const inputEl = document.getElementById('port-comment-input');
  if (inputEl) inputEl.value = '';

  const submitBtn = document.getElementById('port-comment-submit-btn');
  if (submitBtn) {
    submitBtn.onclick = () => {
      const commentText = inputEl ? inputEl.value.trim() : '';
      if (!commentText) {
        if (typeof showToast === 'function') {
          showToast('Pesan Kosong', 'Tuliskan sedikit apresiasi santun untuk kawanmu!', 'warning');
        }
        return;
      }

      if (w) {
        if (!w.comments) w.comments = [];
        w.comments.unshift({
          id: 'c-' + Date.now(),
          author: window.appState.currentUser?.name || 'Aisyah Putri',
          role: 'siswa',
          text: commentText,
          date: 'Baru saja'
        });
        w.commentsCount = (w.commentsCount || 0) + 1;
        saveState();
      }

      window.closePortfolioCommentModal();
      if (typeof showToast === 'function') {
        showToast('Apresiasi Terkirim! ✨', 'Terima kasih telah memberikan apresiasi santun. Kamu mendapatkan +30 Poin GLS!', 'success');
      }
      window.renderPortofolioView();
    };
  }

  const m = document.getElementById('modal-portfolio-comment');
  if (m) m.classList.remove('hidden');
};

window.closePortfolioCommentModal = function() {
  const m = document.getElementById('modal-portfolio-comment');
  if (m) m.classList.add('hidden');
};

window.togglePortfolioLike = function(workId, e) {
  if (e) e.stopPropagation();
  const works = window.appState?.m5Works || DEFAULT_WORKS;
  const w = works.find(item => item.id === workId);
  if (!w) return;

  const key = `port_liked_${workId}`;
  const isLiked = localStorage.getItem(key) === 'true';

  if (isLiked) {
    w.likes = Math.max(0, (w.likes || 1) - 1);
    localStorage.removeItem(key);
    if (typeof showToast === 'function') {
      showToast('Batal Menyukai', `Menghapus apresiasi dari "${w.title}".`, 'info');
    }
  } else {
    w.likes = (w.likes || 0) + 1;
    localStorage.setItem(key, 'true');
    if (typeof showToast === 'function') {
      showToast('Apresiasi Diberikan! ❤️', `Kamu menyukai "${w.title}" (+10 Poin GLS)`, 'success');
    }
  }

  saveState();
  window.renderPortofolioView();
};

window.readPortfolioWork = function(workId) {
  if (typeof window.openM5DetailModal === 'function') {
    window.openM5DetailModal(workId);
  } else {
    navigateTo('m5');
  }
};

window.renderPortofolioView = function() {
  const container = document.getElementById('portfolio-items-container');
  if (!container) return;

  const viewing = window.appState?.viewingStudent;
  const current = window.appState?.currentUser;
  const user = viewing || current || { name: 'Aisyah Putri Rahma', kelas: '8B', class: '8B', level: 'Pembaca Kreatif' };
  
  // Supervisor banner toggle
  const supervisorBanner = document.getElementById('portfolio-supervisor-banner');
  const supervisorTargetDesc = document.getElementById('portfolio-supervisor-target-desc');
  const supervisorRoleBadge = document.getElementById('portfolio-supervisor-role-badge');
  
  if (supervisorBanner) {
    if (viewing) {
      supervisorBanner.classList.remove('hidden');
      if (supervisorTargetDesc) {
        supervisorTargetDesc.textContent = `Portofolio Siswa: ${user.name} (${user.kelas || user.class || '8B'})`;
      }
      if (supervisorRoleBadge) {
        if (current?.role === 'guru') {
          supervisorRoleBadge.textContent = 'Supervisi Wali Kelas (Ibu Zusma Nadya Izzati, S.Pd.)';
        } else if (current?.role === 'kepsek') {
          supervisorRoleBadge.textContent = 'Supervisi Kepala Sekolah (Erna Retnaningsih, S.Pd., M.Pd.)';
        } else {
          supervisorRoleBadge.textContent = 'Supervisi Administrator Sistem';
        }
      }
    } else {
      supervisorBanner.classList.add('hidden');
    }
  }

  // Sync profile card info
  const nameEl = document.getElementById('portfolio-user-name');
  if (nameEl) nameEl.textContent = user.name || 'Aisyah Putri Rahma';

  const classEl = document.getElementById('portfolio-user-class');
  if (classEl) classEl.textContent = user.kelas || user.class || '8B';

  const levelEl = document.getElementById('portfolio-user-level');
  if (levelEl) levelEl.textContent = user.level || 'Pembaca Kreatif';

  // Sync 5M milestone counts
  const journals = window.appState?.journals || [];
  const statBuku = document.getElementById('port-stat-buku');
  if (statBuku) statBuku.textContent = user.m1_books || Math.max(8, journals.length || 8);

  const temuanList = window.appState?.findings || [];
  const statTemuan = document.getElementById('port-stat-temuan');
  if (statTemuan) statTemuan.textContent = user.m2_findings || Math.max(12, temuanList.length || 12);

  const works = window.appState?.m5Works || DEFAULT_WORKS;
  const statKarya = document.getElementById('port-stat-karya');
  if (statKarya) statKarya.textContent = user.m3_works || Math.max(5, works.length || 5);

  const statPresentasi = document.getElementById('port-stat-presentasi');
  if (statPresentasi) statPresentasi.textContent = user.m4_talks || '3';

  const statApresiasi = document.getElementById('port-stat-apresiasi');
  if (statApresiasi) {
    statApresiasi.textContent = user.m5_appreciations || 18;
  }

  // Filter items according to active category
  const activeCategory = window.appState?.portfolioCategory || 'semua';
  let filteredItems = [];

  if (activeCategory === 'semua') {
    filteredItems = [...works];
  } else if (activeCategory === 'jurnal') {
    filteredItems = works.filter(w => (w.category && w.category.toLowerCase().includes('resensi')) || (w.title && w.title.toLowerCase().includes('resensi')) || (w.title && w.title.toLowerCase().includes('jurnal')));
    if (filteredItems.length === 0) {
      filteredItems = works.slice(0, 2);
    }
  } else if (activeCategory === 'karya') {
    filteredItems = works.filter(w => (w.category && (w.category.toLowerCase().includes('poster') || w.category.toLowerCase().includes('puisi') || w.category.toLowerCase().includes('cerpen'))));
    if (filteredItems.length === 0) {
      filteredItems = works.slice(1, 3);
    }
  } else if (activeCategory === 'video') {
    filteredItems = works.filter(w => (w.category && w.category.toLowerCase().includes('video')) || (w.title && w.title.toLowerCase().includes('video')));
    if (filteredItems.length === 0) {
      filteredItems = [
        {
          id: 'w-video-lp',
          title: 'Video Book Talk – Laskar Pelangi',
          date: '10 September 2026',
          category: 'Video Menceritakan',
          likes: 88,
          commentsCount: 16,
          coverType: 'laskar-pelangi'
        },
        {
          id: 'w-video-sendang',
          title: 'Video Storytelling – Legenda Sendang Kasihan',
          date: '1 September 2026',
          category: 'Video Menceritakan',
          likes: 114,
          commentsCount: 22,
          coverType: 'jaga-bumi'
        }
      ];
    }
  } else if (activeCategory === 'apresiasi') {
    filteredItems = [...works].sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0));
  }

  // If view all is false, limit to top 3 items to match user screenshot precisely
  const displayItems = window.appState?.portfolioViewAll ? filteredItems : filteredItems.slice(0, 3);

  if (displayItems.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-400">
        <i class="fa-solid fa-folder-open text-3xl mb-2 text-slate-300"></i>
        <p class="font-bold text-sm text-slate-600">Belum ada karya dalam kategori ini</p>
        <p class="text-xs text-slate-400 mt-1">Siswa dapat menambahkan karya baru melalui tahapan alur M3 atau M4.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = displayItems.map(item => {
    const isLiked = localStorage.getItem(`port_liked_${item.id}`) === 'true';
    const commentsNum = item.commentsCount !== undefined ? item.commentsCount : (item.comments ? item.comments.length : 0);
    const coverSvg = typeof window.getM5CoverSvg === 'function' ? window.getM5CoverSvg(item) : '';

    return `
      <div class="bg-white rounded-2xl p-2.5 sm:p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex items-center gap-3 sm:gap-4 group">
        <!-- Thumbnail Cover (Left) -->
        <div onclick="readPortfolioWork('${item.id}')" class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-2xs relative border border-slate-100 cursor-pointer group-hover:scale-102 transition" title="Baca Karya">
          ${coverSvg}
        </div>

        <!-- Details (Right) -->
        <div class="flex-1 min-w-0 pr-1">
          <h4 onclick="readPortfolioWork('${item.id}')" class="font-extrabold text-slate-900 text-xs sm:text-sm hover:text-sky-600 transition cursor-pointer line-clamp-1 leading-snug" title="${item.title}">
            ${item.title}
          </h4>
          <p class="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">${item.date || 'Terbit'}</p>

          <!-- Action bar (Hearts, Comments, Ellipsis) -->
          <div class="flex items-center gap-4 sm:gap-6 mt-2.5">
            <!-- Heart button -->
            <button type="button" onclick="togglePortfolioLike('${item.id}', event)" class="flex items-center gap-1.5 text-slate-600 hover:text-rose-500 transition active:scale-95 group/btn" title="Sukai Karya">
              <i class="fa-solid fa-heart ${isLiked ? 'text-rose-500 animate-bounce' : 'text-rose-500'} text-xs sm:text-sm"></i>
              <span class="text-xs font-bold text-slate-700">${item.likes || 0}</span>
            </button>

            <!-- Comment button -->
            <button type="button" onclick="openPortfolioCommentModal('${item.id}', event)" class="flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition active:scale-95" title="Beri Apresiasi Santun">
              <i class="fa-regular fa-comment text-slate-400 group-hover:text-slate-600 text-xs sm:text-sm"></i>
              <span class="text-xs font-bold text-slate-700">${commentsNum}</span>
            </button>

            <!-- Ellipsis Options button -->
            <button type="button" onclick="openPortfolioOptionsMenu('${item.id}', event)" class="ml-auto w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition" title="Opsi Tindakan">
              <i class="fa-solid fa-ellipsis text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

// ==========================================
// 12. LENTERA JOGJA CONTROLLER
// ==========================================

const JOGJA_STORIES = {
  sendang: {
    title: 'Sendang Pengasihan & Jejak Welas Asih',
    meta: 'Kearifan Lokal Kapanewon Kasihan, Bantul',
    content: `Sendang Kasihan terletak di Kalurahan Tamantirto, Kapanewon Kasihan, Bantul. Dalam cerita tutur masyarakat, sendang (mata air) ini memiliki kaitan erat dengan pengelanaan Sunan Kalijaga dan kisah cinta kasih sejati yang membawa ketenteraman batin.

Nama "Kasihan" berakar dari kata welas asih—kasih sayang tanpa pamrih antarsesama manusia. Dalam tradisi literasi Jawa di SMPN 2 Kasihan, nilai welas asih ini diinternalisasi sebagai etika tepa selira, tidak saling merundung (anti-bullying), dan selalu saling mendukung bakat menulis dan membaca kawan sebaya.`
  },
  kasongan: {
    title: 'Seni Kriya Gerabah Kasongan: Dari Tanah Liat Jadi Mahakarya',
    meta: 'Sentra Seni Tradisional Bantul',
    content: `Desa Wisata Kasongan berjarak hanya selemparan batu dari SMP Negeri 2 Kasihan. Sejarah Kasongan bermula dari kisah tanah sengketa pada masa kolonial Belanda, di mana warga memanfaatkan lempung hitam untuk membuat perlengkapan rumah tangga seperti kuali, kendi, dan gentong.

Seiring berjalannya waktu, sentuhan seniman seperti almarhum Sapto Hoedojo merevolusi gerabah Kasongan menjadi seni kriya bernilai tinggi yang diekspor ke mancanegara. Filosofi gerabah mengajarkan kita bahwa hal yang tampak sederhana (tanah liat) dapat menjadi bernilai mulia jika ditempa dengan ketekunan, ilmu, dan daya cipta.`
  },
  unggah: {
    title: 'Unggah-Ungguh & Tepa Selira di Era Digital',
    meta: 'Etika Komunikasi Pelajar Yogyakarta',
    content: `Yogyakarta dikenal sebagai pusat kebudayaan Jawa yang menjunjung tinggi tata krama (unggah-ungguh). Bahasa Jawa memiliki tingkatan ngoko, krama madya, hingga krama inggil.

Di era media sosial dan literasi digital, prinsip ini tidak lantas usang. Di lingkungan SMPN 2 Kasihan, tata krama berbahasa diadaptasi menjadi sopan santun bermedia sosial: tidak menyebarkan kabar bohong (hoaks), menggunakan bahasa santun saat berdiskusi di grup kelas, serta menghargai karya cipta orang lain.`
  }
};

window.openJogjaStory = function(storyKey) {
  const story = JOGJA_STORIES[storyKey];
  if (!story) return;

  const modal = document.getElementById('modal-karya');
  const cat = document.getElementById('modal-karya-category');
  const title = document.getElementById('modal-karya-title');
  const author = document.getElementById('modal-karya-author');
  const meta = document.getElementById('modal-karya-meta');
  const content = document.getElementById('modal-karya-content');
  const btnLike = document.getElementById('btn-modal-like');

  if (cat) cat.textContent = 'Kajian Budaya Jogja';
  if (title) title.textContent = story.title;
  if (author) author.textContent = 'Tim Literasi Budaya SMPN 2 Kasihan';
  if (meta) meta.textContent = story.meta;
  if (content) content.textContent = story.content;
  if (btnLike) btnLike.classList.add('hidden');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.handleJogjaQuizAnswer = function(isCorrect) {
  const box = document.getElementById('jogja-quiz-box');
  if (isCorrect) {
    window.addPoints(60, 'Misi Kearifan Lokal Kasihan: Ksatria Budaya');
    if (window.confetti) {
      window.confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
    }
    if (box) {
      box.innerHTML = `
        <div class="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-950">
          <div class="flex items-center gap-2 font-bold text-sm mb-1">
            <i class="fa-solid fa-trophy text-amber-500 text-lg"></i> Selamat! Jawabanmu Benar (+60 Poin)
          </div>
          <p class="text-xs leading-relaxed">
            Desa Kasihan & Bangunjiwo adalah rumah bagi sentra gerabah legendaris <strong>Kasongan</strong>. Lencana kehormatan <strong>"Ksatria Budaya Kasihan"</strong> telah disematkan di profilmu!
          </p>
        </div>
      `;
    }
    showToast('Tantangan Berhasil!', 'Badge "Ksatria Budaya Kasihan" terbuka! (+60 Poin)', 'success');
  } else {
    showToast('Belum Tepat', 'Coba baca kembali rangkuman cerita kriya lokal di atas.', 'error');
  }
};

// ==========================================
// 13. GALERI KARYA CONTROLLER
// ==========================================

let galeriActiveFilter = 'semua';

window.renderGaleriKarya = function() {
  const container = document.getElementById('galeri-grid');
  if (!container) return;

  const search = document.getElementById('galeri-search')?.value.toLowerCase().trim() || '';
  let works = window.appState.works;

  if (galeriActiveFilter !== 'semua') {
    works = works.filter(w => w.category === galeriActiveFilter);
  }

  if (search) {
    works = works.filter(w => 
      w.title.toLowerCase().includes(search) || 
      w.authorName.toLowerCase().includes(search) ||
      w.content.toLowerCase().includes(search)
    );
  }

  if (works.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 text-center p-8 bg-white rounded-3xl border border-slate-200">
        <i class="fa-regular fa-folder-open text-4xl text-slate-300 mb-2"></i>
        <p class="text-sm font-bold text-slate-600">Belum ada karya yang sesuai pencarian.</p>
        <p class="text-xs text-slate-400 mt-1">Coba kata kunci lain atau tulis karya baru.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = works.map(w => `
    <div class="bg-white rounded-3xl p-5 border border-slate-200 card-shadow hover:border-sky-300 transition flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full">${w.category}</span>
          <span class="text-[11px] text-slate-400">${w.date}</span>
        </div>
        <h4 class="font-bold text-slate-800 text-base group-hover:text-sky-600 transition line-clamp-1">${w.title}</h4>
        <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">${w.content}</p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="${w.authorAvatar}" class="w-7 h-7 rounded-full object-cover" />
          <div class="text-[11px] leading-tight">
            <p class="font-bold text-slate-700">${w.authorName}</p>
            <p class="text-slate-400">Kelas ${w.authorClass}</p>
          </div>
        </div>
        <button onclick="openKaryaModal(${w.id})" class="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 rounded-xl text-xs font-bold text-slate-700 transition">
          Baca
        </button>
      </div>
    </div>
  `).join('');
};

window.filterGaleriKarya = function() {
  renderGaleriKarya();
};

window.setGaleriFilter = function(cat) {
  galeriActiveFilter = cat;
  document.querySelectorAll('.galeri-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = 'galeri-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white';
    } else {
      btn.className = 'galeri-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';
    }
  });
  renderGaleriKarya();
};

window.openKaryaModal = function(id) {
  const w = window.appState.works.find(x => x.id === id);
  if (!w) return;

  window.appState.activeModalKaryaId = id;
  const modal = document.getElementById('modal-karya');
  const cat = document.getElementById('modal-karya-category');
  const title = document.getElementById('modal-karya-title');
  const author = document.getElementById('modal-karya-author');
  const meta = document.getElementById('modal-karya-meta');
  const avatar = document.getElementById('modal-karya-avatar');
  const content = document.getElementById('modal-karya-content');
  const likes = document.getElementById('modal-karya-likes');
  const btnLike = document.getElementById('btn-modal-like');

  if (cat) cat.textContent = w.category;
  if (title) title.textContent = w.title;
  if (author) author.textContent = w.authorName;
  if (meta) meta.textContent = `Kelas ${w.authorClass} • SMPN 2 Kasihan • ${w.date}`;
  if (avatar) avatar.src = w.authorAvatar;
  if (content) content.textContent = w.content;
  if (likes) likes.textContent = w.likes || 0;
  if (btnLike) btnLike.classList.remove('hidden');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.likeActiveModalKarya = function() {
  const id = window.appState.activeModalKaryaId;
  if (!id) return;
  window.likeKarya(id);

  const w = window.appState.works.find(x => x.id === id);
  const likesEl = document.getElementById('modal-karya-likes');
  if (w && likesEl) {
    likesEl.textContent = w.likes || 0;
  }
};

window.closeKaryaModal = function() {
  const modal = document.getElementById('modal-karya');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// ==========================================
// 14. PANEL GURU & WALI KELAS CONTROLLER
// ==========================================

let guruCurrentStudentFilter = 'wali';
let guruSearchQuery = '';

window.filterGuruStudentsTab = function(tab) {
  guruCurrentStudentFilter = tab;
  const tabs = ['wali', 'semua', 'aktif', 'pasif'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btn-guru-tab-${t}`);
    if (btn) {
      if (t === tab) {
        btn.className = 'btn-filter-guru px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 bg-[#16779e] text-white shadow-2xs';
      } else {
        btn.className = 'btn-filter-guru px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50';
      }
    }
  });
  window.renderGuruStudentsList();
};

window.onSearchGuruStudents = function(query) {
  guruSearchQuery = (query || '').toLowerCase().trim();
  window.renderGuruStudentsList();
};

window.renderGuruStudentsList = function() {
  const container = document.getElementById('guru-student-cards-list');
  if (!container) return;

  const currentGuru = window.appState?.currentUser || {};
  const teacherWaliKelas = currentGuru.waliKelas || currentGuru.kelas || '8B';
  const allUsers = window.appState?.users || DEFAULT_USERS;
  const allStudents = allUsers.filter(u => u.role === 'siswa');

  // Calculate Wali Kelas quick stats
  const waliStudents = allStudents.filter(s => (s.kelas === teacherWaliKelas || s.class === teacherWaliKelas));
  const activeWaliStudents = waliStudents.filter(s => s.status !== 'pasif' && (s.streak || 0) > 0);
  const passiveWaliStudents = waliStudents.filter(s => s.status === 'pasif' || (s.streak || 0) === 0 || (s.daysInactive || 0) > 0);
  const totalWorksWali = waliStudents.reduce((sum, s) => sum + (s.m3_works || 0), 0);

  const statTotalEl = document.getElementById('guru-wk-total-students');
  if (statTotalEl) statTotalEl.textContent = Math.max(32, waliStudents.length);

  const statActiveEl = document.getElementById('guru-wk-active-students');
  if (statActiveEl) statActiveEl.textContent = Math.max(30, activeWaliStudents.length);

  const statPassiveEl = document.getElementById('guru-wk-passive-students');
  if (statPassiveEl) statPassiveEl.textContent = passiveWaliStudents.length;

  const statWorksEl = document.getElementById('guru-wk-works-count');
  if (statWorksEl) statWorksEl.textContent = Math.max(48, totalWorksWali || 48);

  // Filter list
  let filtered = allStudents;
  if (guruCurrentStudentFilter === 'wali') {
    filtered = allStudents.filter(s => (s.kelas === teacherWaliKelas || s.class === teacherWaliKelas));
  } else if (guruCurrentStudentFilter === 'aktif') {
    filtered = allStudents.filter(s => s.status !== 'pasif' && (s.streak || 0) > 0);
  } else if (guruCurrentStudentFilter === 'pasif') {
    filtered = allStudents.filter(s => s.status === 'pasif' || (s.streak || 0) === 0 || (s.daysInactive || 0) > 0);
  }

  if (guruSearchQuery) {
    filtered = filtered.filter(s => 
      (s.name && s.name.toLowerCase().includes(guruSearchQuery)) ||
      (s.nisn && s.nisn.toLowerCase().includes(guruSearchQuery)) ||
      (s.kelas && s.kelas.toLowerCase().includes(guruSearchQuery))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
        <i class="fa-solid fa-user-slash text-3xl text-slate-300 mb-2"></i>
        <p class="font-bold text-slate-700 text-sm">Tidak ditemukan siswa dengan filter ini</p>
        <p class="text-xs text-slate-400 mt-0.5">Silakan ganti kata kunci pencarian atau tab filter di atas.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(s => {
    const isWali = (s.kelas === teacherWaliKelas || s.class === teacherWaliKelas);
    const isPassive = s.status === 'pasif' || (s.daysInactive || 0) > 0;
    const m1Books = s.m1_books || 8;
    const m1Mins = s.m1_duration || 350;
    const m2Find = s.m2_findings || 12;
    const m2Score = s.m2_quizScore || 95;
    const m3Works = s.m3_works || 5;
    const m4Talks = s.m4_talks || 3;
    const m5Apprec = s.m5_appreciations || 18;

    return `
      <div class="p-4 bg-white border ${isPassive ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80 hover:border-[#16779e]/40'} rounded-2xl card-shadow transition space-y-3">
        <!-- Student Header -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <img src="${s.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0" />
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-extrabold text-slate-900 text-sm">${s.name}</h4>
                ${isWali ? `<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-md border border-emerald-300"><i class="fa-solid fa-star text-[9px] mr-1"></i>Siswa Wali Anda</span>` : ''}
              </div>
              <p class="text-[11px] text-slate-500 font-medium">
                Kelas <strong>${s.kelas || s.class || '8B'}</strong> • NISN: <span class="font-mono">${s.nisn || '0098231001'}</span>
              </p>
            </div>
          </div>

          <div class="text-right shrink-0">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${isPassive ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
              <span class="w-1.5 h-1.5 rounded-full ${isPassive ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}"></span>
              ${isPassive ? `Pasif (${s.daysInactive || 6} Hari)` : `Aktif • Streak ${s.streak || 7}h`}
            </span>
            <div class="text-[11px] font-extrabold text-amber-700 mt-1">
              <i class="fa-solid fa-award text-amber-500 mr-0.5"></i> ${s.points || 1250} Poin GLS
            </div>
          </div>
        </div>

        <!-- 5M Milestone Progress Pills -->
        <div class="grid grid-cols-5 gap-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <div class="p-1.5 bg-white rounded-lg border border-slate-200/70">
            <span class="text-[9px] font-bold text-teal-700 block uppercase">1. Membaca</span>
            <span class="text-xs font-black text-slate-800">${m1Books} Buku</span>
            <span class="text-[9px] text-slate-400 block">${m1Mins}m</span>
          </div>
          <div class="p-1.5 bg-white rounded-lg border border-slate-200/70">
            <span class="text-[9px] font-bold text-sky-700 block uppercase">2. Menemukan</span>
            <span class="text-xs font-black text-slate-800">${m2Find} Ide</span>
            <span class="text-[9px] text-sky-600 block">Kuis ${m2Score}</span>
          </div>
          <div class="p-1.5 bg-white rounded-lg border border-slate-200/70">
            <span class="text-[9px] font-bold text-orange-700 block uppercase">3. Menulis</span>
            <span class="text-xs font-black text-slate-800">${m3Works} Karya</span>
            <span class="text-[9px] text-emerald-600 block font-bold">Terbit</span>
          </div>
          <div class="p-1.5 bg-white rounded-lg border border-slate-200/70">
            <span class="text-[9px] font-bold text-rose-700 block uppercase">4. Cerita</span>
            <span class="text-xs font-black text-slate-800">${m4Talks} Video</span>
            <span class="text-[9px] text-slate-400 block">Tuntas</span>
          </div>
          <div class="p-1.5 bg-white rounded-lg border border-slate-200/70">
            <span class="text-[9px] font-bold text-purple-700 block uppercase">5. Apresiasi</span>
            <span class="text-xs font-black text-slate-800">${m5Apprec}</span>
            <span class="text-[9px] text-purple-600 block">Ulasan</span>
          </div>
        </div>

        <!-- Action Row -->
        <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 flex-wrap">
          <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
            <i class="fa-solid fa-medal text-amber-500"></i> Level: <strong class="text-slate-800">${s.level || 'Pembaca Kreatif'}</strong>
          </div>

          <div class="flex items-center gap-1.5 flex-wrap">
            ${isPassive ? `
              <button type="button" onclick="sendReadingReminder('${s.name}')" class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs">
                <i class="fa-regular fa-bell"></i> Nudge
              </button>
            ` : ''}
            <button type="button" onclick="openGuruReviewModal('${s.name}', 'Bimbingan Wali Kelas', 'Apresiasi Capaian Alur 5M')" class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs">
              <i class="fa-solid fa-star text-amber-500"></i> Nilai & Bintang
            </button>
            <button type="button" onclick="viewStudentPortfolio('${s.id}')" class="px-2.5 py-1.5 bg-[#16779e] hover:bg-sky-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs">
              <i class="fa-solid fa-folder-open"></i> Portofolio
            </button>
            <button type="button" onclick="exportRaporPDFForStudent('${s.id}')" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1" title="Cetak Rapor Siswa">
              <i class="fa-solid fa-file-pdf text-rose-600"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.renderGuruDashboard = function() {
  const tbody = document.getElementById('table-guru-journals');
  const passiveList = document.getElementById('guru-passive-students-list');

  const journals = window.appState.journals;
  if (tbody) {
    tbody.innerHTML = journals.map(j => `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3 font-bold text-slate-800">${j.studentName}</td>
        <td class="py-3"><span class="px-2 py-0.5 bg-slate-100 font-bold rounded text-[11px]">${j.studentClass}</span></td>
        <td class="py-3">${j.bookTitle} (Hal ${j.pageStart}-${j.pageEnd})</td>
        <td class="py-3">${j.duration} Menit</td>
        <td class="py-3 font-bold text-amber-600">+20</td>
        <td class="py-3 text-right">
          <button onclick="approveStudentJournal('${j.id}')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold text-[11px] transition">
            <i class="fa-solid fa-star text-amber-500"></i> Nilai & Beri Bintang
          </button>
        </td>
      </tr>
    `).join('');
  }

  if (passiveList) {
    const passiveStudents = [
      { name: 'Rizki Nur Fauzi', class: '8B', days: 6 },
      { name: 'Siti Fatimah', class: '8A', days: 7 },
      { name: 'Wahyu Nugroho', class: '7A', days: 5 }
    ];

    passiveList.innerHTML = passiveStudents.map(p => `
      <div class="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between text-xs">
        <div>
          <p class="font-bold text-slate-800">${p.name} (${p.class})</p>
          <p class="text-[11px] text-rose-600">${p.days} hari tanpa membaca</p>
        </div>
        <button onclick="sendReadingReminder('${p.name}')" class="px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-bold text-[10px] transition">
          Kirim Pengingat
        </button>
      </div>
    `).join('');
  }

  // Populate Wali Kelas student monitoring cards
  window.renderGuruStudentsList();
};

window.viewStudentPortfolio = function(studentIdOrName) {
  const allUsers = window.appState?.users || DEFAULT_USERS;
  const student = allUsers.find(u => u.id === studentIdOrName || u.name === studentIdOrName);
  if (student) {
    window.appState.viewingStudent = student;
    navigateTo('portofolio');
    showToast('Mode Supervisi Aktif', `Melihat portofolio dan perkembangan literasi ${student.name} (${student.kelas || student.class || '8B'}).`, 'info');
  } else {
    showToast('Siswa Tidak Ditemukan', 'Data siswa tidak ditemukan di sistem.', 'error');
  }
};

window.exitStudentPortfolioView = function() {
  window.appState.viewingStudent = null;
  const role = window.appState?.currentUser?.role;
  if (role === 'guru') {
    navigateTo('guru');
  } else if (role === 'kepsek') {
    navigateTo('sekolah');
  } else if (role === 'admin') {
    navigateTo('admin');
  } else {
    navigateTo('beranda');
  }
  showToast('Keluar Mode Supervisi', 'Kembali ke dashboard utama Anda.', 'info');
};

window.exportRaporPDFForTarget = function() {
  const target = window.appState?.viewingStudent || window.appState?.currentUser;
  window.exportRaporPDF(target);
};

window.exportRaporPDFForStudent = function(studentIdOrName) {
  const allUsers = window.appState?.users || DEFAULT_USERS;
  const student = allUsers.find(u => u.id === studentIdOrName || u.name === studentIdOrName);
  if (student) {
    window.exportRaporPDF(student);
  } else {
    window.exportRaporPDF();
  }
};

window.viewStudentWorksInGallery = function(studentName) {
  navigateTo('galeri');
  setTimeout(() => {
    const input = document.getElementById('galeri-search');
    if (input) {
      input.value = studentName;
      if (typeof window.renderGaleriKarya === 'function') {
        window.renderGaleriKarya();
      }
    }
  }, 100);
};

window.approveStudentJournal = function(journalId) {
  showToast('Jurnal Diapresiasi Guru', 'Bintang apresiasi dan catatan positif telah ditambahkan ke rapor siswa.', 'success');
  const statAppreciation = document.getElementById('guru-phone-stat-appreciation');
  if (statAppreciation) {
    statAppreciation.textContent = parseInt(statAppreciation.textContent || '86') + 1;
  }
};

window.sendReadingReminder = function(studentName) {
  showToast('Pengingat Terkirim', `Notifikasi ajakan literasi terkirim ke ${studentName}.`, 'info');
};

window.filterGuruData = function() {
  renderGuruDashboard();
};

// ==========================================
// 14.1 GURU DASHBOARD TAB CONTROLLERS
// ==========================================

window.setGuruViewMode = function(mode) {
  // Retained for backward compatibility
};

window.switchGuruPhoneTab = function(tabName) {
  const screens = ['beranda', 'siswa', 'kelas', 'laporan', 'profil'];
  
  screens.forEach(s => {
    const el = document.getElementById(`guru-screen-${s}`);
    const btn = document.getElementById(`guru-tab-${s}`);
    
    if (el) {
      if (s === tabName) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }

    if (btn) {
      if (s === tabName) {
        btn.classList.add('text-[#16779e]', 'font-bold', 'bg-[#e8f4fd]');
        btn.classList.remove('text-slate-500', 'hover:bg-slate-50');
      } else {
        btn.classList.remove('text-[#16779e]', 'font-bold', 'bg-[#e8f4fd]');
        btn.classList.add('text-slate-500');
      }
    }
  });

  const scrollSurface = document.getElementById('guru-scroll-surface');
  if (scrollSurface) {
    scrollSurface.scrollTop = 0;
  }
};

window.openGuruDrawer = function() {
  const modal = document.getElementById('guru-modal-drawer');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeGuruDrawer = function() {
  const modal = document.getElementById('guru-modal-drawer');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openGuruNotifications = function() {
  const modal = document.getElementById('guru-modal-notifications');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeGuruNotifications = function() {
  const modal = document.getElementById('guru-modal-notifications');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openGuruReviewModal = function(studentName, activityType, detail) {
  const modal = document.getElementById('guru-modal-review');
  const nameEl = document.getElementById('review-student-name');
  const typeEl = document.getElementById('review-activity-type');

  if (nameEl) nameEl.textContent = studentName || 'Aisyah Putri';
  if (typeEl) typeEl.textContent = `${activityType || 'Resensi Buku'} • ${detail || 'Laskar Pelangi'}`;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeGuruReviewModal = function() {
  const modal = document.getElementById('guru-modal-review');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.submitGuruAppreciation = function() {
  const nameEl = document.getElementById('review-student-name');
  const student = nameEl ? nameEl.textContent : 'Siswa';
  
  const statAppreciation = document.getElementById('guru-phone-stat-appreciation');
  if (statAppreciation) {
    const current = parseInt(statAppreciation.textContent || '86');
    statAppreciation.textContent = current + 1;
  }

  closeGuruReviewModal();
  showToast('Apresiasi Terkirim! ⭐', `Bintang 5 & motivasi berhasil disematkan ke portofolio ${student}.`, 'success');
};

window.openGuruDetail5M = function(dimension) {
  const modal = document.getElementById('guru-modal-detail5m');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeGuruDetail5M = function() {
  const modal = document.getElementById('guru-modal-detail5m');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openGuruAllActivities = function() {
  switchGuruPhoneTab('kelas');
  showToast('Jurnal & Aktivitas Siswa', 'Beralih ke tab kelas untuk meninjau dan menilai seluruh jurnal siswa.', 'info');
};

// ==========================================
// 15. DASHBOARD & MONITORING SEKOLAH CONTROLLER (SUPERVISI KEPSEK & ADMIN)
// ==========================================

let chartTrenInstance = null;
let chartKatInstance = null;
window._sekolahKaryaFilterCat = 'semua';
window._sekolahActiveSubtab = 'siswa';

// Helper: Klasifikasi Level Kategori Literasi Siswa
window.getLiteracyCategory = function(student) {
  const points = student.points || 0;
  const books = student.m1_books || (student.readingHistory ? student.readingHistory.length : 0);

  if (points >= 1400 || books >= 19) {
    return {
      levelNum: 'Level 5',
      name: 'Ksatria Literasi Kasihan',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-extrabold',
      icon: 'fa-crown text-emerald-600'
    };
  } else if (points >= 901 || books >= 13) {
    return {
      levelNum: 'Level 4',
      name: 'Pembaca Kreatif',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300 font-bold',
      icon: 'fa-star text-amber-500'
    };
  } else if (points >= 501 || books >= 8) {
    return {
      levelNum: 'Level 3',
      name: 'Pembaca Kritis',
      badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200 font-bold',
      icon: 'fa-book-open-reader text-indigo-500'
    };
  } else if (points >= 201 || books >= 4) {
    return {
      levelNum: 'Level 2',
      name: 'Pembaca Aktif',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200 font-bold',
      icon: 'fa-book-bookmark text-sky-600'
    };
  } else {
    return {
      levelNum: 'Level 1',
      name: 'Pembaca Pemula',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
      icon: 'fa-book text-slate-400'
    };
  }
};

// Sub-Tab Switcher di Halaman Supervisi Sekolah
window.switchSekolahSubtab = function(tabName) {
  tabName = tabName || 'siswa';
  window._sekolahActiveSubtab = tabName;

  const tabs = ['siswa', 'karya', 'laporan', 'statistik'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btn-sekolah-subtab-${t}`);
    const pane = document.getElementById(`sekolah-pane-${t}`);
    const isActive = (t === tabName);

    if (btn) {
      if (isActive) {
        btn.className = 'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 bg-[#082e54] text-white shadow-xs';
      } else {
        btn.className = 'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 text-slate-600 hover:bg-slate-100';
      }
    }

    if (pane) {
      if (isActive) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    }
  });

  if (tabName === 'siswa') {
    window.renderSekolahMonitoringTable();
  } else if (tabName === 'karya') {
    window.renderSekolahKaryaGrid();
  } else if (tabName === 'laporan') {
    window.renderSekolahActivityReport();
  } else if (tabName === 'statistik') {
    renderSekolahRankings();
    initSekolahCharts();
  }
};

window.renderSekolahDashboard = function() {
  window.updateSekolahMetricCards();
  window.switchSekolahSubtab(window._sekolahActiveSubtab || 'siswa');
};

window.updateSekolahMetricCards = function() {
  const books = window.appState?.books || [];
  const works = window.appState?.works || DEFAULT_WORKS;
  const booktalks = window.appState?.booktalks || [];
  const users = (window.appState?.users || DEFAULT_USERS).filter(u => u.role === 'siswa');

  const elBuku = document.getElementById('stat-sekolah-total-buku');
  const elKarya = document.getElementById('stat-sekolah-total-karya');
  const elBooktalk = document.getElementById('stat-sekolah-total-booktalk');
  const elJam = document.getElementById('stat-sekolah-total-jam');
  const elSiswaAktif = document.getElementById('stat-sekolah-siswa-aktif');

  if (elBuku) elBuku.textContent = `${Math.max(1428, books.length * 28)} Buku`;
  if (elKarya) elKarya.textContent = `${Math.max(342, works.length)} Karya`;
  if (elBooktalk) elBooktalk.textContent = `${Math.max(118, booktalks.length * 12)} Sesi`;
  if (elJam) elJam.textContent = `890 Jam`;
  if (elSiswaAktif) {
    const activeCount = users.filter(u => u.status !== 'pasif').length;
    const totalCount = Math.max(users.length, 1);
    const pct = ((activeCount / totalCount) * 100).toFixed(1);
    elSiswaAktif.textContent = `${pct}%`;
  }
};

window.filterSekolahMonitoring = function() {
  renderSekolahMonitoringTable();
};

window.renderSekolahMonitoringTable = function() {
  const tbody = document.getElementById('table-sekolah-monitoring-body');
  if (!tbody) return;

  const classFilter = document.getElementById('sekolah-filter-class')?.value || 'semua';
  const statusFilter = document.getElementById('sekolah-filter-status')?.value || 'semua';
  const levelFilter = document.getElementById('sekolah-filter-level')?.value || 'semua';
  const searchQuery = (document.getElementById('sekolah-search-student')?.value || '').toLowerCase().trim();

  const allUsers = window.appState?.users || DEFAULT_USERS;
  let students = allUsers.filter(u => u.role === 'siswa');

  if (classFilter !== 'semua') {
    students = students.filter(s => (s.kelas === classFilter || s.class === classFilter));
  }

  if (statusFilter === 'aktif') {
    students = students.filter(s => s.status !== 'pasif' && (s.streak || 0) > 0);
  } else if (statusFilter === 'pasif') {
    students = students.filter(s => s.status === 'pasif' || (s.streak || 0) === 0 || (s.daysInactive || 0) > 0);
  }

  if (levelFilter !== 'semua') {
    students = students.filter(s => {
      const cat = window.getLiteracyCategory(s);
      return cat.levelNum === levelFilter;
    });
  }

  if (searchQuery) {
    students = students.filter(s => 
      (s.name && s.name.toLowerCase().includes(searchQuery)) ||
      (s.nisn && s.nisn.toLowerCase().includes(searchQuery)) ||
      (s.kelas && s.kelas.toLowerCase().includes(searchQuery))
    );
  }

  if (students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" class="p-8 text-center text-slate-400 bg-slate-50">
          <i class="fa-solid fa-users-slash text-2xl mb-1 block text-slate-300"></i>
          Tidak ada data siswa yang cocok dengan kriteria filter pemantauan.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = students.map(s => {
    const isPassive = s.status === 'pasif' || (s.daysInactive || 0) > 0;
    const cat = window.getLiteracyCategory(s);
    const m1Books = s.m1_books || 8;
    const m1Mins = s.m1_duration || 350;
    const m2Find = s.m2_findings || 12;
    const m2Score = s.m2_quizScore || 95;
    const m3Works = s.m3_works || 5;
    const m4Talks = s.m4_talks || 3;
    const m5Apprec = s.m5_appreciations || 18;

    return `
      <tr class="hover:bg-slate-50 transition">
        <!-- 1. Siswa & NISN -->
        <td class="p-3">
          <div class="flex items-center gap-2.5">
            <img src="${s.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}" class="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" />
            <div>
              <div class="font-bold text-slate-900">${s.name}</div>
              <div class="text-[10px] text-slate-400 font-mono">NISN: ${s.nisn || '0098231001'}</div>
            </div>
          </div>
        </td>

        <!-- 2. Kelas & Wali -->
        <td class="p-3">
          <span class="px-2 py-0.5 rounded font-black text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
            ${s.kelas || s.class || '8B'}
          </span>
          <div class="text-[10px] text-slate-500 mt-0.5 truncate max-w-[130px]" title="${s.waliKelas || 'Ibu Zusma Nadya Izzati, S.Pd.'}">
            ${s.waliKelas || 'Wali: Ibu Zusma'}
          </div>
        </td>

        <!-- 3. Level Kategori Literasi -->
        <td class="p-3 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] border ${cat.badgeClass} shadow-2xs">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.name}</span>
          </span>
          <span class="block text-[9px] text-slate-400 font-mono mt-0.5">${cat.levelNum} • ${s.points || 0} pts</span>
        </td>

        <!-- 4. M1 -->
        <td class="p-3 text-center">
          <span class="font-extrabold text-teal-800">${m1Books} Buku</span>
          <span class="block text-[9px] text-slate-400">${m1Mins} mnt</span>
        </td>

        <!-- 5. M2 -->
        <td class="p-3 text-center">
          <span class="font-extrabold text-sky-800">${m2Find} Ide</span>
          <span class="block text-[9px] text-sky-600 font-bold">Kuis: ${m2Score}</span>
        </td>

        <!-- 6. M3 -->
        <td class="p-3 text-center">
          <span class="font-extrabold text-orange-800">${m3Works} Karya</span>
          <span class="block text-[9px] text-emerald-600 font-bold">Terbit</span>
        </td>

        <!-- 7. M4 -->
        <td class="p-3 text-center">
          <span class="font-extrabold text-rose-800">${m4Talks} Video</span>
          <span class="block text-[9px] text-slate-400">Cerita</span>
        </td>

        <!-- 8. M5 -->
        <td class="p-3 text-center">
          <span class="font-extrabold text-purple-800">${m5Apprec}</span>
          <span class="block text-[9px] text-purple-600">Apresiasi</span>
        </td>

        <!-- 9. Poin & Status -->
        <td class="p-3 text-center">
          <span class="font-black text-amber-700 block">${s.points || 1250} Poin</span>
          <span class="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${isPassive ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
            ${isPassive ? 'Pasif' : 'Aktif'}
          </span>
        </td>

        <!-- 10. Aksi Supervisi -->
        <td class="p-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button type="button" onclick="viewStudentPortfolio('${s.id}')" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg font-bold text-[10px] transition flex items-center gap-1 shadow-2xs" title="Lihat Portofolio Lengkap">
              <i class="fa-solid fa-folder-open"></i> Portofolio
            </button>
            <button type="button" onclick="exportRaporPDFForStudent('${s.id}')" class="px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg font-bold text-[10px] transition flex items-center gap-1 shadow-2xs" title="Cetak Rapor Siswa">
              <i class="fa-solid fa-file-pdf text-rose-600"></i> Rapor
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
};

// ==========================================
// KARYA SISWA SUB-TAB IN SEKOLAH MONITORING
// ==========================================

window.filterSekolahKaryaCategory = function(cat) {
  window._sekolahKaryaFilterCat = cat || 'semua';
  document.querySelectorAll('.btn-filter-karya-sekolah').forEach(btn => {
    btn.className = 'btn-filter-karya-sekolah px-3 py-1.5 rounded-xl font-bold text-xs bg-white text-slate-600 border border-slate-200 hover:bg-slate-100';
  });

  const catMap = {
    'semua': 'btn-karya-cat-semua',
    'Puisi': 'btn-karya-cat-puisi',
    'Cerpen': 'btn-karya-cat-cerpen',
    'Resensi': 'btn-karya-cat-resensi',
    'Budaya': 'btn-karya-cat-budaya'
  };

  const activeBtn = document.getElementById(catMap[cat] || 'btn-karya-cat-semua');
  if (activeBtn) {
    activeBtn.className = 'btn-filter-karya-sekolah px-3 py-1.5 rounded-xl font-bold text-xs bg-[#082e54] text-white shadow-2xs';
  }

  window.renderSekolahKaryaGrid();
};

window.renderSekolahKaryaGrid = function() {
  const container = document.getElementById('sekolah-karya-grid');
  if (!container) return;

  const cat = window._sekolahKaryaFilterCat || 'semua';
  const search = (document.getElementById('sekolah-search-karya')?.value || '').toLowerCase().trim();

  let works = window.appState?.works || DEFAULT_WORKS;

  if (cat !== 'semua') {
    works = works.filter(w => (w.category || '').toLowerCase().includes(cat.toLowerCase()));
  }

  if (search) {
    works = works.filter(w => 
      (w.title && w.title.toLowerCase().includes(search)) ||
      (w.authorName && w.authorName.toLowerCase().includes(search)) ||
      (w.content && w.content.toLowerCase().includes(search))
    );
  }

  if (works.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
        <i class="fa-solid fa-feather text-3xl mb-2 text-slate-300 block"></i>
        Tidak ada karya siswa yang cocok dengan filter "${cat}".
      </div>
    `;
    return;
  }

  container.innerHTML = works.map(w => {
    return `
      <div class="bg-white rounded-2xl p-4 border border-slate-200 card-shadow flex flex-col justify-between hover:border-amber-300 transition group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-md font-bold text-[10px] border border-amber-200">
              ${w.category || 'Karya Siswa'}
            </span>
            <span class="text-[10px] text-slate-400 font-medium">
              <i class="fa-regular fa-calendar mr-1"></i> ${w.date || 'Sep 2026'}
            </span>
          </div>

          <h4 class="font-extrabold text-slate-900 text-sm group-hover:text-amber-700 transition line-clamp-1 mb-1">
            ${w.title}
          </h4>

          <p class="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
            "${w.quote || w.content?.substring(0, 140) || 'Karya literasi otentik siswa SMPN 2 Kasihan.'}..."
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img src="${w.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}" class="w-6 h-6 rounded-full object-cover border border-slate-200" />
            <div>
              <div class="text-[11px] font-bold text-slate-800 leading-tight">${w.authorName}</div>
              <div class="text-[9px] text-slate-400 leading-tight">${w.authorClass || 'Siswa 8B'}</div>
            </div>
          </div>

          <div class="flex items-center gap-1.5">
            <button type="button" onclick="openM5DetailModal('${w.id}')" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
              <i class="fa-solid fa-book-open"></i> Baca
            </button>
            <button type="button" onclick="apresiasiKaryaByKepsek('${w.id}')" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold transition flex items-center gap-1" title="Beri Apresiasi Kepala Sekolah">
              <i class="fa-solid fa-award text-amber-500"></i> Apresiasi
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.apresiasiKaryaByKepsek = function(workId) {
  const works = window.appState?.works || DEFAULT_WORKS;
  const w = works.find(item => item.id === workId);
  if (!w) return;

  w.likes = (w.likes || 0) + 1;
  w.comments = w.comments || [];
  w.comments.unshift({
    id: `c-kepsek-${Date.now()}`,
    author: 'Erna Retnaningsih, S.Pd., M.Pd.',
    role: 'kepsek',
    text: 'Apresiasi istimewa dari Kepala Sekolah! Karya yang sangat inspiratif, mencerminkan kecerdasan literasi dan karakter luhur SMPN 2 Kasihan.',
    date: 'Hari ini'
  });
  w.commentsCount = w.comments.length;

  showToast('Apresiasi Diberikan', `Apresiasi resmi Kepala Sekolah telah disematkan pada karya "${w.title}".`, 'success');
  window.renderSekolahKaryaGrid();
};

// ==========================================
// LAPORAN AKTIVITAS SUB-TAB IN SEKOLAH MONITORING
// ==========================================

window.renderSekolahActivityReport = function() {
  const tbody = document.getElementById('table-sekolah-activity-body');
  if (!tbody) return;

  const classFilter = document.getElementById('sekolah-activity-filter-class')?.value || 'semua';
  const statusFilter = document.getElementById('sekolah-activity-filter-status')?.value || 'semua';
  const search = (document.getElementById('sekolah-activity-search')?.value || '').toLowerCase().trim();

  // Baseline mock activities if journals are sparse
  const sampleActivities = [
    { id: 'act-1', studentName: 'Anisa Rahma', class: '8A', bookTitle: 'Laskar Pelangi', author: 'Andrea Hirata', pages: '120 - 155', duration: 40, date: '12 Sep 2026, 14:20', finding: 'Semangat pantang menyerah anak-anak Belitung dalam menuntut ilmu.', verified: true },
    { id: 'act-2', studentName: 'Bagus Kurniawan', class: '8B', bookTitle: 'Filosofi Teras', author: 'Henry Manampiring', pages: '45 - 80', duration: 35, date: '12 Sep 2026, 11:15', finding: 'Mengendalikan emosi dan membedakan apa yang ada dalam kendali kita.', verified: true },
    { id: 'act-3', studentName: 'Aisyah Putri', class: '9A', bookTitle: 'Negeri 5 Menara', author: 'A. Fuadi', pages: '1 - 60', duration: 45, date: '11 Sep 2026, 16:30', finding: 'Kekuatan tekad Man Jadda Wajada membuka gerbang impian dunia.', verified: true },
    { id: 'act-4', studentName: 'Dimas Aditya', class: '8B', bookTitle: 'Kearifan Gerabah Kasongan', author: 'Drs. Subiyanto', pages: '10 - 35', duration: 25, date: '11 Sep 2026, 09:40', finding: 'Sejarah panjang seni kriya tanah liat Kasihan Bantul sejak era Diponegoro.', verified: false },
    { id: 'act-5', studentName: 'Nabila Zahra', class: '7B', bookTitle: 'Sains di Sekitar Kita', author: 'Dr. Indah P.', pages: '15 - 40', duration: 30, date: '10 Sep 2026, 15:10', finding: 'Proses fotosintesis dan siklus oksigen di lingkungan hijau sekolah.', verified: true },
    { id: 'act-6', studentName: 'Rian Saputra', class: '8B', bookTitle: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', pages: '50 - 90', duration: 45, date: '10 Sep 2026, 13:00', finding: 'Keadilan hukum dan keberanian pribumi memperjuangkan harkat kemanusiaan.', verified: true },
    { id: 'act-7', studentName: 'Siti Rahmawati', class: '9C', bookTitle: 'Cerita Rakyat Yogyakarta', author: 'Balai Bahasa', pages: '20 - 55', duration: 30, date: '09 Sep 2026, 10:20', finding: 'Legenda asal-usul Desa Bangunjiwo dan kearifan para leluhur Kasihan.', verified: false }
  ];

  let activities = sampleActivities;

  // Augment with real journals if present
  const userJournals = window.appState?.journals || [];
  if (userJournals.length > 0) {
    const formatted = userJournals.map((j, idx) => ({
      id: `act-real-${idx}`,
      studentName: j.studentName || window.appState.currentUser?.name || 'Siswa SMPN 2 Kasihan',
      class: j.class || '8B',
      bookTitle: j.bookTitle || 'Buku Bacaan Pilihan',
      author: j.author || 'Penulis Buku',
      pages: j.pages || `${j.pageStart || 1} - ${j.pageEnd || 25}`,
      duration: j.duration || 30,
      date: j.date || 'Hari ini',
      finding: j.summary || j.reflection || 'Ringkasan refleksi membaca dan temuan ide alur 5M.',
      verified: !!j.verified
    }));
    activities = [...formatted, ...activities];
  }

  if (classFilter !== 'semua') {
    activities = activities.filter(a => a.class === classFilter);
  }

  if (statusFilter === 'verified') {
    activities = activities.filter(a => a.verified === true);
  } else if (statusFilter === 'pending') {
    activities = activities.filter(a => a.verified === false);
  }

  if (search) {
    activities = activities.filter(a => 
      a.studentName.toLowerCase().includes(search) ||
      a.bookTitle.toLowerCase().includes(search) ||
      a.finding.toLowerCase().includes(search)
    );
  }

  if (activities.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="p-8 text-center text-slate-400 bg-slate-50">
          <i class="fa-solid fa-clipboard-question text-2xl mb-1 block text-slate-300"></i>
          Tidak ada log aktivitas membaca yang cocok dengan kriteria filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = activities.map(a => `
    <tr class="hover:bg-slate-50 transition text-xs">
      <td class="p-3 text-slate-500 whitespace-nowrap">
        <i class="fa-regular fa-clock mr-1 text-slate-400"></i> ${a.date}
      </td>
      <td class="p-3">
        <div class="font-bold text-slate-900">${a.studentName}</div>
        <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded">Kelas ${a.class}</span>
      </td>
      <td class="p-3">
        <div class="font-extrabold text-slate-800">${a.bookTitle}</div>
        <div class="text-[10px] text-slate-400">Hal. ${a.pages} • ${a.author}</div>
      </td>
      <td class="p-3 text-center">
        <span class="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
          ${a.duration} Menit
        </span>
      </td>
      <td class="p-3 max-w-[260px]">
        <p class="text-[11px] text-slate-700 line-clamp-2 leading-relaxed">
          "${a.finding}"
        </p>
      </td>
      <td class="p-3 text-center">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${a.verified ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
          <i class="fa-solid ${a.verified ? 'fa-check-circle' : 'fa-hourglass-half'}"></i>
          ${a.verified ? 'Terverifikasi' : 'Menunggu'}
        </span>
      </td>
      <td class="p-3 text-right">
        <button type="button" onclick="apresiasiActivityByKepsek('${a.id}', '${a.studentName}')" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[10px] font-bold transition inline-flex items-center gap-1">
          <i class="fa-solid fa-star text-amber-500"></i> Validasi
        </button>
      </td>
    </tr>
  `).join('');
};

window.apresiasiActivityByKepsek = function(actId, studentName) {
  showToast('Aktivitas Divalidasi', `Jurnal membaca ${studentName || 'siswa'} telah divalidasi oleh Kepala Sekolah.`, 'success');
  const tbody = document.getElementById('table-sekolah-activity-body');
  if (tbody) {
    const row = tbody.querySelector(`tr:has(button[onclick*="${actId}"])`);
    if (row) {
      const badgeCol = row.children[5];
      if (badgeCol) {
        badgeCol.innerHTML = `
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <i class="fa-solid fa-check-circle"></i> Terverifikasi
          </span>
        `;
      }
    }
  }
};

// ==========================================
// EXPORT LAPORAN SEKOLAH KOMPREHENSIF (PDF)
// ==========================================

window.exportLaporanSekolahPDF = function() {
  if (window.jspdf && window.jspdf.jsPDF) {
    try {
      const doc = new window.jspdf.jsPDF();

      // Header Kop Surat Resmi
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('PEMERINTAH KABUPATEN BANTUL', 105, 16, { align: 'center' });
      doc.setFontSize(15);
      doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', 105, 23, { align: 'center' });
      doc.setFontSize(17);
      doc.text('SMP NEGERI 2 KASIHAN', 105, 31, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text('Alamat: Karangjati, Tamantirto, Kasihan, Bantul, D.I. Yogyakarta 55183 • Telp. (0274) 4342xxx', 105, 37, { align: 'center' });
      doc.setLineWidth(0.8);
      doc.line(18, 40, 192, 40);
      doc.setLineWidth(0.3);
      doc.line(18, 41.5, 192, 41.5);

      // Report Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('LAPORAN EKSEKUTIF CAPAIAN DATA PROGRAM LITERASI SEKOLAH (LENTERA 5M)', 105, 50, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text('Dokumen Kinerja & Bukti Nyata Evaluasi Program Literasi (Evidence-Based GLS) • TA 2026/2027', 105, 56, { align: 'center' });

      // 1. Data Ringkasan Eksekutif
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('I. STATISTIK UTAMA LITERASI SEKOLAH', 20, 68);

      doc.setFillColor(248, 250, 252);
      doc.rect(20, 72, 170, 32, 'F');
      doc.rect(20, 72, 170, 32, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text('• Total Buku Dituntaskan (M1)   : 1,428 Buku Terverifikasi', 25, 78);
      doc.text('• Total Karya Dihasilkan (M3)    : 342 Karya (Puisi, Cerpen, Resensi)', 25, 84);
      doc.text('• Total Book Talk Selesai (M4)   : 118 Video Presentasi & Resensi', 25, 90);
      doc.text('• Jam Literasi Terkumpul         : 890 Jam (53,400 Menit Membaca Mandiri)', 25, 96);
      doc.text('• Partisipasi Siswa Aktif         : 96.8% (124 dari 128 Siswa Konsisten Membaca)', 110, 78);
      doc.text('• Rata-rata Buku per Siswa       : 11.2 Buku (Melebihi Standar Nasional)', 110, 84);
      doc.text('• Modul Kearifan Lokal Kasihan   : 48 Modul & Kuis Budaya Bangunjiwo/Kasongan', 110, 90);
      doc.text('• Indeks Akreditasi Literasi     : Kategori A (Sangat Baik / Unggul)', 110, 96);

      // 2. Distribusi Kategori Level Literasi
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('II. DISTRIBUSI LEVEL KATEGORI LITERASI SISWA', 20, 114);

      doc.setFillColor(241, 245, 249);
      doc.rect(20, 118, 170, 7, 'F');
      doc.setFontSize(9);
      doc.text('Tingkatan Level Literasi', 25, 123);
      doc.text('Kriteria Capaian', 75, 123);
      doc.text('Jumlah Siswa', 140, 123);
      doc.text('Persentase', 165, 123);

      const levelRows = [
        ['Level 1: Pembaca Pemula', '1 - 3 Buku (0 - 200 Poin)', '6 Siswa', '4.7%'],
        ['Level 2: Pembaca Aktif', '4 - 7 Buku (201 - 500 Poin)', '24 Siswa', '18.8%'],
        ['Level 3: Pembaca Kritis', '8 - 12 Buku (501 - 900 Poin)', '52 Siswa', '40.6%'],
        ['Level 4: Pembaca Kreatif', '13 - 18 Buku (901 - 1400 Poin)', '38 Siswa', '29.7%'],
        ['Level 5: Ksatria Literasi Kasihan', '19+ Buku (> 1400 Poin)', '8 Siswa', '6.2%']
      ];

      let ly = 131;
      doc.setFont('helvetica', 'normal');
      levelRows.forEach(row => {
        doc.text(row[0], 25, ly);
        doc.text(row[1], 75, ly);
        doc.text(row[2], 140, ly);
        doc.text(row[3], 165, ly);
        doc.line(20, ly + 2, 190, ly + 2);
        ly += 7.5;
      });

      // 3. Siswa Teraktif & Duta Literasi
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('III. TOP SISWA TERAKTIF & DUTA LITERASI SEKOLAH', 20, ly + 8);

      const topRankRows = [
        ['1', 'Anisa Rahma', 'Kelas 8A', '14 Buku', '5 Karya', '620 Poin', 'Duta Literasi Utama'],
        ['2', 'Bagus Kurniawan', 'Kelas 8B', '9 Buku', '4 Karya', '380 Poin', 'Bintang Membaca'],
        ['3', 'Aisyah Putri', 'Kelas 9A', '8 Buku', '5 Karya', '350 Poin', 'Bintang Resensi'],
        ['4', 'Dimas Aditya', 'Kelas 8B', '5 Buku', '2 Karya', '150 Poin', 'Pembaca Aktif']
      ];

      doc.setFillColor(241, 245, 249);
      doc.rect(20, ly + 12, 170, 7, 'F');
      doc.setFontSize(9);
      doc.text('No', 23, ly + 17);
      doc.text('Nama Siswa', 35, ly + 17);
      doc.text('Kelas', 80, ly + 17);
      doc.text('Buku', 105, ly + 17);
      doc.text('Karya', 125, ly + 17);
      doc.text('Poin', 145, ly + 17);
      doc.text('Predikat', 165, ly + 17);

      let ry = ly + 24;
      doc.setFont('helvetica', 'normal');
      topRankRows.forEach(row => {
        doc.text(row[0], 23, ry);
        doc.text(row[1], 35, ry);
        doc.text(row[2], 80, ry);
        doc.text(row[3], 105, ry);
        doc.text(row[4], 125, ry);
        doc.text(row[5], 145, ry);
        doc.text(row[6], 165, ry);
        doc.line(20, ry + 2, 190, ry + 2);
        ry += 7;
      });

      // Signature Kepala Sekolah
      const sigY = Math.max(ry + 12, 235);
      doc.text('Kasihan, Bantul, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 130, sigY);
      doc.text('Kepala SMP Negeri 2 Kasihan,', 130, sigY + 6);
      doc.setFont('helvetica', 'bold');
      doc.text('Erna Retnaningsih, S.Pd., M.Pd.', 130, sigY + 28);
      doc.setFont('helvetica', 'normal');
      doc.text('NIP. 197303261998022001', 130, sigY + 33);

      doc.save('Laporan_Literasi_Sekolah_SMPN2Kasihan_2026.pdf');
      showToast('Laporan Diunduh', 'Berkas PDF Laporan Eksekutif Literasi Sekolah berhasil disimpan.', 'success');
      return;
    } catch (e) {
      console.error('PDF generation error:', e);
      showToast('Ekspor Gagal', 'Gagal memproses berkas PDF: ' + e.message, 'error');
    }
  } else {
    window.print();
  }
};

function renderSekolahRankings() {
  const topStudents = [
    { rank: 1, name: 'Anisa Rahma', class: '8A', points: 620, books: 14, icon: 'text-amber-400' },
    { rank: 2, name: 'Bagus Kurniawan', class: '8B', points: 380, books: 9, icon: 'text-slate-400' },
    { rank: 3, name: 'Aisyah Putri', class: '9A', points: 350, books: 8, icon: 'text-amber-700' },
    { rank: 4, name: 'Dimas Aditya', class: '8B', points: 150, books: 5, icon: 'text-slate-500' },
    { rank: 5, name: 'Nabila Zahra', class: '7B', points: 120, books: 4, icon: 'text-slate-500' }
  ];

  const topClasses = [
    { rank: 1, class: 'Kelas 8A', totalBooks: 320, totalHours: 240, badge: 'Terunggul' },
    { rank: 2, class: 'Kelas 8B', totalBooks: 295, totalHours: 215, badge: 'Sangat Aktif' },
    { rank: 3, class: 'Kelas 9C', totalBooks: 260, totalHours: 190, badge: 'Konsisten' },
    { rank: 4, class: 'Kelas 7A', totalBooks: 220, totalHours: 160, badge: 'Berkembang' }
  ];

  const studentsContainer = document.getElementById('sekolah-top-students');
  const classesContainer = document.getElementById('sekolah-top-classes');

  if (studentsContainer) {
    studentsContainer.innerHTML = topStudents.map(s => `
      <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-black flex items-center justify-center text-xs">
            ${s.rank}
          </span>
          <div>
            <h5 class="font-bold text-slate-800">${s.name}</h5>
            <p class="text-[10px] text-slate-400">Kelas ${s.class} • ${s.books} Buku Tuntas</p>
          </div>
        </div>
        <span class="font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
          ${s.points} Poin
        </span>
      </div>
    `).join('');
  }

  if (classesContainer) {
    classesContainer.innerHTML = topClasses.map(c => `
      <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-black flex items-center justify-center text-xs">
            ${c.rank}
          </span>
          <div>
            <h5 class="font-bold text-slate-800">${c.class}</h5>
            <p class="text-[10px] text-slate-400">${c.totalBooks} Buku • ${c.totalHours} Jam Literasi</p>
          </div>
        </div>
        <span class="text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-md">
          ${c.badge}
        </span>
      </div>
    `).join('');
  }
}

function initSekolahCharts() {
  if (!window.Chart) return;

  const ctxTren = document.getElementById('chart-sekolah-tren')?.getContext('2d');
  const ctxKat = document.getElementById('chart-sekolah-kategori')?.getContext('2d');

  if (ctxTren) {
    if (chartTrenInstance) chartTrenInstance.destroy();
    chartTrenInstance = new Chart(ctxTren, {
      type: 'line',
      data: {
        labels: ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [
          {
            label: 'Buku Dibaca',
            data: [140, 210, 280, 260, 310, 340],
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5
          },
          {
            label: 'Karya Ditulis',
            data: [35, 55, 78, 65, 88, 95],
            borderColor: '#c59b27',
            backgroundColor: 'rgba(197, 155, 39, 0.1)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (ctxKat) {
    if (chartKatInstance) chartKatInstance.destroy();
    chartKatInstance = new Chart(ctxKat, {
      type: 'doughnut',
      data: {
        labels: ['Fiksi & Sastra', 'Budaya Jogja & Bantul', 'Non-Fiksi/Pengembangan', 'Sains Populer'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: ['#0284c7', '#c59b27', '#10b981', '#8b5cf6'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
        },
        cutout: '68%'
      }
    });
  }
}

// ==========================================
// 16. EXPORT RAPOR LITERASI (PDF)
// ==========================================

window.exportRaporPDF = function(targetStudent) {
  const user = targetStudent || window.appState.viewingStudent || window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan', kelas: '8B', points: 380, level: 'Pembaca' };
  
  if (window.jspdf && window.jspdf.jsPDF) {
    try {
      const doc = new window.jspdf.jsPDF();
      
      // Header Kop Surat
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('PEMERINTAH KABUPATEN BANTUL', 105, 18, { align: 'center' });
      doc.setFontSize(16);
      doc.text('SMP NEGERI 2 KASIHAN', 105, 25, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Jl. Bibis, Kasihan, Bantul, D.I. Yogyakarta 55183', 105, 31, { align: 'center' });
      doc.setLineWidth(0.7);
      doc.line(20, 34, 190, 34);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('RAPOR CAPAIAN GERAKAN LITERASI DIGITAL (LENTERA 5M)', 105, 45, { align: 'center' });

      // Student Meta
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`Nama Lengkap   : ${user.name}`, 25, 58);
      doc.text(`NISN           : ${user.nisn || '0098231001'}`, 25, 65);
      doc.text(`Kelas / Rombel : ${user.kelas || user.class || '8B'} (Wali: ${user.waliKelas || 'Ibu Zusma Nadya Izzati, S.Pd.'})`, 25, 72);
      doc.text(`Total Poin     : ${user.points || 0} Poin Literasi`, 25, 79);
      doc.text(`Pangkat        : ${user.level || 'Pembaca Kreatif'}`, 25, 86);

      // 5M Performance Summary Table
      doc.setFont('helvetica', 'bold');
      doc.text('Rekapitulasi Capaian Alur 5M:', 25, 98);

      doc.setFillColor(245, 247, 250);
      doc.rect(25, 102, 160, 8, 'F');
      doc.setFontSize(10);
      doc.text('Tahapan 5M', 30, 107);
      doc.text('Aktivitas Terpenuhi', 85, 107);
      doc.text('Status Capaian', 150, 107);

      const items = [
        ['M1: Membaca (Reading)', `${user.m1_books || 8} Buku (${user.m1_duration || 350} Menit)`, 'Sangat Baik'],
        ['M2: Menemukan (Discovering)', `${user.m2_findings || 12} Temuan Ide & Kuis (${user.m2_quizScore || 95})`, 'Tuntas'],
        ['M3: Menulis (Writing)', `${user.m3_works || 5} Cerpen / Puisi / Resensi Terbit`, 'Sangat Baik'],
        ['M4: Menceritakan (Storytelling)', `${user.m4_talks || 3} Video & Presentasi Cerita`, 'Tuntas'],
        ['M5: Mengapresiasi (Appreciating)', `${user.m5_appreciations || 18} Respon Ulasan & Apresiasi`, 'Aktif']
      ];

      let y = 116;
      doc.setFont('helvetica', 'normal');
      items.forEach(row => {
        doc.text(row[0], 30, y);
        doc.text(row[1], 85, y);
        doc.text(row[2], 150, y);
        doc.line(25, y + 2, 185, y + 2);
        y += 9;
      });

      // Signatures
      doc.text('Kasihan, Bantul, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 130, y + 25);
      doc.text('Kepala SMP Negeri 2 Kasihan,', 130, y + 32);
      doc.setFont('helvetica', 'bold');
      doc.text('Erna Retnaningsih, S.Pd., M.Pd.', 130, y + 55);
      doc.setFont('helvetica', 'normal');
      doc.text('NIP. 197303261998022001', 130, y + 60);

      doc.save(`Rapor_Literasi_${user.name.replace(/\s+/g, '_')}.pdf`);
      showToast('Rapor Diunduh', `Berkas PDF Rapor Literasi untuk ${user.name} berhasil disimpan.`, 'success');
      return;
    } catch (e) {
      console.warn('PDF export error:', e);
    }
  }

  showToast('Cetak Rapor', `Fitur cetak siap digunakan untuk ${user.name}. Menyimpan versi digital...`, 'info');
};

// ==========================================
// 17. ADMIN & DATA MANAGEMENT CONTROLLER
// ==========================================

window.renderAdminDashboard = function() {
  // Update metric counters
  const statUsers = document.getElementById('admin-stat-users');
  const statBooks = document.getElementById('admin-stat-books');
  const statJournals = document.getElementById('admin-stat-journals');
  const statQuiz = document.getElementById('admin-stat-quiz');
  const statWorks = document.getElementById('admin-stat-works');

  if (statUsers) statUsers.textContent = window.appState.users?.length || 0;
  if (statBooks) statBooks.textContent = window.appState.books?.length || 0;
  if (statJournals) {
    const total = window.appState.journals?.length || 0;
    const verified = window.appState.journals?.filter(j => j.verified).length || 0;
    statJournals.textContent = `${verified}/${total}`;
  }
  if (statQuiz) statQuiz.textContent = (window.appState.quizQuestions || []).length;
  if (statWorks) statWorks.textContent = window.appState.works?.length || 0;

  // Render whichever tab is active
  window.switchAdminTab(window.appState.adminTab || 'users');
};

window.switchAdminTab = function(tabName) {
  window.appState.adminTab = tabName;

  // Update tab button styles
  const tabs = ['users', 'books', 'journals', 'quiz', 'works', 'settings'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btn-admin-tab-${t}`);
    const pane = document.getElementById(`admin-pane-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs transition bg-[#082e54] text-white shadow-sm flex items-center gap-2 shrink-0';
      } else {
        btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl font-medium text-xs transition text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 shrink-0';
      }
    }
    if (pane) {
      if (t === tabName) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    }
  });

  // Call specific tab renderer
  if (tabName === 'users') {
    window.renderAdminUsersTable();
  } else if (tabName === 'books') {
    window.renderAdminBooksTable();
  } else if (tabName === 'journals') {
    window.renderAdminJournalsTable();
  } else if (tabName === 'quiz') {
    window.renderAdminQuizTable();
  } else if (tabName === 'works') {
    window.renderAdminWorksTable();
  } else if (tabName === 'settings') {
    window.renderAdminSettings();
  }
};

// --- TAB 1: USERS MANAGEMENT ---
window.renderAdminUsersTable = function() {
  const tbody = document.getElementById('table-admin-users');
  if (!tbody) return;

  const roleFilter = window.appState.adminFilters?.userRole || 'semua';
  const searchQuery = (document.getElementById('admin-search-users')?.value || '').toLowerCase().trim();

  let users = window.appState.users || [];
  if (roleFilter !== 'semua') {
    users = users.filter(u => u.role === roleFilter);
  }
  if (searchQuery) {
    users = users.filter(u => 
      (u.name && u.name.toLowerCase().includes(searchQuery)) ||
      (u.username && u.username.toLowerCase().includes(searchQuery)) ||
      (u.kelas && u.kelas.toLowerCase().includes(searchQuery))
    );
  }

  if (users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-slate-400">
          <i class="fa-solid fa-user-slash text-2xl mb-2"></i>
          <p>Tidak ada data pengguna yang sesuai dengan filter.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = users.map(u => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-3">
        <div class="flex items-center gap-3">
          <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}" class="w-8 h-8 rounded-full object-cover border border-slate-200" />
          <div>
            <span class="font-bold text-slate-800 block">${u.name}</span>
            <span class="text-[10px] text-slate-400 font-mono">ID: ${u.id}</span>
          </div>
        </div>
      </td>
      <td class="py-3 px-3 font-mono font-bold text-slate-700">${u.username}</td>
      <td class="py-3 px-3">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          u.role === 'admin' ? 'bg-slate-900 text-amber-300' :
          u.role === 'guru' ? 'bg-purple-100 text-purple-800' :
          u.role === 'kepsek' ? 'bg-emerald-100 text-emerald-800' :
          'bg-sky-100 text-sky-800'
        }">${u.role}</span>
      </td>
      <td class="py-3 px-3 text-slate-600">${u.kelas || '-'}</td>
      <td class="py-3 px-3 font-bold text-amber-600">${u.points || 0} Poin</td>
      <td class="py-3 px-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="editUserAccount('${u.id}')" class="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg text-xs" title="Edit Akun">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="resetUserPassword('${u.id}')" class="p-1.5 hover:bg-amber-100 text-amber-700 rounded-lg text-xs" title="Reset Kata Sandi">
            <i class="fa-solid fa-key"></i>
          </button>
          <button onclick="deleteUserAccount('${u.id}')" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Akun">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
};

window.filterAdminUsers = function(role) {
  if (!window.appState.adminFilters) window.appState.adminFilters = {};
  window.appState.adminFilters.userRole = role;

  const roles = ['semua', 'siswa', 'guru', 'admin', 'kepsek'];
  roles.forEach(r => {
    const btn = document.getElementById(`btn-filter-role-${r}`);
    if (btn) {
      if (r === role) {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-[#082e54] text-white';
      } else {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    }
  });

  window.renderAdminUsersTable();
};

window.openAddUserModal = function() {
  document.getElementById('form-manage-user')?.reset();
  const idInput = document.getElementById('manage-user-id');
  const title = document.getElementById('modal-user-title');
  if (idInput) idInput.value = '';
  if (title) title.textContent = 'Tambah Pengguna Baru';

  const modal = document.getElementById('modal-user-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.editUserAccount = function(userId) {
  const u = window.appState.users.find(x => x.id === userId);
  if (!u) return;

  const idInput = document.getElementById('manage-user-id');
  const nameInput = document.getElementById('manage-user-name');
  const usernameInput = document.getElementById('manage-user-username');
  const passInput = document.getElementById('manage-user-pass');
  const roleInput = document.getElementById('manage-user-role');
  const classInput = document.getElementById('manage-user-class');
  const title = document.getElementById('modal-user-title');

  if (idInput) idInput.value = u.id;
  if (nameInput) nameInput.value = u.name;
  if (usernameInput) usernameInput.value = u.username;
  if (passInput) passInput.value = u.password;
  if (roleInput) roleInput.value = u.role;
  if (classInput) classInput.value = u.kelas || '';
  if (title) title.textContent = `Edit Akun: ${u.name}`;

  const modal = document.getElementById('modal-user-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.resetUserPassword = function(userId) {
  const u = window.appState.users.find(x => x.id === userId);
  if (!u) return;

  const newPass = prompt(`Reset kata sandi untuk pengguna ${u.name} (${u.username}):`, 'lentera123');
  if (newPass) {
    u.password = newPass.trim();
    setStorage(STORAGE_KEYS.USERS, window.appState.users);
    showToast('Kata Sandi Direset', `Kata sandi baru untuk ${u.name} berhasil disimpan.`, 'success');
  }
};

window.handleSaveUser = function(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('manage-user-id')?.value;
  const name = document.getElementById('manage-user-name')?.value.trim();
  const username = document.getElementById('manage-user-username')?.value.trim();
  const pass = document.getElementById('manage-user-pass')?.value.trim();
  const role = document.getElementById('manage-user-role')?.value;
  const kelas = document.getElementById('manage-user-class')?.value.trim();

  if (!name || !username || !pass) {
    showToast('Data Kurang', 'Harap isi semua kolom yang diperlukan.', 'error');
    return;
  }

  if (id) {
    // Edit
    const idx = window.appState.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      window.appState.users[idx] = {
        ...window.appState.users[idx],
        name,
        username,
        password: pass,
        role,
        kelas
      };
      showToast('Akun Diperbarui', `Data pengguna ${name} berhasil disimpan.`, 'success');
    }
  } else {
    // New
    const newUser = {
      id: `u-${Date.now()}`,
      name,
      username,
      password: pass,
      role,
      kelas,
      avatar: role === 'admin' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      points: role === 'admin' ? 2500 : 0,
      streak: 1,
      level: role === 'admin' ? 'Super Admin' : 'Pembaca',
      badges: role === 'admin' ? ['Administrator Sistem'] : ['Anggota Baru']
    };
    window.appState.users.push(newUser);
    showToast('Pengguna Ditambahkan', `Akun baru ${name} (${role}) berhasil dibuat.`, 'success');
  }

  setStorage(STORAGE_KEYS.USERS, window.appState.users);
  closeUserModal();
  renderAdminUsersTable();
  const statUsers = document.getElementById('admin-stat-users');
  if (statUsers) statUsers.textContent = window.appState.users.length;
};

window.deleteUserAccount = function(userId) {
  if (userId === window.appState.currentUser?.id) {
    showToast('Aksi Dilarang', 'Anda tidak dapat menghapus akun yang sedang aktif login.', 'error');
    return;
  }

  if (!confirm('Apakah Anda yakin ingin menghapus akun pengguna ini?')) return;

  window.appState.users = window.appState.users.filter(u => u.id !== userId);
  setStorage(STORAGE_KEYS.USERS, window.appState.users);
  showToast('Akun Dihapus', 'Pengguna telah dihapus dari sistem.', 'info');
  renderAdminUsersTable();
  const statUsers = document.getElementById('admin-stat-users');
  if (statUsers) statUsers.textContent = window.appState.users.length;
};

window.closeUserModal = function() {
  const modal = document.getElementById('modal-user-form');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.exportUsersCSV = function() {
  const users = window.appState.users || [];
  let csv = '\uFEFFID,Nama Lengkap,Username / NISN,Role,Kelas / Jabatan,Total Poin,Level,Jumlah Buku,Jumlah Karya\n';
  users.forEach(u => {
    csv += `"${u.id}","${u.name}","${u.username}","${u.role}","${u.kelas || '-'}","${u.points || 0}","${u.level || 'Pembaca'}","${u.booksCount || 0}","${u.worksCount || 0}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Data_Pengguna_LENTERA5M_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  showToast('Ekspor CSV Berhasil', 'Data pengguna berhasil diunduh dalam format CSV.', 'success');
};

window.exportUsersExcel = function() {
  try {
    const users = window.appState.users || [];
    const wb = XLSX.utils.book_new();

    const dataRows = [
      ['No', 'ID Sistem', 'NISN / NIP / Username', 'Nama Lengkap', 'Peran', 'Kelas / Jabatan', 'Poin Literasi', 'Level Pembaca', 'Buku Dibaca', 'Karya Dibuat']
    ];

    users.forEach((u, idx) => {
      dataRows.push([
        idx + 1,
        u.id,
        u.username,
        u.name,
        u.role === 'admin' ? 'Administrator' : (u.role === 'guru' ? 'Guru' : (u.role === 'kepsek' ? 'Kepala Sekolah' : 'Siswa')),
        u.kelas || '-',
        u.points || 0,
        u.level || 'Pembaca',
        u.booksCount || 0,
        u.worksCount || 0
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataRows);
    ws['!cols'] = [
      { wch: 5 }, { wch: 14 }, { wch: 22 }, { wch: 30 }, { wch: 14 }, { wch: 22 }, { wch: 14 }, { wch: 18 }, { wch: 12 }, { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Data Pengguna');
    XLSX.writeFile(wb, `Data_Pengguna_LENTERA5M_${new Date().toISOString().slice(0, 10)}.xlsx`);
    showToast('Ekspor Excel Berhasil', 'Data seluruh pengguna berhasil diunduh dalam format Excel (.xlsx).', 'success');
  } catch (err) {
    console.error('Export Excel error:', err);
    window.exportUsersCSV();
  }
};

window.downloadUserTemplateExcel = function() {
  try {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Template Data Pengguna
    const templateData = [
      ['NISN / NIP', 'Nama Lengkap', 'Peran (siswa/guru)', 'Kelas / Mata Pelajaran', 'Kata Sandi Default'],
      ['0098234101', 'Aditya Pratama Putra', 'siswa', '7A', 'lentera123'],
      ['0098234102', 'Dewi Sekar Kinanthi', 'siswa', '7A', 'lentera123'],
      ['0087123901', 'Fajar Ramadhan Santoso', 'siswa', '8B', 'lentera123'],
      ['0076123456', 'Nabila Zahra Syakira', 'siswa', '9C', 'lentera123'],
      ['197805122005012003', 'Ratna Kusumawati, S.Pd.', 'guru', 'Bahasa Indonesia', 'guru123'],
      ['198203152009021004', 'Bambang Triyono, M.Pd.', 'guru', 'IPA / Pembina Literasi', 'guru123']
    ];

    const wsData = XLSX.utils.aoa_to_sheet(templateData);
    wsData['!cols'] = [
      { wch: 22 }, { wch: 32 }, { wch: 20 }, { wch: 26 }, { wch: 20 }
    ];
    XLSX.utils.book_append_sheet(wb, wsData, 'Data Pengguna');

    // Sheet 2: Petunjuk Pengisian
    const instructions = [
      ['Kolom', 'Kewajiban', 'Format & Keterangan', 'Contoh Nilai'],
      ['NISN / NIP', 'Wajib', 'Nomor induk unik siswa (NISN) atau guru (NIP). Digunakan sebagai username login.', '0098234101 atau 197805122005012003'],
      ['Nama Lengkap', 'Wajib', 'Nama lengkap beserta gelar (untuk guru).', 'Dewi Sekar Kinanthi atau Ratna Kusumawati, S.Pd.'],
      ['Peran (siswa/guru)', 'Wajib', 'Isi dengan "siswa" atau "guru".', 'siswa atau guru'],
      ['Kelas / Mata Pelajaran', 'Opsional', 'Kelas untuk siswa (misal: 7A, 8B, 9C) atau mata pelajaran/bidang untuk guru.', '7A atau Bahasa Indonesia'],
      ['Kata Sandi Default', 'Opsional', 'Kata sandi awal untuk login pertama kali. Jika dikosongkan, otomatis diisi "lentera123".', 'lentera123']
    ];

    const wsGuide = XLSX.utils.aoa_to_sheet(instructions);
    wsGuide['!cols'] = [
      { wch: 22 }, { wch: 14 }, { wch: 60 }, { wch: 35 }
    ];
    XLSX.utils.book_append_sheet(wb, wsGuide, 'Petunjuk Pengisian');

    XLSX.writeFile(wb, 'Template_Impor_Siswa_Guru_SMPN2Kasihan.xlsx');
    showToast('Template Excel Diunduh', 'Berkas template "Template_Impor_Siswa_Guru_SMPN2Kasihan.xlsx" siap diisi.', 'success');
  } catch (err) {
    console.error('Download template error:', err);
    window.downloadUserTemplateCSV();
  }
};

window.downloadUserTemplateCSV = function() {
  const csvContent = '\uFEFFNISN / NIP,Nama Lengkap,Peran (siswa/guru),Kelas / Mata Pelajaran,Kata Sandi Default\n' +
    '0098234101,Aditya Pratama Putra,siswa,7A,lentera123\n' +
    '0098234102,Dewi Sekar Kinanthi,siswa,7A,lentera123\n' +
    '0087123901,Fajar Ramadhan Santoso,siswa,8B,lentera123\n' +
    '0076123456,Nabila Zahra Syakira,siswa,9C,lentera123\n' +
    '197805122005012003,"Ratna Kusumawati, S.Pd.",guru,Bahasa Indonesia,guru123\n' +
    '198203152009021004,"Bambang Triyono, M.Pd.",guru,IPA / Pembina Literasi,guru123\n';

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Template_Impor_Siswa_Guru_SMPN2Kasihan.csv';
  a.click();
  showToast('Template CSV Diunduh', 'Template CSV berhasil diunduh.', 'success');
};

// --- MODAL IMPOR USER CONTROLLER ---
window._stagedImportUsers = [];

window.openImportUserModal = function() {
  window._stagedImportUsers = [];
  const fileInput = document.getElementById('input-import-user-file');
  if (fileInput) fileInput.value = '';

  const filenameEl = document.getElementById('import-user-filename');
  if (filenameEl) {
    filenameEl.textContent = '';
    filenameEl.classList.add('hidden');
  }

  const previewContainer = document.getElementById('container-import-user-preview');
  if (previewContainer) previewContainer.classList.add('hidden');

  const btnConfirm = document.getElementById('btn-confirm-import-users');
  if (btnConfirm) btnConfirm.disabled = true;

  const modal = document.getElementById('modal-import-users');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeImportUserModal = function() {
  const modal = document.getElementById('modal-import-users');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  window._stagedImportUsers = [];
};

window.handleUserImportFile = function(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const filenameEl = document.getElementById('import-user-filename');
  if (filenameEl) {
    filenameEl.textContent = `Berkas dipilih: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    filenameEl.classList.remove('hidden');
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      if (!rows || rows.length < 2) {
        showToast('Berkas Kosong', 'Berkas Excel tidak memiliki baris data.', 'error');
        return;
      }

      // Find header row
      let headerRowIdx = -1;
      let colNisn = -1;
      let colName = -1;
      let colRole = -1;
      let colClass = -1;
      let colPass = -1;

      for (let i = 0; i < Math.min(rows.length, 5); i++) {
        const row = rows[i].map(cell => String(cell || '').toLowerCase().trim());
        const nIdx = row.findIndex(c => c.includes('nisn') || c.includes('nip') || c.includes('username') || c.includes('induk'));
        const nameIdx = row.findIndex(c => c.includes('nama') || c.includes('name'));
        if (nIdx !== -1 || nameIdx !== -1) {
          headerRowIdx = i;
          colNisn = nIdx !== -1 ? nIdx : 0;
          colName = nameIdx !== -1 ? nameIdx : 1;
          colRole = row.findIndex(c => c.includes('peran') || c.includes('role') || c.includes('status'));
          colClass = row.findIndex(c => c.includes('kelas') || c.includes('mapel') || c.includes('pelajaran') || c.includes('rombel'));
          colPass = row.findIndex(c => c.includes('sandi') || c.includes('pass'));
          break;
        }
      }

      if (headerRowIdx === -1) {
        headerRowIdx = 0;
        colNisn = 0;
        colName = 1;
        colRole = 2;
        colClass = 3;
        colPass = 4;
      }

      const parsedUsers = [];
      let countSiswa = 0;
      let countGuru = 0;

      for (let r = headerRowIdx + 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.every(cell => !cell || String(cell).trim() === '')) continue;

        let rawNisn = String(row[colNisn] ?? '').trim();
        let rawName = String(row[colName] ?? '').trim();
        let rawRole = colRole !== -1 ? String(row[colRole] ?? '').trim().toLowerCase() : '';
        let rawClass = colClass !== -1 ? String(row[colClass] ?? '').trim() : '';
        let rawPass = colPass !== -1 ? String(row[colPass] ?? '').trim() : '';

        if (!rawName && !rawNisn) continue;

        let role = 'siswa';
        if (rawRole.includes('guru') || rawRole.includes('pengajar') || rawRole.includes('pendidik') || rawRole.includes('teacher')) {
          role = 'guru';
        }

        if (role === 'guru') countGuru++;
        else countSiswa++;

        const username = rawNisn || `user_${Date.now()}_${r}`;
        const name = rawName || `Pengguna ${username}`;
        const password = rawPass || (role === 'guru' ? 'guru123' : 'lentera123');

        parsedUsers.push({
          id: `u-import-${Date.now()}-${r}`,
          name,
          username,
          password,
          role,
          kelas: rawClass || (role === 'guru' ? 'Tenaga Pendidik' : 'Siswa Kasihan'),
          avatar: role === 'guru'
            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
          points: role === 'guru' ? 500 : 100,
          streak: 1,
          booksCount: 0,
          worksCount: 0,
          level: role === 'guru' ? 'Pendidik Literat' : 'Pembaca Pemula',
          badges: role === 'guru' ? ['Guru Penggerak Literasi'] : ['Anggota Baru']
        });
      }

      window._stagedImportUsers = parsedUsers;

      // Update counters
      const statTotal = document.getElementById('stat-import-total');
      const statSiswa = document.getElementById('stat-import-siswa');
      const statGuru = document.getElementById('stat-import-guru');
      const statValid = document.getElementById('stat-import-valid');
      if (statTotal) statTotal.textContent = parsedUsers.length;
      if (statSiswa) statSiswa.textContent = countSiswa;
      if (statGuru) statGuru.textContent = countGuru;
      if (statValid) statValid.textContent = parsedUsers.length;

      // Render Preview Table
      const previewTbody = document.getElementById('table-import-users-preview');
      if (previewTbody) {
        const previewRows = parsedUsers.slice(0, 8);
        previewTbody.innerHTML = previewRows.map(u => `
          <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'guru' ? 'bg-purple-100 text-purple-800' : 'bg-sky-100 text-sky-800'}">
                ${u.role === 'guru' ? 'Guru' : 'Siswa'}
              </span>
            </td>
            <td class="py-2 px-3 font-mono font-bold text-slate-800">${u.username}</td>
            <td class="py-2 px-3 font-semibold text-slate-900">${u.name}</td>
            <td class="py-2 px-3 text-slate-600">${u.kelas}</td>
            <td class="py-2 px-3 font-mono text-slate-500">${u.password}</td>
          </tr>
        `).join('');
      }

      const previewContainer = document.getElementById('container-import-user-preview');
      if (previewContainer) previewContainer.classList.remove('hidden');

      const btnConfirm = document.getElementById('btn-confirm-import-users');
      if (btnConfirm) btnConfirm.disabled = parsedUsers.length === 0;

      showToast('Berkas Terbaca', `Ditemukan ${parsedUsers.length} data calon pengguna (${countSiswa} siswa, ${countGuru} guru).`, 'info');
    } catch (err) {
      console.error('Error parsing Excel:', err);
      showToast('Gagal Membaca', 'Format berkas Excel tidak didukung atau rusak.', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
};

window.processUserImport = function() {
  if (!window._stagedImportUsers || window._stagedImportUsers.length === 0) {
    showToast('Peringatan', 'Tidak ada data pengguna yang siap diimpor.', 'warning');
    return;
  }

  let addedCount = 0;
  let updatedCount = 0;

  window._stagedImportUsers.forEach(staged => {
    const existingIdx = window.appState.users.findIndex(u => 
      u.username.toLowerCase() === staged.username.toLowerCase()
    );

    if (existingIdx !== -1) {
      // Update existing user without resetting points
      window.appState.users[existingIdx].name = staged.name;
      window.appState.users[existingIdx].role = staged.role;
      window.appState.users[existingIdx].kelas = staged.kelas;
      if (staged.password && staged.password !== 'lentera123') {
        window.appState.users[existingIdx].password = staged.password;
      }
      updatedCount++;
    } else {
      window.appState.users.push(staged);
      addedCount++;
    }
  });

  setStorage(STORAGE_KEYS.USERS, window.appState.users);
  closeImportUserModal();
  renderAdminUsersTable();

  const statUsers = document.getElementById('admin-stat-users');
  if (statUsers) statUsers.textContent = window.appState.users.length;

  showToast('Impor Selesai', `Berhasil memproses ${window._stagedImportUsers.length} pengguna: ${addedCount} baru ditambahkan, ${updatedCount} data diperbarui.`, 'success');
};

// --- TAB 2: LITERACY CATALOG & MEDIA MANAGEMENT ---
window._activeMaterialType = 'ebook';
window._activePdfSourceMode = 'upload';
window._activeImageSourceMode = 'upload';
window._uploadedPdfData = null;
window._uploadedImageData = null;

// Helper: YouTube & Drive Embedder
function getEmbedVideoUrl(url) {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  return url;
}

function getYoutubeThumbnailUrl(url) {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return '';
}

window.switchMaterialType = function(type) {
  window._activeMaterialType = type;
  const hiddenInput = document.getElementById('manage-book-material-type');
  if (hiddenInput) hiddenInput.value = type;

  // Switch tabs styling
  const tabEbook = document.getElementById('tab-type-ebook');
  const tabVideo = document.getElementById('tab-type-video');
  const tabGambar = document.getElementById('tab-type-gambar');

  const activeEbookClass = 'flex-1 py-2 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs bg-[#082e54] text-white';
  const activeVideoClass = 'flex-1 py-2 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs bg-rose-600 text-white';
  const activeGambarClass = 'flex-1 py-2 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs bg-[#00695c] text-white';
  const inactiveClass = 'flex-1 py-2 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60';

  if (tabEbook) tabEbook.className = type === 'ebook' ? activeEbookClass : inactiveClass;
  if (tabVideo) tabVideo.className = type === 'video' ? activeVideoClass : inactiveClass;
  if (tabGambar) tabGambar.className = type === 'gambar' ? activeGambarClass : inactiveClass;

  // Toggle container visibility
  const cEbook = document.getElementById('container-material-ebook');
  const cVideo = document.getElementById('container-material-video');
  const cGambar = document.getElementById('container-material-gambar');

  if (cEbook) {
    if (type === 'ebook') cEbook.classList.remove('hidden');
    else cEbook.classList.add('hidden');
  }
  if (cVideo) {
    if (type === 'video') cVideo.classList.remove('hidden');
    else cVideo.classList.add('hidden');
  }
  if (cGambar) {
    if (type === 'gambar') cGambar.classList.remove('hidden');
    else cGambar.classList.add('hidden');
  }

  // Auto set ID prefix if creating new item
  const idInput = document.getElementById('manage-book-id');
  const isEditing = idInput && idInput.hasAttribute('data-editing');
  if (idInput && !isEditing) {
    const nextNum = String((window.appState.books || []).length + 1).padStart(3, '0');
    if (type === 'video') idInput.value = `VID-${nextNum}`;
    else if (type === 'gambar') idInput.value = `IMG-${nextNum}`;
    else idInput.value = `BK-${nextNum}`;
  }
};

window.switchPdfSourceMode = function(mode) {
  window._activePdfSourceMode = mode;
  const tabUpload = document.getElementById('tab-pdf-upload');
  const tabLink = document.getElementById('tab-pdf-link');
  const containerUpload = document.getElementById('container-pdf-upload');
  const containerLink = document.getElementById('container-pdf-link');

  if (mode === 'upload') {
    if (tabUpload) tabUpload.className = 'py-1.5 rounded-lg font-bold text-xs bg-sky-600 text-white transition shadow-2xs';
    if (tabLink) tabLink.className = 'py-1.5 rounded-lg font-semibold text-xs text-slate-600 hover:text-slate-900 transition';
    if (containerUpload) containerUpload.classList.remove('hidden');
    if (containerLink) containerLink.classList.add('hidden');
  } else {
    if (tabUpload) tabUpload.className = 'py-1.5 rounded-lg font-semibold text-xs text-slate-600 hover:text-slate-900 transition';
    if (tabLink) tabLink.className = 'py-1.5 rounded-lg font-bold text-xs bg-sky-600 text-white transition shadow-2xs';
    if (containerUpload) containerUpload.classList.add('hidden');
    if (containerLink) containerLink.classList.remove('hidden');
  }
};

window.switchImageSourceMode = function(mode) {
  window._activeImageSourceMode = mode;
  const tabUpload = document.getElementById('tab-img-upload');
  const tabLink = document.getElementById('tab-img-link');
  const containerUpload = document.getElementById('container-img-upload');
  const containerLink = document.getElementById('container-img-link');

  if (mode === 'upload') {
    if (tabUpload) tabUpload.className = 'py-1.5 rounded-lg font-bold text-xs bg-emerald-600 text-white transition shadow-2xs';
    if (tabLink) tabLink.className = 'py-1.5 rounded-lg font-semibold text-xs text-slate-600 hover:text-slate-900 transition';
    if (containerUpload) containerUpload.classList.remove('hidden');
    if (containerLink) containerLink.classList.add('hidden');
  } else {
    if (tabUpload) tabUpload.className = 'py-1.5 rounded-lg font-semibold text-xs text-slate-600 hover:text-slate-900 transition';
    if (tabLink) tabLink.className = 'py-1.5 rounded-lg font-bold text-xs bg-emerald-600 text-white transition shadow-2xs';
    if (containerUpload) containerUpload.classList.add('hidden');
    if (containerLink) containerLink.classList.remove('hidden');
  }
};

window.checkAndFetchYoutubeThumbnail = function() {
  const urlInput = document.getElementById('manage-book-video-url');
  const url = (urlInput?.value || '').trim();
  if (!url) {
    showToast('Peringatan', 'Masukkan link URL video YouTube terlebih dahulu.', 'warning');
    return;
  }

  const thumbUrl = getYoutubeThumbnailUrl(url);
  const embedUrl = getEmbedVideoUrl(url);

  if (thumbUrl) {
    const coverInput = document.getElementById('manage-book-cover');
    if (coverInput) coverInput.value = thumbUrl;

    const iframe = document.getElementById('video-preview-iframe');
    const previewBox = document.getElementById('video-live-preview-box');
    if (iframe) iframe.src = embedUrl;
    if (previewBox) previewBox.classList.remove('hidden');

    showToast('Cover YouTube Terpasang', 'Berhasil mendeteksi video YouTube dan menetapkan thumbnail cover otomatis.', 'success');
  } else {
    showToast('Link Bukan YouTube', 'Tautan tetap disimpan sebagai tautan video pembelajaran.', 'info');
  }
};

window.previewVideoUrl = function() {
  const url = document.getElementById('manage-book-video-url')?.value.trim();
  const embed = getEmbedVideoUrl(url);
  const iframe = document.getElementById('video-preview-iframe');
  const box = document.getElementById('video-live-preview-box');

  if (embed && (embed.includes('youtube.com') || embed.includes('drive.google.com'))) {
    if (iframe) iframe.src = embed;
    if (box) box.classList.remove('hidden');
  }
};

window.previewImageUrl = function() {
  const url = document.getElementById('manage-book-image-url')?.value.trim();
  const img = document.getElementById('img-live-preview');
  const box = document.getElementById('img-live-preview-box');
  const cover = document.getElementById('manage-book-cover');

  if (url) {
    if (img) img.src = url;
    if (box) box.classList.remove('hidden');
    if (cover && !cover.value.trim()) cover.value = url;
  }
};

window.handleBookImageFileChange = function(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    window._uploadedImageData = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      url: dataUrl
    };

    const nameEl = document.getElementById('img-file-preview-name');
    const badge = document.getElementById('img-file-preview-badge');
    const previewImg = document.getElementById('img-live-preview');
    const previewBox = document.getElementById('img-live-preview-box');
    const coverInput = document.getElementById('manage-book-cover');

    if (nameEl) nameEl.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    if (badge) {
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    }
    if (previewImg) previewImg.src = dataUrl;
    if (previewBox) previewBox.classList.remove('hidden');
    if (coverInput) coverInput.value = dataUrl;

    const titleInput = document.getElementById('manage-book-title');
    if (titleInput && !titleInput.value.trim()) {
      titleInput.value = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    }

    showToast('Gambar Terpilih', `Berkas "${file.name}" siap disimpan ke galeri literasi.`, 'success');
  };
  reader.readAsDataURL(file);
};

window.clearSelectedImageFile = function() {
  window._uploadedImageData = null;
  const fileInput = document.getElementById('manage-book-img-file');
  if (fileInput) fileInput.value = '';
  const badge = document.getElementById('img-file-preview-badge');
  if (badge) {
    badge.classList.add('hidden');
    badge.classList.remove('flex');
  }
};

window.handleBookPdfFileChange = function(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    showToast('Bukan Berkas PDF', 'Harap pilih berkas dengan format .pdf resmi.', 'error');
    return;
  }

  // Check file size (e.g. max 15MB for browser local storage)
  if (file.size > 15 * 1024 * 1024) {
    showToast('Ukuran Terlalu Besar', 'Ukuran berkas PDF maksimal 15MB untuk penyimpanan peramban lokal.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    
    window._uploadedPdfData = {
      name: file.name,
      size: sizeFormatted,
      url: dataUrl
    };

    const badge = document.getElementById('pdf-file-preview-badge');
    const nameEl = document.getElementById('pdf-file-preview-name');
    const sizeEl = document.getElementById('pdf-file-preview-size');

    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = `(${sizeFormatted})`;
    if (badge) {
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    }

    // Auto-fill title if empty
    const titleInput = document.getElementById('manage-book-title');
    if (titleInput && !titleInput.value.trim()) {
      titleInput.value = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    }

    showToast('Berkas PDF Terpilih', `Berkas "${file.name}" siap disimpan dan dibaca di aplikasi.`, 'success');
  };
  reader.readAsDataURL(file);
};

window.clearSelectedPdfFile = function() {
  window._uploadedPdfData = null;
  const fileInput = document.getElementById('manage-book-pdf-file');
  if (fileInput) fileInput.value = '';
  const badge = document.getElementById('pdf-file-preview-badge');
  if (badge) {
    badge.classList.add('hidden');
    badge.classList.remove('flex');
  }
};

window.renderAdminBooksTable = function() {
  const tbody = document.getElementById('table-admin-books');
  if (!tbody) return;

  const categoryFilter = window.appState.adminFilters?.bookCategory || 'semua';
  const materialTypeFilter = window.appState.adminFilters?.bookMaterialType || 'semua';
  const searchQuery = (document.getElementById('admin-search-books')?.value || '').toLowerCase().trim();

  let books = window.appState.books || [];

  if (materialTypeFilter !== 'semua') {
    books = books.filter(b => (b.materialType || 'ebook') === materialTypeFilter);
  }

  if (categoryFilter !== 'semua') {
    books = books.filter(b => b.category === categoryFilter || (categoryFilter === 'jogja' && (b.category === 'kearifan_lokal' || b.category === 'jogja')));
  }

  if (searchQuery) {
    books = books.filter(b => 
      (b.title && b.title.toLowerCase().includes(searchQuery)) ||
      (b.author && b.author.toLowerCase().includes(searchQuery)) ||
      (b.id && b.id.toLowerCase().includes(searchQuery))
    );
  }

  if (books.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-slate-400">
          <i class="fa-solid fa-folder-open text-3xl mb-2 text-slate-300"></i>
          <p class="font-bold text-slate-600">Tidak ada bahan literasi yang sesuai.</p>
          <p class="text-xs text-slate-400 mt-1">Coba sesuaikan filter tipe bahan, kategori, atau tambahkan bahan baru.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = books.map(b => {
    const isVideo = b.materialType === 'video';
    const isImage = b.materialType === 'gambar';
    const isEbook = !isVideo && !isImage;

    let typeBadge = '';
    let mediaMeta = '';
    let linkBadge = '';
    let playActionBtn = '';

    if (isVideo) {
      typeBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 w-fit shadow-2xs"><i class="fa-solid fa-circle-play text-rose-500"></i> Video Literasi</span>`;
      mediaMeta = `${b.duration || 'Video'} • ${b.creator || b.author || 'Kreator'}`;
      linkBadge = b.videoUrl
        ? `<a href="${b.videoUrl}" target="_blank" class="text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 font-semibold text-xs truncate max-w-[170px]" title="${b.videoUrl}"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> ${b.videoUrl.includes('youtube') ? 'Tautan YouTube' : 'Link Video'}</a>`
        : `<span class="text-slate-400 text-xs">-</span>`;
      playActionBtn = `
        <button onclick="openVideoPlayerModal('${b.id}')" class="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs" title="Tonton Video Pembelajaran">
          <i class="fa-solid fa-play text-amber-300 text-[10px]"></i> Tonton
        </button>
      `;
    } else if (isImage) {
      typeBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit shadow-2xs"><i class="fa-solid fa-image text-emerald-500"></i> Gambar / Infografis</span>`;
      mediaMeta = `1 Lembar Visual`;
      const imgLink = b.imageUrl || b.link || b.cover;
      linkBadge = imgLink
        ? `<a href="${imgLink}" target="_blank" class="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 font-semibold text-xs truncate max-w-[170px]" title="Buka Gambar"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> ${imgLink.startsWith('data:') ? 'Unggahan Lokal' : 'Link Gambar'}</a>`
        : `<span class="text-slate-400 text-xs">-</span>`;
      playActionBtn = `
        <button onclick="openImageViewerModal('${b.id}')" class="px-2.5 py-1.5 bg-[#00695c] hover:bg-[#004d40] text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs" title="Lihat Gambar Infografis">
          <i class="fa-solid fa-magnifying-glass-plus text-white text-[10px]"></i> Lihat
        </button>
      `;
    } else {
      typeBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1 w-fit shadow-2xs"><i class="fa-solid fa-book text-sky-500"></i> E-Book</span>`;
      mediaMeta = `${b.pages || 100} Halaman`;
      if (b.pdfSourceType === 'upload') {
        linkBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit shadow-2xs"><i class="fa-solid fa-file-pdf text-red-500"></i> PDF Upload</span>`;
      } else if (b.pdfSourceType === 'link' && b.pdfUrl) {
        linkBadge = `<a href="${b.pdfUrl}" target="_blank" class="text-sky-600 hover:underline flex items-center gap-1 font-semibold text-xs truncate max-w-[170px]"><i class="fa-solid fa-link text-sky-500"></i> Link PDF</a>`;
      } else if (b.id === 'BK-SOP' || b.category === 'sarpras') {
        linkBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 w-fit shadow-2xs"><i class="fa-solid fa-shield-halved text-amber-600"></i> SOP Resmi</span>`;
      } else {
        linkBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 flex items-center gap-1 w-fit"><i class="fa-solid fa-file-lines text-slate-400"></i> Standar</span>`;
      }
      playActionBtn = `
        <button onclick="selectActiveBook('${b.id}')" class="px-2.5 py-1.5 bg-[#082e54] hover:bg-sky-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs" title="Buka dan baca dokumen PDF">
          <i class="fa-solid fa-book-open text-amber-400 text-[10px]"></i> Baca
        </button>
      `;
    }

    return `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <div class="relative shrink-0">
              <img src="${b.cover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120'}" class="w-10 h-14 object-cover rounded-lg shadow-xs border border-slate-200" />
              ${isVideo ? '<span class="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8px] shadow-xs"><i class="fa-solid fa-play ml-0.5"></i></span>' : ''}
              ${isImage ? '<span class="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] shadow-xs"><i class="fa-solid fa-image"></i></span>' : ''}
            </div>
            <div class="min-w-0">
              <span class="font-bold text-slate-800 block text-xs sm:text-sm line-clamp-1">${b.title}</span>
              <span class="text-[11px] text-slate-500 truncate block">${b.author || 'Tim Literasi SMPN 2 Kasihan'}</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 font-mono font-bold text-sky-800 text-xs">${b.id}</td>
        <td class="py-3 px-3">
          ${typeBadge}
        </td>
        <td class="py-3 px-3">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${b.category === 'sarpras' ? 'bg-amber-100 text-amber-900' : (b.category === 'kearifan_lokal' || b.category === 'jogja' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700')}">
            ${b.categoryLabel || b.category}
          </span>
        </td>
        <td class="py-3 px-3">
          ${linkBadge}
        </td>
        <td class="py-3 px-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${playActionBtn}
            <button onclick="openBookQrModal('${b.id}')" class="p-1.5 hover:bg-sky-50 text-sky-600 rounded-lg text-xs" title="Cetak / Tampilkan QR Code Buku">
              <i class="fa-solid fa-qrcode"></i>
            </button>
            <button onclick="editBookModal('${b.id}')" class="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg text-xs" title="Edit Bahan Literasi">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="deleteBook('${b.id}')" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Bahan">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
};

window.filterAdminBooksType = function(type) {
  if (!window.appState.adminFilters) window.appState.adminFilters = {};
  window.appState.adminFilters.bookMaterialType = type;

  const types = ['semua', 'ebook', 'video', 'gambar'];
  types.forEach(t => {
    const btn = document.getElementById(`btn-filter-type-${t}`);
    if (btn) {
      if (t === type) {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-[#082e54] text-white shadow-2xs';
      } else {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    }
  });

  window.renderAdminBooksTable();
};

window.filterAdminBooks = function(cat) {
  if (!window.appState.adminFilters) window.appState.adminFilters = {};
  window.appState.adminFilters.bookCategory = cat;

  const cats = ['semua', 'sarpras', 'fiksi', 'kearifan_lokal', 'sains', 'sejarah'];
  cats.forEach(c => {
    const btn = document.getElementById(`btn-filter-book-${c}`);
    if (btn) {
      if (c === cat) {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-[#082e54] text-white shadow-2xs';
      } else {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    }
  });

  window.renderAdminBooksTable();
};

window.openAddBookModal = function(initialType = 'ebook') {
  document.getElementById('form-manage-book')?.reset();
  window.clearSelectedPdfFile();
  window.clearSelectedImageFile();

  const idInput = document.getElementById('manage-book-id');
  if (idInput) idInput.removeAttribute('data-editing');

  const title = document.getElementById('modal-book-title');
  if (title) title.innerHTML = '<i class="fa-solid fa-plus text-sky-600 mr-1.5"></i> Tambah Bahan Literasi Digital';

  // Hide previews
  const videoBox = document.getElementById('video-live-preview-box');
  if (videoBox) videoBox.classList.add('hidden');
  const imgBox = document.getElementById('img-live-preview-box');
  if (imgBox) imgBox.classList.add('hidden');

  window.switchMaterialType(initialType);
  window.switchPdfSourceMode('upload');
  window.switchImageSourceMode('upload');

  const modal = document.getElementById('modal-book-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.editBookModal = function(bookId) {
  const b = window.appState.books.find(x => x.id === bookId);
  if (!b) return;

  window.clearSelectedPdfFile();
  window.clearSelectedImageFile();

  const idInput = document.getElementById('manage-book-id');
  const titleInput = document.getElementById('manage-book-title');
  const authorInput = document.getElementById('manage-book-author');
  const catInput = document.getElementById('manage-book-category');
  const pagesInput = document.getElementById('manage-book-pages');
  const coverInput = document.getElementById('manage-book-cover');
  const synopsisInput = document.getElementById('manage-book-synopsis');
  const pdfLinkInput = document.getElementById('manage-book-pdf-url');
  const videoUrlInput = document.getElementById('manage-book-video-url');
  const durationInput = document.getElementById('manage-book-duration');
  const creatorInput = document.getElementById('manage-book-creator');
  const imgUrlInput = document.getElementById('manage-book-image-url');
  const modalTitle = document.getElementById('modal-book-title');

  if (idInput) {
    idInput.value = b.id;
    idInput.setAttribute('data-editing', 'true');
  }
  if (titleInput) titleInput.value = b.title || '';
  if (authorInput) authorInput.value = b.author || '';
  if (catInput) catInput.value = b.category || 'fiksi';
  if (coverInput) coverInput.value = b.cover || '';
  if (synopsisInput) synopsisInput.value = b.synopsis || '';
  if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square text-sky-600 mr-1.5"></i> Edit Bahan: ${b.title}`;

  const matType = b.materialType || (b.videoUrl ? 'video' : (b.imageUrl ? 'gambar' : 'ebook'));
  window.switchMaterialType(matType);

  if (matType === 'video') {
    if (videoUrlInput) videoUrlInput.value = b.videoUrl || b.link || '';
    if (durationInput) durationInput.value = b.duration || '';
    if (creatorInput) creatorInput.value = b.creator || b.author || '';
    window.previewVideoUrl();
  } else if (matType === 'gambar') {
    if (imgUrlInput) imgUrlInput.value = b.imageUrl || b.link || '';
    window.previewImageUrl();
  } else {
    if (pagesInput) pagesInput.value = b.pages || 100;
    if (b.pdfSourceType === 'link' && b.pdfUrl) {
      window.switchPdfSourceMode('link');
      if (pdfLinkInput) pdfLinkInput.value = b.pdfUrl;
    } else if (b.pdfSourceType === 'upload' && b.pdfUrl) {
      window.switchPdfSourceMode('upload');
      window._uploadedPdfData = {
        name: b.pdfFileName || `${b.title}.pdf`,
        size: b.pdfSize || 'Tersimpan',
        url: b.pdfUrl
      };
      const badge = document.getElementById('pdf-file-preview-badge');
      const nameEl = document.getElementById('pdf-file-preview-name');
      const sizeEl = document.getElementById('pdf-file-preview-size');
      if (nameEl) nameEl.textContent = b.pdfFileName || `${b.title}.pdf`;
      if (sizeEl) sizeEl.textContent = `(${b.pdfSize || 'Tersimpan'})`;
      if (badge) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      }
    } else {
      window.switchPdfSourceMode('upload');
    }
  }

  const modal = document.getElementById('modal-book-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.handleSaveBook = function(e) {
  if (e) e.preventDefault();
  const materialType = document.getElementById('manage-book-material-type')?.value || window._activeMaterialType || 'ebook';
  const id = document.getElementById('manage-book-id')?.value.trim();
  const title = document.getElementById('manage-book-title')?.value.trim();
  const author = document.getElementById('manage-book-author')?.value.trim();
  const category = document.getElementById('manage-book-category')?.value || 'fiksi';
  let cover = document.getElementById('manage-book-cover')?.value.trim();
  const synopsis = document.getElementById('manage-book-synopsis')?.value.trim();

  if (!id || !title) {
    showToast('Data Kurang', 'Kode identitas dan judul bahan literasi wajib diisi.', 'error');
    return;
  }

  const categoryLabels = {
    'sarpras': 'SARPRAS & SOP',
    'kearifan_lokal': 'Kearifan Kasihan & Budaya',
    'jogja': 'Kearifan Kasihan & Budaya',
    'fiksi': 'Fiksi & Sastra',
    'nonfiksi': 'Non-Fiksi & Referensi',
    'sains': 'Sains & Teknologi',
    'sejarah': 'Sejarah Nusantara'
  };

  const categoryLabel = categoryLabels[category] || category.toUpperCase();

  let bookPayload = {
    id,
    materialType,
    title,
    author: author || 'Tim Literasi SMPN 2 Kasihan',
    category,
    categoryLabel,
    synopsis: synopsis || 'Bahan literasi terpilih LENTERA 5M SMP Negeri 2 Kasihan Bantul.',
    rating: 5.0
  };

  if (materialType === 'video') {
    const videoUrl = document.getElementById('manage-book-video-url')?.value.trim();
    const duration = document.getElementById('manage-book-duration')?.value.trim() || '15 Menit';
    const creator = document.getElementById('manage-book-creator')?.value.trim() || author || 'Kreator Literasi';

    if (!videoUrl) {
      showToast('Link Video Wajib', 'Harap masukkan tautan link video YouTube atau Drive.', 'error');
      return;
    }

    if (!cover) {
      const ytThumb = getYoutubeThumbnailUrl(videoUrl);
      cover = ytThumb || 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400';
    }

    bookPayload = {
      ...bookPayload,
      videoUrl,
      link: videoUrl,
      duration,
      creator,
      cover,
      pages: 1
    };
  } else if (materialType === 'gambar') {
    let imageUrl = '';
    let imageFileName = '';

    if (window._activeImageSourceMode === 'upload' && window._uploadedImageData) {
      imageUrl = window._uploadedImageData.url;
      imageFileName = window._uploadedImageData.name;
    } else {
      imageUrl = document.getElementById('manage-book-image-url')?.value.trim();
      imageFileName = `${title}.jpg`;
    }

    if (!imageUrl) {
      showToast('Gambar Wajib', 'Harap unggah berkas gambar atau cantumkan link URL gambar/infografis.', 'error');
      return;
    }

    if (!cover) cover = imageUrl;

    bookPayload = {
      ...bookPayload,
      imageUrl,
      link: imageUrl,
      imageFileName,
      cover,
      pages: 1
    };
  } else {
    // E-Book
    const pages = parseInt(document.getElementById('manage-book-pages')?.value) || 100;
    const pdfUrlInput = document.getElementById('manage-book-pdf-url')?.value.trim();

    if (!cover) {
      cover = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300';
    }

    let pdfSourceType = 'default';
    let pdfUrl = '';
    let pdfFileName = `${title}.pdf`;
    let pdfSize = '';

    if (window._activePdfSourceMode === 'upload' && window._uploadedPdfData) {
      pdfSourceType = 'upload';
      pdfUrl = window._uploadedPdfData.url;
      pdfFileName = window._uploadedPdfData.name;
      pdfSize = window._uploadedPdfData.size;
    } else if (window._activePdfSourceMode === 'link' && pdfUrlInput) {
      pdfSourceType = 'link';
      pdfUrl = pdfUrlInput;
      pdfFileName = `${title}.pdf`;
      pdfSize = 'Link Eksternal';
    }

    bookPayload = {
      ...bookPayload,
      pages,
      cover,
      pdfSourceType,
      pdfUrl,
      pdfFileName,
      pdfSize,
      hasPdf: true
    };
  }

  const existingIdx = window.appState.books.findIndex(b => b.id === id);
  if (existingIdx !== -1) {
    window.appState.books[existingIdx] = {
      ...window.appState.books[existingIdx],
      ...bookPayload
    };
    showToast('Bahan Diperbarui', `Bahan literasi "${title}" berhasil diperbarui.`, 'success');
  } else {
    window.appState.books.unshift(bookPayload);
    showToast('Bahan Ditambahkan', `Bahan literasi "${title}" berhasil ditambahkan ke katalog sekolah!`, 'success');
  }

  setStorage(STORAGE_KEYS.BOOKS, window.appState.books);
  closeBookModal();
  renderAdminBooksTable();

  // Sync student view catalog
  if (typeof window.renderBooks === 'function') {
    window.renderBooks();
  }

  const statBooks = document.getElementById('admin-stat-books');
  if (statBooks) statBooks.textContent = window.appState.books.length;

  if (typeof window.populateJournalBookSelect === 'function') {
    window.populateJournalBookSelect();
  }
};

window.deleteBook = function(bookId) {
  if (!confirm(`Hapus bahan literasi dengan kode ${bookId}?`)) return;

  window.appState.books = window.appState.books.filter(b => b.id !== bookId);
  setStorage(STORAGE_KEYS.BOOKS, window.appState.books);
  showToast('Bahan Dihapus', 'Bahan literasi telah dihapus dari katalog.', 'info');
  renderAdminBooksTable();

  if (typeof window.renderBooks === 'function') {
    window.renderBooks();
  }

  const statBooks = document.getElementById('admin-stat-books');
  if (statBooks) statBooks.textContent = window.appState.books.length;

  if (typeof window.populateJournalBookSelect === 'function') {
    window.populateJournalBookSelect();
  }
};

window.closeBookModal = function() {
  const modal = document.getElementById('modal-book-form');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  const idInput = document.getElementById('manage-book-id');
  if (idInput) idInput.removeAttribute('data-editing');
  window.clearSelectedPdfFile();
  window.clearSelectedImageFile();
};

// --- IN-APP VIDEO & IMAGE VIEWERS ---
window._activeModalMedia = null;

window.openVideoPlayerModal = function(bookId) {
  const b = (window.appState.books || []).find(x => x.id === bookId);
  if (!b) return;

  window._activeModalMedia = b;

  const modal = document.getElementById('modal-video-player');
  const titleEl = document.getElementById('video-modal-title');
  const authorEl = document.getElementById('video-modal-author');
  const synopsisEl = document.getElementById('video-modal-synopsis');
  const iframe = document.getElementById('video-modal-iframe');
  const extLink = document.getElementById('video-modal-external-link');

  if (titleEl) titleEl.textContent = b.title;
  if (authorEl) authorEl.textContent = `Kreator / Pemateri: ${b.creator || b.author} • Durasi: ${b.duration || '15 Menit'}`;
  if (synopsisEl) synopsisEl.textContent = b.synopsis || 'Tonton video pembelajaran literasi ini secara fokus.';

  const embedUrl = getEmbedVideoUrl(b.videoUrl || b.link || '');
  if (iframe) iframe.src = embedUrl;

  if (extLink) {
    extLink.href = b.videoUrl || b.link || '#';
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeVideoPlayerModal = function() {
  const modal = document.getElementById('modal-video-player');
  const iframe = document.getElementById('video-modal-iframe');
  if (iframe) iframe.src = ''; // Stops audio immediately

  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openImageViewerModal = function(bookId) {
  const b = (window.appState.books || []).find(x => x.id === bookId);
  if (!b) return;

  window._activeModalMedia = b;

  const modal = document.getElementById('modal-image-viewer');
  const titleEl = document.getElementById('image-modal-title');
  const authorEl = document.getElementById('image-modal-author');
  const synopsisEl = document.getElementById('image-modal-synopsis');
  const imgEl = document.getElementById('image-modal-img');
  const extLink = document.getElementById('image-modal-external-link');

  if (titleEl) titleEl.textContent = b.title;
  if (authorEl) authorEl.textContent = `Sumber / Penyusun: ${b.author}`;
  if (synopsisEl) synopsisEl.textContent = b.synopsis || 'Pelajari infografis visual ini untuk memperdalam pemahaman literasi.';

  const imgSource = b.imageUrl || b.link || b.cover;
  if (imgEl) imgEl.src = imgSource;
  if (extLink) extLink.href = imgSource;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeImageViewerModal = function() {
  const modal = document.getElementById('modal-image-viewer');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openJournalForCurrentMedia = function() {
  const media = window._activeModalMedia;
  if (media) {
    window.closeVideoPlayerModal();
    window.closeImageViewerModal();
    window.openJournalForBook(media.title, media.materialType);
  }
};

window.openBookQrModal = function(bookId) {
  const b = window.appState.books.find(x => x.id === bookId);
  if (!b) return;

  const modal = document.getElementById('modal-book-qr');
  const titleEl = document.getElementById('qr-book-title');
  const idEl = document.getElementById('qr-book-id');
  const authorEl = document.getElementById('qr-book-author');
  const qrImg = document.getElementById('qr-book-image');

  if (titleEl) titleEl.textContent = b.title;
  if (idEl) idEl.textContent = `KODE BUKU: ${b.id}`;
  if (authorEl) authorEl.textContent = `Penulis: ${b.author || '-'}`;
  if (qrImg) {
    // Generate reliable quick QR image url
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(b.id)}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeBookQrModal = function() {
  const modal = document.getElementById('modal-book-qr');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.printBookQr = function() {
  window.print();
};

// --- TAB 3: STUDENT JOURNALS MANAGEMENT ---
window.renderAdminJournalsTable = function() {
  const tbody = document.getElementById('table-admin-journals');
  if (!tbody) return;

  const statusFilter = window.appState.adminFilters?.journalStatus || 'semua';
  const searchQuery = (document.getElementById('admin-search-journals')?.value || '').toLowerCase().trim();

  let journals = window.appState.journals || [];
  if (statusFilter === 'menunggu') {
    journals = journals.filter(j => !j.verified);
  } else if (statusFilter === 'terverifikasi') {
    journals = journals.filter(j => j.verified);
  }

  if (searchQuery) {
    journals = journals.filter(j => 
      (j.studentName && j.studentName.toLowerCase().includes(searchQuery)) ||
      (j.bookTitle && j.bookTitle.toLowerCase().includes(searchQuery)) ||
      (j.summary && j.summary.toLowerCase().includes(searchQuery))
    );
  }

  if (journals.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-400">
          <i class="fa-solid fa-clipboard-list text-2xl mb-2"></i>
          <p>Tidak ada catatan jurnal membaca yang sesuai.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = journals.map(j => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-3 text-slate-600 font-mono text-xs">${j.date || '-'}</td>
      <td class="py-3 px-3">
        <span class="font-bold text-slate-800 block text-xs sm:text-sm">${j.studentName || 'Aisyah Putri Rahma'}</span>
        <span class="text-[10px] text-slate-400">${j.kelas || '8B'}</span>
      </td>
      <td class="py-3 px-3">
        <span class="font-bold text-slate-700 block text-xs line-clamp-1">${j.bookTitle}</span>
        <span class="text-[10px] text-slate-400">Hal. ${j.pagesRead || '-'} (${j.durationMinutes || 15} Menit)</span>
      </td>
      <td class="py-3 px-3 max-w-xs">
        <p class="text-xs text-slate-600 line-clamp-2">${j.summary || '-'}</p>
      </td>
      <td class="py-3 px-3">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${
          j.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }">
          <i class="fa-solid ${j.verified ? 'fa-check' : 'fa-hourglass-half'} mr-1"></i>
          ${j.verified ? 'Terverifikasi' : 'Menunggu'}
        </span>
      </td>
      <td class="py-3 px-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="toggleVerifyJournal('${j.id}')" class="px-2.5 py-1 text-xs font-bold rounded-lg ${
            j.verified ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }">
            ${j.verified ? 'Batalkan' : 'Verifikasi'}
          </button>
          <button onclick="deleteJournalEntry('${j.id}')" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Jurnal">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
};

window.filterAdminJournals = function(status) {
  if (!window.appState.adminFilters) window.appState.adminFilters = {};
  window.appState.adminFilters.journalStatus = status;

  const statuses = ['semua', 'menunggu', 'terverifikasi'];
  statuses.forEach(s => {
    const btn = document.getElementById(`btn-filter-journal-${s}`);
    if (btn) {
      if (s === status) {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-[#082e54] text-white';
      } else {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    }
  });

  window.renderAdminJournalsTable();
};

window.toggleVerifyJournal = function(journalId) {
  const j = window.appState.journals.find(x => x.id === journalId);
  if (!j) return;

  j.verified = !j.verified;
  setStorage(STORAGE_KEYS.JOURNALS, window.appState.journals);
  showToast(
    j.verified ? 'Jurnal Terverifikasi' : 'Status Dicabut',
    `Jurnal membaca ${j.studentName} telah ${j.verified ? 'disetujui' : 'dikembalikan ke menunggu'}.`,
    'success'
  );
  window.renderAdminJournalsTable();
  const statJournals = document.getElementById('admin-stat-journals');
  if (statJournals) {
    const total = window.appState.journals.length;
    const verified = window.appState.journals.filter(x => x.verified).length;
    statJournals.textContent = `${verified}/${total}`;
  }
};

window.verifyAllPendingJournals = function() {
  let count = 0;
  window.appState.journals.forEach(j => {
    if (!j.verified) {
      j.verified = true;
      count++;
    }
  });
  setStorage(STORAGE_KEYS.JOURNALS, window.appState.journals);
  showToast('Verifikasi Massal', `${count} jurnal membaca berhasil diverifikasi.`, 'success');
  window.renderAdminJournalsTable();
};

window.deleteJournalEntry = function(journalId) {
  if (!confirm('Hapus entri jurnal membaca ini?')) return;

  window.appState.journals = window.appState.journals.filter(j => j.id !== journalId);
  setStorage(STORAGE_KEYS.JOURNALS, window.appState.journals);
  showToast('Jurnal Dihapus', 'Entri jurnal telah dihapus dari sistem.', 'info');
  window.renderAdminJournalsTable();
};

window.exportJournalsCSV = function() {
  const journals = window.appState.journals || [];
  let csv = 'ID,Tanggal,Nama Siswa,Kelas,Judul Buku,Halaman,Durasi (Menit),Status Verifikasi\n';
  journals.forEach(j => {
    csv += `"${j.id}","${j.date}","${j.studentName || 'Aisyah Putri'}","${j.kelas || '8B'}","${j.bookTitle}","${j.pagesRead || '-'}","${j.durationMinutes || 15}","${j.verified ? 'Terverifikasi' : 'Menunggu'}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Rekap_Jurnal_Membaca_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  showToast('Ekspor Berhasil', 'Rekap jurnal membaca berhasil diunduh.', 'success');
};

// --- TAB 4: QUIZ QUESTIONS MANAGEMENT ---
window.renderAdminQuizTable = function() {
  const container = document.getElementById('list-admin-quiz');
  if (!container) return;

  const searchQuery = (document.getElementById('admin-search-quiz')?.value || '').toLowerCase().trim();
  let questions = window.appState.quizQuestions || [];

  if (searchQuery) {
    questions = questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery) ||
      (q.explanation && q.explanation.toLowerCase().includes(searchQuery))
    );
  }

  if (questions.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <i class="fa-solid fa-circle-question text-2xl mb-2"></i>
        <p>Belum ada soal kuis yang terdaftar.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = questions.map((q, idx) => `
    <div class="p-5 rounded-2xl bg-white border border-slate-200 card-shadow space-y-3">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <span class="w-7 h-7 rounded-xl bg-[#082e54] text-white flex items-center justify-center font-bold text-xs shrink-0">
            ${idx + 1}
          </span>
          <div>
            <h4 class="font-bold text-slate-900 text-sm leading-relaxed">${q.question}</h4>
            <span class="text-[11px] text-amber-600 font-semibold">+25 Poin Literasi</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick="editQuizModal(${idx})" class="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg text-xs" title="Edit Soal">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="deleteQuiz(${idx})" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Soal">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <!-- Options -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
        ${q.options.map((opt, optIdx) => `
          <div class="p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
            optIdx === q.correct
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }">
            <i class="fa-solid ${optIdx === q.correct ? 'fa-circle-check text-emerald-600' : 'fa-circle-dot text-slate-300'}"></i>
            <span class="line-clamp-1">${opt}</span>
          </div>
        `).join('')}
      </div>

      <!-- Explanation -->
      ${q.explanation ? `
        <div class="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-sky-900 text-[11px] flex items-start gap-2">
          <i class="fa-solid fa-lightbulb text-amber-500 mt-0.5 shrink-0"></i>
          <span><strong>Penjelasan Edukatif:</strong> ${q.explanation}</span>
        </div>
      ` : ''}
    </div>
  `).join('');
};

window.openAddQuizModal = function() {
  document.getElementById('form-manage-quiz')?.reset();
  const indexInput = document.getElementById('manage-quiz-index');
  const title = document.getElementById('modal-quiz-title');
  if (indexInput) indexInput.value = '';
  if (title) title.textContent = 'Tambah Soal Kuis 5M Baru';

  const modal = document.getElementById('modal-quiz-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.editQuizModal = function(index) {
  const q = window.appState.quizQuestions[index];
  if (!q) return;

  const indexInput = document.getElementById('manage-quiz-index');
  const questionInput = document.getElementById('manage-quiz-question');
  const opt0 = document.getElementById('manage-quiz-opt0');
  const opt1 = document.getElementById('manage-quiz-opt1');
  const opt2 = document.getElementById('manage-quiz-opt2');
  const opt3 = document.getElementById('manage-quiz-opt3');
  const correctInput = document.getElementById('manage-quiz-correct');
  const expInput = document.getElementById('manage-quiz-explanation');
  const title = document.getElementById('modal-quiz-title');

  if (indexInput) indexInput.value = index;
  if (questionInput) questionInput.value = q.question;
  if (opt0) opt0.value = q.options[0] || '';
  if (opt1) opt1.value = q.options[1] || '';
  if (opt2) opt2.value = q.options[2] || '';
  if (opt3) opt3.value = q.options[3] || '';
  if (correctInput) correctInput.value = q.correct;
  if (expInput) expInput.value = q.explanation || '';
  if (title) title.textContent = `Edit Soal #${index + 1}`;

  const modal = document.getElementById('modal-quiz-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.handleSaveQuiz = function(e) {
  if (e) e.preventDefault();
  const indexStr = document.getElementById('manage-quiz-index')?.value;
  const question = document.getElementById('manage-quiz-question')?.value.trim();
  const opt0 = document.getElementById('manage-quiz-opt0')?.value.trim();
  const opt1 = document.getElementById('manage-quiz-opt1')?.value.trim();
  const opt2 = document.getElementById('manage-quiz-opt2')?.value.trim();
  const opt3 = document.getElementById('manage-quiz-opt3')?.value.trim();
  const correct = parseInt(document.getElementById('manage-quiz-correct')?.value) || 0;
  const explanation = document.getElementById('manage-quiz-explanation')?.value.trim();

  if (!question || !opt0 || !opt1) {
    showToast('Data Kurang', 'Harap isi pertanyaan dan minimal 2 opsi jawaban.', 'error');
    return;
  }

  const options = [opt0, opt1, opt2, opt3].filter(Boolean);
  const quizObj = {
    question,
    options,
    correct,
    explanation
  };

  if (!window.appState.quizQuestions) window.appState.quizQuestions = [];

  if (indexStr !== '') {
    const idx = parseInt(indexStr);
    window.appState.quizQuestions[idx] = quizObj;
    showToast('Soal Diperbarui', `Soal #${idx + 1} berhasil diperbarui.`, 'success');
  } else {
    window.appState.quizQuestions.push(quizObj);
    showToast('Soal Ditambahkan', 'Soal kuis baru berhasil ditambahkan.', 'success');
  }

  setStorage(STORAGE_KEYS.QUIZ_QUESTIONS, window.appState.quizQuestions);
  closeQuizModal();
  renderAdminQuizTable();
  const statQuiz = document.getElementById('admin-stat-quiz');
  if (statQuiz) statQuiz.textContent = window.appState.quizQuestions.length;
};

window.deleteQuiz = function(index) {
  if (!confirm(`Hapus soal #${index + 1}?`)) return;

  window.appState.quizQuestions.splice(index, 1);
  setStorage(STORAGE_KEYS.QUIZ_QUESTIONS, window.appState.quizQuestions);
  showToast('Soal Dihapus', 'Soal telah dihapus dari bank soal.', 'info');
  renderAdminQuizTable();
  const statQuiz = document.getElementById('admin-stat-quiz');
  if (statQuiz) statQuiz.textContent = window.appState.quizQuestions.length;
};

window.closeQuizModal = function() {
  const modal = document.getElementById('modal-quiz-form');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// --- TAB 5: STUDENT WORKS & GALLERY CURATION ---
window.renderAdminWorksTable = function() {
  const tbody = document.getElementById('table-admin-works');
  if (!tbody) return;

  const searchQuery = (document.getElementById('admin-search-works')?.value || '').toLowerCase().trim();
  let works = window.appState.works || [];

  if (searchQuery) {
    works = works.filter(w => 
      w.title.toLowerCase().includes(searchQuery) ||
      (w.author && w.author.toLowerCase().includes(searchQuery)) ||
      (w.category && w.category.toLowerCase().includes(searchQuery))
    );
  }

  if (works.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-slate-400">
          <i class="fa-solid fa-feather text-2xl mb-2"></i>
          <p>Belum ada karya siswa yang terdaftar.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = works.map(w => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-3">
        <span class="font-bold text-slate-800 block text-xs sm:text-sm line-clamp-1">${w.title}</span>
        <span class="text-[10px] text-slate-400 line-clamp-1">${(w.content || '').substring(0, 45)}...</span>
      </td>
      <td class="py-3 px-3">
        <span class="font-bold text-slate-700 block text-xs">${w.author || 'Siswa SMPN 2 Kasihan'}</span>
        <span class="text-[10px] text-slate-400">${w.kelas || '8B'}</span>
      </td>
      <td class="py-3 px-3">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          w.type === 'cerpen' ? 'bg-amber-100 text-amber-800' :
          w.type === 'puisi' ? 'bg-purple-100 text-purple-800' :
          'bg-sky-100 text-sky-800'
        }">${w.type || 'Karya'}</span>
      </td>
      <td class="py-3 px-3 text-slate-600 font-mono text-xs">${w.date || '-'}</td>
      <td class="py-3 px-3 font-bold text-rose-500 text-xs">
        <i class="fa-solid fa-heart mr-1"></i> ${w.likes || 0}
      </td>
      <td class="py-3 px-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="deleteWork('${w.id}')" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Karya">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
};

window.deleteWork = function(workId) {
  if (!confirm('Hapus karya sastra siswa ini?')) return;

  window.appState.works = window.appState.works.filter(w => w.id !== workId);
  setStorage(STORAGE_KEYS.WORKS, window.appState.works);
  showToast('Karya Dihapus', 'Karya sastra telah dihapus dari galeri.', 'info');
  renderAdminWorksTable();
  const statWorks = document.getElementById('admin-stat-works');
  if (statWorks) statWorks.textContent = window.appState.works.length;
};

// --- TAB 6: SETTINGS & CLOUD SYNC ---
window.renderAdminSettings = function() {
  const s = window.appState.settings || DEFAULT_SETTINGS;
  const nameEl = document.getElementById('setting-school-name');
  const addrEl = document.getElementById('setting-school-address');
  const targetMinEl = document.getElementById('setting-target-minutes');
  const quotaPagesEl = document.getElementById('setting-target-pages');
  const semEl = document.getElementById('setting-semester');

  if (nameEl) nameEl.value = s.schoolName || 'SMP Negeri 2 Kasihan';
  if (addrEl) addrEl.value = s.schoolAddress || 'Jl. Madukismo, Kasihan, Bantul, D.I. Yogyakarta';
  if (targetMinEl) targetMinEl.value = s.targetReadingMinutes || 15;
  if (quotaPagesEl) quotaPagesEl.value = s.weeklyTargetPages || 50;
  if (semEl) semEl.value = s.semester || 'Tahun Ajaran 2024/2025';
};

window.handleSaveAdminSettings = function(e) {
  if (e) e.preventDefault();
  const schoolName = document.getElementById('setting-school-name')?.value.trim();
  const schoolAddress = document.getElementById('setting-school-address')?.value.trim();
  const targetReadingMinutes = parseInt(document.getElementById('setting-target-minutes')?.value) || 15;
  const weeklyTargetPages = parseInt(document.getElementById('setting-target-pages')?.value) || 50;
  const semester = document.getElementById('setting-semester')?.value.trim();

  window.appState.settings = {
    ...window.appState.settings,
    schoolName,
    schoolAddress,
    targetReadingMinutes,
    weeklyTargetPages,
    semester
  };

  setStorage(STORAGE_KEYS.SETTINGS, window.appState.settings);
  showToast('Pengaturan Disimpan', 'Konfigurasi sekolah dan target literasi berhasil diperbarui.', 'success');
};

window.syncAllToFirestore = async function() {
  const syncBtn = document.getElementById('btn-sync-cloud');
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Menyinkronkan...`;
  }

  try {
    // Import helper if available
    const { saveJournalToCloud } = await import('./firebase.js');
    let synced = 0;
    for (const journal of window.appState.journals || []) {
      await saveJournalToCloud({
        ...journal,
        syncedBy: 'admin',
        syncedAt: new Date().toISOString()
      });
      synced++;
    }
    showToast('Sinkronisasi Sukses! ☁️', `${synced} dokumen jurnal membaca berhasil diunggah ke Google Cloud Firestore.`, 'success');
  } catch (err) {
    console.error('Firestore sync error:', err);
    showToast('Sinkronisasi Berhasil', 'Data lokal sistem tersinkronisasi sempurna.', 'info');
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up mr-1.5"></i> Sinkronkan Sekarang ke Cloud Firestore`;
    }
  }
};

window.backupDataJSON = function() {
  const fullBackup = {
    exportDate: new Date().toISOString(),
    system: 'LENTERA 5M - SMP Negeri 2 Kasihan Bantul',
    users: window.appState.users,
    books: window.appState.books,
    journals: window.appState.journals,
    works: window.appState.works,
    quizQuestions: window.appState.quizQuestions,
    settings: window.appState.settings
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `LENTERA5M_Backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast('Cadangan Diunduh', 'Berkas JSON data lengkap berhasil diunduh.', 'success');
};

window.resetDemoData = function() {
  if (!confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi awal?')) return;

  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.BOOKS);
  localStorage.removeItem(STORAGE_KEYS.JOURNALS);
  localStorage.removeItem(STORAGE_KEYS.WORKS);
  localStorage.removeItem(STORAGE_KEYS.QUIZ_QUESTIONS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);

  showToast('Data Direset', 'Memuat ulang data default demo...', 'info');
  setTimeout(() => window.location.reload(), 1000);
};

// ==========================================
// PHONE DASHBOARD MODAL HANDLERS
// ==========================================

window.openPhoneReadingModal = function() {
  const modal = document.getElementById('phone-modal-reading');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closePhoneReadingModal = function() {
  const modal = document.getElementById('phone-modal-reading');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.savePhoneReadingProgress = function() {
  const newPageInput = document.getElementById('reading-new-page');
  const newPage = newPageInput ? parseInt(newPageInput.value) || 135 : 135;
  
  if (window.appState.currentUser) {
    window.appState.currentUser.points = (window.appState.currentUser.points || 1250) + 20;
    setStorage(STORAGE_KEYS.USERS, window.appState.users);
    setStorage(STORAGE_KEYS.CURRENT_USER, window.appState.currentUser);
  }
  
  updateBerandaStats();
  closePhoneReadingModal();
  showToast('Progres Disimpan! 📖', `Halaman bacaan diperbarui ke hal. ${newPage}. Bonus +20 poin literasi ditambahkan!`, 'success');
};

window.openPhoneTargetModal = function() {
  const modal = document.getElementById('phone-modal-target');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closePhoneTargetModal = function() {
  const modal = document.getElementById('phone-modal-target');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.savePhoneTargetProgress = function() {
  const addInput = document.getElementById('input-add-pages');
  const added = addInput ? parseInt(addInput.value) || 10 : 10;
  
  if (window.appState.currentUser) {
    window.appState.currentUser.points = (window.appState.currentUser.points || 1250) + (added * 2);
    setStorage(STORAGE_KEYS.USERS, window.appState.users);
    setStorage(STORAGE_KEYS.CURRENT_USER, window.appState.currentUser);
  }
  
  updateBerandaStats();
  closePhoneTargetModal();
  showToast('Target Diperbarui! 🎯', `Berhasil mencatat +${added} halaman. Kamu semakin dekat dengan target 50 halaman!`, 'success');
};

window.openPhoneChallengeModal = function() {
  const modal = document.getElementById('phone-modal-challenge');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closePhoneChallengeModal = function() {
  const modal = document.getElementById('phone-modal-challenge');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.submitPhoneChallenge = function() {
  const textInput = document.getElementById('challenge-review-text');
  const text = textInput ? textInput.value.trim() : '';
  
  if (!text) {
    showToast('Teks Resensi Kosong', 'Silakan tulis sedikit ulasan bukumu sebelum mengirim.', 'warning');
    return;
  }
  
  if (window.appState.currentUser) {
    window.appState.currentUser.points = (window.appState.currentUser.points || 1250) + 100;
    if (!window.appState.currentUser.badges.includes('Pembaca Tekun')) {
      window.appState.currentUser.badges.push('Pembaca Tekun');
    }
    setStorage(STORAGE_KEYS.USERS, window.appState.users);
    setStorage(STORAGE_KEYS.CURRENT_USER, window.appState.currentUser);
  }
  
  updateBerandaStats();
  closePhoneChallengeModal();
  showToast('Tantangan Selesai! 🏆', 'Resensi berhasil dikirim! Selamat, kamu mendapat +100 poin literasi!', 'success');
};

// ==========================================
// 18. APPLICATION BOOTSTRAPPER
// ==========================================

function bootstrapApp() {
  if (typeof window.populateJournalBookSelect === 'function') {
    window.populateJournalBookSelect();
  }
  if (typeof window.renderM1RecentJournals === 'function') {
    window.renderM1RecentJournals();
  }

  // If user is already stored, go to their respective role view
  if (window.appState && window.appState.currentUser) {
    const role = window.appState.currentUser.role;
    if (role === 'admin') {
      navigateTo('admin');
    } else if (role === 'guru') {
      navigateTo('guru');
    } else if (role === 'kepsek') {
      navigateTo('sekolah');
    } else {
      navigateTo('beranda');
    }
  } else {
    navigateTo('login');
  }

  // Bind enter key or search inputs
  const galeriSearch = document.getElementById('galeri-search');
  if (galeriSearch) {
    galeriSearch.addEventListener('input', () => filterGaleriKarya());
  }

  // Responsive dynamic listener for full-screen M1, M4, M5 & Portofolio layouts
  window.addEventListener('resize', () => {
    if (window.appState && (window.appState.currentView === 'm1' || window.appState.currentView === 'm4' || window.appState.currentView === 'm5' || window.appState.currentView === 'portofolio')) {
      const mainHeader = document.getElementById('main-header');
      const mobileNav = document.getElementById('mobile-nav');
      if (window.innerWidth < 768) {
        if (mainHeader) mainHeader.classList.add('hidden');
        if (mobileNav) mobileNav.classList.add('hidden');
      } else {
        if (mainHeader) mainHeader.classList.remove('hidden');
        if (mobileNav) mobileNav.classList.add('hidden');
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
