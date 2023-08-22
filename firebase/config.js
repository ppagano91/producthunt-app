// Importar de .env

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "product-hunt-89bac.firebaseapp.com",
  projectId: "product-hunt-89bac",
  storageBucket: "product-hunt-89bac.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export default firebaseConfig;
