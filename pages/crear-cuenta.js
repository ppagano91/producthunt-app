import React from "react";
import Layout from "../components/layout/Layout";

const CrearCuenta = () => {
  return (
    <div>
      <Layout>
        <>
          <h1>Crear Cuenta</h1>
          <form>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Tu email"
                name="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                placeholder="Tu password"
                name="password"
              />
            </div>
            <input type="submit" value="Crear Cuenta" />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
