// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6H-tQ2f6Z4NmSsta1i1-SGYuD4pAb6WU",
  authDomain: "studygenuis-ai.firebaseapp.com",
  projectId: "studygenuis-ai",
  storageBucket: "studygenuis-ai.firebasestorage.app",
  messagingSenderId: "803615615503",
  appId: "1:803615615503:web:c6297929a5e155f57e917a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
