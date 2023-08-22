// Importar de .env

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "product-hunt-89bac.firebaseapp.com",
  projectId: "product-hunt-89bac",
  storageBucket: "product-hunt-89bac.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export default firebaseConfig;
