import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
  ErrorBox,
} from "../components/user-interface/Formulario";

import firebase from "../firebase";

// validaciones
import { useValidacion } from "../hooks/useValidacion";
import validarIniciarSesion from "../validation/validarIniciarSesion";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario ", error.message);
      setError(error.message);
    }
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
            Iniciar Sesión
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <Campo>
              <label htmlFor="email">Email</label>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                `}
              >
                <input
                  type="email"
                  id="email"
                  placeholder="Tu email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errores.email && <Error>{errores.email}</Error>}
              </div>
            </Campo>

            <Campo>
              <label htmlFor="password">Password</label>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                `}
              >
                <input
                  type="password"
                  id="password"
                  placeholder="Tu password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errores.password && <Error>{errores.password}</Error>}
              </div>
            </Campo>
            {error && <ErrorBox>{error}</ErrorBox>}
            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
