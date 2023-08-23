import React, { useState, useContext } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
  ErrorBox,
} from "../components/user-interface/Formulario";

import { FirebaseContext } from "../firebase";

// validaciones
import { useValidacion } from "../hooks/useValidacion";
import validarCrearProducto from "../validation/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  descripcion: "",
};
const NuevoProducto = () => {
  const [error, setError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    console.log("Creando producto...");
    // si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push("/login");
    }

    // crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      // creador: {
      //   id: usuario.uid,
      //   nombre: usuario.displayName
      // },
      // haVotado: []
    };

    // insertarlo en la base de datos
    firebase.db.collection("productos").add(producto);
    console.log("Producto creado correctamente");
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Nuevo Producto
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Información General</legend>
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  `}
                >
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Tu Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errores.nombre && <Error>{errores.nombre}</Error>}
                </div>
              </Campo>
              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  `}
                >
                  <input
                    type="text"
                    id="empresa"
                    placeholder="Tu Empresa o Compañia"
                    name="empresa"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errores.empresa && <Error>{errores.empresa}</Error>}
                </div>
              </Campo>

              {/* <Campo>
                <label htmlFor="imagen">Imagen</label>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  `}
                >
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    value={imagen}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errores.imagen && <Error>{errores.imagen}</Error>}
                </div>
              </Campo> */}

              <Campo>
                <label htmlFor="url">URL</label>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  `}
                >
                  <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="URL de tu producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errores.url && <Error>{errores.url}</Error>}
                </div>
              </Campo>
            </fieldset>
            <fieldset>
              <legend>Sobre tu Producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                {/* <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  `}
                > */}
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
                {/* </div> */}
              </Campo>
            </fieldset>

            {error && <ErrorBox>{error}</ErrorBox>}
            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default NuevoProducto;
