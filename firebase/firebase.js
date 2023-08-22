import app from "firebase/compat/app";
import "firebase/compat/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    console.log(firebaseConfig);
    this.auth = app.auth();
  }

  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });

    /*return app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return user.user.updateProfile({
          displayName: nombre,
        });
      });
      */
  }
}

const firebase = new Firebase();

export default firebase;
