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

import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
export const app = initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
});

// Initialize Firestore with configured databaseId
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

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
window.firebaseApp = app;
window.firebaseDb = db;
window.saveJournalToCloud = saveJournalToCloud;
window.fetchJournalsFromCloud = fetchJournalsFromCloud;
window.subscribeToJournals = subscribeToJournals;
