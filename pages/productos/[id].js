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
import Boton from "../../components/user-interface/Boton";
import { set } from "date-fns";

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
  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          setProducto(producto.data());
          setError(false);
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    } else {
      setError(true);
    }
  }, [id]);

  //   if (Object.keys(producto).length === 0) return "Cargando...";

  const {
    nombre,
    comentarios,
    creado,
    descripcion,
    empresa,
    url,
    imagen,
    votos,
    creador,
    haVotado,
  } = producto;

  //   Administrar y validar los votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }

    // verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    // guardar el ID del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    // obtener y sumar un nuevo voto
    const nuevoTotal = nuevoHaVotado.length;

    // actualizar en la BD
    firebase.db.collection("productos").doc(id).update({
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
    });

    // actualizar el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
      haVotado,
    });
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 msg="Producto no existente" />
        ) : Object.keys(producto).length === 0 ? (
          "Cargando..."
        ) : (
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
                  Publicado hace{" "}
                  {formatDistanceToNow(new Date(creado), { locale: es })}
                </p>
                <p>
                  Por <strong>{creador.nombre}</strong> de <i>{empresa}</i>
                </p>
                <img src={imagen} />
                <p>{descripcion}</p>

                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form>
                      <Campo>
                        <input type="text" name="mensaje" />
                      </Campo>
                      <InputSubmit type="submit" value="Agregar Comentario" />
                    </form>
                  </>
                )}

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
              <aside>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Boton>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votos} Votos
                  </p>
                  {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
                </div>
              </aside>
            </ContenedorProducto>
          </div>
        )}
      </>
    </Layout>
  );
};

export default IdProducto;
