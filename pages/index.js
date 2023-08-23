import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";

export default function Home() {
  const [productos, setProductos] = useState([]);

  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db
        .collection("productos")
        .orderBy("creado", "desc")
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

  return (
    <div>
      <Layout>
        <h1>INICIO</h1>
      </Layout>
    </div>
  );
}
