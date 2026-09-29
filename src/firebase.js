import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc,
  deleteDoc, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  getDocFromServer 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfigFile from '../firebase-applet-config.json';

// Operation types for security audit and logging
export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

// Structured error handler as mandated by Firebase Skill
export function handleFirestoreError(error, operationType, path) {
  const code = error?.code || '';
  const msg = error instanceof Error ? error.message : String(error);
  if (code === 'unavailable' || msg.includes('offline') || msg.includes('unavailable')) {
    // Gracefully acknowledge offline/unavailable without throwing or breaking UI
    return {
      error: 'Penyimpanan lokal aktif (offline cache mode)',
      operationType,
      path
    };
  }

  const errInfo = {
    error: msg,
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice:', JSON.stringify(errInfo));
  return errInfo;
}

const firebaseConfig = {
  projectId: firebaseConfigFile.projectId || "gen-lang-client-0840024627",
  appId: firebaseConfigFile.appId || "1:63555815050:web:a44c0aaa90eefe53bc4f73",
  apiKey: firebaseConfigFile.apiKey || "AIzaSyAEczPQ7sn2f_G4QxV4On9ot8N4sS7aNws",
  authDomain: firebaseConfigFile.authDomain || "gen-lang-client-0840024627.firebaseapp.com",
  firestoreDatabaseId: firebaseConfigFile.firestoreDatabaseId || "ai-studio-lentera5m-a556f3cb-5d3a-4b6a-af7a-e128703b4975",
  storageBucket: firebaseConfigFile.storageBucket || "gen-lang-client-0840024627.firebasestorage.app",
  messagingSenderId: firebaseConfigFile.messagingSenderId || "63555815050"
};

// Initialize Firebase safely
let app = null;
let db = null;
let auth = null;

try {
  if (firebaseConfig && firebaseConfig.apiKey) {
    app = initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId
    });

    const firestoreSettings = {
      experimentalAutoDetectLongPolling: true,
      experimentalForceLongPolling: true,
      useFetchStreams: false
    };

    try {
      db = firebaseConfig.firestoreDatabaseId 
        ? initializeFirestore(app, firestoreSettings, firebaseConfig.firestoreDatabaseId)
        : initializeFirestore(app, firestoreSettings);
    } catch (dbInitErr) {
      db = firebaseConfig.firestoreDatabaseId 
        ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
        : getFirestore(app);
    }

    auth = getAuth(app);
  }
} catch (e) {
  console.warn('Firebase initialization notice:', e);
}

export { app, db, auth };

// Live Database Sync State
export const dbStatus = {
  connected: false,
  statusText: 'Menghubungkan ke Cloud Firestore...',
  lastSyncTime: null,
  activeListeners: 0,
  counts: {
    journals: 0,
    works: 0,
    booktalks: 0,
    findings: 0,
    books: 0,
    users: 0,
    settings: 0
  }
};

// Visual Sync UI Updater
export function updateDbStatusUI() {
  if (typeof document === 'undefined') return;
  const badge = document.getElementById('db-sync-badge');
  const dot = document.getElementById('db-sync-dot');
  const ping = document.getElementById('db-sync-ping');
  const text = document.getElementById('db-sync-text');

  if (badge && text) {
    badge.classList.remove('hidden');
    if (dbStatus.connected) {
      badge.className = 'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 transition shadow-xs select-none';
      if (dot) dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-emerald-500';
      if (ping) {
        ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75';
        ping.classList.remove('hidden');
      }
      text.textContent = 'Cloud Real-Time';
      badge.title = `Database Firestore Terhubung Real-Time (${dbStatus.activeListeners} listener aktif). Terakhir sinkron: ${dbStatus.lastSyncTime ? dbStatus.lastSyncTime.toLocaleTimeString('id-ID') : 'baru saja'}`;
    } else {
      badge.className = 'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 border border-amber-200 text-amber-800 transition shadow-xs select-none';
      if (dot) dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-amber-500';
      if (ping) ping.classList.add('hidden');
      text.textContent = 'Lokal (Cache)';
      badge.title = 'Sedang menggunakan penyimpanan lokal (offline-fallback). Mencoba menghubungkan kembali...';
    }
  }
}

