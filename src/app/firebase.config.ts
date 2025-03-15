import { initializeApp, getApps, getApp } from "firebase/app";
import { environment } from "../environments/environment"; // ✅ Ajusta la ruta según tu estructura

// ✅ Verifica si Firebase ya está inicializado, si no, lo inicializa
const firebaseApp = getApps().length ? getApp() : initializeApp(environment.firebaseConfig);

export { firebaseApp }; // ✅ Exporta la instancia correcta
