import { initializeApp } from "firebase/app";

// Configuración del entorno
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',

  firebaseConfig: {
    apiKey: "AIzaSyC4Gl-N8RtAihRxNN0hC0lY3QtfM6g8mWg",
    authDomain: "atenea-1cb1a.firebaseapp.com",
    projectId: "atenea-1cb1a",
    storageBucket: "atenea-1cb1a.appspot.com",  // ✅ Corregido
    messagingSenderId: "428636904",
    appId: "1:428636904:web:dd133568b11e9d7281a75d",
    measurementId: "G-3S4JLNFXXL"
  }
};

// Inicializar Firebase
initializeApp(environment.firebaseConfig);