// Validate Connection to Firestore on boot safely
export async function testConnection() {
  if (!db) {
    dbStatus.connected = false;
    dbStatus.statusText = 'Firebase SDK belum siap';
    updateDbStatusUI();
    return false;
  }
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDoc(testDoc);
    dbStatus.connected = true;
    dbStatus.statusText = 'Terhubung ke Cloud Firestore';
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    const code = error?.code || '';
    const msg = error instanceof Error ? error.message : String(error);
    if (code === 'unavailable' || msg.includes('the client is offline') || msg.includes('unavailable')) {
      dbStatus.connected = false;
      dbStatus.statusText = 'Lokal (Cache)';
    } else {
      dbStatus.connected = true;
      dbStatus.statusText = 'Terhubung ke Cloud Firestore';
      dbStatus.lastSyncTime = new Date();
    }
    updateDbStatusUI();
    return dbStatus.connected;
  }
}

// Automatically trigger connection test
if (typeof window !== 'undefined') {
  setTimeout(() => testConnection(), 300);
}

// ==========================================
// 1. JOURNALS (M1: MEMBACA) - REAL-TIME CLOUD
// ==========================================

export async function saveJournalToCloud(journalData) {
  if (!db) return null;
  const path = 'journals';
  try {
    const journalId = journalData.id ? String(journalData.id) : `jnl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cleanDoc = {
      ...journalData,
      id: journalId,
      updatedAt: serverTimestamp(),
      syncedAt: new Date().toISOString()
    };
    await setDoc(doc(db, path, journalId), cleanDoc, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return journalId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return null;
  }
}

export async function deleteJournalFromCloud(journalId) {
  if (!db || !journalId) return false;
  const path = `journals/${journalId}`;
  try {
    await deleteDoc(doc(db, 'journals', String(journalId)));
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return false;
  }
}

export function subscribeToJournals(callback) {
  if (!db) return () => {};
  const path = 'journals';
  try {
    const q = query(collection(db, path), orderBy('date', 'desc'), limit(100));
    dbStatus.activeListeners++;
    return onSnapshot(collection(db, path), (snapshot) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      dbStatus.counts.journals = snapshot.size;
      updateDbStatusUI();

      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.LIST, path);
    return () => {};
  }
}

// ==========================================
// 2. WORKS (M3 & M5: KARYA & RESENSI) - REAL-TIME CLOUD
// ==========================================

export async function saveWorkToCloud(workData) {
  if (!db) return null;
  const path = 'works';
  try {
    const workId = workData.id ? String(workData.id) : `wrk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cleanDoc = {
      ...workData,
      id: workId,
      updatedAt: serverTimestamp(),
      syncedAt: new Date().toISOString()
    };
    await setDoc(doc(db, path, workId), cleanDoc, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return workId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return null;
  }
}

export async function updateWorkInCloud(workId, updatePatch) {
  if (!db || !workId) return false;
  const path = `works/${workId}`;
  try {
    await updateDoc(doc(db, 'works', String(workId)), {
      ...updatePatch,
      updatedAt: serverTimestamp()
    });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    return false;
  }
}

export async function deleteWorkFromCloud(workId) {
  if (!db || !workId) return false;
  const path = `works/${workId}`;
  try {
    await deleteDoc(doc(db, 'works', String(workId)));
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return false;
  }
}

export function subscribeToWorks(callback) {
  if (!db) return () => {};
  const path = 'works';
  try {
    dbStatus.activeListeners++;
    return onSnapshot(collection(db, path), (snapshot) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      dbStatus.counts.works = snapshot.size;
      updateDbStatusUI();

      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.LIST, path);
    return () => {};
  }
}

// ==========================================
// 3. BOOKTALKS (M4: MENCERITAKAN) - REAL-TIME CLOUD
// ==========================================

export async function saveBooktalkToCloud(btData) {
  if (!db) return null;
  const path = 'booktalks';
  try {
    const btId = btData.id ? String(btData.id) : `bt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cleanDoc = {
      ...btData,
      id: btId,
      updatedAt: serverTimestamp(),
      syncedAt: new Date().toISOString()
    };
    await setDoc(doc(db, path, btId), cleanDoc, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return btId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return null;
  }
}

export async function deleteBooktalkFromCloud(btId) {
  if (!db || !btId) return false;
  const path = `booktalks/${btId}`;
  try {
    await deleteDoc(doc(db, 'booktalks', String(btId)));
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return false;
  }
}

export function subscribeToBooktalks(callback) {
  if (!db) return () => {};
  const path = 'booktalks';
  try {
    dbStatus.activeListeners++;
    return onSnapshot(collection(db, path), (snapshot) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      dbStatus.counts.booktalks = snapshot.size;
      updateDbStatusUI();

      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.LIST, path);
    return () => {};
  }
}

// ==========================================
// 4. FINDINGS (M2: MENEMUKAN) - REAL-TIME CLOUD
// ==========================================

export async function saveFindingToCloud(findingData) {
  if (!db) return null;
  const path = 'findings';
  try {
    const fid = findingData.id || `fnd_${findingData.studentName || 'siswa'}_${findingData.bookId || 'BK-001'}`.replace(/\s+/g, '_');
    const cleanDoc = {
      ...findingData,
      id: fid,
      updatedAt: serverTimestamp(),
      syncedAt: new Date().toISOString()
    };
    await setDoc(doc(db, path, fid), cleanDoc, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return fid;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return null;
  }
}

export function subscribeToFindings(callback) {
  if (!db) return () => {};
  const path = 'findings';
  try {
    dbStatus.activeListeners++;
    return onSnapshot(collection(db, path), (snapshot) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      dbStatus.counts.findings = snapshot.size;
      updateDbStatusUI();

      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.LIST, path);
    return () => {};
  }
}

// ==========================================
// 5. BOOKS (PERPUSTAKAAN DIGITAL) - REAL-TIME CLOUD
// ==========================================

export async function saveBookToCloud(bookData) {
  if (!db) return null;
  const path = 'books';
  try {
    const bookId = bookData.id ? String(bookData.id) : `BK-${Date.now().toString().slice(-4)}`;
    const cleanDoc = {
      ...bookData,
      id: bookId,
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(db, path, bookId), cleanDoc, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return bookId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return null;
  }
}

export async function deleteBookFromCloud(bookId) {
  if (!db || !bookId) return false;
  const path = `books/${bookId}`;
  try {
    await deleteDoc(doc(db, 'books', String(bookId)));
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return false;
  }
}

export function subscribeToBooks(callback) {
  if (!db) return () => {};
  const path = 'books';
  try {
    dbStatus.activeListeners++;
    return onSnapshot(collection(db, path), (snapshot) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      dbStatus.counts.books = snapshot.size;
      updateDbStatusUI();

      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.LIST, path);
    return () => {};
  }
}

// ==========================================
// 6. USERS (SISWA, GURU, KEPSEK, ADMIN) - REAL-TIME CLOUD
// ==========================================

export async function saveUserToCloud(userData) {
  if (!db || !userData) return null;
  const path = 'users';
  try {
    const uid = userData.id || userData.username || `usr_${Date.now()}`;
    const cleanDoc = {
      ...userData,
      id: uid,
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(db, path, String(uid)), cleanDoc, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return uid;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return null;
  }
}

export async function deleteUserFromCloud(userId) {
  if (!db || !userId) return false;
  const path = `users/${userId}`;
  try {
    await deleteDoc(doc(db, 'users', String(userId)));
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return false;
  }
}

export async function saveUsersBatchToCloud(usersList) {
  if (!db || !Array.isArray(usersList) || usersList.length === 0) return 0;
  const path = 'users';
  let successCount = 0;
  try {
    for (const u of usersList) {
      const uid = u.id || u.username || `usr_${Date.now()}`;
      const cleanDoc = {
        ...u,
        id: uid,
        updatedAt: serverTimestamp()
      };
      await setDoc(doc(db, path, String(uid)), cleanDoc, { merge: true });
      successCount++;
    }
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return successCount;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return successCount;
  }
}

export function subscribeToUsers(callback) {
  if (!db) return () => {};
  const path = 'users';
  try {
    dbStatus.activeListeners++;
    return onSnapshot(collection(db, path), (snapshot) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      dbStatus.counts.users = snapshot.size;
      updateDbStatusUI();

      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.LIST, path);
    return () => {};
  }
}

// ==========================================
// 7. SETTINGS (KONFIGURASI SEKOLAH) - REAL-TIME CLOUD
// ==========================================

export async function saveSettingsToCloud(settingsData) {
  if (!db || !settingsData) return null;
  const path = 'settings/config';
  try {
    await setDoc(doc(db, 'settings', 'config'), {
      ...settingsData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    dbStatus.lastSyncTime = new Date();
    updateDbStatusUI();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return false;
  }
}

export function subscribeToSettings(callback) {
  if (!db) return () => {};
  const path = 'settings/config';
  try {
    dbStatus.activeListeners++;
    return onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      dbStatus.connected = true;
      dbStatus.lastSyncTime = new Date();
      updateDbStatusUI();
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.GET, path);
    return () => {};
  }
}

// ==========================================
// 8. MASTER REAL-TIME TWO-WAY SYNC COORDINATOR
// ==========================================

let isCloudSyncInitialized = false;

export function initRealtimeCloudSync(appState, triggerRerenders) {
  if (isCloudSyncInitialized || !db) return;
  isCloudSyncInitialized = true;

  console.log('⚡ Initializing Lentera 5M Real-Time Cloud Database Synchronization...');

  // Flag to avoid feedback loop when updating local state from cloud
  window._isApplyingCloudUpdate = false;

  // 1. Sync Journals
  subscribeToJournals((cloudJournals) => {
    if (cloudJournals && cloudJournals.length > 0) {
      window._isApplyingCloudUpdate = true;
      // Merge remote journals with any newly created local ones
      const existingIds = new Set(cloudJournals.map(j => String(j.id)));
      const localOnly = (appState.journals || []).filter(j => j.id && !existingIds.has(String(j.id)));
      
      appState.journals = [...cloudJournals, ...localOnly];
      try {
        localStorage.setItem('lentera_journals', JSON.stringify(appState.journals));
      } catch (e) {}

      if (triggerRerenders) triggerRerenders('journals');
      window._isApplyingCloudUpdate = false;
    } else if (appState.journals && appState.journals.length > 0) {
      // First boot: Seed remote collection if empty
      console.log('🌱 Seeding initial journals to Cloud Firestore...');
      appState.journals.forEach(j => saveJournalToCloud(j));
    }
  });

  // 2. Sync Works (M3 & M5)
  subscribeToWorks((cloudWorks) => {
    if (cloudWorks && cloudWorks.length > 0) {
      window._isApplyingCloudUpdate = true;
      const existingIds = new Set(cloudWorks.map(w => String(w.id)));
      const localOnly = (appState.works || []).filter(w => w.id && !existingIds.has(String(w.id)));

      appState.works = [...cloudWorks, ...localOnly];
      try {
        localStorage.setItem('lentera_works', JSON.stringify(appState.works));
      } catch (e) {}

      if (triggerRerenders) triggerRerenders('works');
      window._isApplyingCloudUpdate = false;
    } else if (appState.works && appState.works.length > 0) {
      console.log('🌱 Seeding initial works to Cloud Firestore...');
      appState.works.forEach(w => saveWorkToCloud(w));
    }
  });

  // 3. Sync Booktalks (M4)
  subscribeToBooktalks((cloudBooktalks) => {
    if (cloudBooktalks && cloudBooktalks.length > 0) {
      window._isApplyingCloudUpdate = true;
      const existingIds = new Set(cloudBooktalks.map(b => String(b.id)));
      const localOnly = (appState.booktalks || []).filter(b => b.id && !existingIds.has(String(b.id)));

      appState.booktalks = [...cloudBooktalks, ...localOnly];
      try {
        localStorage.setItem('lentera_booktalks', JSON.stringify(appState.booktalks));
      } catch (e) {}

      if (triggerRerenders) triggerRerenders('booktalks');
      window._isApplyingCloudUpdate = false;
    } else if (appState.booktalks && appState.booktalks.length > 0) {
      console.log('🌱 Seeding initial booktalks to Cloud Firestore...');
      appState.booktalks.forEach(b => saveBooktalkToCloud(b));
    }
  });

  // 4. Sync Books (Digital Library)
  subscribeToBooks((cloudBooks) => {
    if (cloudBooks && cloudBooks.length > 0) {
      window._isApplyingCloudUpdate = true;
      const existingIds = new Set(cloudBooks.map(b => String(b.id)));
      const localOnly = (appState.books || []).filter(b => b.id && !existingIds.has(String(b.id)));

      appState.books = [...cloudBooks, ...localOnly];
      try {
        localStorage.setItem('lentera_books', JSON.stringify(appState.books));
      } catch (e) {}

      if (triggerRerenders) triggerRerenders('books');
      window._isApplyingCloudUpdate = false;
    } else if (appState.books && appState.books.length > 0) {
      console.log('🌱 Seeding initial books to Cloud Firestore...');
      appState.books.forEach(b => saveBookToCloud(b));
    }
  });

  // 5. Sync Users (Profiles, Points, Badges)
  subscribeToUsers((cloudUsers) => {
    if (cloudUsers && cloudUsers.length > 0) {
      window._isApplyingCloudUpdate = true;
      const cloudMap = new Map(cloudUsers.map(u => [u.id || u.username, u]));
      
      // Update users list
      appState.users = appState.users.map(u => {
        const key = u.id || u.username;
        return cloudMap.has(key) ? { ...u, ...cloudMap.get(key) } : u;
      });

      // Add any new cloud users not in local
      cloudUsers.forEach(cu => {
        const key = cu.id || cu.username;
        if (!appState.users.some(u => (u.id || u.username) === key)) {
          appState.users.push(cu);
        }
      });

      // Sync active currentUser if matched
      if (appState.currentUser) {
        const currKey = appState.currentUser.id || appState.currentUser.username;
        if (cloudMap.has(currKey)) {
          appState.currentUser = { ...appState.currentUser, ...cloudMap.get(currKey) };
          try {
            localStorage.setItem('lentera_current_user', JSON.stringify(appState.currentUser));
          } catch (e) {}
        }
      }

      try {
        localStorage.setItem('lentera_users', JSON.stringify(appState.users));
      } catch (e) {}

      if (triggerRerenders) triggerRerenders('users');
      window._isApplyingCloudUpdate = false;
    } else if (appState.users && appState.users.length > 0) {
      console.log('🌱 Seeding initial users to Cloud Firestore...');
      appState.users.forEach(u => saveUserToCloud(u));
    }
  });

  // 6. Sync Settings
  subscribeToSettings((cloudSettings) => {
    if (cloudSettings && typeof cloudSettings === 'object') {
      window._isApplyingCloudUpdate = true;
      appState.settings = { ...appState.settings, ...cloudSettings };
      try {
        localStorage.setItem('lentera_settings', JSON.stringify(appState.settings));
      } catch (e) {}
      if (triggerRerenders) triggerRerenders('settings');
      window._isApplyingCloudUpdate = false;
    } else if (appState.settings) {
      saveSettingsToCloud(appState.settings);
    }
  });

  // 7. Sync Findings
  subscribeToFindings((cloudFindings) => {
    if (cloudFindings && cloudFindings.length > 0) {
      window._isApplyingCloudUpdate = true;
      appState.cloudFindings = cloudFindings;
      if (triggerRerenders) triggerRerenders('findings');
      window._isApplyingCloudUpdate = false;
    }
  });
}

// Expose utilities on window object for seamless app access
if (typeof window !== 'undefined') {
  window.firebaseApp = app;
  window.firebaseDb = db;
  window.firebaseAuth = auth;
  window.dbStatus = dbStatus;
  window.testFirebaseConnection = testConnection;
  window.updateDbStatusUI = updateDbStatusUI;

  window.saveJournalToCloud = saveJournalToCloud;
  window.deleteJournalFromCloud = deleteJournalFromCloud;
  window.subscribeToJournals = subscribeToJournals;

  window.saveWorkToCloud = saveWorkToCloud;
  window.updateWorkInCloud = updateWorkInCloud;
  window.deleteWorkFromCloud = deleteWorkFromCloud;
  window.subscribeToWorks = subscribeToWorks;

  window.saveBooktalkToCloud = saveBooktalkToCloud;
  window.deleteBooktalkFromCloud = deleteBooktalkFromCloud;
  window.subscribeToBooktalks = subscribeToBooktalks;

  window.saveFindingToCloud = saveFindingToCloud;
  window.subscribeToFindings = subscribeToFindings;

  window.saveBookToCloud = saveBookToCloud;
  window.deleteBookFromCloud = deleteBookFromCloud;
  window.subscribeToBooks = subscribeToBooks;

  window.saveUserToCloud = saveUserToCloud;
  window.deleteUserFromCloud = deleteUserFromCloud;
  window.saveUsersBatchToCloud = saveUsersBatchToCloud;
  window.subscribeToUsers = subscribeToUsers;

  window.saveSettingsToCloud = saveSettingsToCloud;
  window.subscribeToSettings = subscribeToSettings;

  window.initRealtimeCloudSync = initRealtimeCloudSync;
}
