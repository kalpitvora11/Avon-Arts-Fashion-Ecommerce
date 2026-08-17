import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuration loaded from provisioned firebase-applet-config.json
const firebaseConfig = {
  projectId: "bamboo-victory-h8chg",
  appId: "1:33197989793:web:b9f742205407de64ffb5e0",
  apiKey: "AIzaSyBXgJejZ1MWtFYTK-4hs9nTZpkzvEgio7I",
  authDomain: "bamboo-victory-h8chg.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-f79a0887-2d16-478a-b5ba-39cfeb208c3c",
  storageBucket: "bamboo-victory-h8chg.firebasestorage.app",
  messagingSenderId: "33197989793",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific databaseId if provided
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

export default app;
