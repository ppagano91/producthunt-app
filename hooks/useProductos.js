import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const useProductos = (orden) => {
  const [productos, setProductos] = useState([]);

  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db
        .collection("productos")
        .orderBy(orden, "desc")
        .onSnapshot(handleSnapshot);
    };

    function handleSnapshot(snapshot) {
      const productos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      console.log(productos);

      setProductos(productos);
    }

    obtenerProductos();
  }, []);

  return {
    productos,
  };
};

export default useProductos;
