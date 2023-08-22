import React, { useState, useEffect } from "react";
import firebase from "../firebase";

function useAutenticacion() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    // onAuthStateChanged es un método que se ejecuta cuando el usuario inicia sesión o cierra sesión
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUsuarioAutenticado(usuario);
      } else {
        setUsuarioAutenticado(null);
      }
    });

    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
}

export default useAutenticacion;
