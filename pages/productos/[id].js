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

// styled components
const ContenedorProducto = styled.span`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const CreadorProducto = styled.p`
  /* padding: 0.5rem; */
  /* font-size: 1.2rem; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* color: #fff; */
  font-style: italic;
  /* font-weight: bold; */
  /* display: inline-block; */
  /* text-align: center; */
`;

const IdProducto = () => {
  // state del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [consultarDB, setConsultarDB] = useState(true);

  // routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          setProducto(producto.data());
          setConsultarDB(false);
        } else {
          setError(true);
          setConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando...";

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

    setConsultarDB(true); // hay un voto, por lo tanto consultar a la BD
  };

  //   Funciones para crear comentarios
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //   identifica si el comentario es del creador del producto
  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      return router.push("/login");
    }

    // informacion extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // actualizar la BD
    firebase.db.collection("productos").doc(id).update({
      comentarios: nuevosComentarios,
    });

    // actualizar el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    setConsultarDB(true); // hay un comentario, por lo tanto consultar a la BD
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 msg="El ID del producto no existe" />
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
                <img
                  src={imagen}
                  css={css`
                    width: 100%;
                  `}
                />
                <p>{descripcion}</p>

                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input
                          type="text"
                          name="mensaje"
                          onChange={comentarioChange}
                        />
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

                {comentarios.length === 0 ? (
                  "Aún no hay comentarios"
                ) : (
                  <ul>
                    {comentarios.map((comentario, i) => (
                      <li
                        key={`${comentario.usuarioId}-${id}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comentario.mensaje}</p>
                        <div
                          css={css`
                            display: flex;
                          `}
                        >
                          <p>
                            Escrito por
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {""} {comentario.usuarioNombre}
                              &nbsp;
                            </span>
                          </p>
                          {esCreador(comentario.usuarioId) && (
                            <CreadorProducto>{""}(Autor)</CreadorProducto>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
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
