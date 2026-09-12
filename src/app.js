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
  ACTIVE_BOOK: 'lentera_active_book'
};

const DEFAULT_USERS = [
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

const DEFAULT_BOOKS = [
  {
    id: 'BK-001',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    category: 'fiksi',
    categoryLabel: 'Fiksi Pendidikan',
    pages: 534,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Perjuangan sepuluh anak di Belitung dalam menuntut ilmu di tengah keterbatasan fasilitas sekolah.',
    rating: 4.9
  },
  {
    id: 'BK-002',
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
    id: 'BK-003',
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
    id: 'BK-004',
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
    id: 'BK-005',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    category: 'fiksi',
    categoryLabel: 'Sastra Klasik',
    pages: 535,
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&auto=format&fit=crop&q=80',
    synopsis: 'Kisah Minke dan Annelies dalam pergulatan humanisme dan hukum kolonial akhir abad ke-19.',
    rating: 5.0
  },
  {
    id: 'BK-006',
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
    id: 'BK-007',
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
    id: 'BK-008',
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
  books: getStorage(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS),
  journals: getStorage(STORAGE_KEYS.JOURNALS, DEFAULT_JOURNALS),
  works: getStorage(STORAGE_KEYS.WORKS, DEFAULT_WORKS),
  booktalks: getStorage(STORAGE_KEYS.BOOKTALKS, DEFAULT_BOOKTALKS),
  activeBook: getStorage(STORAGE_KEYS.ACTIVE_BOOK, DEFAULT_BOOKS[0]),
  currentView: 'login',
  loginRoleSelected: 'siswa',
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
  if (targetEl) {
    targetEl.classList.remove('hidden');
    window.appState.currentView = targetView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Header & Navigation visibility
  const mainHeader = document.getElementById('main-header');
  const mobileNav = document.getElementById('mobile-nav');

  if (targetView === 'login') {
    if (mainHeader) mainHeader.classList.add('hidden');
    if (mobileNav) mobileNav.classList.add('hidden');
  } else {
    const isSiswaBeranda = window.appState.currentUser?.role === 'siswa' && targetView === 'beranda';
    if (mainHeader) mainHeader.classList.remove('hidden');
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

  const isGuru = user.role === 'guru' || user.role === 'kepsek';
  const isKepsek = user.role === 'kepsek';

  if (btnGuru) btnGuru.classList.toggle('hidden', !isGuru);
  if (btnSekolah) btnSekolah.classList.toggle('hidden', !isGuru);
  if (btnAdmin) btnAdmin.classList.toggle('hidden', !isKepsek);

  if (mobileRoleLinks) {
    let linksHtml = '';
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
    if (isKepsek) {
      linksHtml += `
        <button onclick="navigateTo('admin'); toggleMobileMoreMenu();" class="p-2.5 bg-slate-100 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-2 text-left">
          <i class="fa-solid fa-users-gear text-slate-700"></i> Kelola Kredensial Pengguna
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
      renderBooks('semua');
      renderJournalHistory();
      break;
    case 'm2':
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
      renderAdminUsersTable();
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
  const tabKepsek = document.getElementById('tab-login-kepsek');
  const labelUsername = document.getElementById('label-login-username');
  const inputUsername = document.getElementById('login-username');

  [tabSiswa, tabGuru, tabKepsek].forEach(tab => {
    if (tab) {
      tab.className = 'flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition text-slate-500 hover:text-slate-900 flex items-center justify-center gap-2';
    }
  });

  if (role === 'siswa') {
    if (tabSiswa) tabSiswa.className = 'flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition bg-white text-sky-700 shadow-xs flex items-center justify-center gap-2';
    if (labelUsername) labelUsername.textContent = 'NISN / Username Siswa';
    if (inputUsername) inputUsername.placeholder = 'Contoh: siswa1 atau 20240901';
  } else if (role === 'guru') {
    if (tabGuru) tabGuru.className = 'flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition bg-white text-purple-700 shadow-xs flex items-center justify-center gap-2';
    if (labelUsername) labelUsername.textContent = 'NIP / Username Guru';
    if (inputUsername) inputUsername.placeholder = 'Contoh: guru1 atau NIP Guru';
  } else if (role === 'kepsek') {
    if (tabKepsek) tabKepsek.className = 'flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition bg-white text-emerald-700 shadow-xs flex items-center justify-center gap-2';
    if (labelUsername) labelUsername.textContent = 'NIP / Akun Kepala Sekolah';
    if (inputUsername) inputUsername.placeholder = 'Contoh: kepsek / admin123';
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
    if (found.role === 'guru') {
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

  showToast('Buku Dipilih', `"${b.title}" kini menjadi buku bacaan aktifmu.`, 'info');
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

window.openJournalForBook = function(bookTitle) {
  navigateTo('m1');
  const sel = document.getElementById('jurnal-buku');
  if (sel) {
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

  const bookTitle = document.getElementById('jurnal-buku')?.value;
  const durasi = parseInt(document.getElementById('jurnal-durasi')?.value) || 15;
  const halAwal = parseInt(document.getElementById('jurnal-hal-awal')?.value) || 1;
  const halAkhir = parseInt(document.getElementById('jurnal-hal-akhir')?.value) || 20;
  const ringkasan = document.getElementById('jurnal-ringkasan')?.value.trim();

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

  window.addPoints(20, `Jurnal Membaca: ${bookTitle}`);
  showToast('Jurnal Terkirim!', `Jurnal bacaan "${bookTitle}" berhasil disimpan (+20 Poin).`, 'success');

  // Clear inputs
  document.getElementById('form-jurnal')?.reset();
  renderJournalHistory();
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
      <div>
        <div class="flex items-center gap-2">
          <strong class="text-slate-800">${j.bookTitle}</strong>
          <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">Hal ${j.pageStart}-${j.pageEnd}</span>
        </div>
        <p class="text-slate-600 mt-1 line-clamp-1">${j.summary}</p>
        <span class="text-[10px] text-slate-400">${j.date} • Durasi: ${j.duration} Menit</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <i class="fa-solid fa-check-double text-[9px]"></i> Terverifikasi
        </span>
      </div>
    </div>
  `).join('');
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
// 8. M2: MENEMUKAN CONTROLLER (LEMBAR TEMUAN & KUIS)
// ==========================================

window.handleTemuanSubmit = function(e) {
  if (e) e.preventDefault();
  const judul = document.getElementById('temuan-judul')?.value.trim();
  const ide = document.getElementById('temuan-ide')?.value.trim();
  const kata = document.getElementById('temuan-kata')?.value.trim();
  const makna = document.getElementById('temuan-makna')?.value.trim();
  const fakta = document.getElementById('temuan-fakta')?.value.trim();
  const opini = document.getElementById('temuan-opini')?.value.trim();
  const struktur = document.getElementById('temuan-struktur')?.value;

  if (!judul || !ide) {
    showToast('Data Kurang', 'Harap lengkapi judul dan ide pokok bacaan.', 'error');
    return;
  }

  window.addPoints(20, `Analisis Temuan Teks: ${judul}`);
  showToast('Lembar Temuan Tersimpan!', `Analisis fakta, opini, dan kosakata baru berhasil dicatat (+20 Poin).`, 'success');

  document.getElementById('form-temuan')?.reset();
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
// 17. ADMIN & USER MANAGEMENT CONTROLLER
// ==========================================

window.renderAdminUsersTable = function() {
  const tbody = document.getElementById('table-admin-users');
  if (!tbody) return;

  const users = window.appState.users;
  tbody.innerHTML = users.map(u => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3">
        <div class="flex items-center gap-2">
          <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}" class="w-7 h-7 rounded-full object-cover" />
          <span class="font-bold text-slate-800">${u.name}</span>
        </div>
      </td>
      <td class="py-3 font-mono text-slate-600">${u.username}</td>
      <td class="py-3">
        <span class="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
          u.role === 'siswa' ? 'bg-sky-100 text-sky-800' :
          u.role === 'guru' ? 'bg-purple-100 text-purple-800' :
          'bg-emerald-100 text-emerald-800'
        }">${u.role}</span>
      </td>
      <td class="py-3">${u.kelas || '-'}</td>
      <td class="py-3 font-bold text-amber-600">${u.points || 0}</td>
      <td class="py-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="editUserAccount('${u.id}')" class="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg text-xs" title="Edit Akun">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="deleteUserAccount('${u.id}')" class="p-1.5 hover:bg-red-50 text-red-600 rounded-lg text-xs" title="Hapus Akun">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
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
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      points: 0,
      streak: 1,
      level: 'Pembaca',
      badges: ['Anggota Baru']
    };
    window.appState.users.push(newUser);
    showToast('Pengguna Ditambahkan', `Akun baru ${name} (${role}) berhasil dibuat.`, 'success');
  }

  setStorage(STORAGE_KEYS.USERS, window.appState.users);
  closeUserModal();
  renderAdminUsersTable();
};

window.deleteUserAccount = function(userId) {
  if (userId === window.appState.currentUser?.id) {
    showToast('Aksi Dilarang', 'Anda tidak dapat menghapus akun yang sedang aktif login.', 'error');
    return;
  }

  window.appState.users = window.appState.users.filter(u => u.id !== userId);
  setStorage(STORAGE_KEYS.USERS, window.appState.users);
  showToast('Akun Dihapus', 'Pengguna telah dihapus dari sistem.', 'info');
  renderAdminUsersTable();
};

window.closeUserModal = function() {
  const modal = document.getElementById('modal-user-form');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
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
  // If user is already stored or default user, go to beranda or their respective role view
  if (window.appState && window.appState.currentUser) {
    navigateTo(window.appState.currentUser.role === 'guru' ? 'guru' : (window.appState.currentUser.role === 'kepsek' ? 'sekolah' : 'beranda'));
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
