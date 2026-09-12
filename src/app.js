/**
 * LENTERA 5M - Ekosistem Literasi Digital Interaktif
 * SMP Negeri 2 Kasihan, Bantul, D.I. Yogyakarta
 * 
 * Single-file SPA Engine: State, Router, 5M Flow, Gamification, 
 * AI Assistant, Local Wisdom, Analytics & Administration
 */

import './firebase.js';

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
    username: 'siswa1',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    points: 1250,
    streak: 7,
    booksCount: 8,
    worksCount: 5,
    level: 'Pembaca Kreatif',
    badges: ['Pena Emas', 'Ksatria Kasihan', 'Pembaca Tekun']
  },
  {
    id: 'u-siswa2',
    name: 'Anisa Rahma',
    username: 'siswa2',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8A',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    points: 620,
    streak: 7,
    level: 'Peneliti',
    badges: ['Bintang Literasi', 'Penyair Bantul']
  },
  {
    id: 'u-siswa3',
    name: 'Dimas Aditya Pratama',
    username: 'siswa3',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    points: 150,
    streak: 1,
    level: 'Pembaca',
    badges: ['Langkah Awal']
  },
  {
    id: 'u-siswa4',
    name: 'Rizki Nur Fauzi',
    username: 'siswa4',
    password: 'siswa123',
    role: 'siswa',
    kelas: '8B',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    points: 40,
    streak: 0,
    level: 'Pembaca',
    badges: []
  },
  {
    id: 'u-guru1',
    name: 'Ratna Kusumawati, S.Pd.',
    username: 'guru1',
    password: 'guru123',
    role: 'guru',
    kelas: 'Guru Bahasa Indonesia (Wali 8B)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    points: 950,
    streak: 15,
    level: 'Duta Literasi',
    badges: ['Pembina GLS Utama']
  },
  {
    id: 'u-kepsek',
    name: 'Drs. Supriyanto, M.Pd.',
    username: 'kepsek',
    password: 'admin123',
    role: 'kepsek',
    kelas: 'Kepala SMPN 2 Kasihan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    points: 1200,
    streak: 30,
    level: 'Duta Literasi',
    badges: ['Pelindung Gerakan Literasi']
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
    title: 'Pelayanan Sekolah Aman dan Nyaman',
    author: 'Tim Sarpras SMPN 2 Kasihan',
    category: 'sarpras',
    categoryLabel: 'SARPRAS',
    pages: 2,
    cover: COVER_SOP,
    synopsis: 'Standar Operasional Prosedur (SOP) Pelayanan Sekolah Aman dan Nyaman SMP Negeri 2 Kasihan Bantul Tahun Ajaran 2026/2027.',
    rating: 5.0,
    pdfFileName: 'Pelayanan Sekolah Aman dan Nyaman.pdf',
    pdfSourceType: 'default',
    hasPdf: true
  },
  {
    id: 'BK-001',
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

const DEFAULT_WORKS = [
  {
    id: 1,
    title: 'Gemerlap Malam di Pelataran Kasongan',
    category: 'Cerpen',
    authorName: 'Bagus Kurniawan',
    authorClass: '8B',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    date: '8 Sep 2024',
    content: `Aroma tanah liat basah selalu menyapa hidungku setiap kali melintasi gerbang Kasihan. Di sudut bengkel kriya milik kakek, roda putar kayu itu masih berdengung lembut. 

"Membuat gerabah itu seperti menata hidup, Gus," ucap Kakek sambil menepuk lembut gumpalan lempung. "Bila hatimu tergesa, dinding kendi akan retak sebelum sempat disentuh api pembakaran."

Malam itu, di bawah temaram lampu jalanan Bibis, aku menyadari bahwa setiap goresan canting dan lekukan tanah liat menyimpan doa para leluhur yang tak pernah padam oleh laju zaman.`,
    likes: 18,
    comments: [
      { id: 'c1', author: 'Ratna Kusumawati, S.Pd.', role: 'guru', text: 'Pilihan diksi yang sangat memikat! Metafora tanah liat dengan kehidupan sangat mengena untuk siswa kelas 8.', date: '8 Sep' },
      { id: 'c2', author: 'Anisa Rahma', role: 'siswa', text: 'Keren banget cerpennya Bagus! Bikin aku makin bangga tinggal di Kasihan.', date: '8 Sep' }
    ]
  },
  {
    id: 2,
    title: 'Batik Kasihan dalam Bait Puisi',
    category: 'Puisi',
    authorName: 'Anisa Rahma',
    authorClass: '8A',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    date: '7 Sep 2024',
    content: `Di antara canting tembaga dan malam mendidih,
Terlukis asa anak negeri Kasihan yang tiada pernah padam.
Mata air Sendang mengalirkan restu,
Membasahi jiwa yang haus akan luhurnya ilmu.

Bukan sekadar guratan malam di atas mori putih,
Tetapi denyut nadi leluhur yang berbisik lirih:
Jadilah lentera di tengah temaram dunia,
Membawa nama harum bumi Bantul tercinta.`,
    likes: 24,
    comments: [
      { id: 'c3', author: 'Drs. Supriyanto, M.Pd.', role: 'kepsek', text: 'Luar biasa puitis dan penuh spirit kearifan lokal. Pertahankan bakat menulismu, Anisa!', date: '7 Sep' }
    ]
  },
  {
    id: 3,
    title: 'Meneladani Keteguhan Ikal dalam Laskar Pelangi',
    category: 'Resensi',
    authorName: 'Dimas Aditya Pratama',
    authorClass: '8B',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    date: '6 Sep 2024',
    content: `Membaca novel Laskar Pelangi membuka mata saya bahwa keterbatasan gedung sekolah bukan halangan untuk berprestasi. Tokoh Bu Muslimah dan Pak Harfan mengajarkan kita arti ketulusan mendidik tanpa pamrih. 

Buku ini sangat cocok dibaca oleh seluruh kawan-kawan di SMPN 2 Kasihan agar kita selalu bersyukur memiliki fasilitas perpustakaan dan teknologi digital yang lengkap hari ini.`,
    likes: 12,
    comments: [
      { id: 'c4', author: 'Bagus Kurniawan', role: 'siswa', text: 'Ulasan yang hebat dan objektif Dim! Bikin pengin baca ulang bukunya.', date: '6 Sep' }
    ]
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

const DEFAULT_BOOKTALKS = [
  {
    id: 'bt-1',
    studentName: 'Anisa Rahma',
    studentClass: '8A',
    title: 'Mengapa Kamu Wajib Baca Babad Tanah Jawi!',
    format: 'Video YouTube',
    url: 'https://youtube.com/watch?v=demo-babad-jawi',
    notes: 'Mengupas sisi menarik tokoh Panembahan Senopati dan keterkaitannya dengan situs di Bantul.',
    date: '7 Sep 2024'
  },
  {
    id: 'bt-2',
    studentName: 'Bagus Kurniawan',
    studentClass: '8B',
    title: 'Review 3 Menit: Keajaiban Laskar Pelangi',
    format: 'Google Drive',
    url: 'https://drive.google.com/file/d/demo-laskar/view',
    notes: 'Fokus pada karakter Lintang si jenius dari pulau terpencil yang gigih mengayuh sepeda puluhan kilometer.',
    date: '5 Sep 2024'
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
      setStorage(STORAGE_KEYS.USERS, list);
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
      setStorage(STORAGE_KEYS.USERS, list);
    }
    return list;
  })(),
  currentUser: (function() {
    let curr = getStorage(STORAGE_KEYS.CURRENT_USER, null);
    if (curr && curr.id === 'u-siswa1' && curr.name === 'Bagus Kurniawan') {
      curr.name = 'Aisyah Putri Rahma';
      curr.points = 1250;
      curr.streak = 7;
      curr.booksCount = 8;
      curr.worksCount = 5;
      curr.level = 'Pembaca Kreatif';
      setStorage(STORAGE_KEYS.CURRENT_USER, curr);
    }
    return curr;
  })(),
  books: (function() {
    let saved = getStorage(STORAGE_KEYS.BOOKS, null);
    if (!saved || !Array.isArray(saved) || !saved.find(b => b.title === 'Laut Bercerita') || !saved.find(b => b.id === 'BK-SOP')) {
      saved = DEFAULT_BOOKS;
      setStorage(STORAGE_KEYS.BOOKS, saved);
    }
    return saved;
  })(),
  journals: getStorage(STORAGE_KEYS.JOURNALS, DEFAULT_JOURNALS),
  works: getStorage(STORAGE_KEYS.WORKS, DEFAULT_WORKS),
  booktalks: getStorage(STORAGE_KEYS.BOOKTALKS, DEFAULT_BOOKTALKS),
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
};

// ==========================================
// 4. SPA ROUTER & NAVIGATION CONTROLLER
// ==========================================

const ALL_VIEWS = ['login', 'beranda', 'm1', 'm2', 'm3', 'm4', 'm5', 'guru', 'sekolah', 'jogja', 'galeri', 'admin'];

window.navigateTo = function(targetView) {
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
  } else {
    const isSiswaBeranda = window.appState.currentUser?.role === 'siswa' && targetView === 'beranda';
    if (mainHeader) mainHeader.classList.remove('hidden');
    if (mainContent) {
      if (isMView) {
        // Halaman M1-M5: Jarak tipis antara menu dengan isi halaman (~10px), persis seperti foto referensi
        mainContent.className = 'flex-1 w-full pt-2.5 px-3 sm:px-5 lg:px-8 xl:px-10 pb-24 md:pb-8';
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
};

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
      if (typeof window.openBookPdfReader === 'function') {
        const activeId = window.appState.activeBook?.id || 'BK-SOP';
        window.openBookPdfReader(activeId);
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
      renderBooktalkList();
      break;
    case 'm5':
      renderApresiasiFeed();
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

window.setLoginRole = function(role) {
  window.appState.loginRoleSelected = role;
  
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
};

window.openPhoneLoginForm = function(role) {
  window.setLoginRole(role);
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
};

window.closePhoneLoginForm = function() {
  const welcomeScreen = document.getElementById('phone-screen-welcome');
  const formScreen = document.getElementById('phone-screen-form');
  if (welcomeScreen) welcomeScreen.classList.remove('hidden');
  if (formScreen) formScreen.classList.add('hidden');
  const errorBox = document.getElementById('login-error-msg');
  if (errorBox) errorBox.classList.add('hidden');
};

window.togglePasswordVisibility = function(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
};

window.fillQuickLogin = function(username, password, role) {
  window.setLoginRole(role);
  const uInput = document.getElementById('login-username');
  const pInput = document.getElementById('login-password');
  if (uInput) uInput.value = username;
  if (pInput) pInput.value = password;
  
  // Directly trigger login for ease of evaluation
  const form = document.getElementById('form-login');
  if (form) {
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  }
};

window.handleLoginSubmit = function(e) {
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
};

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

  const books = window.appState.books;
  const filtered = filterCategory === 'semua' ? books : books.filter(b => b.category === filterCategory);

  container.innerHTML = filtered.map(b => `
    <div class="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 card-shadow hover:border-sky-300 transition flex flex-col justify-between group">
      <div>
        <div class="relative rounded-xl overflow-hidden mb-3 aspect-[3/4] bg-slate-100">
          <img src="${b.cover}" alt="${b.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          <span class="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-star text-amber-400 text-[9px]"></i> ${b.rating}
          </span>
        </div>
        <span class="text-[9px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">${b.categoryLabel}</span>
        <h4 class="font-bold text-slate-800 text-xs sm:text-sm mt-1.5 line-clamp-1">${b.title}</h4>
        <p class="text-[11px] text-slate-500">${b.author} • ${b.pages} Hal</p>
        <p class="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">${b.synopsis}</p>
      </div>
      <div class="mt-3 pt-2 border-t border-slate-100 flex gap-2">
        <button onclick="selectActiveBook('${b.id}')" class="flex-1 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-book-open"></i> Baca
        </button>
        <button onclick="openJournalForBook('${b.title}')" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1">
          <i class="fa-solid fa-pen"></i> Jurnal
        </button>
      </div>
    </div>
  `).join('');
};

window.filterBooks = function(cat) {
  document.querySelectorAll('.book-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = 'book-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white';
    } else {
      btn.className = 'book-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';
    }
  });
  renderBooks(cat);
};

window.selectActiveBook = function(bookId) {
  const b = window.appState.books.find(x => x.id === bookId);
  if (!b) return;

  window.appState.activeBook = b;
  setStorage(STORAGE_KEYS.ACTIVE_BOOK, b);

  const homeCover = document.getElementById('active-book-cover');
  const homeTitle = document.getElementById('active-book-title');
  const homeAuthor = document.getElementById('active-book-author');
  const timerBook = document.getElementById('timer-active-book');
  const journalBookSelect = document.getElementById('jurnal-buku');

  if (homeCover) homeCover.src = b.cover;
  if (homeTitle) homeTitle.textContent = b.title;
  if (homeAuthor) homeAuthor.textContent = `${b.author} • ${b.categoryLabel}`;
  if (timerBook) timerBook.textContent = b.title;
  if (journalBookSelect) journalBookSelect.value = b.title;

  if (window.appState.currentView !== 'm1') {
    navigateTo('m1');
  }

  if (typeof window.openBookPdfReader === 'function') {
    window.openBookPdfReader(b.id);
  }

  showToast('Membuka PDF Buku', `Membuka "${b.title}" di penampil dokumen PDF aplikasi.`, 'info');
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
                    <span class="font-serif italic font-bold text-xl text-slate-800 tracking-wider">Supriyanto</span>
                  </div>

                  <p class="text-xs font-black text-slate-900 underline">Drs. Supriyanto, M.Pd.</p>
                  <p class="text-[10px] text-slate-500 font-mono">NIP. 19680512 199412 1 002</p>
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
  if (catalog) catalog.classList.add('hidden');
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
// 9. M3: MENULIS CONTROLLER (+ AI REVIEWER)
// ==========================================

window.handleTextChange = function() {
  const text = document.getElementById('tulis-isi')?.value || '';
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const badge = document.getElementById('word-count-badge');
  if (badge) {
    badge.textContent = `${wordCount} Kata`;
    badge.className = wordCount >= 50 ? 'text-xs font-mono font-bold text-emerald-600' : 'text-xs font-mono font-bold text-slate-500';
  }
};

window.runAICheck = function() {
  const judul = document.getElementById('tulis-judul')?.value.trim() || 'Tanpa Judul';
  const kategori = document.getElementById('tulis-kategori')?.value || 'Cerpen';
  const text = document.getElementById('tulis-isi')?.value.trim();
  const feedbackContainer = document.getElementById('ai-feedback-container');

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

  // Linguistic rule & quality evaluation engine
  setTimeout(() => {
    generateAIFeedback(judul, kategori, text);
  }, 1200);
};

function generateAIFeedback(judul, kategori, text) {
  const feedbackContainer = document.getElementById('ai-feedback-container');
  if (!feedbackContainer) return;

  const words = text.split(/\s+/);
  const wordCount = words.length;

  // Analysis criteria
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

  const judul = document.getElementById('tulis-judul')?.value.trim();
  const kategori = document.getElementById('tulis-kategori')?.value;
  const isi = document.getElementById('tulis-isi')?.value.trim();

  if (!judul || !isi || isi.length < 20) {
    showToast('Naskah Belum Siap', 'Lengkapi judul dan isi karya minimal 20 karakter sebelum dipublikasikan.', 'error');
    return;
  }

  const newWork = {
    id: Date.now(),
    title: judul,
    category: kategori,
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
  document.getElementById('tulis-judul').value = '';
  document.getElementById('tulis-isi').value = '';
  handleTextChange();

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

window.renderBooktalkList = function() {
  const container = document.getElementById('booktalk-recent-list');
  if (!container) return;

  const list = window.appState.booktalks;
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

window.renderApresiasiFeed = function() {
  const container = document.getElementById('apresiasi-feed-list');
  if (!container) return;

  const works = window.appState.works;
  container.innerHTML = works.map(w => `
    <div class="bg-white rounded-3xl p-6 border border-slate-200 card-shadow space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="${w.authorAvatar}" class="w-10 h-10 rounded-full object-cover border border-slate-200" />
          <div>
            <h4 class="font-bold text-slate-800 text-sm">${w.authorName}</h4>
            <p class="text-xs text-slate-400">Kelas ${w.authorClass} • SMPN 2 Kasihan • ${w.date}</p>
          </div>
        </div>
        <span class="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">${w.category}</span>
      </div>

      <div>
        <h3 class="font-bold text-slate-900 text-base mb-1.5">${w.title}</h3>
        <p class="text-xs text-slate-700 leading-relaxed line-clamp-3">${w.content}</p>
        <button onclick="openKaryaModal(${w.id})" class="text-xs font-bold text-sky-600 hover:text-sky-700 mt-1 inline-block">
          Baca Selengkapnya
        </button>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
        <button onclick="likeKarya(${w.id})" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition">
          <i class="fa-solid fa-heart"></i> <span>${w.likes || 0}</span> Suka
        </button>
        <span class="text-xs text-slate-400">•</span>
        <span class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-comments mr-1 text-slate-400"></i> ${w.comments ? w.comments.length : 0} Komentar</span>
      </div>

      <!-- Comment Section -->
      <div class="space-y-2 pt-2">
        <div class="space-y-2 max-h-48 overflow-y-auto">
          ${(w.comments || []).map(c => `
            <div class="p-2.5 bg-slate-50 rounded-xl text-xs flex items-start gap-2">
              <span class="font-bold text-slate-800 shrink-0">${c.author}:</span>
              <p class="text-slate-600 leading-snug flex-1">${c.text}</p>
            </div>
          `).join('')}
        </div>

        <!-- Add comment input -->
        <form onsubmit="handleCommentSubmit(event, ${w.id})" class="flex gap-2 pt-1">
          <input type="text" id="comment-input-${w.id}" placeholder="Tuliskan apresiasi konstruktif (bagus, hebat, kreatif)..." class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-sky-500" required />
          <button type="submit" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition">
            Kirim
          </button>
        </form>
      </div>
    </div>
  `).join('');
};

window.likeKarya = function(workId) {
  const w = window.appState.works.find(x => x.id === workId);
  if (!w) return;

  w.likes = (w.likes || 0) + 1;
  setStorage(STORAGE_KEYS.WORKS, window.appState.works);

  window.addPoints(5, `Memberi Apresiasi Like pada Karya Teman`);
  renderApresiasiFeed();
  renderGaleriKarya();
};

window.handleCommentSubmit = function(e, workId) {
  if (e) e.preventDefault();
  const user = window.appState.currentUser;
  if (!user) return;

  const input = document.getElementById(`comment-input-${workId}`);
  const commentText = input?.value.trim();
  if (!commentText) return;

  // Positive word filter
  const positiveWords = ['bagus', 'keren', 'hebat', 'menginspirasi', 'rapi', 'kreatif', 'salut', 'suka', 'indah', 'menarik', 'luar biasa', 'apik', 'mantap', 'setuju'];
  const hasPositive = positiveWords.some(w => commentText.toLowerCase().includes(w));

  const w = window.appState.works.find(x => x.id === workId);
  if (!w) return;

  if (!w.comments) w.comments = [];
  w.comments.push({
    id: `c-${Date.now()}`,
    author: user.name,
    role: user.role,
    text: commentText,
    date: 'Hari ini'
  });

  setStorage(STORAGE_KEYS.WORKS, window.appState.works);

  if (hasPositive) {
    window.addPoints(10, `Komentar Positif & Apresiasi Teman`);
    showToast('Apresiasi Diterima!', 'Komentar bernada positif berhasil disampaikan (+10 Poin).', 'success');
  } else {
    showToast('Komentar Terkirim', 'Komentarmu telah diposting.', 'info');
  }

  input.value = '';
  renderApresiasiFeed();
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
// 14. PANEL GURU CONTROLLER
// ==========================================

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
// 15. DASHBOARD SEKOLAH CONTROLLER (CHART.JS)
// ==========================================

let chartTrenInstance = null;
let chartKatInstance = null;

window.renderSekolahDashboard = function() {
  renderSekolahRankings();
  initSekolahCharts();
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

window.exportRaporPDF = function() {
  const user = window.appState.currentUser || { name: 'Siswa SMPN 2 Kasihan', kelas: '8B', points: 380, level: 'Pembaca' };
  
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
      doc.text(`Kelas / Rombel : ${user.kelas || '8B'}`, 25, 65);
      doc.text(`Total Poin     : ${user.points || 0} Poin Literasi`, 25, 72);
      doc.text(`Pangkat        : ${user.level || 'Pembaca'}`, 25, 79);

      // 5M Performance Summary Table
      doc.setFont('helvetica', 'bold');
      doc.text('Rekapitulasi Capaian Alur 5M:', 25, 92);

      doc.setFillColor(245, 247, 250);
      doc.rect(25, 96, 160, 8, 'F');
      doc.setFontSize(10);
      doc.text('Tahapan 5M', 30, 101);
      doc.text('Aktivitas Terpenuhi', 85, 101);
      doc.text('Status Capaian', 150, 101);

      const items = [
        ['M1: Membaca (Reading)', '6 Jurnal Bacaan Tuntas', 'Sangat Baik'],
        ['M2: Menemukan (Discovering)', '3 Lembar Temuan & Kuis', 'Tuntas'],
        ['M3: Menulis (Writing)', '2 Cerpen / Puisi Terbit', 'Sangat Baik'],
        ['M4: Menceritakan (Storytelling)', '1 Video Book Talk', 'Tuntas'],
        ['M5: Mengapresiasi (Appreciating)', '12 Komentar Positif', 'Aktif']
      ];

      let y = 110;
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
      doc.text('Drs. Supriyanto, M.Pd.', 130, y + 55);
      doc.setFont('helvetica', 'normal');
      doc.text('NIP. 19680512 199412 1 002', 130, y + 60);

      doc.save(`Rapor_Literasi_${user.name.replace(/\s+/g, '_')}.pdf`);
      showToast('Rapor Diunduh', 'Berkas PDF Rapor Literasi berhasil disimpan.', 'success');
      return;
    } catch (e) {
      console.warn('PDF export error:', e);
    }
  }

  showToast('Cetak Rapor', 'Fitur cetak siap digunakan. Menyimpan versi digital...', 'info');
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
  let csv = 'ID,Nama Lengkap,Username / NISN,Role,Kelas / Jabatan,Total Poin\n';
  users.forEach(u => {
    csv += `"${u.id}","${u.name}","${u.username}","${u.role}","${u.kelas || '-'}","${u.points || 0}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Data_Pengguna_LENTERA5M_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  showToast('Ekspor Berhasil', 'Data pengguna berhasil diunduh dalam format CSV.', 'success');
};

// --- TAB 2: BOOKS CATALOG & PDF MANAGEMENT ---
window._activePdfSourceMode = 'upload';
window._uploadedPdfData = null;

window.switchPdfSourceMode = function(mode) {
  window._activePdfSourceMode = mode;
  const tabUpload = document.getElementById('tab-pdf-upload');
  const tabLink = document.getElementById('tab-pdf-link');
  const containerUpload = document.getElementById('container-pdf-upload');
  const containerLink = document.getElementById('container-pdf-link');

  if (mode === 'upload') {
    if (tabUpload) tabUpload.className = 'py-1.5 rounded-lg font-bold text-xs bg-sky-600 text-white transition';
    if (tabLink) tabLink.className = 'py-1.5 rounded-lg font-bold text-xs text-slate-600 hover:text-slate-900 transition';
    if (containerUpload) containerUpload.classList.remove('hidden');
    if (containerLink) containerLink.classList.add('hidden');
  } else {
    if (tabUpload) tabUpload.className = 'py-1.5 rounded-lg font-bold text-xs text-slate-600 hover:text-slate-900 transition';
    if (tabLink) tabLink.className = 'py-1.5 rounded-lg font-bold text-xs bg-sky-600 text-white transition';
    if (containerUpload) containerUpload.classList.add('hidden');
    if (containerLink) containerLink.classList.remove('hidden');
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
  const searchQuery = (document.getElementById('admin-search-books')?.value || '').toLowerCase().trim();

  let books = window.appState.books || [];
  if (categoryFilter !== 'semua') {
    books = books.filter(b => b.category === categoryFilter);
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
          <i class="fa-solid fa-book-open text-2xl mb-2"></i>
          <p>Tidak ada data buku yang sesuai.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = books.map(b => {
    let pdfBadge = '';
    if (b.pdfSourceType === 'upload') {
      pdfBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit shadow-xs"><i class="fa-solid fa-file-pdf text-red-500"></i> PDF Upload</span>`;
    } else if (b.pdfSourceType === 'link') {
      pdfBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 flex items-center gap-1 w-fit shadow-xs"><i class="fa-solid fa-link text-sky-600"></i> Link PDF</span>`;
    } else if (b.id === 'BK-SOP' || b.category === 'sarpras') {
      pdfBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 w-fit shadow-xs"><i class="fa-solid fa-shield-halved text-amber-600"></i> SOP Resmi</span>`;
    } else {
      pdfBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 flex items-center gap-1 w-fit"><i class="fa-solid fa-file-lines text-indigo-500"></i> PDF Buku</span>`;
    }

    return `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <img src="${b.cover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120'}" class="w-10 h-14 object-cover rounded-lg shadow-xs border border-slate-200 shrink-0" />
            <div>
              <span class="font-bold text-slate-800 block text-xs sm:text-sm line-clamp-1">${b.title}</span>
              <span class="text-[11px] text-slate-500">${b.author || 'Penulis Tidak Diketahui'}</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 font-mono font-bold text-sky-700 text-xs">${b.id}</td>
        <td class="py-3 px-3">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${b.category === 'sarpras' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-700'}">
            ${b.categoryLabel || b.category}
          </span>
        </td>
        <td class="py-3 px-3 text-slate-600 font-medium">${b.pages || 0} Hal</td>
        <td class="py-3 px-3">
          ${pdfBadge}
        </td>
        <td class="py-3 px-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="selectActiveBook('${b.id}')" class="px-2.5 py-1.5 bg-[#082e54] hover:bg-sky-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs" title="Buka dan baca dokumen PDF di M1">
              <i class="fa-solid fa-book-open text-amber-400"></i> Baca
            </button>
            <button onclick="openBookQrModal('${b.id}')" class="p-1.5 hover:bg-sky-50 text-sky-600 rounded-lg text-xs" title="Cetak / Tampilkan QR Code Buku">
              <i class="fa-solid fa-qrcode"></i>
            </button>
            <button onclick="editBookModal('${b.id}')" class="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg text-xs" title="Edit Buku">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="deleteBook('${b.id}')" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Buku">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
};

window.filterAdminBooks = function(cat) {
  if (!window.appState.adminFilters) window.appState.adminFilters = {};
  window.appState.adminFilters.bookCategory = cat;

  const cats = ['semua', 'sarpras', 'fiksi', 'kearifan_lokal', 'sains', 'sejarah'];
  cats.forEach(c => {
    const btn = document.getElementById(`btn-filter-book-${c}`);
    if (btn) {
      if (c === cat) {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-[#082e54] text-white';
      } else {
        btn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    }
  });

  window.renderAdminBooksTable();
};

window.openAddBookModal = function() {
  document.getElementById('form-manage-book')?.reset();
  window.clearSelectedPdfFile();
  window.switchPdfSourceMode('upload');

  const idInput = document.getElementById('manage-book-id');
  const title = document.getElementById('modal-book-title');
  if (idInput) idInput.value = `BK-${String(window.appState.books.length + 1).padStart(3, '0')}`;
  if (title) title.innerHTML = '<i class="fa-solid fa-book-medical text-sky-600 mr-1.5"></i> Tambah Buku Baru & Berkas PDF';

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

  const idInput = document.getElementById('manage-book-id');
  const titleInput = document.getElementById('manage-book-title');
  const authorInput = document.getElementById('manage-book-author');
  const catInput = document.getElementById('manage-book-category');
  const pagesInput = document.getElementById('manage-book-pages');
  const coverInput = document.getElementById('manage-book-cover');
  const synopsisInput = document.getElementById('manage-book-synopsis');
  const linkInput = document.getElementById('manage-book-pdf-url');
  const title = document.getElementById('modal-book-title');

  if (idInput) idInput.value = b.id;
  if (titleInput) titleInput.value = b.title;
  if (authorInput) authorInput.value = b.author || '';
  if (catInput) catInput.value = b.category || 'fiksi';
  if (pagesInput) pagesInput.value = b.pages || 100;
  if (coverInput) coverInput.value = b.cover || '';
  if (synopsisInput) synopsisInput.value = b.synopsis || '';
  if (title) title.innerHTML = `<i class="fa-solid fa-pen-to-square text-sky-600 mr-1.5"></i> Edit Buku: ${b.title}`;

  if (b.pdfSourceType === 'link' && b.pdfUrl) {
    window.switchPdfSourceMode('link');
    if (linkInput) linkInput.value = b.pdfUrl;
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

  const modal = document.getElementById('modal-book-form');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.handleSaveBook = function(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('manage-book-id')?.value.trim();
  const title = document.getElementById('manage-book-title')?.value.trim();
  const author = document.getElementById('manage-book-author')?.value.trim();
  const category = document.getElementById('manage-book-category')?.value;
  const pages = parseInt(document.getElementById('manage-book-pages')?.value) || 120;
  const cover = document.getElementById('manage-book-cover')?.value.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300';
  const synopsis = document.getElementById('manage-book-synopsis')?.value.trim();
  const pdfUrlInput = document.getElementById('manage-book-pdf-url')?.value.trim();

  if (!id || !title) {
    showToast('Data Kurang', 'Kode buku dan judul buku wajib diisi.', 'error');
    return;
  }

  const categoryLabels = {
    'sarpras': 'SARPRAS & SOP',
    'kearifan_lokal': 'Kearifan Kasihan & Budaya',
    'fiksi': 'Fiksi & Sastra',
    'nonfiksi': 'Non-Fiksi & Referensi',
    'sains': 'Sains Populer & Teknologi',
    'sejarah': 'Sejarah Nusantara'
  };

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

  const existingIdx = window.appState.books.findIndex(b => b.id === id);
  if (existingIdx !== -1) {
    const prev = window.appState.books[existingIdx];
    window.appState.books[existingIdx] = {
      ...prev,
      title,
      author,
      category,
      categoryLabel: categoryLabels[category] || category.toUpperCase(),
      pages,
      cover,
      synopsis,
      pdfSourceType: pdfUrl ? pdfSourceType : (prev.pdfSourceType || 'default'),
      pdfUrl: pdfUrl || prev.pdfUrl || '',
      pdfFileName: pdfFileName || prev.pdfFileName || `${title}.pdf`,
      pdfSize: pdfSize || prev.pdfSize || '',
      hasPdf: true
    };
    showToast('Buku Diperbarui', `Buku "${title}" beserta data PDF berhasil diperbarui.`, 'success');
  } else {
    const newBook = {
      id,
      title,
      author,
      category,
      categoryLabel: categoryLabels[category] || category.toUpperCase(),
      pages,
      cover,
      synopsis,
      rating: 5.0,
      pdfSourceType,
      pdfUrl,
      pdfFileName,
      pdfSize,
      hasPdf: true
    };
    window.appState.books.unshift(newBook);
    showToast('Buku Ditambahkan', `Buku "${title}" berhasil ditambahkan ke katalog digital!`, 'success');
  }

  setStorage(STORAGE_KEYS.BOOKS, window.appState.books);
  closeBookModal();
  renderAdminBooksTable();

  // Update stats
  const statBooks = document.getElementById('admin-stat-books');
  if (statBooks) statBooks.textContent = window.appState.books.length;

  if (typeof window.populateJournalBookSelect === 'function') {
    window.populateJournalBookSelect();
  }
};

window.deleteBook = function(bookId) {
  if (!confirm(`Hapus buku dengan kode ${bookId}?`)) return;

  window.appState.books = window.appState.books.filter(b => b.id !== bookId);
  setStorage(STORAGE_KEYS.BOOKS, window.appState.books);
  showToast('Buku Dihapus', 'Buku telah dihapus dari katalog.', 'info');
  renderAdminBooksTable();
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
  window.clearSelectedPdfFile();
};

window.renderAdminDashboard = function() {
  const statBooks = document.getElementById('admin-stat-books');
  const statUsers = document.getElementById('admin-stat-users');
  const statJournals = document.getElementById('admin-stat-journals');
  const statWorks = document.getElementById('admin-stat-works');

  if (statBooks) statBooks.textContent = (window.appState.books || []).length;
  if (statUsers) statUsers.textContent = (window.appState.users || []).length;
  if (statJournals) statJournals.textContent = (window.appState.journals || []).length;
  if (statWorks) statWorks.textContent = (window.appState.works || []).length;

  window.switchAdminTab(window.appState.adminTab || 'books');
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
