import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

import firebaseConfigFile from '../firebase-applet-config.json';

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

    db = firebaseConfig.firestoreDatabaseId 
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  }
} catch (e) {
  console.warn('Firebase initialization notice:', e);
}

export { app, db };

// Save reading journal to Cloud Firestore
export async function saveJournalToCloud(journalData) {
  try {
    const docRef = await addDoc(collection(db, 'journals'), {
      ...journalData,
      createdAt: serverTimestamp(),
      syncedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.warn('Firestore offline/fallback mode for journal:', error);
    return null;
  }
}

// Fetch journals from Cloud Firestore
export async function fetchJournalsFromCloud() {
  try {
    const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    const journals = [];
    snapshot.forEach(doc => {
      journals.push({ id: doc.id, ...doc.data() });
    });
    return journals;
  } catch (error) {
    console.warn('Unable to fetch from Firestore, using local data:', error);
    return [];
  }
}

// Realtime subscription to journals
export function subscribeToJournals(callback) {
  try {
    const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'), limit(30));
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
      callback(items);
    }, (err) => {
      console.warn('Firestore subscription notice:', err);
    });
  } catch (e) {
    console.warn('Firestore subscribe error:', e);
    return () => {};
  }
}

// Expose to window for global access
if (typeof window !== 'undefined') {
  window.firebaseApp = app;
  window.firebaseDb = db;
  window.saveJournalToCloud = saveJournalToCloud;
  window.fetchJournalsFromCloud = fetchJournalsFromCloud;
  window.subscribeToJournals = subscribeToJournals;
}
