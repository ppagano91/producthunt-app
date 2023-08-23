import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { FirebaseContext } from "../../firebase";

import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import { Campo, InputSubmit } from "../../components/user-interface/Formulario";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const IdProducto = () => {
  // state del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);

  // routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          console.log(producto.data());
          setProducto(producto.data());
        } else {
          setError(true);
        }
        setError(false);
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0) return "Cargando...";

  const {
    nombre,
    comentarios,
    creado,
    descripcion,
    empresa,
    url,
    imagen,
    votos,
  } = producto;

  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {nombre}
          </h1>
          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:{" "}
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>
              <p>Por: {empresa}</p>
              <img src={imagen} />
              <p>{descripcion}</p>
              <h2>Agrega tu comentario</h2>
              <form>
                <Campo>
                  <input type="text" name="mensaje" />
                </Campo>
                <InputSubmit type="submit" value="Agregar Comentario" />
              </form>
              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comentarios
              </h2>
              {comentarios.map((comentario) => (
                <li>
                  <p>{comentario.nombre}</p>
                  <p>Escrito por: {comentario.usuarioNombre}</p>
                </li>
              ))}
            </div>
            <aside></aside>
          </ContenedorProducto>
        </div>
      </>
    </Layout>
  );
};

export default IdProducto;
